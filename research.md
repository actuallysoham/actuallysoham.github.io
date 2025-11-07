---
layout: default
title: Research
---

## Research

 My current research interests are broadly within <a href="https://www.science.org/doi/10.1126/science.1167742">Computational Social Science</a>, and span several topics including <a href="https://dl.acm.org/doi/10.5555/3692070.3693952">pluralistic alignment</a>, <a href="https://arxiv.org/pdf/1606.06565">scalable oversight</a> and algorithms with <a href="https://humancompatible.ai/news/2024/01/18/the-prosocial-ranking-challenge-60000-in-prizes-for-better-social-media-algorithms/">pro-social</a> objectives.<br/><br/>

 Much of my past research deals with strategic information operations and political influencing in the Global South. This includes studies on rumours, conspiracies and other forms of online influencing, primarily on X (formerly, Twitter).<br/><br/>


<p style="font-style: italic; color: #586069; margin-bottom: 30px;">
    "The work is mysterious and important." — <a href="https://www.imdb.com/title/tt11280740/" style="font-style: normal;">Mark S, Lumon Industries</a>
</p>

### Ongoing Work

1. <b>Scaling up crowd-sourced fact-checking (Community Notes) using LLMs:</b>
    As an extension of the Supernotes paper, I am building a writing assistant that helps Community Note writers write better notes by giving them real-time feedback on the predicted performance of a note. Along with other collaborators, I am also testing out different ways to use LLMs to support note raters on social media discern fact-checking note quality more efficiently and accurately.<br/><br/> 

2. <b>Algorithmic re-ranking of social media feeds:</b>
    In 2024, we were one of the three winning interventions in the Prosocial Ranking Challenge, hosted by CHAI, Berkeley -- and our proposed feed re-ranking algorithm was used an one of 5 experimental arms in a four-month long field study across several social media platforms. Currently, we are working on analysing the experimental data, as well as the observational data collected as a part of the experiment to better understand (a) the impact of feed re-ranking algorithms on people and (b) the overall information/engagement environment across these social media platforms during the time of the experiment. 

### Published Work

<div class="tab-container">
    <button class="tab-button active" data-tab="selected">Selected</button>
    <button class="tab-button" data-tab="all">All</button>
</div>
Most recent publications on <a href="https://scholar.google.com/citations?user=i1ad6GmN4uoC">Google Scholar</a>. <br/>
‡ indicates equal contribution. <br/> <br/>

<div id="selected" class="tab-content active">
    {% assign selected_pubs = site.data.publications | where: "selected", true | where_exp: "pub", "pub.type != 'media'" %}
    {% assign selected_pubs = selected_pubs | sort: "date" | reverse %}
    {% for pub in selected_pubs %}
        <div class="publication">
            <div class="pub-thumbnail">
                <img src="{{ pub.thumbnail }}" alt="Thumbnail for {{ pub.title }}">
            </div>
            <div class="pub-content">
                <h3>{{ pub.title }}</h3>
                <p class="authors">
                    {% for author in pub.authors %}
                        {%- if forloop.last %} and {% endif %}
                        {%- if author == "Soham De" -%}
                            <strong>{{ author }}</strong>
                        {%- else -%}
                            {{ author }}
                        {%- endif -%}
                        {%- unless forloop.last %}, {% endunless %}
                    {%- endfor %}
                    {%- if pub.equal_contribution %} ‡{% endif %}
                </p>
                <p class="venue"><em>{{ pub.venue }}. {{ pub.year }}</em></p>
                <div class="pub-links">
                    {% if pub.links.abstract %}<a href="{{ pub.links.abstract }}">Abstract</a>{% endif %}
                    {% if pub.links.paper %}<a href="{{ pub.links.paper }}">PDF</a>{% endif %}
                    {% if pub.links.code %}<a href="{{ pub.links.code }}">Code</a>{% endif %}
                    <a class="bibtex-btn" data-bibtex="{{ pub.bibtex | default: 'No BibTeX available' }}">
                        Copy BibTeX
                    </a>
                </div>
            </div>
        </div>
    {% endfor %}
</div>

<div id="all" class="tab-content">
    <div class="publications-main">
        
        {% assign all_pubs = site.data.publications | where_exp: "pub", "pub.type != 'media'" | sort: "date" | reverse %}
        {% for pub in all_pubs %}
        <div class="publication" data-tags="{{ pub.tags | join: ',' }}">
            <div class="pub-thumbnail">
                <img src="{{ pub.thumbnail }}" alt="Thumbnail for {{ pub.title }}">
            </div>
            <div class="pub-content">
                <h3>{{ pub.title }}</h3>
                <p class="authors">
                    {% for author in pub.authors %}
                        {%- if forloop.last %} and {% endif %}
                        {%- if author == "Soham De" -%}
                            <strong>{{ author }}</strong>
                        {%- else -%}
                            {{ author }}
                        {%- endif -%}
                        {%- unless forloop.last %}, {% endunless %}
                    {%- endfor %}
                    {%- if pub.equal_contribution %} ‡{% endif %}
                </p>
                <p class="venue"><em>{{ pub.venue }}. {{ pub.year }}</em></p>
                <div class="pub-links">
                    {% if pub.links.abstract %}<a href="{{ pub.links.abstract }}">Abstract</a>{% endif %}
                    {% if pub.links.paper %}<a href="{{ pub.links.paper }}">PDF</a>{% endif %}
                    {% if pub.links.code %}<a href="{{ pub.links.code }}">Code</a>{% endif %}
                    <a class="bibtex-btn" data-bibtex="{{ pub.bibtex | default: 'No BibTeX available' }}">
                        Copy BibTeX
                    </a>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</div>

## Selected Media Coverage

<div class="media-list">
    {% assign media = site.data.publications | where: "type", "media" | sort: "date" | reverse %}
    {% for item in media %}
    <div class="media-item">
        <h3><a href="{{ item.links.html }}">{{ item.title }}</a></h3>
        <p class="media-meta">
            {% for author in item.authors %}
                {%- if author == "Soham De" -%}
                    <strong>{{ author }}</strong>
                {%- else -%}
                    {{ author }}
                {%- endif -%}
                {%- unless forloop.last %}, {% endunless %}
            {%- endfor %}
            • {{ item.venue }}, {{ item.year }}
        </p>
    </div>
    {% endfor %}
</div> 