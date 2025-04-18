# Component & Migration Checklist

This checklist now covers both component refactoring and broader migration steps for Next.js.

## Component Refactoring
- [x] ArticleCard.tsx
- [x] DashboardPostList.tsx 
- [x] FeedbackModal.tsx
- [x] FeedbackThankYou.tsx
- [x] ImageResult.tsx
- [x] NewsletterSubscribe.tsx
- [x] PostDate.tsx
- [x] PostTag.tsx
- [x] ProtectedRoute.tsx
- [x] ReadingTime.tsx
- [x] SEO.tsx
- [x] SearchBar.tsx
- [x] SettingsSidebar.tsx
- [x] SiteFooter.tsx
- [x] SiteLayout.tsx
- [x] SiteNavigation.tsx
- [x] ThemePreview.tsx
- [x] TipTapEditor.tsx

### Subfolders
#### advanced-theme
- [x] ElementPreview.tsx
- [x] ThemeColorPicker.tsx

#### post-form
- [x] PostContentFields.tsx
- [x] PostFormActions.tsx
- [x] PostFormHeader.tsx
- [x] PostFormSkeleton.tsx
- [x] PostMetaFields.tsx
- [x] PostNotFound.tsx
- [x] PostStatusField.tsx

#### ui (partial, continue...)
- [x] accordion.tsx
- [x] alert-dialog.tsx
- [x] alert.tsx
- [x] aspect-ratio.tsx
- [x] avatar.tsx
- [x] badge.tsx
- [x] breadcrumb.tsx
- [x] button.tsx
- [x] calendar.tsx
- [x] card.tsx
- [x] carousel.tsx
- [x] chart.tsx
- [x] checkbox.tsx
- [x] collapsible.tsx
- [x] command.tsx
- [x] context-menu.tsx
- [x] dialog.tsx
- [x] drawer.tsx
- [x] dropdown-menu.tsx
- [x] form.tsx
- [x] hover-card.tsx
- [x] input-otp.tsx
- [x] input.tsx

## Migration Steps (Non-Component)
- [ ] Map all files in `src/pages/` to Next.js `/pages` or `/app` structure
- [ ] Replace all `react-router-dom` usage with Next.js routing
- [ ] Migrate all custom hooks from `src/hooks/` and update for SSR/SSG
- [ ] Copy and adapt utilities, data, and types
- [ ] Move integrations (e.g., Supabase) and check environment compatibility
- [ ] Move global styles and import in `_app.tsx` or `/app/layout.tsx`
- [ ] Remove Vite/React-specific entry points
- [ ] Implement Next.js middleware for access control
- [ ] Move server logic to Next.js API routes
- [ ] Test all features and endpoints
- [ ] Update documentation and remove placeholders

---

- Only check off items once the component has been copied to `/refactoring` and refactored for Next.js, or the migration step is complete.
- Never edit the original files.
- Update this checklist as you proceed.
