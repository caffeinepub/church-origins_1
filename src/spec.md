# Specification

## Summary
**Goal:** Set the landing page hero image to the newly uploaded image while keeping the existing public asset URL unchanged.

**Planned changes:**
- Ensure `/assets/generated/home-hero.dim_1600x600.jpg` exists in the frontend build output and loads successfully in the deployed app.
- Replace the contents of `frontend/public/assets/generated/home-hero.dim_1600x600.jpg` with a 1600×600 JPG version derived from `image-8.png`, without changing the `src` URL referenced by `frontend/src/components/AuthGate.tsx`.
- Preserve the current hero-image load-error fallback behavior in `AuthGate.tsx` to keep layout stability if the image fails to load.

**User-visible outcome:** The landing page displays the new hero image reliably, and if the image fails to load, the existing placeholder/fallback still keeps the layout stable.
