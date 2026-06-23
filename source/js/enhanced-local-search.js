/* global CONFIG, jQuery */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.EnhancedLocalSearch = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  var MAX_ARTICLES = 30;
  var MAX_MATCHES_PER_ARTICLE = 10;
  var SNIPPET_RADIUS = 80;
  var MIN_SNIPPET_DISTANCE = 50;
  var SEARCH_STATE_KEY = 'fluid-enhanced-search-target';

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function normalizeSpaces(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function stripHtml(value) {
    return normalizeSpaces(String(value || '').replace(/<[^>]*>/g, ' '));
  }

  function parseKeywords(query) {
    return normalizeSpaces(query)
      .toLowerCase()
      .split(/[\s-]+/)
      .filter(Boolean);
  }

  function findAllIndexes(text, keyword) {
    var indexes = [];
    if (!text || !keyword) return indexes;

    var cursor = 0;
    while (cursor < text.length) {
      var found = text.indexOf(keyword, cursor);
      if (found === -1) break;
      indexes.push(found);
      cursor = found + Math.max(keyword.length, 1);
    }
    return indexes;
  }

  function createSnippet(content, keyword, index, occurrence) {
    var start = Math.max(index - SNIPPET_RADIUS, 0);
    var end = Math.min(index + keyword.length + SNIPPET_RADIUS, content.length);
    var prefix = start > 0 ? '...' : '';
    var suffix = end < content.length ? '...' : '';

    return {
      keyword: keyword,
      occurrence: occurrence,
      text: prefix + content.slice(start, end) + suffix
    };
  }

  function highlightKeywords(text, keywords) {
    var safe = escapeHtml(text);
    if (!keywords.length) return safe;

    var pattern = keywords.map(escapeRegExp).join('|');
    return safe.replace(new RegExp('(' + pattern + ')', 'gi'), '<mark class="search-word">$1</mark>');
  }

  function buildSearchResults(entries, query) {
    var keywords = parseKeywords(query);
    if (!keywords.length) return [];

    return entries.reduce(function(results, entry) {
      var title = normalizeSpaces(entry.title) || 'Untitled';
      var url = entry.url || '#';
      var content = stripHtml(entry.content);
      var haystackTitle = title.toLowerCase();
      var haystackContent = content.toLowerCase();
      var isMatch = keywords.every(function(keyword) {
        return haystackTitle.indexOf(keyword) !== -1 || haystackContent.indexOf(keyword) !== -1;
      });

      if (!isMatch) return results;

      var matches = [];
      var seen = {};
      var acceptedIndexes = [];
      keywords.forEach(function(keyword) {
        if (haystackTitle.indexOf(keyword) !== -1) {
          matches.push({
            keyword: keyword,
            occurrence: 0,
            text: title,
            inTitle: true
          });
        }

        findAllIndexes(haystackContent, keyword).forEach(function(index, occurrence) {
          var key = keyword + ':' + index;
          if (seen[key] || matches.length >= MAX_MATCHES_PER_ARTICLE) return;
          if (acceptedIndexes.some(function(accepted) {
            return Math.abs(accepted - index) < MIN_SNIPPET_DISTANCE;
          })) return;
          seen[key] = true;
          acceptedIndexes.push(index);
          matches.push(createSnippet(content, keyword, index, occurrence));
        });
      });

      if (!matches.length) {
        matches.push({
          keyword: keywords[0],
          occurrence: 0,
          text: content.slice(0, SNIPPET_RADIUS * 2) || title
        });
      }

      results.push({
        title: title,
        url: url,
        matches: matches.slice(0, MAX_MATCHES_PER_ARTICLE),
        total: matches.length
      });

      return results;
    }, []).slice(0, MAX_ARTICLES);
  }

  function parseXml(xmlResponse) {
    return jQuery('entry', xmlResponse).map(function() {
      return {
        title: jQuery('title', this).text(),
        content: jQuery('content', this).text(),
        url: jQuery('url', this).text()
      };
    }).get();
  }

  function storeTarget(url, keyword, occurrence) {
    try {
      sessionStorage.setItem(SEARCH_STATE_KEY, JSON.stringify({
        path: new URL(url, window.location.origin).pathname,
        keyword: keyword,
        occurrence: occurrence || 0,
        createdAt: Date.now()
      }));
    } catch (err) {
      // Storage can be unavailable in private contexts; navigation should still work.
    }
  }

  function renderResults(results, keywords) {
    if (!results.length) {
      return '<div class="search-empty">没有找到相关内容，换个关键词试试。</div>';
    }

    return results.map(function(result, index) {
      var collapseId = 'search-hit-group-' + index;
      var matchesHtml = result.matches.map(function(match, matchIndex) {
        var href = escapeHtml(result.url);
        var keyword = escapeHtml(match.keyword);
        var occurrence = Number(match.occurrence || 0);
        return [
          '<a class="search-hit" href="' + href + '" data-keyword="' + keyword + '" data-occurrence="' + occurrence + '">',
          '<span class="search-hit-index">' + (matchIndex + 1) + '</span>',
          '<span class="search-hit-text">' + highlightKeywords(match.text, keywords) + '</span>',
          '</a>'
        ].join('');
      }).join('');

      return [
        '<section class="search-article">',
        '<button class="search-article-toggle' + (index === 0 ? '' : ' collapsed') + '" type="button" data-toggle="collapse" data-target="#' + collapseId + '" aria-expanded="' + (index === 0 ? 'true' : 'false') + '" aria-controls="' + collapseId + '">',
        '<span class="search-article-title">' + highlightKeywords(result.title, keywords) + '</span>',
        '<span class="search-article-count">' + result.total + ' 处</span>',
        '</button>',
        '<div id="' + collapseId + '" class="collapse' + (index === 0 ? ' show' : '') + '" data-parent="#local-search-result">',
        '<div class="search-hit-list">' + matchesHtml + '</div>',
        '</div>',
        '</section>'
      ].join('');
    }).join('');
  }

  function initSearchModal() {
    if (typeof jQuery === 'undefined') return;

    var modal = jQuery('#modalSearch');
    var input = jQuery('#local-search-input');
    var result = jQuery('#local-search-result');
    var cachedEntries = null;
    var loading = false;

    if (!modal.length || !input.length || !result.length) return;

    modal.off('show.bs.modal shown.bs.modal hidden.bs.modal');
    input.off('input');
    result.off('click', '.search-hit');

    function setShell() {
      modal.addClass('enhanced-search-modal');
      input.attr({
        placeholder: '搜索文章、章节或关键词',
        autocomplete: 'off',
        'aria-label': '搜索文章'
      });
      input.closest('.md-form').addClass('enhanced-search-input-wrap');
    }

    function loadIndex(callback) {
      if (cachedEntries) return callback(cachedEntries);
      if (loading) return;

      loading = true;
      result.html('<div class="search-loading">正在载入搜索索引...</div>');

      jQuery.ajax({
        url: (typeof CONFIG !== 'undefined' && CONFIG.search_path) || '/local-search.xml',
        dataType: 'xml',
        success: function(xmlResponse) {
          cachedEntries = parseXml(xmlResponse);
          loading = false;
          callback(cachedEntries);
        },
        error: function() {
          loading = false;
          result.html('<div class="search-empty">搜索索引载入失败，请刷新后再试。</div>');
        }
      });
    }

    function runSearch() {
      var query = input.val();
      if (!normalizeSpaces(query)) {
        input.removeClass('invalid valid');
        result.html('<div class="search-empty">输入关键词后会按文章分组展示命中位置。</div>');
        return;
      }

      loadIndex(function(entries) {
        var keywords = parseKeywords(query);
        var results = buildSearchResults(entries, query);
        input.toggleClass('valid', results.length > 0).toggleClass('invalid', results.length === 0);
        result.html(renderResults(results, keywords));
      });
    }

    modal.on('show.bs.modal', function() {
      setShell();
      result.html('<div class="search-empty">输入关键词后会按文章分组展示命中位置。</div>');
    });

    modal.on('shown.bs.modal', function() {
      input.trigger('focus');
      loadIndex(function() {
        runSearch();
      });
    });

    modal.on('hidden.bs.modal', function() {
      input.val('').removeClass('invalid valid');
      result.html('');
    });

    input.on('input', runSearch);

    result.on('click', '.search-hit', function() {
      var link = jQuery(this);
      storeTarget(link.attr('href'), link.data('keyword'), Number(link.data('occurrence') || 0));
      modal.modal('hide');
    });
  }

  function getStoredTarget() {
    try {
      var raw = sessionStorage.getItem(SEARCH_STATE_KEY);
      if (!raw) return null;
      var target = JSON.parse(raw);
      if (!target || Date.now() - target.createdAt > 60000) return null;
      if (target.path !== window.location.pathname) return null;
      sessionStorage.removeItem(SEARCH_STATE_KEY);
      return target;
    } catch (err) {
      return null;
    }
  }

  function textNodesUnder(node) {
    var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode: function(textNode) {
        if (!normalizeSpaces(textNode.nodeValue)) return NodeFilter.FILTER_REJECT;
        var parent = textNode.parentElement;
        if (!parent || /^(script|style|textarea|code|pre)$/i.test(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  function scrollToStoredTarget() {
    if (typeof document === 'undefined') return;
    var target = getStoredTarget();
    if (!target || !target.keyword) return;

    var container = document.querySelector('.markdown-body, article, #board');
    if (!container) return;

    var keyword = String(target.keyword).toLowerCase();
    var wanted = Number(target.occurrence || 0);
    var current = 0;
    var nodes = textNodesUnder(container);

    for (var i = 0; i < nodes.length; i += 1) {
      var text = nodes[i].nodeValue;
      var lower = text.toLowerCase();
      var index = lower.indexOf(keyword);
      while (index !== -1) {
        if (current === wanted) {
          var range = document.createRange();
          range.setStart(nodes[i], index);
          range.setEnd(nodes[i], index + keyword.length);
          var mark = document.createElement('mark');
          mark.className = 'search-jump-highlight';
          range.surroundContents(mark);
          mark.scrollIntoView({ behavior: 'auto', block: 'center' });
          window.setTimeout(function() {
            mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);
          return;
        }
        current += 1;
        index = lower.indexOf(keyword, index + keyword.length);
      }
    }
  }

  if (typeof window !== 'undefined') {
    jQuery(function() {
      initSearchModal();
      window.setTimeout(scrollToStoredTarget, 250);
    });
  }

  return {
    buildSearchResults: buildSearchResults,
    parseKeywords: parseKeywords,
    stripHtml: stripHtml
  };
});
