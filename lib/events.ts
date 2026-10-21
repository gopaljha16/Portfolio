/** Fired to open the command menu from anywhere, without importing the menu itself. */
export const OPEN_COMMAND_MENU = "open-command-menu";

/** Fired when a lazily hydrated section wakes up and replaces its elements. */
export const SECTION_HYDRATED = "section-hydrated";

/**
 * Lays out every lazily rendered section at its real height. Sections off screen skip layout
 * (content-visibility), so their heights are estimates; call this before an in-page jump so the
 * smooth scroll aims at the right spot instead of drifting as sections render along the way.
 */
export function revealAllSections() {
  document.documentElement.classList.add("show-all");
}
