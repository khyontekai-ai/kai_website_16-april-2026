# Khyontek AI Website - Agent Context

This document provides context and guidelines for any AI agent or developer working on the Khyontek AI website repository.

## Project Overview
- **Name:** Khyontek AI Website
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + custom color palette (`royal-blue`, `amber-gold`, `dark-navy`, `pale-blue`, `light-grey`, `mid-grey`, `dark-grey`).
- **UI Components:** Shadcn UI (located in `components/ui/`)
- **Fonts:** Nunito (sans-serif) and Fira Code (monospace/technical accents)

## Architecture

### Frontend (`/app`)
- **Public Pages:** Homepage (`/page.js`), Programmes (`/programmes/page.js`), Upcoming Projects (`/upcoming-projects/page.js`).
- **CMS Admin Panel:** Located at `/admin` (`app/admin/page.js` and `app/admin/AdminClient.js`).
  - The CMS has been modularized into `components/admin/` (e.g., `ProjectsManager.jsx`, `ReviewsManager.jsx`, `CaseStudiesManager.jsx`).
  - It uses Shadcn UI `Table` and `Dialog` components for an elegant interface.
- **Client Components:** Feature dynamic components like `FeaturedWork.jsx` on the homepage that fetch data from the API.

### Backend (`/app/api`)
- All API routes are handled via a catch-all route at `app/api/[[...path]]/route.js`.
- **Database:** It is configured to use MongoDB (via `MONGO_URL`). If MongoDB is not available or connection fails, it falls back to a **local JSON file store** inside the `/data` directory at the project root.
- **Data Entities:** 
  - `projects`: Research and development projects.
  - `reviews`: Workshop and program reviews.
  - `casestudies`: High-level case studies featured on the homepage.
  - `registrations`: Form submissions from the Programmes page.
  - `contacts`: Messages from the contact form.
- **Authentication:** Admin actions (POST/PUT/DELETE) require an `Authorization` header containing a token that matches `process.env.ADMIN_PASSWORD`.

## SEO Strategy
- We are actively optimizing for local search queries such as **"top AI agencies in Assam/Guwahati"**.
- **Metadata:** Global metadata in `app/layout.js` uses targeted keywords.
- **Schema:** The site utilizes `application/ld+json` injecting both `Organization` and `LocalBusiness` schemas to dominate local map searches.

## Deployment & Running Locally
- Run `npm run dev` to start the development server.
- **Windows Note:** Ensure `NODE_OPTIONS='--max-old-space-size=512'` is NOT in the package.json scripts, as it breaks the Windows build.

## Recent Updates
- Rebuilt the monolithic CMS panel into modular, Shadcn UI-powered components.
- Added a full CRUD lifecycle for "Case Studies", dynamically integrated into the homepage (`FeaturedWork.jsx`).
- Upgraded the On-Page SEO (Titles, Meta, JSON-LD Schema) for targeted local ranking in Assam.
