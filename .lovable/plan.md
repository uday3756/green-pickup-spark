
# Complete User Profile & Order History Implementation

## Overview
This plan implements all 5 suggested features: user avatar display, profile page, avatar storage, order history, and ensures the authentication flow is properly configured.

---

## 1. Create Avatar Storage Bucket

Create a SQL migration to set up the `avatars` storage bucket with proper RLS policies.

**Migration includes:**
- Create public `avatars` bucket
- RLS policy: Allow anyone to view avatars (public)
- RLS policy: Allow authenticated users to upload their own avatars
- RLS policy: Allow users to update/delete their own avatars

---

## 2. Update Header with User Avatar

Modify `Header.tsx` to:
- Fetch the user's profile data (including `avatar_url`) when logged in
- Display the avatar image if available, or show a default avatar with user initials
- Use the existing `Avatar` component from shadcn/ui
- Add click functionality to open a profile dropdown or modal

---

## 3. Create Profile Page Component

Create a new `ProfilePage.tsx` component with:
- Display current user info (name, email, avatar)
- Editable name field
- Avatar upload functionality with image preview
- Save changes button that updates the `profiles` table
- Upload avatar to storage bucket and save URL to profile
- Cancel/back button to return to home

---

## 4. Create useProfile Hook

Create `src/hooks/useProfile.ts` to manage profile data:
- Fetch profile by user ID
- Update profile (name, avatar_url)
- Upload avatar to storage bucket
- Delete old avatar when uploading new one

---

## 5. Show Order History

Create an `OrderHistory.tsx` component to display:
- List of user's past orders from `orders` table
- Order status, date, estimated amount
- Link orders to customers via email matching or add user_id to orders
- Empty state when no orders exist

---

## 6. Update App Routing

Modify `App.tsx` to add route for the profile page (`/profile`).

---

## 7. Configure Google OAuth

The Google sign-in button is already implemented. The managed Google OAuth is already available through Lovable Cloud. If custom credentials are needed, they can be configured in the Authentication Settings.

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `supabase/migrations/...avatars_bucket.sql` | Create - Storage bucket |
| `src/hooks/useProfile.ts` | Create - Profile management hook |
| `src/components/ProfilePage.tsx` | Create - Profile editing page |
| `src/components/OrderHistory.tsx` | Create - Order history component |
| `src/components/Header.tsx` | Modify - Add avatar display |
| `src/App.tsx` | Modify - Add profile route |
| `src/pages/Index.tsx` | Modify - Add profile screen navigation |

---

## Technical Details

### Storage Bucket Policy
```sql
-- Allow public read access to avatars
-- Allow authenticated users to upload to their own folder (user_id/*)
-- File path pattern: {user_id}/{filename}
```

### Profile Data Flow
1. User clicks avatar/profile in header
2. Navigate to profile page
3. User can edit name and upload new avatar
4. Avatar uploads to `avatars/{user_id}/{filename}`
5. Profile table updated with new avatar_url
6. Header reflects changes immediately

### Order History Query
```sql
SELECT * FROM orders 
WHERE customer_id IN (
  SELECT id FROM customers WHERE email = {user_email}
)
ORDER BY created_at DESC
```
