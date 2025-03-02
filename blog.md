---
layout: default
title: Blog
---

## Blog

I will never be able to write all the things I have planned to write here. But here are some of the things I have written so far. I also don't think you should take any of them too seriously - these reflect my thoughts at the time of writing and I'm pretty bad at updating them over time!

<div class="blog-list">
    {% for post in site.posts %}
        <div class="blog-item">
            <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
            <div class="blog-meta">{{ post.date | date: "%B %d, %Y" }}</div>
            {% if post.description %}
                <p class="blog-description">{{ post.description }}</p>
            {% endif %}
        </div>
    {% endfor %}
</div>
