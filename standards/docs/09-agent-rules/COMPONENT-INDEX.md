# Component index for AI coding agents

Do not write UI from scratch when a component exists. Lookup order:

1. `packages/ui/catalog/AI-INDEX.md`: "I need… → use…" table (188 intents, generated).
2. `packages/ui/catalog/COMPONENTS.md`: every component with file, exports, variants, props, tokens, accessibility notes and a usage snippet (generated).
3. `packages/ui/catalog/catalog.json` (also served at `/catalog.json`): the same data for tools.
4. The running showcase, **Kits → Component catalog**: search, preview, and copy **Import**, **Usage**, or **AI prompt** for any component.

All components import from one barrel: `import { Button, SideNav, ProductCard, StatTile } from "@bytesphere/ui"` (`packages/ui/src/index.ts`). Source of truth for the data is `packages/ui/catalog/catalog.data.ts`; after adding or changing a component, update its entry and run `npm run catalog`.

Every component has its own folder: `packages/ui/src/components/<kebab-name>/` (for example `button/`), holding `index.tsx` (the code) and `README.md` (what it is, props, snippet; generated). Open the folder, not a big file.

## Quick map
| Need | Component (file) |
|---|---|
| Company name or logo | `Logo` |
| App navigation | `SideNav`, `TopBar`, `BottomTabs` |
| Marketing or store header | `SiteHeader`, `EcomHeader`, `MegaMenu` |
| Large-site navigation | `GlobalBar` (Apple-style), `MarketplaceHeader` + `DepartmentDrawer` + `Typeahead` (Amazon-style), `PlatformBar` + `AppLauncher` + `AccountPanel` (Meta-style), `CategoryTree` |
| Switch views or filters | `Tabs`, `PillTabs`, `Segmented`, `VerticalTabs`, `SubNav` |
| Card of any kind | `SurfaceCard` + layouts (`MediaCard`, `BannerCard`, `ProfileCard`…) |
| Background pattern | `Backdrop` |
| Footer | `SiteFooter` |
| KPI | `StatTile` (8 styles) |
| Progress | `ProgressBar`, `ProgressRing`, `ProgressGoal`, `ProgressSteps`… |
| Loading | `SkeletonKit`, `SwirlLoader`, `SplitLoader`, `TraceLoader`, `FillLoader`, `RouteBar`, `BootLoader` |
| Empty or error | `StatePanel` + `Art.*` |
| Forms | `Field`, `Input`, `Select`, `Textarea`, `Checkbox`, `Switch`, `Radio`, `Combobox`, `TagInput`, `Slider`, `Dropzone` |
| Dialogs | `Modal`, `Drawer`, `Menu`, `Tooltip`, `useToast` |
| Store | `ProductCard`, `ProductArt`, `Price`, `Rating`, `QuantityStepper`, `CartLine`, `OrderSummary`, `OrderTimeline`, `FilterPanel` |
| Scanning | `ScannerPanel`, `ScanFeed`, `DeviceRow` |
| Theme picker | `useAppearance`, `AppearancePanel` |

## Prompt template (also on every catalog card)
```
Use the `<Component>` from "@bytesphere/ui" (defined in <file>).
What it does: …   Variants: …   Props: …
Example: <snippet>
Rules: tokens only; one primary button per view; four states on async surfaces; <Logo> for the name; appearance is user-controlled.
Task: <what you want built>
```
