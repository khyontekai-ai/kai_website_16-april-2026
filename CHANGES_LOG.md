# Khyontek AI Website — Changelog

## Session: October 8, 2026

### 1. 🚀 Upcoming Projects Page
- **Spasht Health (`https://spashthealth.com/`)**:
  - Added as the first upcoming project card.
  - Status set to **Live** (`bg-green-600 text-white`).
  - Added a direct **"Visit Site →"** external link button.
  - Comprehensive details added explaining the AI medical report reader, 20 Indian languages, and privacy-first architecture.
- **Krevoh (`https://www.krevoh.com/`)**:
  - Added under **In Progress** (`bg-royal-blue text-white`).
  - Timeline: **Beta Coming Soon**.
  - Added a direct **"Visit Site →"** external link button.
  - Explains the vibe-based place discovery platform and early waitlist.
- **Data Source**:
  - Seeded into `defaultProjects` in `app/api/[[...path]]/route.js`.

---

### 2. 🌟 Reviews Dashboard & Cohort Feedback
- **Real Cohort Reviews Restored**:
  - Updated `app/api/[[...path]]/route.js` to serve all 37 real student submissions from `data/reviews.json` (`B. Tamang`, `S. Boro`, `K. Mandal`, etc.) instead of the 6 placeholder items.
- **Name Display Restored**:
  - Reverted name-mangling logic in `components/ui/ReviewsDashboard.js` so review names display in their original format.
- **Floating Ambient Animation Fixed**:
  - Defined `@keyframes float-ambient` and `.animate-float-ambient` in `app/globals.css`.
  - Floating review cards now fade in, drift smoothly, and reveal the full 2-column scrollable grid upon mouse hover.

---

### 3. 👥 Advisory Committee Updates
- **Dr. Akshay Parakh (Added)**:
  - Role: `Advisor Data Scientist @ AI`
  - Organization: `Eli Lilly & Co. | Ph.D. (CSE, IIT Guwahati)`
  - Headshot added to `public/images/advisors/Akshay_enhanced.png` and `public/advisors/akshay.png`.
  - Bio details: Exploring reasoning models, reinforcement learning, efficient small models, and agentic pipelines for drug discovery computation models and automated first-draft document generation. Ph.D. from IIT Guwahati (2023).
- **Dr. Pawan K. Mishra (Updated)**:
  - Role: `Assistant Professor, CSE` | `IIIT Guwahati | Ph.D. (IIT Guwahati)`
  - Updated bio with joining date (August 2023), former faculty at BITS Pilani, research areas (Graph Theory, Computational Geometry, Approximation Algorithms), courses taught, and personal space link (`sites.google.com/site/mishipawan`).
- **Ranjan Deka (Updated)**:
  - Updated with 11+ years of enterprise experience across .NET, C#, React.js, Node.js, e-commerce and telecom leadership, and AI-driven development.
- **Srutisma Hazarika (Updated)**:
  - Updated as Co-Founding Partner of S&N Legal, highlighting background in economics and law, international contracts, labor laws, and high-conflict dispute mediation.
- **Dr. Gyanendro Loitongbam**:
  - Hidden from the visible panel on the website while keeping all data, pictures, and code references completely intact (`hidden: true`).
- **Symmetrical 4-Card Alignment**:
  - Configured `lg:grid-cols-4` on desktop and `md:grid-cols-2` on tablets for a 100% complete, balanced layout with no uneven or leftover slots.

---

### 📦 Git Commits Today:
- `b9627d8`: Add Spasht Health (Live) and Krevoh (In Progress) to upcoming projects
- `0f452b3`: Merge remote changes with upcoming projects
- `f3a5dc3`: Restore real student reviews and original name display format
- `c7d3578`: Define float-ambient animation keyframes in globals.css
- `581c4f8`: Update advisory committee (add Dr. Akshay Parakh, update bios for Pawan, Ranjan, Srutisma, hide Gyanendro, balance 4-col grid)
