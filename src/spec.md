# Specification

## Summary
**Goal:** Use the user-uploaded logo (`image-4.png`) as the app header logo on the left at a medium size.

**Planned changes:**
- Add `image-4.png` to `frontend/public/assets/generated/image-4.png` so it is available at `/assets/generated/image-4.png`.
- Update `frontend/src/components/layout/AppHeader.tsx` to use `/assets/generated/image-4.png` as the left-side header logo, keeping it clickable and reducing its height to a medium size while preserving aspect ratio (`w-auto` + `object-contain`).

**User-visible outcome:** The header shows the new logo on the left at a medium size across mobile and desktop, and clicking it behaves the same as before.
