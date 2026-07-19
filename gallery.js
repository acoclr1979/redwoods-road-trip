// Renders the photo grid into #galleryGrid on gallery.html.
// Requires photos.js to be loaded first.
(function () {
    function esc(str) {
        return String(str)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function renderGrid(container, photos) {
        if (!container) return;
        if (!photos.length) {
            container.innerHTML = '<p class="gallery-empty">Nothing here yet — check back as the trip goes on.</p>';
            return;
        }
        container.innerHTML = photos.map(name => {
            const override = RRT_GALLERY_OVERRIDES[name];
            const featuredClass = override && override.featured ? ' featured' : '';
            const caption = override && override.caption
                ? `<span class="gallery-caption">${esc(override.caption)}</span>`
                : '';
            const path = `./photos/${name}`;
            return `<a class="gallery-item${featuredClass}" href="${path}" target="_blank" rel="noopener noreferrer">
                <img src="${path}" alt="Trip photo" loading="lazy">
                ${caption}
            </a>`;
        }).join('');
    }

    async function initGallery() {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return; // not on gallery.html

        renderGrid(grid, rrtGetPhotosSync());

        const fresh = await rrtLoadPhotos();
        renderGrid(grid, fresh);
    }

    initGallery();
})();
