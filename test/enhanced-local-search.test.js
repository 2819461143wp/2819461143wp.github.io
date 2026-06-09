const assert = require('node:assert/strict');
const test = require('node:test');

const search = require('../source/js/enhanced-local-search.js');

test('collects multiple snippets from one article', () => {
  const entry = {
    title: '操作系统第二章',
    url: '/os/',
    content: '进程调度用于选择进程。这里补充一段较长的上下文，用来模拟文章中相隔较远的段落，并且让后面的命中不会被近距离合并。调度算法会影响响应时间。再补充一段说明，让第三个位置不会和第二个位置被合并，同时保持阅读上下文足够完整。最后再次出现调度。'
  };

  const result = search.buildSearchResults([entry], '调度');

  assert.equal(result.length, 1);
  assert.equal(result[0].matches.length, 3);
  assert.match(result[0].matches[0].text, /进程调度/);
  assert.match(result[0].matches[1].text, /调度算法/);
});

test('groups title matches with content matches', () => {
  const result = search.buildSearchResults([
    { title: 'SpringBoot', url: '/SpringBoot/', content: '控制器和依赖注入。这里补充一段较长的上下文，用来模拟另一个小节，并且确认分组里会保留多个不同位置的命中。依赖注入简化对象管理。' },
    { title: 'Vue', url: '/Vue/', content: '响应式系统。' }
  ], '依赖');

  assert.equal(result.length, 1);
  assert.equal(result[0].title, 'SpringBoot');
  assert.equal(result[0].matches.length, 2);
});

test('returns an empty array for blank keywords', () => {
  assert.deepEqual(search.buildSearchResults([{ title: 'A', url: '/a/', content: 'hello' }], '   '), []);
});
