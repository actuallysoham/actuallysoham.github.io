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

<div class="tab-container">
    <button class="tab-button active" data-tab="selected">Selected</button>
    <button class="tab-button" data-tab="all">All</button>
</div>
Most recent publications on <a href="#">Google Scholar</a>. <br/>
‡ indicates equal contribution. <br/> <br/>

<div id="selected" class="tab-content active">
    {% assign selected_pubs = site.data.publications | where: "selected", true | where_exp: "pub", "pub.type != 'media'" %}
    {% assign selected_pubs = selected_pubs | sort: "year" | reverse %}
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
                        <svg class="copy-icon" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/>
                            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/>
                        </svg>
                        Copy BibTeX
                    </a>
                </div>
            </div>
        </div>
    {% endfor %}
</div>

<div id="all" class="tab-content">
    <div class="publications-main">
        
        {% assign all_pubs = site.data.publications | where_exp: "pub", "pub.type != 'media'" | sort: "year" | reverse %}
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
                        <svg class="copy-icon" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/>
                            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/>
                        </svg>
                        Copy BibTeX
                    </a>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</div> 