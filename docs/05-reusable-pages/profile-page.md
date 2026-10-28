# Profile page

**Purpose:** let a person control how they appear and how the product behaves for them. **Reuse when:** every product with accounts. Lives in the settings shell (`/settings/profile`). Live: showcase → Account → Profile.

## Wireframe
```
Profile                                         (page title 24px; description one line)
Settings nav 216px │ ┌ Card (one card, rows separated by 1px lines) ───────────────────────┐
 ACCOUNT           │ │ Photo        (MM 64px)  [Upload] [Remove]    PNG or JPG, ≥ 256 px    │
  ▌Profile         │ ├───────────────────────────────────────────────────────────────────┤
  Security         │ │ Name         [Full name        ] [Job title (optional)]              │
  Notifications    │ ├───────────────────────────────────────────────────────────────────┤
  Appearance       │ │ Email        [mia@…  read-only, managed by SSO]                     │
 WORKSPACE …       │ ├───────────────────────────────────────────────────────────────────┤
                   │ │ Language and region  [English (US) ▾] [(UTC+01:00) Berlin ▾]       │
                   │ │                                         [Cancel] [Save changes]     │
```
Two-column rows: label and one-line description left (240px), controls right. 20px vertical padding per row.

## Required regions
Photo (initials fallback, never a silhouette) · name and title · email (read-only when SSO) · language and time zone · explicit Save footer (Save stays enabled; Cancel resets).

## Components
`SettingsRow`, `Avatar` 64, `Field`, `Input`, `Select`, `Button`, `Toast` on save.

## States
loading (row skeletons) · pristine · dirty ("Unsaved changes" guard on navigation) · field error · saving (button loading) · saved (toast "Profile updated") · SSO-managed field (read-only, reason in helper) · upload error (message under the photo).

## Responsive
< 1024: settings nav becomes a horizontal scroller above the card; rows stack label over control; 44px controls.

## Copy rules
Row titles are nouns. Helper states the effect ("Shown next to your comments"). Save button "Save changes". Never "Update profile".

## Implementation
shadcn `Card`, React Hook Form + Zod, react-day-picker not needed. Avatar upload through a crop dialog (1:1) then presigned URL.
