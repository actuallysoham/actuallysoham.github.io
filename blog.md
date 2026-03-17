---
layout: default
title: Non-Research
---

## Non-Research

This is a collection of non-peer-reviewed thoughts that I'm unable to contain within myself. I don't think you should take any of them too seriously -- these reflect my views at the time of writing and I'm pretty bad at updating them over time!

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
    <div class="blog-item">
        <h3><a href="/seattle-cafe-list.html">Soham's Seattle Café Rankings</a></h3>
        <div class="blog-meta">Last Update: March 17, 2026</div>
        <p class="blog-description">A ranked list of Seattle cafés with adjustable weights for coffee, pastry, ambience, and workability. Includes occassional short reviews and features occassional guest reviewers.</p>
    </div>
    <div class="blog-item">
        <h3><a href="/s-tier-movies">Soham's S-Tier Movies</a></h3>
        <div class="blog-meta">Last Update: Jan 30, 2025</div>
        <p class="blog-description">An unranked list of some of my all-time favourite films, following the footsteps of the one-and-only <a href="https://kabirahuja2431.github.io/misc/">Kabir Ahuja.</a></p>
    </div>
</div>
