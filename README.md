# Divyesh Pawar · Portfolio

Next.js (App Router), plain CSS, no UI libraries. The page is prerendered to static HTML; the only server code is `app/api/book/route.js`, which runs as one Vercel function.

## Run locally
```
npm install
npm run dev        # http://localhost:3000
```

## Deploy to Vercel
1. Push this folder to a GitHub repo and import it in Vercel (framework: Next.js, no settings to change).
2. **Bookings store:** in the Vercel project, open *Storage → Marketplace → Upstash (Redis)* and create a free database connected to this project. Vercel adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` for you.
3. **Emails:** on the divyeshhere@gmail.com Google account, turn on 2-Step Verification, then create an App Password (Google Account → Security → App passwords). Add it in Vercel as the env variable `GMAIL_APP_PASSWORD`.
4. Redeploy.

Until steps 2–3 are done, the booking button opens the visitor's email app with the request pre-filled instead.

## How booking works
- Visitors see the next 10 weekdays, 10 AM–4 PM Toronto time. Green = free, red = booked.
- Booking a slot adds it to a Redis set atomically, so two people can't take the same time.
- You get an email with their name, email and topic (reply goes straight to them); they get a confirmation.
- If an email fails, the slot is released again.
- To free a slot by hand: Upstash console → `SREM booked 2026-10-20T10:00`.

## Editing content
All text, jobs, tools and projects live in `app/content.js`. Images are in `public/img` (WebP).
