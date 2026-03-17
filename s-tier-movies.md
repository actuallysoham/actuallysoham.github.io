---
layout: default
title: Soham's S-Tier Movies
---

## Soham's S-Tier Movies

I watch more movies than I care to admit and <a href="https://kabirahuja2431.github.io/misc/">Kabir</a> is making me watch all of <a href="https://boxd.it/8HjM "> Letterboxd's top 500 movies</a> this year. This is an unranked list of some of my all‑time favourite films. If you have a strong recommendation (or a strong disagreement), feel free to <a href="mailto:sohamde@uw.edu">email me</a>.

<div class="movie-list">
    {% for movie in site.data.movies %}
        <div class="movie-card">
            <div class="movie-title">{{ movie.title }}</div>
            <div class="movie-director">{{ movie.director }}</div>
            <div class="movie-year">{{ movie.year }}</div>
        </div>
    {% endfor %}
</div>

