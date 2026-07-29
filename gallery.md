---
layout: default
title: Gallery
---

## Gallery

On rare occassions, I find  myself motivated enough to carry my camera out with me. And on even rarer occassions, I make an effort to update my website with some of those pictures! Most shot on a Sony A6400, with a 17-70mm F/2.8 or a 1979 Nikon FE with a 50mm F/1.8.

<div class="breakout">
    <div class="gallery-teaser-grid">
        {% for gallery_album in site.data.gallery %}
        <a class="gallery-card" href="/gallery/{{ gallery_album.slug }}">
            <div class="gallery-card-mosaic">
                {% for image in gallery_album.images limit:3 %}
                <div class="mosaic-tile" style="background-image: url('/assets/images/gallery/thumbs/{{ image.file }}');"></div>
                {% endfor %}
            </div>
            <div class="gallery-card-info">
                <h3>{{ gallery_album.title }}</h3>
                <span class="gallery-card-count">{{ gallery_album.images | size }} photos</span>
            </div>
        </a>
        {% endfor %}
    </div>
</div>
