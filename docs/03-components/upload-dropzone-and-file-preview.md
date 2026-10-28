# Upload, dropzone, and file preview

## 1. Purpose
Let users add files by drag-and-drop or picker, see per-file progress, and recover from failures.

## 2. When to use / when not to
Use for any file attachment, import, or avatar/logo upload. Not: pasting text; large media pipelines needing background processing UI (use a dedicated import flow, `05-reusable-pages/create-edit-flow.md`).

## 3. Anatomy
```
┌ - - - - - - - - - - - - - - - - - - - - - - - ┐
  ⬆  Drag files here or [Choose files]            1 dropzone (1px dashed border-control, radius 12, min-height 120)
  PDF, PNG, JPG · up to 10 MB each · max 5 files  2 constraints text (always visible, 13px secondary)
└ - - - - - - - - - - - - - - - - - - - - - - - ┘
 ┌─────────────────────────────────────────────┐
 │ [thumb 40] contract.pdf  2.1 MB    ▓▓▓░ 62%  ✕ │  3 file row: thumbnail/icon · name · size · progress · cancel/remove
 │ [thumb 40] photo.png     8.4 MB   ✓ Uploaded 🗑 │
 │ [icon]     big.mov       48 MB  ⚠ Over 10 MB. Choose a smaller file   [Remove] │  4 per-file error
 └─────────────────────────────────────────────┘
```
Hidden `<input type="file">` is real and sits behind the dropzone; the visible "Choose files" button triggers it and the zone itself is a `label`.

## 4. Variants
| Variant | Use |
|---|---|
| Dropzone + list | multi-file attachments |
| Single-file field | one document; replaces the dropzone with the file row after upload |
| Avatar/logo uploader | 64–96px preview with "Change"/"Remove", crop dialog, 1:1 |
| Inline button only | comments/attachments; no dropzone chrome |
| Paste-image | optional on rich text; same row UI |

## 5. Sizes
Dropzone min-height 120px (page-level 160px), padding 24px, radius 12. File row 56px (thumb 40×40, radius 4 for images, icon 20 for others), gap 12. Progress bar 4px under the name inside the row. Max rows visible 8 then scroll.

## 6. States
| State | Spec |
|---|---|
| default | dashed `border-control`, bg transparent |
| hover | border `border-strong`, bg `action-ghost-hover` |
| focus-visible | ring on the label/button |
| drag-over | border solid `action-primary-rest` 1px + bg `selected-bg`, text "Drop to upload"; only when dragged items are files |
| drag-reject | border `status-danger-solid`, text "This file type isn't supported" |
| uploading (per file) | determinate bar, "62% · 1.3 of 2.1 MB", Cancel |
| processing | indeterminate bar after 100% while the server scans: "Scanning…" |
| success | check icon + "Uploaded", remove button |
| error (per file) | `circle-x` + message + **Retry** + Remove; other files continue |
| disabled | `aria-disabled`, reason text ("You've reached the 5-file limit") |
| read-only | list only, download links, no remove |
| loading (existing files) | skeleton rows |

## 7. Content rules
State constraints **before** upload: types, max size per file, max count. Error messages say which rule and how to fix: "big.mov is 48 MB. Maximum is 10 MB. Choose a smaller file." Never "Upload failed" alone; add cause when known ("Network lost. Retry"). Filenames truncate in the middle (`contra…act.pdf`) with full name in `title`. Sizes with unit and one decimal.

## 8. Keyboard & screen reader behavior
Dropzone is focusable (label for the input); Enter/Space opens the file picker. Drag-and-drop is an enhancement; picker is always available (SC 2.5.7). File rows are a `<ul>`; each remove/cancel/retry is a button with `aria-label="Remove contract.pdf"`. Progress uses `role="progressbar"` per file; completion/failure announced in a polite live region ("contract.pdf uploaded", "big.mov failed: over 10 MB"). Paste support documented.

## 9. Tokens used
`color-border-control` · `color-border-strong` · `color-selected-bg` · `color-action-primary-rest` · `color-status-{danger,success}-solid` · `radius-modal` · `radius-control` · `color-surface-sunken`.

## 10. Accessibility notes
Constraints text associated with the input (`aria-describedby`). Error state has icon + text, not red border alone. Thumbnails have `alt=""` since the filename is present. Drag target not the only way. Progress announcements throttled to 25% steps.

## 11. Do / Don't
- Do: "PDF, PNG · up to 10 MB · 5 files" visible before choosing. Don't: reveal limits only after failure.
- Do: per-file progress and per-file errors; successes stay. Don't: one global spinner that fails the whole batch.
- Do: Retry on a failed file. Don't: force re-selecting all files.
- Do: real `<input type=file>` available to keyboard users. Don't: drop-only.

## 12. Code example
```tsx
import { useDropzone } from "react-dropzone"; // MIT, react-dropzone.js.org
export function Dropzone({ onFiles, accept, maxSize = 10 * 1024 * 1024, maxFiles = 5, disabledReason }: Props) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, open } = useDropzone({ onDrop: onFiles, accept, maxSize, maxFiles, noClick: true, noKeyboard: true, disabled: !!disabledReason });
  return (
    <div {...getRootProps()} className={cn("flex min-h-30 flex-col items-center justify-center gap-2 rounded-modal border border-dashed border-control p-6 text-center transition-colors duration-fast",
      isDragActive && !isDragReject && "border-solid border-action-primary bg-selected",
      isDragReject && "border-solid border-status-danger-solid")}>
      <input {...getInputProps()} aria-describedby="upload-constraints" />
      <Upload className="size-5 text-tertiary" aria-hidden />
      <p className="text-body text-primary">{isDragReject ? "This file type isn’t supported" : isDragActive ? "Drop to upload" : <>Drag files here or <Button variant="secondary" size="sm" onClick={open} aria-disabled={!!disabledReason}>Choose files</Button></>}</p>
      <p id="upload-constraints" className="text-body-sm text-secondary">{disabledReason ?? "PDF, PNG, JPG · up to 10 MB each · max 5 files"}</p>
    </div>
  );
}
```
Uploads use presigned URLs with `XMLHttpRequest`/`fetch` upload progress, resumable for > 25 MB (tus.io), with idempotent retry.

## 13. Anti-patterns
Limits only revealed on error; drag-only; single global progress for many files; failing the whole batch for one file; client-only type check (verify server-side by magic bytes); preview that loads full-size originals as thumbnails; no cancel; upload spinner with no size/percent; thumbnail with emoji icons.

## 14. Responsive & density
320px: dropzone becomes a full-width "Choose files" button (+ camera option on mobile via `capture`), rows stack name/progress. 768+: as specified. Compact: rows 48px.
