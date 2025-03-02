---
layout: default
title: News
---

## News

<div class="news-list">
    {% for item in site.data.news %}
        <div class="news-item">
            <div class="news-date">{{ item.date | date: "%Y-%m-%d" }}</div>
            <div class="news-content">{{ item.content | markdownify }}</div>
        </div>
    {% endfor %}
</div> 