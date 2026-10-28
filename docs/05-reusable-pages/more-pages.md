# More pages

Blueprints for pages that most products need. Each is implemented in `apps/showcase/src/pages/MorePages.tsx` and tested for accessibility and mobile fit.

| Page | Route | Rules |
|---|---|---|
| Project timeline | `#/timeline` | Bars show start, length and progress. Every bar has a text label with dates. Scroll region is focusable. |
| Approval workflow | `#/approvals` | Show the whole chain with a status for each step. Only the current approver sees the decision. State the result in text, not color alone. |
| Wishlist | `#/store/wishlist` | Show stock state. Out-of-stock add-to-cart is inert with a reason. Remove has an accessible name with the item. |
| Compare plans | `#/compare` | Real table with row and column headers. Offer "Differences only". Included and not-included are text for screen readers. |
| Order confirmation | `#/store/order-confirmed` | Say it worked, give the order number, say what happens next. |
| Start a return | `#/store/returns` | Choose items and a reason first. The action stays inert until both are set, and says why. |
| Case study | `#/case-study` | Lead with outcome numbers, then the problem, then a quote with attribution. |
| Public roadmap | `#/roadmap` | Now, Next, Later. No dates promised. |
| Mobile onboarding | `#/onboarding` | Three steps at most. Skip is always available. Step count is announced. Last step becomes "Get started". |

Related: `forms/validation`, `charts` and `rtl` demonstrate `04-patterns/forms-and-validation.md`, `04-patterns/data-visualization.md` and `01-foundations/internationalization.md`.
