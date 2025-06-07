---
layout: default
---

## About Me

I'm a PhD student at the <a href="https://www.washington.edu">University of Washington</a> advised by <a href="https://faculty.washington.edu/msaveski">Martin Saveski</a>, a Research Scientist Intern at <a href="https://ai.meta.com/research/">Meta (FAIR)</a> under <a href="https://smithamilli.com/">Smitha Milli</a> and <a href="https://maxn.io/">Max Nickel</a> and a research affiliate at <a href="https://www.mit.edu/">MIT</a>.  My research interests are broadly within <a href="https://www.science.org/doi/10.1126/science.1167742">Computational Social Science</a>, and span several topics including <a href="https://dl.acm.org/doi/10.5555/3692070.3693952">pluralistic alignment</a>, <a href="https://arxiv.org/pdf/1606.06565">scalable oversight</a> and algorithms with <a href="https://humancompatible.ai/news/2024/01/18/the-prosocial-ranking-challenge-60000-in-prizes-for-better-social-media-algorithms/">pro-social</a> objectives. Previously, I interned at <a href="https://www.microsoft.com/en-us/research/lab/microsoft-research-india/">Microsoft Research India</a> and at the <a href="https://umich.edu/">University of Michigan</a> under <a href="https://joyojeet.people.si.umich.edu/">Joyojeet Pal</a>. I graduated magna cum laude from <a href="https://www.ashoka.edu.in/">Ashoka University</a> with a Gold Medal in Computer Science. Beyond academics, I'm a competent artist, photographer, archer and an incompetent pianist.<br/><br/>

If you're interested in my research (and even if you aren't) let's chat 💬, get <a href="https://www.corner.inc/list/f8e4fe28-926d-4c2d-8205-aba38ec232c0">coffee</a>  ☕ and/or <a href="https://www.corner.inc/list/e95b5dee-3a77-4c01-b562-9b9d0417e5c8">hike</a> up a mountain ⛰️! 


## Recent Research <a href="/research" class="link-button">View all</a>

{% for pub in site.data.publications limit:2 %}
<div class="publication">
    <div class="pub-thumbnail">
        <a href="/papers/{{ pub.title | slugify }}">
            <img src="{{ pub.thumbnail }}" alt="Thumbnail for {{ pub.title }}">
        </a>
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

## Recent News <a href="/news" class="link-button">View all</a>

<div class="news-list">
    {% for item in site.data.news limit:3 %}
        <div class="news-item">
            <div class="news-date">{{ item.date | date: "%Y-%m-%d" }}</div>
            <div class="news-content">{{ item.content | markdownify }}</div>
        </div>
    {% endfor %}
</div>

## Teaching & Service <a href="/teaching" class="link-button">View all</a>

I serve as a reviewer and/or PC member for CHI, CSCW, WWW, ICWSM, CACM and IC2S2. I co-organise the <a href="https://joyojeet.people.si.umich.edu/influencers.htm">Social Media and Society in India conference</a> annually, where I also chair the student session. I'm a teaching assistant for <a href="https://www.washington.edu/students/crscat/imt.html#imt573">IMT 573: Data Science I</a> taught by <a href="https://faculty.washington.edu/msaveski">Martin Saveski</a> (usually, every Autumn quarter). <a href="https://ameliadogan.github.io/">Amelia</a> and I are the Social Co-Chairs for the Doctoral Students' Association at the iSchool.<br/><br/>

Website design was inspired by <a href="https://faculty.washington.edu/msaveski">Martin Saveski</a>, <a href="https://debarghyadas.com/">Deedy Das</a> and <a href="https://vis.csail.mit.edu/">The MIT Visualization Group</a>. Feel free to fork it!


