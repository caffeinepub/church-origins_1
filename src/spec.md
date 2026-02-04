# Specification

## Summary
**Goal:** Smoothly auto-scroll to the top when entering specific evangelism pages so users always start at the top of the content.

**Planned changes:**
- Add route-entry scroll-to-top behavior (smooth scroll to `top=0`) for `/why-jesus`, `/how-to-begin`, `/assurance-next-steps`, and `/connect`.
- Ensure the smooth scroll triggers regardless of navigation source (header navigation, in-page links, CTA buttons, internal `<Link>` navigation cards).
- Limit the behavior strictly to the specified evangelism routes without affecting other routes.

**User-visible outcome:** When navigating to Why Jesus?, How to Begin, Assurance & Next Steps, or Connect, the page smoothly scrolls to the top on entry, no matter which internal link was used.
