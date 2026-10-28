# Operations and scanning dashboards

For receiving, picking, cycle counts and any barcode or QR workflow on desks, tablets or handhelds. Live: showcase → Dashboards → Scanning dashboard. Code: `packages/ui/src/components/ (see scanner-panel, scan-feed, device-row)`, `pages/Dashboards.tsx`.

## 1. Layout (desktop and tablet)
Header (task name, shipment id, live-feed switch, Sync, one primary "Close shipment", status pill and device count) → row 1: `ScannerPanel` (≤ 416px) + (3 stat tiles, zone progress) → row 2: live scans (2/3) + devices and accuracy (1/3).
Phone: scanner first and full width; counters as a sticky strip; feed below; zone progress in a sheet.

## 2. Scanner panel
| Part | Spec |
|---|---|
| Viewfinder | 4:3, Rich Black, four corner brackets 36px, 3px, ring color by state |
| Scan line | 2px Azure 400, travels 14%–86% in 2s ease-in-out (recipe M-12), static center with reduced motion |
| States | idle · scanning · success (green brackets, matched chip) · error (red brackets, exception chip) · paused |
| Controls | code type segmented (Barcode, QR), Pause / Start, Simulate in demos only |
| Status line | polite live region ("Matched. Ready for the next item.") |
| Feedback | success and error also use haptics and a short tone on devices when allowed; never sound by default in shared spaces |
Camera permission denied: say how to enable it and offer manual entry of the code.

## 3. Feed, zones and devices
- **Scan feed**: newest first, max 8 visible; each row has item, code (mono), zone, time, and a pill **Matched / Exception**; new rows use the Flash recipe (M-08) for 1.2s; exceptions also raise a toast with Review.
- **Zone progress**: label, "412 / 480", `ProgressBar` primary; success tone and the word "Complete" at 100%.
- **Match rate**: ring + number + target; warning below target.
- **Devices**: name, user, online state, battery; below 20% battery turns danger-fg with the number visible.
- **Accuracy**: `ProgressBullet` with target tick and quality bands.

## 4. Rules
1. Default to the **Ink** dark mode and Navy or Ink navigation for shifts and handhelds; keep the choice user-controlled.
2. Targets ≥ 44px on touch; primary actions reachable by thumb (bottom third on phones).
3. Every scan result is confirmed in text and shape, not color alone.
4. Offline: queue scans locally with a banner "12 scans waiting to sync"; sync is idempotent (scan id).
5. Exceptions never block scanning; they enter a queue with Review.
6. Closing a shipment with exceptions requires confirmation naming the count.
7. Live feed can be paused; paused state is obvious ("Paused" chip).
