# Wedding Site

Static GitHub Pages site for Zhen Yu & Yan Zhang (Menlo Park wedding).

| Page | URL |
|------|-----|
| Save the Date | https://yzzzzzzzzy.github.io/save-the-date/ |
| RSVP | https://yzzzzzzzzy.github.io/save-the-date/rsvp/ |
| Email preview | open `email/invitation.html` locally |

## Google Form — create this now

Yes — create the RSVP Google Form **before** going live. Use these exact questions so the page submits correctly:

| # | Question type | Question text | Options / notes |
|---|---------------|---------------|-----------------|
| 1 | Short answer | Your name | Required |
| 2 | Short answer | Partner's name | Optional |
| 3 | Multiple choice | Will you attend? | `Yes` and `No` — match exactly |
| 4 | Paragraph | Notes | Optional |

### Wire the form to the site

1. In Google Forms, click **Send → link icon** (pre-filled link).
2. Add dummy answers for each field and copy the URL. It looks like:  
   `...?entry.123456789=Test&entry.987654321=Yes...`
3. Copy each `entry.*` number into `assets/js/rsvp.js` → `RSVP_FORM_CONFIG`.
4. Set `action` to your form's `.../formResponse` URL (from form HTML source, or replace `/viewform` with `/formResponse` in the form ID URL).
5. For `fbzx`: open the form in browser → View Source → search for `fbzx` — copy the value (same trick as the save-the-date form in `index.html`).

## Invitation email

See `email/README.md` for Brevo/Mailchimp workflow and `email/invitation.html` for the HTML template.

## Photos

Wedding photos live in `assets/images/wedding/`. Replace any file with the same filename to swap images without code changes.

## Deploy

```bash
git add .
git commit -m "your message"
git push origin main
```

GitHub Pages redeploys from `main` automatically.
