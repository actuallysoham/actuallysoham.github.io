---
layout: default
title: People
---

## People

{%- comment -%} Filter order (roughly chronological). Places not listed here are appended. {%- endcomment -%}
{%- assign place_order = "Ashoka,Microsoft,UW,Meta,Elsewhere" | split: "," -%}
{%- assign all_places = site.data.people | map: "met" | uniq -%}
{%- assign places = place_order -%}
{%- for pl in all_places -%}{%- unless place_order contains pl -%}{%- assign places = places | push: pl -%}{%- endunless -%}{%- endfor %}

<p class="people-intro">
    I've been fortunate to work with, learn from and surround myself with many amazing mentors, collaborators and friends. Here is a pseudorandom subset of people who have had a deep impact on my life, in no particular order. Hover over (or tap) someone to see who they are and how we're connected. I'm struggling to develop a coherent inclusion criterion for this page (it is currently mostly vibes-based, and includes people with some public online presence). If you think you should be on this page, please come and have a deep impact on my life!
</p>

<div class="people-filters" role="group" aria-label="Filter by where we met">
    <span class="pf-label">Where we met</span>
    <button type="button" class="pf-chip is-active" data-place="" aria-pressed="true">All</button>
    {%- for pl in places -%}
    {%- assign c = site.data.people | where: "met", pl | size -%}
    {%- if c > 0 %}
    <button type="button" class="pf-chip" data-place="{{ pl }}" aria-pressed="false">{{ pl }}</button>
    {%- endif -%}
    {%- endfor %}
</div>

<div class="people-cloud" id="people-cloud">
    {%- for p in site.data.people %}
    <a href="{{ p.url }}" class="person-link" data-met="{{ p.met | escape }}" data-name="{{ p.name | escape }}" aria-label="{{ p.name | escape }}">
        <span class="person"><img src="/assets/images/people/{{ p.img }}" alt="{{ p.name | escape }}" draggable="false"></span>
    </a>
    {%- endfor %}
    <svg class="people-links" aria-hidden="true"></svg>
    <div class="person-card" role="status" hidden></div>
</div>

{%- comment -%} Data for the hover cards and connection lines {%- endcomment -%}
{%- assign papers = site.data.publications | where_exp: "p", "p.type != 'media'" -%}
<script id="people-data" type="application/json">
{
  "people": [
    {%- for p in site.data.people -%}
    { "name": {{ p.name | jsonify }}, "met": {{ p.met | jsonify }}, "note": {{ p.note | jsonify }}, "aliases": {% if p.aliases %}{{ p.aliases | jsonify }}{% else %}[]{% endif %} }{% unless forloop.last %},{% endunless %}
    {%- endfor -%}
  ],
  "papers": [
    {%- for pub in papers -%}
    { "title": {{ pub.title | jsonify }}, "year": {{ pub.year | jsonify }}, "authors": {{ pub.authors | jsonify }} }{% unless forloop.last %},{% endunless %}
    {%- endfor -%}
  ]
}
</script>
