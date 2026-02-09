# Specification

## Summary
**Goal:** Replace existing hero images with edited versions of the uploaded photos and add an additional hero image to a non-landing page.

**Planned changes:**
- Update the AuthGate (landing) hero to use an edited/cropped version of an uploaded photo while preserving the existing public asset path `/assets/generated/home-hero.dim_1600x600.jpg`.
- Update the default EvangelismPageShell hero to use an edited/cropped version of an uploaded photo while preserving the existing public asset path `/assets/generated/evangelism-hero.dim_1600x600.png`.
- Add a new generated hero asset under `/assets/generated/` from the third uploaded photo and wire it into at least one non-landing page via `EvangelismPageShell`’s `heroOverride` (with `showHero` enabled).

**User-visible outcome:** The landing page and evangelism pages display new hero photos without broken images, and at least one additional non-landing page shows a different hero image from the third uploaded photo.
