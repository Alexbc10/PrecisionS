# PrecisionScheduler — iPad Pilot Build

**Open `index.html` — double-click it. No install, no server.**

Single self-contained file. Works offline; it only reaches the network to pull Barlow from
Google Fonts, and falls back to system fonts cleanly if there's no connection.
Built on the Precision Dry design system — same Barlow / Barlow Condensed, navy header,
DKI mark, light+dark themes.

**Your work now persists.** Everything is saved on the device automatically — reload,
close the tab, restart Safari, and the day is still there. The header reads **Saved**
when it's on disk. See *Data & backups* below; the export file is the real safety net.

**It runs off the real clock.** It opens on today, the Weekly Board shows the current month, and a live orange line marks the current time on today's column (updates every 30 seconds). The sample jobs are anchored around today, so there's always work on and near the current date.

---

## What to try in front of the emergency manager

**The board — this is the pitch.**
- **Drag a block to another crew or another time.** This is the whiteout-and-arrows moment, solved. A red line follows the drag showing exactly where it lands and at what time.
- **Drag either edge of a block** to resize. The top edge changes the start without moving the finish; the bottom changes the finish. Snaps to 15 minutes, and the time updates as you drag.
- **Hover a squeezed block** — zoomed out, a short block can clip its note. Hovering grows it to show the whole thing, and it snaps back when you leave.
- **Drag a job from Drops** (bottom left) onto a crew column. It arrives prefilled from the Bible — address, job number, work order, note — all editable. On touch, **tap the drop first** to pick it up. When the list is long, **press and hold a drop** and pick a crew straight from the menu instead of dragging.
- **Drag a block back onto Drops** to un-place it.
- **Right-click or double-click a block** to edit the note and override its colour.
- **Six columns by default**, three of them empty. **Drag a name from Crew Available onto a column header** to build a crew; **press and hold** a name in a header to take them out (a plain tap does nothing — too easy to hit by accident).
- **Zoom** — 07:00–17:00 fits on screen by default. Use +/− or FIT, or just **press spacebar** to snap back to fit.
- **Scroll earlier or later.** The grid runs 05:00–20:00; drop a block outside the normal day and FIT widens to include it.
- **Crew headers stay pinned** to the top as you scroll, so you can still see which column is which while dragging from a long drops list.
- The block editor sets a **bill-to work order** — the hours go on another job. Blank means bill as normal. (Renamed from "non-billable": the work usually *is* billable, it just belongs somewhere else.)
- **Click a name in Crew Available** to mark them off; they grey out with a line through.

**Date navigation.** Arrows top right move between Jan 14, 15, 16. Move *forward* and any
drops you didn't place come with you, tagged **CARRIED OVER** — the thing that currently
means rewriting them by hand on tomorrow's page.

**The Bible tab** (first tab, opens by default).
- **Click the `+` beside the title to create a job.** Job number is pre-filled with the next in sequence. It won't accept a duplicate job number, but repeated addresses are fine — that's the strata case.
- Rows are **tinted by status** with a colour bar on the leading edge: green active, blue waiting, red paused, grey completed. Completed jobs stay visible.
- **WO signed** column — click the circle to toggle the checkmark.
- **Right-click any job** → add to today's drops, set status, or **attach a link**. Once a link is attached the job number becomes clickable and opens in a new tab — the stand-in for a real PSA jump.
- Look at the three **2200 seaview dr** rows — one strata, three units, three job numbers, one address. That's why address can't be the identifier.

**Weekly Board tab.** A full month stacked vertically — about six days on screen, the rest a scroll away. Drag blocks between any two days, click a day header to open it on the Daily Board, hover a block to read its note. **Press spacebar to snap back to the selected date.** Drops dock along the bottom and span the whole month.

**Dark mode** — toggle top right.

---

## Deliberately shown

- Times are **promises to the homeowner**, not a capacity model. Nothing optimizes or argues with a time you committed to on the phone.
- **Overlaps are allowed.** Two blocks on one crew sit side by side rather than being blocked or hidden.
- Notes are **unstructured on purpose** — see the lockbox codes and phone numbers typed straight into the block, exactly as they appear on the paper page.
- Crew columns carry **no team names or numbers**. The header is just who's in it.

## Deliberately not built

Equipment tracking, texting techs, PSA integration, the month index, person search,
printing, and anything PSA already does well (files, photos, accounting, clock in/out).

---

## Sample data

Modelled on the real JAN 15 2026 page: crews `alex/jo`, `ash/coe`, `devin`; jobs at
123 love dr, 444 hive dr, 4444 dover, 6678 ranger, 33322 sani rd; plus a 2200 seaview dr
strata to show the address problem, and a non-billable block billed to another work order.

---

## Data & backups

Everything lives **on the device** in browser storage — no server, no account, no network.

- **Saves happen automatically** after every change. The header shows **Saved**; if it
  ever turns red and reads *Not saved*, export a backup immediately.
- **Data ▸ Export backup file** writes a `.json` you can keep, mail to yourself, or drop
  in Files. **This is the real backup.**
- **Data ▸ Import backup file** restores one (replaces everything currently on the device).
- **Data ▸ Start empty** clears the sample jobs so you can build a real Bible by hand.
- **Data ▸ Reload sample data** puts the demo back.

**Why the export matters:** iOS can clear script-writable storage after roughly 7 idle
days, and "Clear History and Website Data" wipes it outright. Export at the end of any day
you'd hate to rebuild.

## Building the Bible by hand

- **`+`** beside the Bible title creates a job. Job number and address are the only
  required fields.
- **Right-click / long-press a job** for edit, drops, link, status and **Delete job** —
  deletion is refused while the job is still scheduled on a board.
- **Contacts** are typed one per line as `role, name, phone`.

## Crew & phone numbers

**Crew available ▸ ✎ Manage** is where technicians live: name, phone, lead/tech, and who
can drive. **Crew texts go to the numbers entered here** — fill these in before relying on
messaging. Renaming someone updates any crew they're already on.

## Putting it on an iPad

Live at **https://alexbc10.github.io/PrecisionS/**

On the iPad, open that URL in **Safari** (not Chrome — only Safari can install to the home
screen), then **Share ▸ Add to Home Screen**. It launches fullscreen with its own icon, and
the service worker keeps it working with no signal.

A home-screen icon is a bookmark to a URL, not a local file — which is why it has to be
hosted. Serving over https is also what lets the offline worker register.

## Deploying a change

This folder **is** the repo (`Alexbc10/PrecisionS`) and GitHub Pages serves it from
the root, so what's here is exactly what's live.

```
git add -A && git commit -m "…" && git push
```

Pages redeploys in under a minute. **If you changed `index.html`, bump `CACHE` in `sw.js`
first** (`precisionscheduler-v1` → `-v2`) or installed iPads keep serving the old version.

## iPad layout

Built to show **ten crew columns and the whole 7:30–4 day at once, with no scrolling**, on
the smallest current iPad. Verified at every common size (landscape CSS pixels):

| iPad | Viewport | Columns | Whole day visible |
|---|---|---|---|
| mini | 1133 × 744 | 10 | yes |
| 10.2" | 1080 × 810 | 10 | yes |
| 10.9" / Air 11" | 1180 × 820 | 10 | yes |
| Pro 11" | 1194 × 834 | 10 | yes |
| Pro 12.9" / 13" | 1366 × 1024 | 10 | yes |

Ten crews is the ceiling set by trucks, so the board lays out for ten and columns land at
roughly 99–128px depending on the iPad.

**Addresses stay readable**, which is what the board is really for. A block shows the
street on one line and the **city on the line below it** — the street identifies the job,
the city answers "who's near the new Coquitlam call?" without reading anything else.
Unstaffed columns collapse to slim markers so working crews get the width, and a long
street wraps to a second line instead of being cut off. Six staffed crews on a 10.2" iPad
gives ~141px columns and nothing truncates.

The **▾ button on the Drops title collapses the drops row**, handing that space back to the
grid — worth about 25% more block height when you're concentrating on the schedule.

The layout compacts automatically on any short screen (touch device, or a browser window
under 1100px tall): smaller header and tabs, no board section-title, tighter block type,
and drops flowing across the width instead of stacking down it. Zoom is fitted by measuring
the real page rather than assuming a fixed chrome height, so it adapts to any device and
re-fits when the iPad is rotated.

## Touch vs mouse

On an iPad the board works by direct manipulation:

- **Finger on a block → moves that block**, immediately. You grabbed the job, so you move the job.
- **Finger on a drop → drags it onto the schedule**, same as on a mouse.
- **Finger on empty grid → scrolls** the board.
- **Two fingers anywhere → scrolls**, including over blocks and over a long drops list.
- **Press and hold → the menu**, for blocks, drops, crew headers, names and Bible rows alike.
- **Quick tap a block → expands it** so a clipped note can be read. Tap again to collapse.

A long drops list can also be emptied without dragging at all: **hold a drop** and pick a
crew straight from its menu, which works even when the board is scrolled out of view.

The Bible scrolls normally with one finger. Mouse behaviour is unchanged throughout: drag
straight away, right-click for menus.

*Note: `touch-action` values are static and must stay that way. iOS Safari decides
scroll-vs-drag before any script runs, so toggling it at runtime does not reliably work —
an earlier "tap to arm, then drag" model failed on device for exactly that reason.*

## Editing

`index.html` holds the entire app — markup, styles, logic, logo.
Edit it directly and refresh. No template, no build step, no second copy.
