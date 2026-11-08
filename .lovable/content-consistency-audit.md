# Content consistency audit — awaiting owner confirmation

Scope: no website copy changes or publication. Preserve design, URLs, SEO metadata, price amounts and unrelated facts.

## Durations (hours)

| Tour | Homepage card dialog (all 8 locales) | Detail-page information (all 8 locales) | Detail FAQ (hardcoded English in all languages) | Calculator label |
| --- | --- | --- | --- | --- |
| Delphi | 9–10 | 8 | 8–9 | no duration |
| Nafplio | 8–9 | 8 | 7–8 | no duration |
| Meteora | 12 | 12 | 10–11 | no duration |
| Athens/Acropolis | Acropolis 4 | Athens 3 (also intro) | 4–5 | Athens 3 |
| Sounion | 4–5 | 5 | 4–5 | 5 |

Sounion: point value inside range, not an outright contradiction, but should confirm intended presentation. Confirm whether Acropolis card and Athens City Tour represent same product before unifying. Syntagma card says 1–2 hours; no separate detail page to compare. Do not confuse total-tour duration with one-way driving estimates. Related Nafplio blog has driving time ~2h, not total tour duration.

Live verification: haviptransfers.gr homepage Delphi dialog = 9–10h; /delphi-private-tour information = 8h; opened FAQ = 8–9h. Remaining locale/value comparisons were source-level.

## Child seats

All 8 locales: faq.items.a7 = ages 3–12; childSeats.features.ages = all ages 0–12+; childSeats description = all ages.
ChildSeats component is not currently mounted; do not restore it (design change outside scope).
All 8 locales contain Group 0+ 0–13kg, Group 1 9–18kg, Booster 15–36kg. Hebrew has all entries, but weight unit is truncated to ק; not missing groups. Confirm actual product ranges before any corrections.
Blog source and translations describe every age/babies and contain legal assertions under 12 years OR 135cm and under 150cm for front-seat/airbag. These are not product availability limits and have not been legally verified; do not convert into service bounds or invent safety specs.

## Tour pricing units

All 8 detail-page locales: amounts agree, units absent in price field and final CTA: Athens €180, Sounion €350, Delphi €500, Meteora €800, Nafplio €500. Tour calculator matches amounts but lacks per-vehicle/per-person qualifier. Homepage cards/dialogs and menu show no amounts: do not add prices there.
Night surcharge already explicitly per person, preserve formula/amounts. Transfer fares and SEO structured offers are outside scope. structuredData.ts has no duration field; SEO metadata remains untouched.

## Implementation locations after approval

- src/i18n/locales/{en,el,de,fr,es,it,he,ar}.ts: tours.items.*.long, *Tour.durationVal, athensTour intro, calculator.routes labels, faq.items.a7 and approved childSeats values.
- src/pages/{DelphiTour,NafplioTour,MeteoraTour,AthensTour,CapeSounionTour}.tsx: hardcoded FAQ durations and translation coverage. Existing FAQ structured data mirrors visible FAQ answers; preserve titles/descriptions/canonicals/hreflang/other SEO.
- src/components/PriceCalculator.tsx and relevant translation keys: approved tour-only pricing qualifier, no price/formula changes.
- Confirm approved facts in small regression tests alongside existing tests and verify relevant rendered flows. No publish without explicit approval.