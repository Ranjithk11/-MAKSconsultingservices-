# MAKS Consulting Services

A studio site for MAKS Consulting Services, a Kolkata practice that operates five systems: database storage, a hosting platform, mail, WhatsApp, and agents.

The site is a Next.js application. The same five concerns are real modules, not only pages.

| System | Where it lives | What it does here |
| --- | --- | --- |
| Database storage | `src/services/database.ts` | SQLite (Node `node:sqlite`). Notes, the outbox, agent turns, and inbound WhatsApp are stored in `data/maks.db`. |
| Hosting platform | `src/services/hosting.ts`, `GET /api/health` | Reports platform, region, Node version, and uptime. |
| Mail service | `src/services/mail.ts` | Sends the studio letter and a visitor acknowledgement over SMTP. Without `SMTP_HOST`, both letters are queued and never marked sent. |
| WhatsApp service | `src/services/whatsapp.ts`, `POST /api/whatsapp` | Sends a Cloud API text when credentials exist, and stores inbound webhook messages. |
| Agent services | `src/services/agent.ts`, `POST /api/agent` | The “Ask the desk” agent answers from a written brief and stores the transcript. It cannot send mail or WhatsApp. |

The studio desk at `/desk` shows what was stored. In local development the key is `russell-studio` unless you set `MAKS_DESK_KEY`.

## Run it

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run build
npm start
```

Copy `.env.example` to `.env.local` before connecting mail or WhatsApp. The site works with no secrets: notes are stored, and outbound mail and WhatsApp stay in the outbox as `queued`.

## Hosting

Run this as a long-lived Node process. The SQLite file has to live on a disk that survives restarts. Set `DATABASE_PATH` if that disk is not the project `data/` folder. A serverless host with an ephemeral filesystem will forget the desk between requests.

`HOSTING_PLATFORM` and `HOSTING_REGION` are labels on the status report. They do not change where the process runs.

## Mail

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, and `MAIL_TO`. `SMTP_SECURE=true` is for port 465.

## WhatsApp

Set `WHATSAPP_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` to send. Set `WHATSAPP_VERIFY_TOKEN` so Meta can verify `GET /api/whatsapp`. Set `WHATSAPP_APP_SECRET` so inbound posts must carry a valid `X-Hub-Signature-256`. Set `NEXT_PUBLIC_WHATSAPP_E164` (digits, country code included) to enable the wa.me button.

## Replace the studio facts

Name, city, hours, and `desk@maksconsulting.in` live in `src/content/site.ts`. The photographs are in `public/images`.

## Pages

- `/` the practice, the five systems, and selected engagements
- `/services` and `/services/[slug]`
- `/practice`
- `/contact` stores a note, then calls mail and optionally WhatsApp
- `/desk` the stored record
