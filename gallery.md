---
layout: default
title: Gallery
---

## Gallery

<div class="gallery-albums">
    <div class="album">
        <h3>Cherry Blossoms</h3>
        <div class="album-scroll">
            <div class="album-item"
                style="background-image: url('/assets/images/gallery/cherry_blossoms/01.jpg');"
                data-img="/assets/images/gallery/cherry_blossoms/01.jpg"
                onclick="openLightbox(this)">
            </div>
            <div class="album-item"
                style="background-image: url('/assets/images/gallery/cherry_blossoms/02.jpg');"
                data-img="/assets/images/gallery/cherry_blossoms/02.jpg"
                onclick="openLightbox(this)">
            </div>
            <div class="album-item"
                style="background-image: url('/assets/images/gallery/cherry_blossoms/03.jpg');"
                data-img="/assets/images/gallery/cherry_blossoms/03.jpg"
                onclick="openLightbox(this)">
            </div>
            <div class="album-item"
                style="background-image: url('/assets/images/gallery/cherry_blossoms/04.jpg');"
                data-img="/assets/images/gallery/cherry_blossoms/04.jpg"
                onclick="openLightbox(this)">
            </div>
        </div>
        <h3>Seattle</h3>
        <div class="album-scroll">
            <div class="album-item"
                style="background-image: url('/assets/images/gallery/seattle/01.jpg');"
                data-img="/assets/images/gallery/seattle/01.jpg"
                onclick="openLightbox(this)">
            </div>
            <div class="album-item"
                style="background-image: url('/assets/images/gallery/seattle/02.jpg');"
                data-img="/assets/images/gallery/seattle/02.jpg"
                onclick="openLightbox(this)">
            </div>
        </div>
    </div>

</div>

<!-- Lightbox -->
<div class="lightbox" onclick="closeLightbox()">
    <img src="" alt="Expanded image">
</div>

<script>
function openLightbox(element) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const imgUrl = element.getAttribute('data-img');
    lightboxImg.src = imgUrl;
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    lightbox.classList.remove('active');
    lightboxImg.src = '';
}
</script>

<style>
.album-item {
    flex: 0 0 200px;
    height: 150px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.album-item img {
    display: none;
}
</style> 