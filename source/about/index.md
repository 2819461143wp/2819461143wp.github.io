---
title: 关于我
layout: about
date: 2026-05-02 22:30:00
banner_img: /images/壁纸.jpg
description: cwdpsky 的 GitHub README 风格个人介绍：技术方向、项目经历、技术栈和公开主页入口。
comments: false
---

<style>
  .about-avatar,
  .about-info {
    display: none !important;
  }

  .github-profile-readme {
    --readme-bg: #ffffff;
    --readme-page: #f6f8fa;
    --readme-text: #24292f;
    --readme-muted: #57606a;
    --readme-border: #d0d7de;
    --readme-border-strong: #afb8c1;
    --readme-link: #0969da;
    --readme-code: #f6f8fa;
    --readme-blue: #0969da;
    --readme-green: #1f883d;
    --readme-orange: #bc4c00;
    max-width: 980px;
    margin: 0 auto;
    color: var(--readme-text);
    font-size: 15px;
    line-height: 1.65;
  }

  [data-user-color-scheme="dark"] .github-profile-readme {
    --readme-bg: #0d1117;
    --readme-page: #010409;
    --readme-text: #e6edf3;
    --readme-muted: #8b949e;
    --readme-border: #30363d;
    --readme-border-strong: #484f58;
    --readme-link: #2f81f7;
    --readme-code: #161b22;
  }

  .github-profile-readme * {
    box-sizing: border-box;
  }

  .readme-card {
    overflow: hidden;
    border: 1px solid var(--readme-border);
    border-radius: 6px;
    background: var(--readme-bg);
  }

  .readme-filebar {
    display: flex;
    align-items: center;
    min-height: 3.1rem;
    padding: 0 1.5rem;
    border-bottom: 1px solid var(--readme-border);
    background: var(--readme-page);
    color: var(--readme-muted);
    font-size: .86rem;
    font-family: Consolas, "Courier New", monospace;
  }

  .readme-body {
    padding: 1.5rem 1.65rem 1.7rem;
  }

  .readme-hero {
    text-align: center;
  }

  .readme-hero h1 {
    margin: .25rem 0 .85rem;
    font-size: 2.15rem;
    line-height: 1.2;
    font-weight: 720;
    letter-spacing: 0;
  }

  .readme-mark {
    display: grid;
    place-items: center;
    width: 11rem;
    height: 11rem;
    margin: 1rem auto 1.15rem;
    border: 1px solid var(--readme-border);
    border-radius: 6px;
    background:
      linear-gradient(90deg, rgba(9, 105, 218, .1) 1px, transparent 1px),
      linear-gradient(180deg, rgba(9, 105, 218, .1) 1px, transparent 1px),
      var(--readme-code);
    background-size: 18px 18px;
  }

  .readme-mark-inner {
    display: grid;
    gap: .45rem;
    text-align: center;
  }

  .readme-mark strong {
    font-size: 2rem;
    line-height: 1;
    letter-spacing: 0;
  }

  .readme-mark code {
    display: inline-flex;
    justify-content: center;
    padding: .2rem .45rem;
    border: 1px solid var(--readme-border);
    border-radius: 6px;
    color: var(--readme-blue);
    background: var(--readme-bg);
    font-size: .82rem;
  }

  .readme-subtitle {
    margin: 0 auto .85rem;
    color: var(--readme-text);
    font-weight: 620;
  }

  .readme-badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: .45rem;
    margin: .75rem 0 0;
  }

  .readme-badge,
  .stack-badge {
    display: inline-flex;
    align-items: center;
    min-height: 1.45rem;
    padding: .16rem .46rem;
    border-radius: 4px;
    color: #fff;
    font-size: .75rem;
    font-weight: 760;
    line-height: 1;
    letter-spacing: .02em;
    white-space: nowrap;
  }

  .readme-badge.gray {
    background: #6e7781;
  }

  .readme-badge.blue {
    background: #0969da;
  }

  .readme-badge.green {
    background: #1f883d;
  }

  .readme-badge.orange {
    background: #bc4c00;
  }

  .readme-rule {
    height: 1px;
    margin: 1.55rem 0;
    border: 0;
    background: var(--readme-border-strong);
  }

  .readme-section {
    margin: 0;
  }

  .readme-section + .readme-section {
    margin-top: 1.3rem;
  }

  .readme-section h2 {
    margin: 0 0 .85rem;
    padding-bottom: .35rem;
    border-bottom: 1px solid var(--readme-border);
    font-size: 1.3rem;
    font-weight: 650;
    letter-spacing: 0;
  }

  .readme-section p {
    margin: .35rem 0 .7rem;
    color: var(--readme-text);
  }

  .readme-section ul {
    margin: .45rem 0 0 1.25rem;
    padding: 0;
  }

  .readme-section li {
    margin: .38rem 0;
  }

  .inline-code {
    padding: .12rem .32rem;
    border-radius: 6px;
    background: var(--readme-code);
    color: var(--readme-text);
    font-family: Consolas, "Courier New", monospace;
    font-size: .85em;
  }

  .stack-line {
    display: flex;
    flex-wrap: wrap;
    gap: .52rem;
    margin: .85rem 0;
  }

  .stack-badge.python {
    background: #3776ab;
  }

  .stack-badge.java {
    background: #e76f00;
  }

  .stack-badge.cpp {
    background: #00599c;
  }

  .stack-badge.sql {
    background: #336791;
  }

  .stack-badge.ts {
    background: #3178c6;
  }

  .stack-badge.spring {
    background: #6db33f;
  }

  .stack-badge.vue {
    background: #42b883;
  }

  .stack-badge.pytorch {
    background: #ee4c2c;
  }

  .stack-badge.transformers {
    background: #ffcc00;
    color: #24292f;
  }

  .stack-badge.mysql {
    background: #4479a1;
  }

  .stack-badge.docker {
    background: #2496ed;
  }

  .stack-badge.git {
    background: #f05032;
  }

  .work-table-wrap {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--readme-border);
    border-radius: 6px;
  }

  .work-table {
    width: 100%;
    min-width: 760px;
    border-collapse: collapse;
    margin: 0;
    font-size: .93rem;
  }

  .work-table th,
  .work-table td {
    padding: .72rem .85rem;
    border: 1px solid var(--readme-border);
    vertical-align: top;
  }

  .work-table th {
    background: var(--readme-page);
    color: var(--readme-text);
    font-weight: 650;
  }

  .work-table td {
    color: var(--readme-text);
  }

  .work-table tr:nth-child(even) td {
    background: rgba(208, 215, 222, .16);
  }

  [data-user-color-scheme="dark"] .work-table tr:nth-child(even) td {
    background: rgba(48, 54, 61, .25);
  }

  .activity-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: .8rem;
    align-items: stretch;
  }

  .activity-card {
    display: grid;
    place-items: center;
    min-height: 10rem;
    padding: .8rem;
    border: 1px solid var(--readme-border);
    border-radius: 6px;
    background: var(--readme-bg);
  }

  .activity-card img {
    max-width: 100%;
    height: auto;
  }

  .contact-list a {
    color: var(--readme-link);
    text-decoration: none;
  }

  .contact-list a:hover,
  .contact-list a:focus-visible {
    text-decoration: underline;
    outline: 0;
  }

  .readme-quote {
    margin: 1rem 0 0;
    padding: .75rem 1rem;
    border-left: .25rem solid var(--readme-border-strong);
    color: var(--readme-muted);
    background: var(--readme-page);
  }

  @media (max-width: 720px) {
    .readme-body {
      padding: 1rem;
    }

    .readme-hero h1 {
      font-size: 1.65rem;
    }
    
    .readme-mark {
      width: 8.5rem;
      height: 8.5rem;
    }
    
    .activity-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

{% raw %}
<div class="github-profile-readme">
  <div class="readme-card">


    <div class="readme-body">
      <header class="readme-hero">
        <h1>Hi, I'm cwdpsky</h1>
    
        <div class="readme-mark" aria-label="cwdpsky profile mark">
          <div class="readme-mark-inner">
    		    <img src="../images/cwdpsky.jpg">
          </div>
        </div>
    
        <p class="readme-subtitle">
          Software Engineering Learner | LLM Applications | Backend Systems | Computer Vision
        </p>
    
        <div class="readme-badges" aria-label="profile badges">
          <span class="readme-badge gray">Public Profile</span>
          <span class="readme-badge blue">GitHub @2819461143wp</span>
          <span class="readme-badge green">Focus LLM / Backend / CV</span>
          <span class="readme-badge orange">Privacy First</span>
        </div>
      </header>
    
      <hr class="readme-rule">
    
      <section class="readme-section">
        <h2>About Me</h2>
        <p>
          目前主要把学习和项目实践集中在 AI 应用、后端系统、时序预测、视觉识别和个人知识库整理上。这个页面按 GitHub Profile README 的方式组织：少一点简历式堆叠，多一点“我正在做什么、用什么做、做出了什么”的公开索引。
        </p>
        <ul>
          <li>目前聚焦：<span class="inline-code">LLM + RAG</span>、<span class="inline-code">Text2SQL</span>、<span class="inline-code">LoRA / SFT</span>、<span class="inline-code">Spring Boot</span>、<span class="inline-code">Vue</span>。</li>
          <li>项目方向：水质预测、大坝裂缝识别、设备状态管理、校园数字化系统、公式友好的桌面备忘工具。</li>
          <li>写作习惯：把课程笔记、算法题、模型实验和工程踩坑整理成可复用的公开笔记。</li>
        </ul>
      </section>
    
      <hr class="readme-rule">
    
      <section class="readme-section">
        <h2>Tech Stack</h2>
        <div class="stack-line">
          <span class="stack-badge python">PYTHON</span>
          <span class="stack-badge java">JAVA</span>
          <span class="stack-badge cpp">C / C++</span>
          <span class="stack-badge sql">SQL</span>
          <span class="stack-badge ts">TYPESCRIPT</span>
        </div>
        <div class="stack-line">
          <span class="stack-badge spring">SPRING BOOT</span>
          <span class="stack-badge vue">VUE</span>
          <span class="stack-badge pytorch">PYTORCH</span>
          <span class="stack-badge transformers">TRANSFORMERS</span>
        </div>
        <div class="stack-line">
          <span class="stack-badge mysql">MYSQL</span>
          <span class="stack-badge docker">DOCKER</span>
          <span class="stack-badge git">GIT</span>
        </div>
      </section>
    
      <hr class="readme-rule">
    
      <section class="readme-section">
        <h2>Featured Work</h2>
        <div class="work-table-wrap">
          <table class="work-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Role</th>
                <th>What I Built</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Water Quality Forecasting</td>
                <td>Model Experiment</td>
                <td>Explored time-series prediction workflows and model comparison for water-quality indicators, with notes around feature patterns and evaluation.</td>
              </tr>
              <tr>
                <td>Dam Crack Recognition</td>
                <td>CV Model</td>
                <td>Worked around fine-grained crack perception under complex backgrounds, focusing on texture cues, embedding improvements, and feature fusion.</td>
              </tr>
              <tr>
                <td>Equipment Lifecycle Platform</td>
                <td>Backend / Data Flow</td>
                <td>Connected device information, maintenance work orders, predictive maintenance ideas, and warning workflows into a more complete management loop.</td>
              </tr>
              <tr>
                <td>Campus Digital System</td>
                <td>Full Stack Practice</td>
                <td>Practiced forum, QA, points, registration, and management modules with frontend-backend collaboration and database design.</td>
              </tr>
              <tr>
                <td>Formula Desktop Memo</td>
                <td>Tool Builder</td>
                <td>Built toward a desktop memo workflow that is friendlier to math formulas, Markdown notes, and local daily use.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    
      <hr class="readme-rule">
    
      <section class="readme-section">
        <h2>GitHub Activity</h2>
        <div class="activity-grid">
          <a class="activity-card" href="https://github.com/2819461143wp" target="_blank" rel="noopener" aria-label="GitHub stats">
            <img src="https://github-readme-stats.vercel.app/api?username=2819461143wp&show_icons=true&hide_border=true&theme=transparent" alt="GitHub stats">
          </a>
          <a class="activity-card" href="https://github.com/2819461143wp" target="_blank" rel="noopener" aria-label="Top languages">
            <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=2819461143wp&layout=compact&hide_border=true&theme=transparent" alt="Top languages">
          </a>
        </div>
      </section>
    
      <hr class="readme-rule">
    
      <section class="readme-section">
        <h2>Contact</h2>
        <ul class="contact-list">
          <li>GitHub: <a href="https://github.com/2819461143wp" target="_blank" rel="noopener">@2819461143wp</a></li>
          <li>Blog: <a href="https://cwdpsky.top/" target="_blank" rel="noopener">cwdpsky.top</a></li>
        </ul>
        <p class="readme-quote">
          Building useful AI and software systems through notes, experiments, and small working products.
        </p>
      </section>
    </div>
  </div>
</div>
{% endraw %}
