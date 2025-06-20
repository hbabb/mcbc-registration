# Motlow Creek Baptist Church Vacation Bible School (VBS) Online Registration Form

## Overview

A web-based Vacation Bible School registration system built with Next.js, Xata (PostgreSQL mode), and Clerk or Kinde for admin authentication. It allows parents to register children, agree to Terms & Conditions (with optional opt-outs), and enables staff to export printable registration forms for signature.

---

## Tech Stack

- **Frontend**: Next.js (App Router, TypeScript and TailwindCSS with Shadcn/UI)
- **Auth**: Clerk or Kinde
- **Database**: Digital Ocean DB Cluster (PostgreSQL mode)
- **Hosting**: Digital Ocean Droplet or App Platform
- **PDF Export**: HTML-to-PDF library (`@react-pdf/renderer`, `html2pdf.js`)

---

## Features

- Registration form with T&C agreement and optional opt-out clauses
- Downloadable Terms & Conditions PDF
- Data persistence to Xata
- Admin dashboard for viewing, searching, and exporting registrations
- Printable forms with signature lines

---

## Project Structure

```tree
/vbs-registration
│
├── app/
│   ├── register/                  # Public registration form
│   ├── admin/                     # Admin dashboard (auth-protected)
│   └── api/
│       ├── register/route.ts      # POST registration handler
│       └── admin/registrations/   # GET/PUT admin APIs
│
├── components/
│   ├── FormFields.tsx
│   └── PrintCard.tsx              # Printable view of submission
│
├── lib/
│   ├── db.ts                      # Xata client
│   └── auth.ts                    # Clerk/Kinde middleware
│
├── utils/
│   ├── validators.ts              # Zod validation
│   └── pdf.ts                     # PDF rendering utility
│
├── xata/                         # Xata config/schema
│
├── public/
│   └── vbs-terms.pdf              # Downloadable T&C
│
├── .env.local
├── README.md
└── LICENSE
```

---

## Setup Instructions

1. Clone repo
2. Add `.env.local` with Xata/Neon credentials + Clerk/Kinde keys
3. Create DB schema (see below)
4. Deploy on Vercel
5. Upload `vbs-terms.pdf` to `public/`
6. Access form at `/register`, dashboard at `/admin`

---

## DB Schema (PostgreSQL)

### registrations

- `id` (UUID, primary key)
- `first_name` (text)
- `last_name` (text)
- `birth_date` (date)
- `age_group` (text)
- `parent_name` (text)
- `parent_email` (text)
- `phone_primary` (text)
- `phone_alt` (text)
- `emergency_contact_name` (text)
- `emergency_contact_phone` (text)
- `medical_notes` (text)
- `photo_release_opt_out` (boolean)
- `pickup_notes` (text)
- `consent_given` (boolean)
- `consent_timestamp` (timestamp)
- `ip_address` (text)

### admins (optional, if not using Clerk/Kinde fully)

- `id`, `email`, `role`

---

## Printing

- Admin views entry in dashboard
- Click “Print” or “Export PDF”
- Generates form with all submitted fields + signature lines
- Used for physical signatures at check-in

---

## License

See [LICENSE]('/LICENSE') file.

---

## Author

HB Consultants, LLC c/o [Heath Babb](https://github.com/hbabb)
