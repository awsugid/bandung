# Pretix: AWS Community Day Bandung 2026

Registration for Community Day runs on **gultix**, the AWS User Group Indonesia Pretix instance. This file records how the event is set up and how the website uses it. It was captured on 28 Sep 2026. Pretix is the source of truth, so check the admin before relying on any value here.

## Links

| What | URL |
|---|---|
| Admin (event) | https://gultix.awscommunity.id/control/event/AWSUGBandung/CommunityDay26/ |
| Public shop | https://gultix.awscommunity.id/AWSUGBandung/CommunityDay26/ |
| Widget script | https://gultix.awscommunity.id/widget/v2.en.js |
| Widget styles | https://gultix.awscommunity.id/AWSUGBandung/CommunityDay26/widget/v2.css |

Organizer slug `AWSUGBandung`, event slug `CommunityDay26`. The event slug is locked and appears in order codes and URLs.

The event was cloned from an AWS User Group Jakarta event. The Jakarta leftovers found so far have been replaced; see [Cleanup from the Jakarta clone](#cleanup-from-the-jakarta-clone).

## Website integration

- `src/modules/comday/26/Register.astro` is the **Entry pass** section on `/comday` (`#register`). It holds the Pretix widget, the registration window panel, the collapsible "How it works" steps, and the help line.
- `src/modules/comday/26/event.ts` holds `ticketUrl`, `ticketOpensAt` and `ticketClosesAt`. **Keep the two dates in sync with General Admission → Availability in Pretix.** The page can't read them from Pretix.
- The Hero and Closing sections link to `#register` with "Get your ticket".
- The widget is restyled for the dark theme with scoped `:global(.pretix-widget …)` rules and `--pretix-brand-primary` overrides in `Register.astro`. The checkout overlay isn't restyled.
- The "powered by AWS User Group Indonesia / based on pretix (source code)" line comes from the widget itself. It's the AGPL source offer, so leave it in place.

### Known behaviour

- **Product picture returns 403 off `awscommunity.id`.** gultix's Cloudflare hotlink protection allows `*.awscommunity.id` referrers only. The picture breaks on localhost and `*.pages.dev`, and loads on `bandung.awscommunity.id`.
- **Checkout needs HTTPS.** The widget only opens its checkout overlay on a secure page. On `http://localhost` it falls back to a plain form submit, and the in-app browser turns that into a `GET /cart/add`, which returns 405 with a blank page. Test checkout on the deployed HTTPS site or in regular Chrome.
- **Widget console error.** `v2.en.js` logs `Cannot set properties of undefined (setting 'value')`. It happens on a bare page with only the widget, so it comes from Pretix, not the site.

## Event settings

**Basics**
- Name: AWS Community Day Bandung 2026
- Date: Sat 7 Nov 2026, 09:00–17:00; admission 09:00
- Location: School of Business & Management (SBM) ITB, Jl. Ganesa No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132
- Geo: -6.8880907, 107.6092099 (the SBM ITB pin, https://maps.app.goo.gl/UHN3nEUB4hmi9Uyb8)
- Currency: IDR
- Contact email: awsugbandung@gmail.com; contact URL: Instagram @awsugbandung; imprint: https://bandung.awscommunity.id/comday/

**Localization:** English only, timezone Asia/Jakarta, region Indonesia.

**Timeline (presale window):** 26 Sep 2026 00:00 to 4 Nov 2026 23:59. The product window below is narrower and is the one that applies.

**Display**
- "Show number of tickets left": off at event level, and set to **No** on General Admission.
- Low availability threshold: 30%.
- Waiting list: on.

**Texts**
- The front page text has Bandung details: 7 Nov 2026, 09.00–17.00 WIB, SBM ITB, Gedung Freeport Lt. 6.
- The phone field help text isn't set yet. Suggested text: "Please use an active WhatsApp number. We use it to reach you about your registration and event updates."

**Shop design:** primary color `#4a2c6e`, font Amazon Ember. No logo or social preview image yet.

## Customer and attendee data

- **Order-level fields:** email is required and asked twice; phone is required.
- **Attendee name:** required, as a single "Name" field.
- **Attendee email:** required.
- **Company:** required. Students enter their university.
- **Postal address:** not asked.
- **Order changes:** customers can't modify orders after submitting.
- **Attendee data explanation:** covers what name, email and company are used for.

## Products

| Product | Price | Status |
|---|---|---|
| General Admission (#91) | Rp20.000 (was Rp50.000, shown struck through) | Active |
| Testing (#103) | Rp1 | Inactive; used only for Midtrans test orders |

**General Admission settings**
- Category: Community Day 26.
- Admission and personalized ticket.
- **Requires approval:** every order is reviewed by hand before payment.
- **Availability:** 29 Sep 2026 09:00 to 3 Nov 2026 23:59 WIB, all sales channels.
- One ticket per order (min 1, max 1).
- Customers can't cancel it themselves: "Allow product to be canceled or changed" is off, which overrides the event cancellation settings.
- Waiting list: on.
- Description: open to everyone; the price is a commitment fee refunded on attendance, with no-shows non-refundable; approval is required; questions go to Instagram.

**Quota:** "General Admission", 200 seats, linked to General Admission. "Close this quota permanently once it is sold out" is off, so seats freed by denied or expired orders go back on sale.

How the quota moves:
- **Placed, awaiting approval:** holds a seat.
- **Denied:** cancelled, and the seat is released.
- **Approved but unpaid:** holds a seat until the payment deadline (2 days), then expires automatically and releases it.
- **Paid:** the seat is taken for good.

## Questions

This is in the order shown at checkout; "Required" says whether an answer is required.

| Question | Type | Required | Notes |
|---|---|---|---|
| Attendee name | System | Yes | |
| Attendee email | System | Yes | |
| City you currently live in | Text | Yes | |
| Gender | Choose one (Male, Female) | Yes | Consider making it optional with "Prefer not to say" |
| Company | System | Yes | |
| Role or job title | Text | Yes | Help text: "For example: Backend Engineer, Cloud Architect, or Student." |
| LinkedIn Profile URL | Text | Yes | Consider making it optional for students |
| How did you hear about the event | Choose many (Instagram, Friends/Family/Colleague, LinkedIn, Meetup, Email, Other, Instagram Ads) | Yes | |
| In what media you heard about this event? | Text | Yes | Shown only when "Other" is picked |
| Year of Professional Experience | Number | Yes | |
| Do you have any disability | Choose one (Yes, No) | Yes | |
| Tell us your disability | Text | No | Follow-up to the disability question |
| What do you hope to get out of Community Day? | Multiline | Yes | Replaces the three essay questions from Jakarta |
| Are you interested in joining a workshop class? | Yes/No | No | Unticked means No |
| Did you join the AWS User Group Bandung Meetup? | Yes/No | **Yes** | See the note below |

**Yes/No questions render as a single checkbox.** A *required* Yes/No question forces everyone to tick it. The Meetup question is currently required, so change it to optional, or to "Choose one from a list" with Yes and No options.

## Payment

- **Providers:** Midtrans (payments by QR code) and Gift card, both enabled. Gift card isn't used and can be turned off.
- **Midtrans account:** confirm the Midtrans credentials belong to the Bandung/Indonesia account and are production keys before going live. No keys are stored in this repo.
- **Payment term:** 2 days, ending at 23:59 of the last day. For approval orders the clock starts at approval, and unpaid orders expire automatically.
- **Refunds:** each commitment fee is refunded after check-in. Record them in Pretix as refunds against the order.

## Emails

- Sender "AWS User Group Bandung" via noreply@awscommunity.id. Tickets are attached.
- All 25 templates had "Best regards, AWS User Group Jakarta" and now say AWS User Group Bandung.
- Worth writing: the "awaiting approval" and "order approved" texts should say that approval is manual and that payment is due within 2 days of approval.

## Invoices

- Generated automatically after payment and attached to the payment email, in English. Numbering uses the order code.
- Issuer: AWS User Group Bandung, Bandung, Indonesia.
- The invoice logo (`Frame 220.png`) replaced the Jakarta Monas icon. It's under Invoicing → Invoice customization.

## Tickets and badges

- The PDF ticket layout **"Community Day 26"** is the default. The Jakarta layouts ("AWS UG Jakarta Reinvent", "AWS UG Jakarta Template", "Exclusive Ticket Layou…") have been removed.
- The ticket design is a 9:16 portrait background (about 1080×1920 px, exported as PDF). Its subtitle uses the tagline "From the community, run by the community, for the community."
- Badges use Pretix's plain "Default" layout. Design it before printing.

## Cleanup from the Jakarta clone

Done:
- Front page text: date, venue and map.
- Email template sign-offs.
- Invoice issuer name, city and logo.
- Product picture: Monas replaced.
- Default ticket layout.
- The question "Did you join the AWS User Group Jakarta Meetup?" and the Jakarta answer options.
- Duplicate Company and Phone questions.
- The Student Ticket product and its quota.

## Go-live checklist

- [ ] Midtrans credentials are the correct account's production keys
- [ ] Delete test-mode orders (Shop status → "Permanently delete all orders created in test mode")
- [ ] Disable test mode (Shop status → "Disable test mode")
- [ ] Fix the required Meetup Yes/No question
- [ ] Write the approval and approved email texts
- [ ] Place one real order on the deployed HTTPS site to check checkout, the payment QR code, the ticket PDF and the invoice
- [ ] If the sales window changes in Pretix, update `ticketOpensAt` and `ticketClosesAt` in `src/modules/comday/26/event.ts`
