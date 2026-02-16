# Specification

## Summary
**Goal:** Remove the hero image block from the AuthGate (landing) page so no hero image or fallback placeholder appears above the main headline.

**Planned changes:**
- Remove the hero image rendering block (and any fallback “Hero image” placeholder UI) from `frontend/src/components/AuthGate.tsx`.
- Clean up `AuthGate.tsx` by deleting unused imports/state related to hero-image error handling (e.g., `useState`, `imageError/setImageError`) after the hero image is removed.

**User-visible outcome:** The landing page shows no image above the main headline, with a balanced layout and no leftover hero-image placeholder space.
