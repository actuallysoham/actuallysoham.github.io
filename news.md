---
layout: default
title: News
---

## News

<div class="news-list">
    {% assign news_sorted = site.data.news | sort: "date" | reverse %}
    {% for item in news_sorted %}
        <div class="news-item">
            <div class="news-date">{{ item.date | date: "%b %Y" }}</div>
            <div class="news-content">{{ item.content | markdownify }}</div>
        </div>
    {% endfor %}
</div> 