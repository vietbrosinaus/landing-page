# Landing page design refinements

Reviewed on 1 September 2026 at desktop and mobile sizes in both light and dark themes.

## Current assessment

The landing page is clean, distinctive, and cohesive. Its strongest qualities are the restrained monochrome palette, consistent typography and borders, memorable 3D hero, clear project cards, and solid responsive behaviour. The next pass should refine conversion clarity, mobile pacing, accessibility, and performance rather than change the visual direction.

## Priority refinements

### 1. Clarify the primary journey

- Decide whether the primary goal is showcasing products, recruiting builders, or both.
- If recruiting builders is important, add a secondary `Build with us` action in the hero.
- Keep the opening copy focused on what the collective builds and who it helps.

### 2. Make contact actionable and accessible

- Add an email field so the team can reply, or clearly state that messages are anonymous.
- Give the message field a visible label rather than relying only on placeholder text.
- Give the icon-only submit button an accessible name.
- Announce success and error feedback with an `aria-live` status region.
- Consider adding an expected response time to reduce uncertainty.

### 3. Improve mobile navigation and pacing

- Keep the `Build` destination reachable from the mobile navigation; it is a core section but is currently hidden below the `sm` breakpoint.
- Reduce the mobile height and padding of the four support cards.
- Tighten the spacing around the support grid, growth statement, and FAQ.
- Shorten the `Free to start. Built to grow.` copy by roughly 20–30% for faster scanning.

### 4. Standardise project presentation

- Capture project screenshots at a consistent viewport, zoom, crop, and visual density.
- Use a shared screenshot frame so light and dark products feel equally intentional.
- Preserve the grayscale-to-colour interaction, which successfully unifies the grid.

### 5. Complete accessibility and motion support

- Disable fade, shimmer, scroll-indicator, and smooth-scroll animations when `prefers-reduced-motion` is enabled; currently only the 3D object is hidden.
- Increase the contrast of small `text-muted/60` labels and very faint placeholder text, especially in light mode.
- Check mobile navigation links and icon buttons against a 44px touch-target goal.
- Expose the current theme state through a more descriptive label or `aria-pressed`.

### 6. Performance and implementation polish

- Pause the Three.js render loop when the hero is outside the viewport or the page is hidden.
- Resolve the current `react-hooks/set-state-in-effect` lint failure in `theme-toggle.tsx`.
- Recheck Largest Contentful Paint image loading after the layout is final.
- Update the metadata description so its tone matches the calm, polished on-page copy.

## Suggested implementation order

1. Contact replyability and form accessibility.
2. Hero journey and mobile `Build` navigation.
3. Mobile spacing and copy reduction.
4. Reduced-motion, contrast, and touch-target fixes.
5. Project screenshot standardisation and WebGL performance.

## Preserve

- Monochrome editorial visual system.
- Geist and Geist Mono pairing.
- Generous desktop whitespace.
- Simple bordered controls and cards.
- 3D hero as the primary brand moment.
- Minimal navigation and restrained animation style.
