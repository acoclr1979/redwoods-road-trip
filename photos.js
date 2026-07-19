// Shared photo list for the mosaic background and gallery grid.
// Drop a new image into the /photos folder (e.g. via GitHub's web/mobile upload)
// and it shows up here automatically on next load — no code changes needed.
//
// This list is also the offline/rate-limit fallback if the GitHub API call below fails.
const RRT_FALLBACK_PHOTOS = [];

// Decorative/non-candid assets that live in /photos for other uses but shouldn't
// be mixed into the "real trip photos" pool. Add filenames here as needed.
const RRT_EXCLUDE = new Set([]);

// Hand-tuned crop for specific photos (mosaic background only). Anything not
// listed here gets a plain center/cover crop.
const RRT_MOSAIC_OVERRIDES = {};

// Gallery-only overrides: featured layout + caption.
const RRT_GALLERY_OVERRIDES = {};

const RRT_GITHUB_REPO = 'acoclr1979/redwoods-road-trip';
const RRT_PHOTO_CACHE_KEY = 'rrt_photos_cache_v1';
const RRT_PHOTO_CACHE_TTL_MS = 60 * 1000;
const RRT_IMAGE_EXT_RE = /\.(jpe?g|png|heic|gif|webp)$/i;

// Synchronous best-guess list for an instant first paint — no network wait, no flash.
function rrtGetPhotosSync() {
    try {
        const cached = JSON.parse(sessionStorage.getItem(RRT_PHOTO_CACHE_KEY) || 'null');
        if (cached && Array.isArray(cached.files) && cached.files.length) return cached.files;
    } catch (err) { /* sessionStorage unavailable or corrupt — fall through */ }
    return RRT_FALLBACK_PHOTOS;
}

// Authoritative list from the repo's /photos folder. Falls back to the sync list on any error.
async function rrtLoadPhotos() {
    try {
        const cached = JSON.parse(sessionStorage.getItem(RRT_PHOTO_CACHE_KEY) || 'null');
        if (cached && Array.isArray(cached.files) && (Date.now() - cached.ts) < RRT_PHOTO_CACHE_TTL_MS) {
            return cached.files;
        }
    } catch (err) { /* ignore */ }

    try {
        const res = await fetch(`https://api.github.com/repos/${RRT_GITHUB_REPO}/contents/photos`);
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        const data = await res.json();
        const files = data
            .filter(entry => entry.type === 'file' && RRT_IMAGE_EXT_RE.test(entry.name) && !RRT_EXCLUDE.has(entry.name))
            .map(entry => entry.name)
            .sort();
        if (files.length) {
            try {
                sessionStorage.setItem(RRT_PHOTO_CACHE_KEY, JSON.stringify({ ts: Date.now(), files }));
            } catch (err) { /* storage full/unavailable — non-fatal */ }
            return files;
        }
    } catch (err) { /* network/API error — use fallback below */ }

    return rrtGetPhotosSync();
}
