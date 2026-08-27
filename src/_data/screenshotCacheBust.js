// Bump this to regenerate every baked Open Graph card.
//
// Card screenshots are fetched at build time and cached for 14 days, so a card
// captured while https://build.awesome.me/opengraph/ was still out of date (a
// page it didn't know about yet renders as the default homepage card) would
// otherwise stay wrong until the cache expired. Changing this value changes the
// screenshot URL, which forces a fresh capture.
//
// Individual pages can still override it in front matter.
export default "2026-08-27";
