// The Learn path's theme (owner direction 2026-10-15).
//
// Each course's path gets its own scene: Acting is a rehearsal room opening
// out into a theatre, Shakespeare a printing house opening into the Globe.
// The art is OWNER-SUPPLIED, like every other drawing in this app, so this
// file is the slot it lands in rather than the art itself.
//
// `art: null` IS A REAL STATE, NOT A PLACEHOLDER. With no file the path
// renders on the course tint alone and looks deliberate, which is the same
// rule the figure registries follow: an empty slot renders nothing, never a
// broken image and never a promise that something is coming. Nothing in the
// UI says "artwork coming soon", because the launch lint bans that across
// the whole view layer and it would be a promise this file cannot keep.
//
// THERE IS NO TINT (owner decision 2026-10-15). A warm wash stood in for the
// scene for about an hour and was removed: behind no picture it reads as an
// image that failed to load rather than as a design, and it is better for the
// path to sit cleanly on the app's own background than to look half-dressed.
// A colour is not a theme. The scene is the theme.
//
// LEGIBILITY IS NOT OPTIONAL. Pills and signs sit over the scene, so the
// renderer lays a wash between them and the art. Photographic backgrounds
// are where text contrast goes to die, and this app darkened its own muted
// grey for WCAG AA in September rather than let that slide.
//
// FILE RULES, learned the hard way elsewhere in this repo:
//   * JPEG or PNG. tools/build_artifact.py ships img as .jpg/.png/.svg/.json
//     and WEBP IS NOT IN THAT LIST, so a .webp lands in git and never
//     reaches the live site.
//   * Tall, not wide. The path scrolls, so the scene wants roughly 1200
//     across by 3600 down for a 33-lesson course, read top to bottom.
//   * The middle third stays calm. The nodes run down the centre, so detail
//     and high contrast belong at the edges where the labels are not.
export const ACTING_PATH_THEME = {
  // The scene, and the only thing in here. Set it to the shipped path once
  // the file exists, for example 'img/ui/path-acting.jpg', and the renderer
  // takes care of the wash, the pill contrast and the line.
  art: null,
};
