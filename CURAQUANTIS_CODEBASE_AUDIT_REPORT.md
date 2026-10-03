# CURAQUANTIS™ CODEBASE AUDIT & TECHNICAL IMPLEMENTATION MAP
**Phase 1: Comprehensive Codebase Audit, Architecture Analysis, and Strategic Mapping**  
*Strategic Reference: `CuraQuantis_Website_Infographic_Strategy.md` (Derived from Master Development Strategy Phases 1–52)*  
*Audit Mode: Strict Read-Only Analysis (No Production Code Modified)*  
*Date of Audit: September 30, 2026*  

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Technology Stack](#2-technology-stack)
3. [Repository Architecture](#3-repository-architecture)
4. [Route Inventory](#4-route-inventory)
5. [Component Inventory](#5-component-inventory)
6. [Existing Design System](#6-existing-design-system)
7. [Existing Content Architecture](#7-existing-content-architecture)
8. [Existing User Journeys](#8-existing-user-journeys)
9. [Existing Data Architecture](#9-existing-data-architecture)
10. [Existing Authentication / Permissions](#10-existing-authentication--permissions)
11. [Existing Backend/API Architecture](#11-existing-backendapi-architecture)
12. [Existing Integrations](#12-existing-integrations)
13. [Existing Animation / Visualization Architecture](#13-existing-animation--visualization-architecture)
14. [Existing Responsive Architecture](#14-existing-responsive-architecture)
15. [Existing SEO](#15-existing-seo)
16. [Existing Accessibility (a11y)](#16-existing-accessibility-a11y)
17. [Existing Performance](#17-existing-performance)
18. [Existing Security Audit](#18-existing-security-audit)
19. [Strategy-to-Code Mapping](#19-strategy-to-code-mapping)
20. [52-Phase Traceability Matrix](#20-52-phase-traceability-matrix)
21. [Homepage Gap Analysis](#21-homepage-gap-analysis)
22. [Page-by-Page Gap Analysis](#22-page-by-page-gap-analysis)
23. [Infographic Mapping (21 Core Infographics)](#23-infographic-mapping-21-core-infographics)
24. [Components to Reuse](#24-components-to-reuse)
25. [Components to Redesign](#25-components-to-redesign)
26. [Components to Create](#26-components-to-create)
27. [Components & Pages to Deprecate / Remove](#27-components--pages-to-deprecate--remove)
28. [Content Gaps](#28-content-gaps)
29. [Data Gaps](#29-data-gaps)
30. [Backend Gaps](#30-backend-gaps)
31. [Security & Governance Gaps](#31-security--governance-gaps)
32. [Technical Risks](#32-technical-risks)
33. [Implementation Dependencies](#33-implementation-dependencies)
34. [Recommended Implementation Architecture](#34-recommended-implementation-architecture)
35. [Recommended Development Sequence](#35-recommended-development-sequence)
36. [P0 / P1 / P2 / P3 Backlog](#36-p0--p1--p2--p3-backlog)
37. [Questions / Decisions Required](#37-questions--decisions-required)
38. [Final Recommended Architecture](#38-final-recommended-architecture)
39. [Deliverables A through T Summary](#39-deliverables-a-through-t-summary)
40. [Machine-Readable Implementation Map (JSON)](#40-machine-readable-implementation-map-json)

---

## 1. Executive Summary

A comprehensive, non-destructive audit of the entire CuraQuantis™ codebase (`c:\Users\DELL\Downloads\ZeroKost\cura_quantis`) was completed across all 187 files in the repository. The audit evaluated the codebase at four interconnected levels:
1. **Technical Architecture**: Vite, React 18, TypeScript, TailwindCSS, Express/Mongoose backend, authentication models, state management, dependencies, and bundle weight.
2. **Existing UI/UX & Component Library**: Radix UI / shadcn/ui primitives, page layouts, navigation flows, and interactive prototypes.
3. **Content Architecture & Business Positioning**: Existing copy, assets, audio files, and historical artifacts.
4. **Strategic Mapping against the CuraQuantis™ Master Strategy (Phases 1–52)** as articulated in `CuraQuantis_Website_Infographic_Strategy.md`.

### Core Audit Findings
1. **High-Value Assets Already Implemented**:
   - The repository contains an advanced **Commercial Expansion & Vetting Subsystem** (`ApplyPathway.tsx` [97 KB], `ManagementDashboard.tsx` [49 KB], `PartnerDashboard.tsx` [42 KB], `PartnerPortalHub.tsx` [20 KB], `IndiaTerritoryMap.tsx`, and `indiaTerritories.ts`). This is an asset implementing Phases 14–18 and 26–27.
   - It possesses functional **CuraVoice audio demonstrations** with real sound recordings, an interactive **Demo Center** with 14 clinical AI applications, an executive leadership directory with verified team profiles, and a standalone Three.js **3D AI Clinic Walkthrough** (`360deg.html`).
2. **Critical Strategic Disconnect (Multi-Industry vs. Connected Healthcare Ecosystem)**:
   - The current codebase contains remnants of an early generic multi-industry pitch (18 industry subpages in `src/pages/industries/` such as `Finance.tsx`, `Meat.tsx`, `Agriculture.tsx`, `Defence.tsx`, `Aerospace.tsx`, `Retail.tsx`).
   - The metadata in `index.html` misidentifies the platform as an *"AI solutions company transforming healthcare, finance, defence, and more"*.
   - **Strategy Mandate**: The source strategy firmly establishes CuraQuantis™ as a **connected Pan-India network of AI-enabled healthcare clinics and diagnostic centers**, with AI operating as the **intelligence layer**, not a general horizontal software agency.
3. **Status Labeling & Operational Claims**:
   - The existing Demo Center automatically marks all 14 project cards as `"Deployed"` with green status dots, even though they link to placeholder anchors (`#`).
   - Copy in several sections presents prospective target metrics as existing capabilities. In accordance with the strategic design brief, target metrics (e.g., 3,000 healthcare clinics, 7,000 diagnostic centers, 10,000 connected locations) must be strictly characterized as **Long-Term Strategic Targets**, and capability badges (**CONCEPT**, **PROTOTYPE**, **PLANNED**, **PRODUCTION**) must be enforced.
4. **Security Vulnerabilities Identified in Existing Code**:
   - Production MongoDB connection URI with active administrative credentials committed to `.env`.
   - Plaintext executive passwords and administrative credentials hardcoded directly into client-side code (`src/lib/authStore.ts`).
   - Client-side mock JWT authentication stored in unencrypted `localStorage`.
   - Hardcoded EmailJS API public keys and service IDs exposed in `src/components/ContactSection.tsx`.

---

## 2. Technology Stack

| Category | Technology / Library | Version | Codebase Evidence |
|---|---|---|---|
| **Core Framework** | React | `18.3.1` | [`package.json`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/package.json#L60) |
| **Language** | TypeScript | `5.5.3` | [`tsconfig.json`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/tsconfig.json), [`package.json`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/package.json#L88) |
| **Build Tool & Bundler** | Vite + SWC React Plugin | `5.4.1` / `@vitejs/plugin-react-swc 3.5.0` | [`vite.config.ts`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/vite.config.ts#L2) |
| **Routing** | React Router DOM | `6.26.2` | [`src/App.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/App.tsx#L5) |
| **Styling & CSS** | TailwindCSS + Tailwind Animate + Typography | `3.4.11` / `1.0.7` / `0.5.15` | [`tailwind.config.ts`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/tailwind.config.ts) |
| **UI Primitives** | Radix UI (Full Suite: 28 packages) + shadcn/ui | Various (`^1.1.0` - `^2.2.1`) | [`src/components/ui/`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/ui) (49 UI components) |
| **Animation System** | Framer Motion | `11.0.8` | [`src/pages/Insights.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/Insights.tsx#L2), [`src/components/CuraVoiceAISection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/CuraVoiceAISection.tsx#L2) |
| **Data Visualization** | Recharts | `2.12.7` | [`package.json`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/package.json#L66) |
| **Icons** | Lucide React | `0.462.0` | [`package.json`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/package.json#L56) |
| **State & Data Fetching**| TanStack React Query | `5.56.2` | [`src/App.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/App.tsx#L4) |
| **Form Management** | React Hook Form + Zod + Hookform Resolvers | `7.53.0` / `3.23.8` / `3.9.0` | [`package.json`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/package.json#L16) |
| **Backend Runtime** | Node.js + Express | `5.1.0` | [`server/index.cjs`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/server/index.cjs), [`curaquantis/server.cjs`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/curaquantis/server.cjs) |
| **Database** | MongoDB via Mongoose | `9.10.2` | [`server/models/`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/server/models) |
| **Notification / Email** | EmailJS Browser & Node SDK | `4.4.1` / `4.0.3` | [`src/lib/emailNotification.ts`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/lib/emailNotification.ts) |
| **Virtual Tour / 3D** | Three.js (r128 CDN) | `r128` | [`public/360deg.html`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/public/360deg.html#L162) |
| **Package Management** | npm (`package-lock.json`), bun (`bun.lockb`) | Dual lockfiles present | Root directory |

---

## 3. Repository Architecture

```
cura_quantis/
├── .env                                       # [CRITICAL SECURITY RISK] Active Mongo URI & credentials
├── components.json                            # shadcn/ui configuration file (Slate base)
├── CuraQuantis_Website_Infographic_Strategy.md# Strategic blueprint (Phases 1-52)
├── index.html                                 # HTML root (Fonts: Inter, Outfit, Space Grotesk)
├── package.json                               # Dependencies & scripts
├── tailwind.config.ts                         # Design tokens, color system, keyframe animations
├── vite.config.ts                             # Vite config with alias '@/ -> src/'
├── public/                                    # Public assets (images, audio, PDFs, 3D HTML)
│   ├── 360deg.html                            # 3D Interactive Three.js Clinic Walkthrough (9 rooms)
│   ├── *.wav / *.m4a                          # Clinical voice audio samples (112 MB total)
│   ├── Zerokost Ventilator (1).pdf            # Hardware ventilator product brochure
│   ├── Anand.jpeg, Ananya.png, etc.           # Leadership headshots
│   └── solutions/                             # SVG illustrations for solutions
├── server/                                    # Express API server implementation A
│   ├── index.cjs                              # Express server with MongoDB connection & fallback cache
│   └── models/                                # Mongoose models (PartnerApplication, InvestorLead)
├── curaquantis/                               # Express API server implementation B
│   ├── server.cjs                             # Target of 'npm run server' script
│   └── models/                                # Mongoose models (PartnerApplication, InvestorLead, User)
└── src/
    ├── App.tsx                                # Central route dispatcher (41 routes)
    ├── index.css                              # Tailwind base, HSL tokens, glassmorphism, keyframes
    ├── main.tsx                               # DOM mount entry
    ├── components/
    │   ├── Navbar.tsx                         # Header with dropdowns, virtual clinic, portal links
    │   ├── Footer.tsx                         # Corporate footer, legal entity notes, addresses
    │   ├── HeroSection.tsx                    # Animated typewriter hero
    │   ├── IntroSection.tsx                   # 3D orb CSS animation + feature cards
    │   ├── HealthcareEcosystemSection.tsx     # 6 segment cards (CuraClinics, CuraDiagnostics, etc.)
    │   ├── CuraVoiceAISection.tsx             # Interactive voice cards with HTML5 audio playback
    │   ├── PartnerEcosystemTeaser.tsx         # Commercial expansion banner & 3 pathway links
    │   ├── SolutionsSection.tsx               # 13 AI health solutions with 3D flip card effect
    │   ├── WhyAISection.tsx                   # Benefits, metrics, and radar dashboard
    │   ├── AboutSection.tsx                   # Company milestones, mission, vision
    │   ├── DirectorsSection.tsx               # Board of Directors expandable cards
    │   ├── ContactSection.tsx                 # Form with EmailJS integration & Google Maps embed
    │   ├── territory/
    │   │   └── IndiaTerritoryMap.tsx          # Interactive SVG/CSS Pan-India territory selector
    │   └── ui/                                # 49 shadcn/ui components (Radix primitives)
    ├── data/
    │   └── indiaTerritories.ts                # 36 States & UTs dataset with zones, tiers, hubs
    ├── hooks/
    │   ├── use-mobile.tsx                     # Breakpoint detection hook (<768px)
    │   └── use-toast.ts                       # Toast notification dispatcher
    ├── lib/
    │   ├── authStore.ts                       # Client-side session and mock JWT auth store
    │   ├── emailNotification.ts               # Mailto & EmailJS dispatchers
    │   ├── partnerStore.ts                    # Application/lead store with seed data & API sync
    │   └── utils.ts                           # clsx & tailwind-merge helper
    ├── types/
    │   └── partnerPortal.ts                   # TypeScript interfaces for applications, leads, audit
    └── pages/
        ├── Index.tsx                          # Homepage aggregator
        ├── About.tsx                          # Full About page
        ├── Contact.tsx                        # Full Contact page
        ├── DemoCenter.tsx                     # 14 AI Project demonstration cards with modal details
        ├── Insights.tsx                       # CuraVoice AI dedicated showcase (misnamed route)
        ├── NonInvasiveVentilator.tsx          # Hardware product showcase
        ├── Products.tsx                       # Generic product catalog (EHR, HMS, Telemed)
        ├── Solutions.tsx                      # 13 Healthcare solution deep-dives
        ├── industries/                        # 18 Industry pages (Legacy multi-industry pivot)
        │   ├── Healthcare.tsx                 # Healthcare industry landing
        │   └── healthcare/
        │       ├── GenAI.tsx                  # Generative AI in Healthcare
        │       └── AgenticAI.tsx              # Agentic AI in Healthcare
        ├── partner/                           # Commercial Expansion & Scrutiny System
        │   ├── ApplyPathway.tsx               # 4-stage application filing wizard
        │   ├── ManagementDashboard.tsx        # CuraQuantis Scrutiny Board / Executive review
        │   ├── PartnerDashboard.tsx           # Partner/Applicant secure status docket
        │   ├── PartnerPortalHub.tsx           # Public portal hub with status lookup
        │   └── PortalLogin.tsx                # Dual-role authentication screen
        └── solutions/                         # 6 Solution detail pages (AIChatbot, LabIntegration, etc.)
```

---

## 4. Route Inventory

| Route | Page / Screen | Purpose | Main Components | Data Source | Target Audience | Current Status | Notes |
|---|---|---|---|---|---|---|---|
| `/` | Homepage | Master brand & ecosystem entry | `HeroSection`, `IntroSection`, `HealthcareEcosystemSection`, `PartnerEcosystemTeaser`, `CuraVoiceAISection`, `WhyAISection`, `SolutionsSection`, `AboutSection`, `DirectorsSection`, `ContactSection` | Static | General Visitors, Patients, Partners | **EXISTS (Needs Redesign)** | Lacks master ecosystem diagram, patient journey, diagnostic pipeline, quality cycle, and command center. |
| `/about` | About CuraQuantis | Company story, mission, board | `Navbar`, `AboutSection`, `DirectorsSection`, `Footer` | Static | General Public, Media | **EXISTS (Retain/Polish)** | Authentic leadership profiles; needs alignment with holding company hierarchy. |
| `/contact` | Contact & Inquiries | Inbound communication | Form, Google Maps iframe, contact details | EmailJS | Inbound Leads | **EXISTS (Retain/Secure)** | Hardcoded EmailJS credentials must be moved to backend. |
| `/demo-center` | Clinical AI Demo Center | Showcase 14 AI healthcare modules | `DemoCenter.tsx`, Project modal, category filter | `projectsData` (in-file JSON) | Clinical Leaders, Hospital Admins, Investors | **EXISTS (Rework Badges)** | All 14 items currently marked "Deployed"; needs capability status tags (PROTOTYPE, PLANNED, etc.). |
| `/insights` | CuraVoice AI Showcase | Demonstrates conversational voice agents | Waveform audio players, Bento grid, CuraClone™ section | Audio files in `/public` | Healthcare Executives, Clinicians | **EXISTS (Reposition Route)** | High quality voice demonstration, but routed to `/insights` instead of `/curavoice`. |
| `/solutions` | HealthTech AI Solutions | Overview of 13 AI modules | Anchor sections for 13 solutions | Static | Hospital CIOs, Doctors | **EXISTS (Merge/Redesign)** | Static lists with stock images; needs infographic pipeline integration. |
| `/solutions/remote-monitoring` | Remote Monitoring | Tele-ICU & remote patient monitoring | Feature list, SVG illustration | Static | Hospitals, ICUs | **EXISTS (Rework)** | Standalone subpage; can be integrated into Clinical Care zone. |
| `/solutions/medical-billing` | Medical Billing | Automated CPT coding & claim checks | Feature list, SVG illustration | Static | Billing Teams, Hospitals | **EXISTS (Rework)** | Standalone subpage; can be integrated into Operations zone. |
| `/solutions/lab-integration` | Lab Integration | LIS/LIMS connectivity & HL7/FHIR | Feature list, SVG illustration | Static | Pathologists, Lab Directors | **EXISTS (Rework)** | Direct precursor to the Diagnostics Pipeline infographic. |
| `/solutions/appointment-scheduling` | Appointment Scheduling | Outpatient booking & scheduling | Feature list, SVG illustration | Static | Clinics, Patients | **EXISTS (Rework)** | Precursor to Patient Journey Discover/Register cards. |
| `/solutions/ai-chatbot` | AI Chatbot | Patient-facing conversational triage | Feature list, SVG illustration | Static | Patients, OPDs | **EXISTS (Merge)** | Overlaps with CuraVoice and MediConnect; should be merged. |
| `/solutions/clinical-decision` | Clinical Decision Support | Predictive AI diagnostics & EWS | Feature list, SVG illustration | Static | Physicians, Intensivists | **EXISTS (Rework)** | Feeds into the AI Architecture / Professional Review layer. |
| `/products` | Healthcare Products | Catalog (EHR, Telemed, HMS, etc.) | Product cards with Unsplash photos | Static | General | **EXISTS (Deprecate/Merge)** | Generic software list disconnected from connected ecosystem. |
| `/products/ventilator` | Non-Invasive Ventilator | Hardware ventilator showcase | 3D card layout, specs, brochure download | Static PDF in `/public` | Hospitals, Biomedical Engineers | **EXISTS (Isolate/Archive)** | Legacy hardware artifact from Zerokost; not part of digital healthcare clinic network strategy. |
| `/industries/healthcare` | Healthcare Industry Landing | Subdomain navigation | Links to GenAI & AgenticAI | Static | Healthcare Leaders | **EXISTS (Rework to `/healthcare`)** | Remnant of multi-industry navigation. |
| `/industries/healthcare/gen-ai` | Generative AI in Healthcare | Clinical documentation, synthesis | Subdomain detail layout | Static | Tech Leaders | **EXISTS (Merge into AI Architecture)** | Subpage should live under `/ai-technology`. |
| `/industries/healthcare/agentic-ai` | Agentic AI in Healthcare | Multi-agent coordination | Subdomain detail layout | Static | Tech Leaders | **EXISTS (Merge into AI Architecture)** | Subpage should live under `/ai-technology`. |
| `/industries/finance` ... `/industries/meat` (16 routes) | Non-Healthcare Industries | Aerospace, Defence, Agriculture, Law, etc. | Boilerplate cards | Static | Non-healthcare | **EXISTS (DEPRECATE / REMOVE)** | Directly conflicts with CuraQuantis™ healthcare-focused strategy. |
| `/partner-portal` | Commercial Expansion Hub | Gateway for Channel Partners & Franchise Investors | Pathway cards, Status tracker, Authority boundary matrix | Static + `PartnerStore` | Prospective Partners, Franchisees | **EXISTS (RETAIN & EXPAND)** | High strategic value; implements Phase 14–18, 26–27 commercial guidelines. |
| `/apply` & `/apply/:pathway` | 4-Stage Application Wizard | Ingestion of candidate credentials & territory | Step wizard, `IndiaTerritoryMap`, file uploader | Form state -> `PartnerStore` / API | Partner Applicants | **EXISTS (RETAIN)** | Highly complete. Produces `CQ-2026-XXXXXX` reference dockets. |
| `/portal/partner-dashboard` | Secure Applicant / Partner Docket | Real-time status tracking, document uploads, chat | Status timeline, document tab, clarifications, payment simulator | LocalStorage / API | Authenticated Applicants & Partners | **EXISTS (RETAIN)** | Implements transparent vetting pipeline. |
| `/portal/admin` | CuraQuantis Scrutiny Board | Executive vetting & management portal | Application list, Action drawer (Approve/Reject/Interview), Territory map | LocalStorage / API | Executive Leadership | **EXISTS (RETAIN & SECURE)** | Functional review console; needs backend auth enforcement. |
| `/portal/login` | Unified Portal Sign-In | Dual login (Applicant tracking & Admin login) | Credentials form, reference lookup | `AuthStore` | Applicants, Partners, Admins | **EXISTS (RETAIN & SECURE)** | Currently uses client-side hardcoded credentials. |
| `/360deg.html` | 3D Virtual Clinic Tour | Interactive walkthrough of 9 hospital rooms | Three.js canvas, minimap, room selector, HUD | Three.js standalone script | Visitors, Franchise Investors | **EXISTS (REUSE / INTEGRATE)** | Impressive 3D prototype; should be embedded into the Virtual Clinic section. |
| `*` | 404 Not Found | Catch-all error page | Minimal error container | None | Lost Visitors | **EXISTS (Retain)** | Functional error boundary. |

---

## 5. Component Inventory

### A. Layout & Navigation
| Component | File Path | Usage | Reusability | Retain / Redesign | Infographic Support |
|---|---|---|---|---|---|
| `Navbar` | [`src/components/Navbar.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/Navbar.tsx) | Global header | High | **REDESIGN** | Reorganize dropdowns from multi-industry to the 17 strategic public sections; add badge indicators. |
| `Footer` | [`src/components/Footer.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/Footer.tsx) | Global footer | High | **RETAIN WITH MODS** | Keep corporate legal entity credentials, addresses, and academy link; update link matrix. |
| `ScrollToTop`| [`src/components/ScrollToTop.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/ScrollToTop.tsx) | Route listener | High | **KEEP AS-IS** | Essential utility for SPA navigation. |

### B. Hero & Presentation
| Component | File Path | Usage | Reusability | Retain / Redesign | Infographic Support |
|---|---|---|---|---|---|
| `HeroSection` | [`src/components/HeroSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/HeroSection.tsx) | Homepage | Medium | **REDESIGN** | Update headline to strategy standard: *"Connected Healthcare. Intelligent Diagnostics. Continuous Care."* Add visual entry nodes immediately below. |
| `IntroSection` | [`src/components/IntroSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/IntroSection.tsx) | Homepage | Medium | **MERGE / REDESIGN** | The 3D CSS brain orb is visually rich; merge with Master Ecosystem center. |

### C. Healthcare & Diagnostics Sections
| Component | File Path | Usage | Reusability | Retain / Redesign | Infographic Support |
|---|---|---|---|---|---|
| `HealthcareEcosystemSection` | [`src/components/HealthcareEcosystemSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/HealthcareEcosystemSection.tsx) | Homepage | High | **REDESIGN** | Currently 6 card segments; evolve into an interactive Master Ecosystem hub-and-node visualization. |
| `SolutionsSection` | [`src/components/SolutionsSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/SolutionsSection.tsx) | Homepage | Medium | **SPLIT / REDESIGN** | Split out diagnostics and clinical decision support into dedicated interactive pipelines. |
| `CuraVoiceAISection` | [`src/components/CuraVoiceAISection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/CuraVoiceAISection.tsx) | Homepage | High | **RETAIN WITH MODS** | Audio playback works smoothly; add authorization badges and clinical oversight indicators. |

### D. Partner, Franchise & Expansion Components
| Component | File Path | Usage | Reusability | Retain / Redesign | Infographic Support |
|---|---|---|---|---|---|
| `PartnerEcosystemTeaser` | [`src/components/PartnerEcosystemTeaser.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/PartnerEcosystemTeaser.tsx) | Homepage | High | **RETAIN WITH MODS** | Excellent dark gradient styling; update copy to distinguish targets from active operations. |
| `IndiaTerritoryMap` | [`src/components/territory/IndiaTerritoryMap.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/territory/IndiaTerritoryMap.tsx) | Application & Admin | High | **REUSE & EXPAND** | Can be evolved into the interactive National Network Infographic. |

### E. Corporate, Leadership & Inbound
| Component | File Path | Usage | Reusability | Retain / Redesign | Infographic Support |
|---|---|---|---|---|---|
| `DirectorsSection` | [`src/components/DirectorsSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/DirectorsSection.tsx) | Homepage & About | High | **RETAIN AS-IS** | Authentic bios and leadership photos. |
| `AboutSection` | [`src/components/AboutSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/AboutSection.tsx) | Homepage & About | Medium | **RETAIN WITH MODS** | Ensure holding company relationship (Genquantis Pvt Ltd) is transparently conveyed. |
| `ContactSection` | [`src/components/ContactSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/ContactSection.tsx) | Homepage & Contact | High | **RETAIN & SECURE** | Move API keys to backend proxy; preserve office addresses and map embed. |

### F. UI Primitives (`src/components/ui/` - 49 Components)
All standard Radix UI + shadcn/ui components (`accordion`, `alert-dialog`, `badge`, `button`, `card`, `dialog`, `drawer`, `dropdown-menu`, `input`, `progress`, `sheet`, `sidebar`, `tabs`, `toast`, etc.) are completely implemented, type-checked, and **RETAIN AS-IS**.

---

## 6. Existing Design System

### Current Design System Tokens
- **Primary Color**: `hsl(215, 100%, 45%)` (Vibrant Clinical Royal Blue).
- **Secondary Color**: `hsl(190, 90%, 95%)` (Soft Clinical Cyan / Ice Blue).
- **Background**: Soft multi-radial gradient combining `hsl(190, 80%, 95%)` and `hsl(215, 100%, 95%)` over `hsl(210, 60%, 98%)`.
- **Dark Mode**: Configured in Tailwind with `.dark` class (`hsl(220, 50%, 5%)` background, `hsl(215, 90%, 60%)` primary).
- **Typography**: 
  - Primary Sans: `Outfit`, `Inter`, system-ui.
  - Headings / Technical: `Space Grotesk`.
  - Serifs: `Instrument Serif` (loaded in `index.html`).
  - Monospace: `JetBrains Mono` / `Courier New`.
- **Card Styling (`.medical-glass`)**: `bg-white/60 backdrop-blur-lg border border-white/20 shadow-lg`.
- **Borders & Radii**: Default radius is `0.75rem` (`var(--radius)`). Section containers use `rounded-[32px]` or `rounded-[40px]`.

### Design System Comparison
```
CURRENT DESIGN SYSTEM                          REQUIRED DESIGN SYSTEM (STRATEGY-ALIGNED)
─────────────────────────────────────────────  ──────────────────────────────────────────────────────────
• Colors: Clinical Blue + Cyan + Dark Slate    • RETAIN Core Palette: Clinical Blue, Cyan, Slate.
• Inconsistent Accent Colors across pages:     • UNIFY Accents: Establish dedicated semantic accents:
  - Amber/Orange on Products page                - Clinical / Care: Royal Blue (#2563EB)
  - Emerald on Finance page                      - Diagnostics / Lab: Teal / Cyan (#0D9488 / #06B6D4)
  - Pink/Purple on Demo Center                   - AI Intelligence: Indigo / Violet (#6366F1 / #8B5CF6)
• Typography: Outfit + Space Grotesk + Inter   • RETAIN Typography: Inter (body), Space Grotesk (data/
• Card Styles: Heavy glassmorphism               labels), Outfit (headings).
• Interactive Pipeline Styles: None            • INTRODUCE: SVG node-connection tokens, pulsing signal lines,
• Status Indicators: Single static green dot     circular progress rings, and standardized status badges
  with hardcoded "Deployed" label                (CONCEPT, PROTOTYPE, PLANNED, PRODUCTION).
```

---

## 7. Existing Content Architecture

| Content Area | Existing Assets | What is Missing | Conflict with Strategy | Recommended Strategic Action |
|---|---|---|---|---|
| **Homepage** | Hero headline, 6 ecosystem cards, voice AI bento, 13 solution cards, team bios, facility photo. | Visual ecosystem diagram, 8-card patient journey, diagnostic pipeline, national network roadmap, command center loop, quality cycle. | Mentions "13 solutions" without explaining the clinical continuum; lacks the governance and clinical review layer. | **REDESIGN** into the recommended 15-section narrative flow. |
| **Healthcare & Clinics** | Generic GenAI and Agentic AI subpages (`/industries/healthcare/*`). | Reference healthcare center clinic model, service-to-space layout, physical-digital integration. | Framed as software industry subdomains rather than operating clinical centers. | **REPOSITION** to `/healthcare` with Reference Clinic architecture. |
| **Diagnostics** | Card in ecosystem section; `/solutions/lab-integration`. | 11-step diagnostic workflow pipeline, sample tracking, cold-chain transport, QC validation protocols. | Lab integration is framed only as software HL7 data exchange. | **ADD** dedicated `/diagnostics` route featuring the Diagnostics Pipeline Infographic. |
| **AI Architecture** | Feature lists mentioning LLMs and pattern recognition. | Phase 8 architecture pipeline (Access -> Fusion -> AI Intelligence -> Orchestration -> Professional Review -> Referral -> Network). | AI is often described as automating decisions rather than supporting qualified clinicians. | **ADD** interactive AI Architecture Infographic showing "AI assists; clinician decides". |
| **CuraVoice™** | 5 high-quality audio files (`appointment.wav`, `crital_alert.wav`, etc.), waveform UI. | Conversational governance tree, medical consent protocol, multilingual regional mapping. | Misrouted to `/insights`; includes unverified 99.9% uptime and <500ms latency marketing stats. | **REPOSITION** to `/curavoice`; add clinical oversight indicators. |
| **National Network** | Interactive 36-territory selector in partner wizard. | National network hierarchy (Local -> Regional -> State -> National), long-term target context. | Does not visually show the hub-and-spoke relationship or expansion rollout. | **ADD** dedicated `/network` page with National Network Infographic. |
| **Rural Healthcare** | Minor text mentions in `ZerolangT` card. | Rural Hub-and-Spoke model, rural access points, telemedicine links to tertiary centers, sample transport. | Completely absent as a primary strategic pillar. | **ADD** dedicated `/rural-healthcare` section with Hub & Spoke Infographic. |
| **Franchise / Expansion** | Full application wizard, status tracking, governance matrix, ₹2.5L onboarding disclosure. | 19-stage progressive franchise lifecycle visualization, expansion governance gate. | Currently exists as form screens; lacks the strategic lifecycle infographic. | **RETAIN** existing portal; **ADD** Franchise Lifecycle Infographic. |
| **Quality & Governance** | Governance matrix ("Channel Partners May / Cannot"). | Signature circular Quality Cycle (*Build -> Prove -> Standardize -> Certify -> Replicate -> Monitor -> Improve*). | Governance is currently limited to commercial partner rules. | **ADD** dedicated `/quality-governance` page with Quality Cycle Infographic. |
| **Command Center** | `ManagementDashboard.tsx` (application scrutiny board). | National Command Center hierarchy, 16 functional command areas, Data-to-Action Command Loop (*Signal -> Validation -> Alert -> Authority -> Action -> Learning*). | Command Center is conflated with partner applicant administration. | **ADD** Command Center visualization illustrating enterprise clinical & operational oversight. |

---

## 8. Existing User Journeys

```mermaid
graph TD
    subgraph Current_Website_Journeys [Current Website User Paths]
        V[Visitor arrives at /] -->|Scrolls Homepage| H[Hero -> 6 Cards -> Teaser -> Voice -> Solutions -> Team]
        V -->|Clicks HealthTech AI| S[/solutions - Static 13 Solution Cards]
        V -->|Clicks Capabilities| Ind[/industries/healthcare - GenAI / AgenticAI]
        V -->|Clicks Demo Center| DC[/demo-center - 14 Cards, all marked Deployed]
        V -->|Clicks CuraVoice AI| Ins[/insights - Audio Player Showcase]
        V -->|Clicks Virtual Tour| VT[/360deg.html - Standalone 3D Canvas]
        V -->|Clicks Partner Portal| PP[/partner-portal - Commercial Gateways]
        PP -->|Files Application| App[/apply/:pathway - 4-Step Form Wizard]
        App -->|Receives Ref CQ-2026-XXXX| Track[Status Tracking & Login]
        Track -->|Applicant Credentials| PD[/portal/partner-dashboard - Personal Docket]
        Track -->|Executive Credentials| MD[/portal/admin - Scrutiny Board Management]
    end
```

### Analysis of User Journeys
1. **Visitor / Patient Journey is Fractured**: A patient or clinician visiting the site cannot see how a patient enters a clinic, gets diagnosed, receives review, and gets ongoing follow-up. They encounter disconnected technology solution cards.
2. **Partner / Investor Journey is Surprisingly Advanced**: The partner acquisition journey (`/partner-portal` -> `/apply/:pathway` -> `/portal/partner-dashboard`) is well thought out, including field assistance mode and reference number tracking.
3. **Executive / Management Journey is Functional**: The Scrutiny Board (`/portal/admin`) allows filtering by state, review of applications, audit logging, and status transitions, although authentication is currently simulated in the browser.

---

## 9. Existing Data Architecture

| Category | Implementation | Location | Persistence | Strategic Assessment |
|---|---|---|---|---|
| **Partner Applications** | In-memory + LocalStorage + MongoDB API sync | [`src/lib/partnerStore.ts`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/lib/partnerStore.ts#L3) | Browser LocalStorage (`curaquantis_partner_applications_v1`) + MongoDB Collection | **HYBRID**: Works offline with seed dockets; syncs with Express server if online. |
| **Territories & Zones** | Static TypeScript dataset | [`src/data/indiaTerritories.ts`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/data/indiaTerritories.ts) | Bundle static data | **EXCELLENT**: Complete 36 States/UTs, population, tiers, and hubs. Fully reusable. |
| **Demo Projects** | Static in-file array | [`src/pages/DemoCenter.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/DemoCenter.tsx#L7) | In-memory component state | **NEEDS CONFIG EXTRACTION**: Extract to `src/data/demoProjects.ts` and add status badges. |
| **CuraVoice Integrations** | Static in-file array + local `.wav` files | [`src/pages/Insights.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/Insights.tsx#L29), [`src/components/CuraVoiceAISection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/CuraVoiceAISection.tsx#L10) | Audio files in `/public` | **GOOD**: Audio playback works cleanly via HTML5 audio element refs. |
| **Infographic Data** | Currently hardcoded in various components | Various | Transient JSX | **FUTURE ARCHITECTURE REQUIRED**: All 21 infographics should consume typed, config-driven data models. |

---

## 10. Existing Authentication / Permissions

### Current Implementation: `src/lib/authStore.ts`
- **Roles Defined**: `'admin' | 'partner' | 'applicant'`.
- **Session Storage**: `localStorage.getItem('curaquantis_auth_session_v1')`.
- **Admin Authentication**: Hardcoded evaluation in client:
  ```typescript
  // Lines 51-56 in src/lib/authStore.ts:
  (cleanEmail === 'admin@curaquantis.com' && password === 'Admin@CuraQuantis2026') ||
  (cleanEmail === 'dharani@curaquantis.com' && password === 'Dharani@CuraQuantis2026') ||
  (cleanEmail === 'ashwin@genquantis.com' && password === 'Ashwin@2026') ||
  (cleanEmail === 'admin' && password === 'admin123')
  ```
- **Applicant Authentication**: Matches reference number (`CQ-2026-XXXXXX`) against applicant phone number or email stored in `partnerStore`.
- **JWT Handling**: Generates pseudo-tokens in browser (`JWT_CQ_ADMIN_${Date.now()}`).

### Required Architecture vs. Current Architecture
- **Current**: Prototype / Client-side mock auth.
- **Required**:
  - Secure Portals (Partner Portal, Investor Portal, Center Dashboard, National Command Center) must remain marked **PROTOTYPE / DEMO** or **FUTURE**.
  - Passwords and tokens must NEVER be stored in frontend files. When backend authentication is implemented, real JWT/HttpOnly cookies and bcrypt hashing must be used.

---

## 11. Existing Backend/API Architecture

The codebase contains two parallel server implementations:
1. [`server/index.cjs`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/server/index.cjs) (309 lines)
2. [`curaquantis/server.cjs`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/curaquantis/server.cjs) (329 lines) — *Target of `npm run server`*

### Endpoint Inventory
- `GET /api/health` — Health check, database status, connection latency.
- `POST /api/partner/applications` — Ingests or updates partner application dockets.
- `GET /api/partner/applications` — Retrieves filtered list of applications (supports search, pathway, status).
- `GET /api/partner/applications/:id` — Retrieves specific application by reference ID.
- `PATCH /api/partner/applications/:id/status` — Updates application status and logs audit entry.
- `POST /api/partner/applications/:id/clarifications` — Appends clarification messages.
- `POST /api/partner/leads` — Registers franchise candidate lead.
- `GET /api/partner/leads` — Retrieves leads for management review.

**Resilience Feature**: Both servers include an in-memory fallback store (`memoryStore = { applications: [], leads: [] }`). If MongoDB Atlas is unreachable or offline, the server logs a warning and gracefully serves requests from memory without crashing.

---

## 12. Existing Integrations

1. **MongoDB Atlas**: Configured in `.env` (`cluster0.jbxr6v1.mongodb.net/curaquantis`). Mongoose schemas for `PartnerApplication`, `InvestorLead`, and `User`.
2. **EmailJS**: Client-side SDK in `ContactSection.tsx` and `emailNotification.ts`. Hardcoded public key (`CG70ICmTB8Mb4O6gi`) and service/template IDs.
3. **Google Maps Embed**: Embedded iframe in `ContactSection.tsx` centered on T-Hub Phase 2, Hyderabad Knowledge City.
4. **Three.js (CDN)**: Loaded via `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js">` inside `public/360deg.html`.
5. **Google Fonts**: Preconnected in `index.html` loading `Inter`, `Outfit`, `Space Grotesk`, `Instrument Serif`, and `JetBrains Mono`.

---

## 13. Existing Animation / Visualization Architecture

1. **Framer Motion (`framer-motion 11.0.8`)**: Used in `Insights.tsx`, `CuraVoiceAISection.tsx`, and `NonInvasiveVentilator.tsx` for scroll-triggered viewport animations, staggered card entrances, and audio waveform visualizations.
2. **CSS Keyframe Animations (`tailwind.config.ts`)**:
   - `accordion-down`, `accordion-up`
   - `fade-in`, `slide-in-left`, `slide-in-right`
   - `float` (`translateY(-20px)`)
   - `particles` (`rotate(240deg)`)
   - `.medical-glass` and `.silent-card` backdrop-blur effects
3. **Recharts (`recharts 2.12.7`)**: Installed in `package.json`, configured with shadcn/ui chart wrapper (`src/components/ui/chart.tsx`), ready for dashboard metrics.
4. **Interactive 3D Canvas (`Three.js`)**: Standalone interactive first-person renderer with collision detection, minimap, raycasting object selection, and room HUD in `public/360deg.html`.

**Recommendation for Future Infographics**:
- Do **NOT** introduce heavy external canvas libraries (such as D3, PixiJS, or Three.js) for 2D flowcharts.
- Build the 21 interactive infographics using **SVG + Tailwind CSS + Framer Motion**. This guarantees crisp vector scaling, lightweight bundle impact, mobile responsiveness, and full DOM accessibility.

---

## 14. Existing Responsive Architecture

- **Viewport Configuration**: Standard `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` in `index.html`.
- **Breakpoints**: Tailwind standard (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1400px`).
- **Mobile Hook**: [`src/hooks/use-mobile.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/hooks/use-mobile.tsx) actively listens to `(max-width: 767px)`.
- **Mobile Menu**: [`src/components/Navbar.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/Navbar.tsx#L195) provides an overlay drawer with collapsible dropdowns.
- **Audit Findings**:
  - `Navbar.tsx` on desktop has 9 horizontal items, causing text wrapping or clipping between 1024px and 1200px.
  - Large audio files on `Insights.tsx` cause slow initial asset rendering on cellular networks.
  - `IndiaTerritoryMap.tsx` transforms cleanly on mobile into a searchable, categorized list. This pattern should be replicated for all future infographics.

---

## 15. Existing SEO

- **Title Tag**: `"CuraQuantis Health Clinics - Empowering Industries with Next-Gen AI"` (*Needs update: Misaligned with healthcare focus*).
- **Meta Description**: `"Leading AI solutions company transforming healthcare, finance, defence, and more..."` (*Needs rewrite to focus on connected Pan-India healthcare & diagnostic ecosystem*).
- **OpenGraph & Twitter Tags**: Present, but `og:image` points to generic `lovable.dev/opengraph-image-p98pqg.png`.
- **Robots & Sitemap**: `public/robots.txt` exists (`User-agent: * Allow: /`). `sitemap.xml` is missing.
- **Semantic HTML**: Sections use `<section>` and `<h2>`, but multiple `<h1>` tags exist across subcomponents (e.g. in `Footer.tsx` lines 71, 76, 80).

---

## 16. Existing Accessibility (a11y)

- **UI Primitives**: Radix UI components include built-in WAI-ARIA attributes, focus traps, and keyboard navigation.
- **Color Contrast**: Dark navy (`text-blue-950`) on white passes WCAG AAA. Muted blue-gray (`text-blue-900/60`, `text-slate-500`) passes WCAG AA on large text, but some small labels (`text-[10px] text-blue-100/40`) fail contrast checks.
- **Audio & Media**: Audio controls in `CuraVoiceAISection.tsx` lack `aria-label` tags describing play/pause state.
- **Reduced Motion**: Neither `tailwind.config.ts` nor CSS classes currently implement `@media (prefers-reduced-motion: reduce)`.
- **Infographic Accessibility Mandate**: Every future animated infographic must include accessible text equivalents (`sr-only` descriptions or structured data tables) to ensure screen-reader readability.

---

## 17. Existing Performance

- **Audio File Weight in `/public`**:
  - `insurance Z.wav`: **43.8 MB**
  - `diaagnostic.wav`: **24.6 MB**
  - `curaPharma.wav`: **23.2 MB**
  - `crital_alert.wav`: **12.3 MB**
  - `appointment.wav`: **7.5 MB**
  - *Total uncompressed audio in public folder exceeds 112 MB!*
  - **Remediation**: Convert `.wav` files to compressed `.mp3` or `.webm` audio (reducing file sizes by ~90% without quality loss) in a future phase.
- **Image Assets**: Several images in `/public` are large unoptimized PNGs (`Ananya.png` is 2.03 MB, `Ashwin-1.png` is 2.00 MB, `logo.png` is 1.34 MB). They should eventually be converted to modern `.webp`.
- **Bundle Splitting**: Vite is currently set to standard single-chunk output. Large dependencies (`recharts`, `framer-motion`, `radix-ui`) should be split into vendor chunks.

---

## 18. Existing Security Audit

| Vulnerability / Risk | Location | Severity | Details | Remediation in Future Phase |
|---|---|---|---|---|
| **Exposed Production MongoDB URI** | [`.env`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/.env#L2) | **CRITICAL** | Full MongoDB connection string with plaintext username and password committed directly to repo. | Rotate Atlas credentials immediately; ensure `.env` is gitignored; use server-side environment variables. |
| **Hardcoded Administrative Credentials** | [`src/lib/authStore.ts`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/lib/authStore.ts#L18) | **CRITICAL** | Passwords for `admin@curaquantis.com`, `dharani@curaquantis.com`, and `ashwin@genquantis.com` hardcoded in client code. | Remove credentials from frontend; implement server-side authentication with bcrypt & JWT cookies. |
| **Hardcoded Third-Party API Keys** | [`src/components/ContactSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/ContactSection.tsx#L37) | **MEDIUM** | EmailJS public key (`CG70ICmTB8Mb4O6gi`) and service/template IDs hardcoded in frontend component. | Move contact email dispatch to server endpoint (`/api/contact`). |
| **CORS Wildcard** | [`server/index.cjs`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/server/index.cjs#L15) | **LOW** | `app.use(cors({ origin: '*' }))` allows requests from any origin. | Restrict CORS origin to production domains. |

---

## 19. Strategy-to-Code Mapping

| Strategy Requirement | Existing Website Location | Existing Implementation | Gap | Recommended Action | Priority |
|---|---|---|---|---|---|
| **1. Executive Direction** | Homepage & Metadata | Multi-industry AI copy ("healthcare, finance, defence, meat") | Missing clear positioning as a connected Pan-India clinic & diagnostic network | **REDESIGN** metadata, headlines, and narrative flow | **P0** |
| **2. Core Website Story** | Across various pages | Disconnected solution cards | Missing the continuous narrative from clinic access to national command loop | **REDESIGN** homepage section sequence | **P0** |
| **3. Master Ecosystem Infographic** | [`HealthcareEcosystemSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/HealthcareEcosystemSection.tsx) | 6 card segments (CuraElite, CuraClinics, CuraDiagnostics, CuraCover, etc.) | Lacks central visual hub connecting patients, AI, diagnostics, clinics, and governance | **REDESIGN** into an interactive connected ecosystem diagram | **P0** |
| **4. Hero Section** | [`HeroSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/HeroSection.tsx) | Typewriter text: "AI Powered Healthcare Ecosystem" | Headline and supporting line do not match strategy brief; lacks entry node buttons | **REDESIGN** copy and add 5 visual entry points below hero | **P0** |
| **5. How CuraQuantis Works (Phase 8 AI)** | [`SolutionsSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/SolutionsSection.tsx) | Card #13 ("AI Orchestration Layer") | Missing the 8-node end-to-end clinical architecture pipeline | **ADD** interactive Phase 8 AI Architecture Infographic | **P0** |
| **6. Patient Journey Infographic** | Partially in [`SolutionsSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/SolutionsSection.tsx) | Scattered across OPD, billing, navigation cards | Missing the 8-card journey: *Discover -> Register -> Assess -> Consult -> Diagnose -> Review -> Care -> Follow-up* | **ADD** 8-card animated Patient Journey Infographic | **P0** |
| **7. Diagnostics Pipeline** | [`LabIntegration.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/solutions/LabIntegration.tsx) | Text list of HL7/FHIR features | Missing 11-step diagnostic workflow (*Patient ID -> Order -> Collection -> Labelling -> Transport -> Testing -> QC -> Validation -> Report -> Review -> Patient*) | **ADD** animated Diagnostics Pipeline Infographic | **P0** |
| **8. CuraVoice™ Flow** | [`CuraVoiceAISection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/CuraVoiceAISection.tsx), [`Insights.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/Insights.tsx) | Audio player bento grid with working sound clips | Needs conversational architecture flow and explicit clinician authorization indicators | **REPOSITION** to `/curavoice`; **ADD** conversational flow diagram | **P1** |
| **9. Demo Center** | [`DemoCenter.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/DemoCenter.tsx) | 14 project cards with detail modal; all marked "Deployed" | Cards must be classified with accurate capability tags (*CONCEPT*, *PROTOTYPE*, *PLANNED*, *PRODUCTION*) | **RETAIN & REDESIGN** status labeling system | **P1** |
| **10. Virtual Clinic Tour** | [`public/360deg.html`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/public/360deg.html) | Standalone 3D canvas with 9 rooms | Not integrated into main site navigation; lacks 5 strategic zone mapping | **REUSE / INTEGRATE** into a 5-zone interactive clinic tour | **P1** |
| **11. National Network** | [`IndiaTerritoryMap.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/territory/IndiaTerritoryMap.tsx) | Territory selector for application forms | Missing visual hierarchy (*Local -> Regional -> State -> National*) | **ADD** National Network Infographic using territory canvas | **P1** |
| **12. Long-Term Network Targets** | [`AboutSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/AboutSection.tsx) | Mentions "28+ States" | Target numbers (3,000 clinics, 7,000 labs, 10,000 locations) must be labeled as strategic targets | **REDESIGN** target metrics cards with explicit strategic target labels | **P0** |
| **13. Rural Healthcare (Hub & Spoke)** | None | Absent | Missing hub-and-spoke flow (*Community -> Access Point -> Rural Center -> Diagnostic Hub -> Specialist -> Hospital*) | **ADD** Rural Hub-and-Spoke Infographic | **P1** |
| **14. Franchise Lifecycle** | [`PartnerPortalHub.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/partner/PartnerPortalHub.tsx) | Application pathways and text criteria | Missing 19-stage progressive lifecycle timeline | **ADD** Franchise Lifecycle Infographic | **P1** |
| **15. Quality & Governance Cycle** | None | Absent | Missing signature 7-stage circular cycle (*Build -> Prove -> Standardize -> Certify -> Replicate -> Monitor -> Improve*) | **ADD** signature circular Quality Cycle Infographic | **P0** |
| **16. Research & Innovation Cycle** | None | Absent | Missing 10-step innovation workflow (*Observe -> Identify -> Research -> Pilot -> Validate -> Govern -> Standardize -> Deploy -> Measure -> Improve*) | **ADD** Research & Innovation Infographic on Insights page | **P2** |
| **17. Workforce & Academy Lifecycle** | External link in footer | External link to `academy.genquantaa.com` | Missing 8-step lifecycle (*Recruit -> Credential -> Training -> Competency -> Authorization -> Deployment -> Learning -> Re-certification*) | **ADD** Workforce Lifecycle Infographic | **P2** |
| **18. Technology Backbone** | [`DemoCenter.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/DemoCenter.tsx) Card #10 | Text overview of Clinical Data Fusion Engine | Missing central platform architecture connecting APIs, clinical systems, AI, identity, and analytics | **ADD** Technology Backbone Architecture diagram | **P1** |
| **19. Cybersecurity Architecture** | None | Generic security bullet points | Missing 8-stage pipeline (*Identity -> Authentication -> Authorization -> Data Protection -> Auditability -> AI Governance -> Incident Response -> Continuity*) | **ADD** Cybersecurity Architecture Infographic | **P1** |
| **20. National Command Center** | [`ManagementDashboard.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/partner/ManagementDashboard.tsx) | Application review dashboard | Missing 6-level command hierarchy and 16 functional command areas | **ADD** National Command Center Infographic | **P1** |
| **21. Data-to-Action Command Loop** | None | Absent | Missing 10-step loop (*Data -> Signal -> Validation -> Alert -> Authority -> Decision -> Action -> Verification -> Closure -> Learning*) with "Alert ≠ Decision" rule | **ADD** Command Loop Infographic | **P1** |
| **22. National Rollout Roadmap** | None | Absent | Missing scroll-based roadmap (*Foundation -> Reference Center -> Cluster -> Regional Hub -> State -> Tier 2/3 -> Rural -> National Network*) | **ADD** National Expansion Roadmap Infographic | **P1** |
| **23. Expansion Gate** | None | Absent | Missing governance gate (*STOP -> MEASURE -> REVIEW -> CORRECT -> APPROVE -> SCALE*) | **ADD** Expansion Gate component to expansion sections | **P1** |
| **24. Public Architecture** | `App.tsx` routes | 41 mixed routes (many non-healthcare) | Lacks clean 17-page structure; some pages missing; others misrouted | **RESTRUCTURE** public routing table | **P1** |
| **25. Homepage Narrative Sequence** | `Index.tsx` | Old sequence with legacy solutions | Needs 15-section narrative flow | **REDESIGN** Homepage layout | **P0** |
| **26. 52-Phase Strategy Explorer** | None | Absent | Missing dedicated interactive explorer grouping 52 phases | **ADD** interactive 52-Phase Strategy Explorer page | **P2** |

---

## 20. 52-Phase Traceability Matrix

| Phase Range | Strategic Area | Destination Page / Route | Existing Code Representation | Architectural Gap | Priority |
|---|---|---|---|---|---|
| **Phase 1–2** | Positioning, National Vision & Holding Structure | `/about`, `/` (Hero) | [`HeroSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/HeroSection.tsx), [`AboutSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/AboutSection.tsx) | Clarify holding company (Genquantis Pvt Ltd) and Pan-India vision | **P0** |
| **Phase 3–5** | Website Architecture, Audience Segments & Patient Journey | `/`, `/patient-care` | [`Navbar.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/Navbar.tsx) | Add 8-card Patient Journey Infographic; clean up audience navigation | **P0** |
| **Phase 6–7** | Healthcare Center Services & Diagnostics Lab Network | `/healthcare`, `/diagnostics` | [`HealthcareEcosystemSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/HealthcareEcosystemSection.tsx), [`LabIntegration.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/solutions/LabIntegration.tsx) | Add Diagnostics Pipeline Infographic and Reference Center layouts | **P0** |
| **Phase 8–9** | AI Architecture & CuraVoice™ Conversational Intelligence | `/ai-technology`, `/curavoice` | [`CuraVoiceAISection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/CuraVoiceAISection.tsx), [`Insights.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/Insights.tsx) | Add Phase 8 AI Architecture Infographic; reposition CuraVoice route | **P0** |
| **Phase 10–13**| Demo Center, Virtual Clinic & Investor Decision Center | `/demo-center`, `/virtual-clinic`, `/investors` | [`DemoCenter.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/DemoCenter.tsx), [`360deg.html`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/public/360deg.html) | Add status labels (PROTOTYPE/PLANNED); integrate 5-zone 3D clinic | **P1** |
| **Phase 14–18**| Franchise Lifecycle, Rural Hub-and-Spoke & Tech Backbone | `/franchise`, `/rural-healthcare`, `/technology` | [`PartnerPortalHub.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/partner/PartnerPortalHub.tsx), [`ApplyPathway.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/partner/ApplyPathway.tsx) | Add 19-stage Franchise Timeline, Rural Hub & Spoke, and Tech Backbone | **P1** |
| **Phase 19–25**| Quality, Compliance, Academy, Supply Chain & Security | `/quality-governance`, `/academy`, `/security` | Footer external link, [`PartnerPortalHub.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/partner/PartnerPortalHub.tsx) matrix | Add Quality Cycle Infographic, Workforce Lifecycle, and Security Pipeline | **P1** |
| **Phase 26–31**| Commercial Network, Territory Rights & Conversion Ops | `/partners`, `/apply/:pathway` | [`IndiaTerritoryMap.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/territory/IndiaTerritoryMap.tsx), `partnerStore.ts` | Territory mapping exists; add conversion funnel and network explorer | **P1** |
| **Phase 32–39**| Clinical Governance, Regulatory, Master OS & Expansion | `/quality-governance`, `/command-center` | None | Add Expansion Gate (*STOP -> MEASURE -> SCALE*) and Clinical Governance | **P2** |
| **Phase 40–46**| Reference Healthcare Center: Space, Equipment & Workforce | `/virtual-clinic`, `/healthcare` | [`360deg.html`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/public/360deg.html) | Connect 5 physical zones to operational, clinical, and tech concepts | **P2** |
| **Phase 47–51**| National Command Center & Control Room Architecture | `/command-center` | [`ManagementDashboard.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/partner/ManagementDashboard.tsx) | Add Command Center Hierarchy and Data-to-Action Command Loop | **P2** |
| **Phase 52**   | National Rollout Master Plan & Replication Engine | `/network`, `/strategy-explorer` | None | Add scroll-based National Rollout Roadmap Infographic | **P2** |

---

## 21. Homepage Gap Analysis

```
CURRENT HOMEPAGE                                     PROPOSED HOMEPAGE (STRATEGY SECTION 25)
─────────────────────────────────────────────────    ─────────────────────────────────────────────────────────────
1. Navbar                                            1. Hero Section ("Connected Healthcare. Intelligent Diagnostics...")
2. HeroSection (Typewriter text)                     2. Master CuraQuantis Ecosystem Infographic (Hub & Node)
3. IntroSection (AI Orb + 4 generic cards)           3. How CuraQuantis Works (Phase 8 AI Architecture Pipeline)
4. HealthcareEcosystemSection (6 card segments)      4. Patient Journey Infographic (8 Animated Steps)
5. PartnerEcosystemTeaser (Dark banner + 3 cards)    5. Healthcare + Diagnostics Dual Pillar
6. CuraVoiceAISection (Audio player bento grid)      6. AI Intelligence Layer (Decision Support ≠ Autonomous Clinic)
7. [IndustriesSection - Commented Out]               7. CuraVoice™ Conversational Healthcare
8. WhyAISection (Generic AI metrics: <1ms, 99.9%)   8. Virtual Clinic Tour (5-Zone Interactive Experience)
9. SolutionsSection (13 3D flip cards)               9. Rural Healthcare Hub-and-Spoke Visualization
10. AboutSection (Milestones & mission)              10. National Network Hierarchy (Local -> Regional -> National)
11. DirectorsSection (Leadership bios & headshots)   11. Quality & Governance Cycle (Signature Circular Infographic)
12. ContactSection (Form + Google Maps iframe)       12. National Command Center (Data-to-Action Loop)
13. Facility Frontview Image (`/CuraQuantis.jpeg`)   13. National Expansion Roadmap (Scroll-based visual expansion)
14. Footer                                           14. Partners / Investors / Franchise Portals
                                                     15. Final Call-to-Action & Contact
```

---

## 22. Page-by-Page Gap Analysis

| Route | Page Name | Current Content | Required Content | Action | Priority |
|---|---|---|---|---|---|
| `/` | Home | Partial solutions, no infographics | 15-section ecosystem narrative | **REDESIGN** | **P0** |
| `/healthcare` | Healthcare | Generic GenAI / Agentic AI cards | Reference clinic model, clinical workflows, physical-digital integration | **NEW / RESTRUCTURE** | **P0** |
| `/diagnostics` | Diagnostics | Absent (only subpage lab-integration) | 11-step diagnostic pipeline, pathology, radiology, QC, transport | **NEW** | **P0** |
| `/ai-technology` | AI & Technology | Scattered across solutions cards | Central platform architecture, Clinical Data Fusion, Phase 8 AI layer | **NEW** | **P0** |
| `/patient-care` | Patient Care | Absent | 8-stage patient journey, digital OPD, follow-up, telehealth | **NEW** | **P0** |
| `/curavoice` | CuraVoice™ | Currently misrouted to `/insights` | 8 touchpoints, clinical oversight badges, audio player demos | **REPOSITION** | **P0** |
| `/network` | National Network | Absent | National hierarchy, hub connectivity, long-term strategic targets | **NEW** | **P1** |
| `/rural-healthcare` | Rural Healthcare | Absent | Hub-and-spoke model, rural access points, diagnostic transport | **NEW** | **P1** |
| `/professionals` | For Healthcare Professionals | Absent | Doctor assist tools, transcription, clinical governance, clinical trials | **NEW** | **P1** |
| `/partners` | Partners | Teaser component on homepage | Channel partner tiers, eligibility, territory feasibility | **NEW** | **P1** |
| `/investors` | Investor Decision Center | Merged into partner portal | Unit economics, reference center CapEx/OpEx, long-term vision | **NEW** | **P1** |
| `/franchise` | Franchise Network | Overview in partner portal | 19-stage franchise lifecycle, center development standards, NABL/AERB | **NEW** | **P1** |
| `/academy` | CuraQuantis™ Academy | External link in footer | Workforce lifecycle (*Recruit -> Train -> Certify*), curriculum preview | **NEW** | **P2** |
| `/quality-governance`| Quality & Governance | Absent | 7-stage quality cycle, NABL/NABH compliance, auditability | **NEW** | **P1** |
| `/command-center`| National Command Center | Absent | Command hierarchy, 16 functional areas, Data-to-Action loop | **NEW** | **P1** |
| `/about` | About CuraQuantis | Timeline, mission, vision, board | Retain board bios, add holding company corporate structure | **RETAIN WITH MODS** | **P1** |
| `/insights` | Insights & Research | Currently hosts CuraVoice content | Reclaim for clinical whitepapers, research & innovation cycle | **REPURPOSE** | **P2** |
| `/contact` | Contact Us | Contact form + Google Maps embed | Retain form, secure backend email dispatch, retain corporate offices | **RETAIN & SECURE** | **P0** |
| `/demo-center` | Demo Center | 14 cards, all labeled "Deployed" | Retain 14 modules, implement capability status badges | **REDESIGN LABELS** | **P1** |
| `/strategy-explorer`| 52-Phase Strategy Explorer | Absent | Interactive explorer for all 52 phases grouped into 12 clusters | **NEW** | **P2** |
| `/partner-portal`| Partner Portal Hub | Pathway overview, tracking box | Retain existing pathways, tracking search, and governance matrix | **RETAIN AS-IS** | **P0** |
| `/apply/:pathway`| Application Wizard | 4-step wizard with territory map | Retain multi-step filing pipeline | **RETAIN AS-IS** | **P0** |
| `/portal/partner-dashboard` | Partner Docket | Secure status tracking & documents | Retain applicant status tracking docket | **RETAIN AS-IS** | **P0** |
| `/portal/admin` | Scrutiny Board | Executive management dashboard | Retain application vetting console; secure auth in future | **RETAIN AS-IS** | **P0** |

---

## 23. Infographic Mapping (21 Core Infographics)

| # | Infographic Name | Recommended Page | Recommended Section | Existing Component Anchor | New Component Required | Data Source | Layout (Desktop / Mobile) |
|---|---|---|---|---|---|---|---|
| **1** | Master CuraQuantis Ecosystem | `/`, `/about` | Ecosystem Overview | `HealthcareEcosystemSection.tsx` | `EcosystemMap.tsx` | Static / Config | Radial network / Stacked cards |
| **2** | How CuraQuantis Works | `/`, `/ai-technology` | Core Architecture | `SolutionsSection.tsx` | `AIArchitectureFlow.tsx` | Config-driven | Horizontal pipeline / Vertical sequence |
| **3** | AI Architecture (Intelligence Layer)| `/ai-technology` | Decision Support | `IntroSection.tsx` orb | `AIIntelligenceLayer.tsx`| Static | 3-tier architecture / Collapsible tiers |
| **4** | Patient Journey | `/`, `/patient-care` | Care Continuum | None | `PatientJourneyFlow.tsx` | Config-driven | 8-card horizontal timeline / Vertical cards |
| **5** | Diagnostics Pipeline | `/diagnostics`, `/` | Diagnostic Accuracy | `LabIntegration.tsx` | `DiagnosticPipelineFlow.tsx` | Config-driven | 11-step pipeline / Numbered stepper |
| **6** | CuraVoice™ Conversational Flow | `/curavoice`, `/` | Voice Intelligence | `CuraVoiceAISection.tsx` | `CuraVoiceFlow.tsx` | Static + Audio | Bento layout + waveform / Vertical cards |
| **7** | Demo Center Interactive Matrix | `/demo-center` | Demonstration Hub | `DemoCenter.tsx` | `DemoCenterMatrix.tsx` | Config-driven | 3-column grid / Single column with filters |
| **8** | Virtual Clinic 5-Zone Tour | `/virtual-clinic`, `/` | Physical Architecture | `public/360deg.html` | `VirtualClinicTour.tsx` | Static + 3D iframe | 5-tab zone switcher / Vertical accordion |
| **9** | National Network Infographic | `/network`, `/` | National Scale | `IndiaTerritoryMap.tsx` | `NationalNetworkMap.tsx` | Config (`indiaTerritories.ts`) | India SVG canvas / Zonal accordion |
| **10**| Rural Hub-and-Spoke Model | `/rural-healthcare`, `/` | Rural Equity | None | `RuralHubSpokeFlow.tsx` | Static / Config | Hub-spoke constellation / Stepped referral list |
| **11**| Franchise Development Lifecycle | `/franchise`, `/partner-portal`| Center Rollout | `PartnerPortalHub.tsx` | `FranchiseLifecycleTimeline.tsx` | Config-driven | 19-stage horizontal track / Vertical timeline |
| **12**| Quality & Governance Cycle | `/quality-governance`, `/`| Quality Philosophy | None | `QualityCycleCircular.tsx`| Static | Circular rotating SVG / 7 numbered cards |
| **13**| Research & Innovation Cycle | `/insights` | Innovation Method | None | `InnovationCycleFlow.tsx` | Static | 10-step circular loop / Numbered sequence |
| **14**| Workforce & Academy Lifecycle | `/academy` | Clinical Talent | Footer link | `WorkforceLifecycleFlow.tsx` | Static | Circular progression / Vertical checklist |
| **15**| Technology Backbone Architecture | `/technology`, `/ai-technology`| Scalable Platform | None | `TechnologyBackboneDiagram.tsx`| Static | Multi-tier stack diagram / Stacked layers |
| **16**| Cybersecurity & Governance Pipeline| `/security`, `/quality-governance`| Data Protection | None | `SecurityPipelineFlow.tsx` | Static | 8-stage security pipeline / Vertical badges |
| **17**| National Command Center Hierarchy | `/command-center`, `/` | Enterprise Oversight | `ManagementDashboard.tsx` | `CommandCenterHierarchy.tsx`| Config-driven | 6-tier tree hierarchy / Collapsible levels |
| **18**| Data-to-Action Command Loop | `/command-center` | Closed-Loop Governance| None | `CommandLoopDiagram.tsx` | Static | Circular closed loop / 10-step sequence |
| **19**| National Expansion Roadmap | `/network`, `/` | Expansion Strategy | None | `NationalExpansionRoadmap.tsx` | Config-driven | Scroll-triggered roadmap / Stepped track |
| **20**| Expansion Gate (Governance Filter)| `/quality-governance`, `/franchise`| Expansion Quality Gate | `PartnerPortalHub.tsx` matrix | `ExpansionGateWidget.tsx` | Static | Horizontal gate banner / Warning callout card |
| **21**| 52-Phase Strategy Explorer | `/strategy-explorer` | Master Blueprint | None | `StrategyPhaseExplorer.tsx`| Config (`phasesData.ts`)| 12-cluster filterable grid / Drawer detail view |

---

## 24. Components to Reuse

| File | Exact Path | Reason to Reuse | Dependencies | Risk Level |
|---|---|---|---|---|
| `IndiaTerritoryMap.tsx` | [`src/components/territory/IndiaTerritoryMap.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/territory/IndiaTerritoryMap.tsx) | Complete interactive territory selector with 36 States/UTs, zone filtering, and search. | `indiaTerritories.ts` | Low |
| `indiaTerritories.ts` | [`src/data/indiaTerritories.ts`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/data/indiaTerritories.ts) | Verified territorial data for India. | None | Zero |
| `DirectorsSection.tsx` | [`src/components/DirectorsSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/DirectorsSection.tsx) | High-quality bios and verified photographs for 6 executive directors. | `lucide-react`, images in `/public` | Low |
| `ApplyPathway.tsx` | [`src/pages/partner/ApplyPathway.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/partner/ApplyPathway.tsx) | Exhaustive 4-stage application wizard with validation, territory selection, and file uploads. | `IndiaTerritoryMap`, `PartnerStore` | Low |
| `PartnerDashboard.tsx` | [`src/pages/partner/PartnerDashboard.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/partner/PartnerDashboard.tsx) | Fully functional partner docket tracking status, documents, clarifications, and lead submissions. | `PartnerStore`, `AuthStore` | Low |
| `ManagementDashboard.tsx` | [`src/pages/partner/ManagementDashboard.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/partner/ManagementDashboard.tsx) | Rich administrative review console with audit logging and action drawer. | `PartnerStore`, `IndiaTerritoryMap` | Low |
| `PartnerPortalHub.tsx` | [`src/pages/partner/PartnerPortalHub.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/partner/PartnerPortalHub.tsx) | Complete commercial onboarding gateway, tracking lookup, and governance matrix. | `PartnerStore` | Low |
| `360deg.html` | [`public/360deg.html`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/public/360deg.html) | Outstanding Three.js 3D clinic walkthrough with 9 detailed rooms. | Three.js (r128 CDN) | Low (can be embedded via iframe) |
| UI Primitives (49 files)| [`src/components/ui/*`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/ui) | Standardized, accessible Radix UI component library. | Radix UI packages | Zero |

---

## 25. Components to Redesign

| Component | File Path | Deficiencies in Existing Code | Strategic Requirements to Integrate | Risk Level |
|---|---|---|---|---|
| `HeroSection` | [`src/components/HeroSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/HeroSection.tsx) | Headline focuses on generic AI; lacks visual entry points. | Update copy to *"Connected Healthcare. Intelligent Diagnostics. Continuous Care."* Add 5 entry point badges below. | Low |
| `HealthcareEcosystemSection` | [`src/components/HealthcareEcosystemSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/HealthcareEcosystemSection.tsx) | Shows 6 isolated cards with text feature bullets. | Convert into interactive Master Ecosystem hub-and-node diagram with CuraQuantis™ at center. | Medium |
| `DemoCenter` | [`src/pages/DemoCenter.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/DemoCenter.tsx) | Hardcoded "Deployed" tag on all cards; links point to `#`. | Implement capability status badges (*DEMO*, *PROTOTYPE*, *PLANNED*, *PRODUCTION*). | Medium |
| `Navbar` | [`src/components/Navbar.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/Navbar.tsx) | Cluttered dropdowns linking to obsolete multi-industry routes; horizontal overflow on mid-size screens. | Restructure navigation around the 17 strategic public sections; improve mobile navigation. | Medium |
| `SolutionsSection` | [`src/components/SolutionsSection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/SolutionsSection.tsx) | 13 flip cards present features without communicating the healthcare continuum. | Reorganize into structured clinical pillars (OPD, Voice, Imaging, ICU, Surgery, Pharmacy). | Medium |
| `CuraVoiceAISection` | [`src/components/CuraVoiceAISection.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/components/CuraVoiceAISection.tsx) | Displays unverified marketing metrics (<500ms, 99% accuracy). | Add clinical governance badges, clinician authorization flows, and consent indicators. | Low |

---

## 26. Components to Create

| New Component | Planned Location | Purpose | Strategic Dependency |
|---|---|---|---|
| `EcosystemMap` | `src/components/infographics/EcosystemMap.tsx` | Master interactive visual representation of connected healthcare ecosystem. | Strategy Section 3 |
| `AIArchitectureFlow` | `src/components/infographics/AIArchitectureFlow.tsx` | Interactive 8-node pipeline for Phase 8 clinical architecture. | Strategy Section 5 |
| `PatientJourneyFlow` | `src/components/infographics/PatientJourneyFlow.tsx` | 8-card journey (*Discover -> Register -> Assess -> Consult -> Diagnose -> Review -> Care -> Follow-up*). | Strategy Section 6 |
| `DiagnosticPipelineFlow` | `src/components/infographics/DiagnosticPipelineFlow.tsx` | 11-step diagnostic workflow from sample collection to validated report. | Strategy Section 7 |
| `VirtualClinicTour` | `src/components/infographics/VirtualClinicTour.tsx` | 5-zone reference clinic explorer with embedded 3D tour. | Strategy Section 10 |
| `RuralHubSpokeFlow` | `src/components/infographics/RuralHubSpokeFlow.tsx` | Hub-and-spoke flow linking rural access points to regional diagnostic hubs. | Strategy Section 13 |
| `FranchiseLifecycleTimeline`| `src/components/infographics/FranchiseLifecycleTimeline.tsx` | 19-stage progressive center development lifecycle. | Strategy Section 14 |
| `QualityCycleCircular` | `src/components/infographics/QualityCycleCircular.tsx` | Signature 7-stage circular quality cycle (*Build -> Prove -> Standardize -> Scale*). | Strategy Section 15 |
| `NationalNetworkHierarchy` | `src/components/infographics/NationalNetworkHierarchy.tsx` | Hierarchy from local center to national network; clearly frames long-term targets. | Strategy Section 11 & 12 |
| `CommandCenterLoop` | `src/components/infographics/CommandCenterLoop.tsx` | 10-step Data-to-Action loop highlighting *"Alert ≠ Decision"*. | Strategy Section 20 & 21 |
| `NationalExpansionRoadmap` | `src/components/infographics/NationalExpansionRoadmap.tsx` | Scroll-triggered expansion roadmap from reference center to national network. | Strategy Section 22 |
| `ExpansionGateWidget` | `src/components/infographics/ExpansionGateWidget.tsx` | Prominent governance filter (*STOP -> MEASURE -> REVIEW -> CORRECT -> APPROVE -> SCALE*). | Strategy Section 23 |
| `StrategyPhaseExplorer` | `src/components/infographics/StrategyPhaseExplorer.tsx` | Interactive 52-phase strategy explorer grouped into 12 functional clusters. | Strategy Section 26 & 27 |
| `CapabilityStatusBadge` | `src/components/ui/capability-status-badge.tsx` | Reusable badge rendering *CONCEPT*, *PROTOTYPE*, *PLANNED*, or *PRODUCTION*. | Strategy Section 30 |

---

## 27. Components & Pages to Deprecate / Remove

| File / Folder | Current Location | Reason for Deprecation | Risk |
|---|---|---|---|
| 16 Non-Healthcare Industry Pages | `src/pages/industries/` (`Aerospace.tsx`, `Agriculture.tsx`, `Biotech.tsx`, `CyberSecurity.tsx`, `Defence.tsx`, `Drones.tsx`, `Education.tsx`, `Finance.tsx`, `Insurance.tsx`, `Law.tsx`, `Manufacturing.tsx`, `Meat.tsx`, `Nutrition.tsx`, `Pharma.tsx`, `Retail.tsx`, `Semiconductor.tsx`) | Directly conflicts with CuraQuantis™ healthcare & diagnostics strategy. Already disconnected from homepage. | Zero (Removes legacy clutter) |
| Non-Invasive Ventilator Page | [`src/pages/NonInvasiveVentilator.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/NonInvasiveVentilator.tsx) | Legacy hardware ventilator artifact from Zerokost era; unrelated to digital clinic network strategy. | Low (Can be archived) |
| Generic Products Page | [`src/pages/Products.tsx`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/src/pages/Products.tsx) | Generic EHR/HMS list with Unsplash photos disconnected from connected healthcare narrative. | Low (Merge into Healthcare & Diagnostics) |
| Duplicate Server File | [`server/index.cjs`](file:///c:/Users/DELL/Downloads/ZeroKost/cura_quantis/server/index.cjs) | Duplicate of `curaquantis/server.cjs` (which is the actual target of `npm run server`). | Low (Consolidate into single backend) |

---

## 28. Content Gaps

1. **Healthcare Ecosystem Narrative**: Existing content presents 6 isolated services. Missing clear narrative connecting patient intake to diagnostic testing, clinical review, and continuous care.
2. **Quality & Clinical Governance Philosophy**: Missing copy detailing standard operating procedures (SOPs), NABL/NABH accreditation paths, clinical scrutiny boards, and quality gates.
3. **Reference Healthcare Center Specifics**: Missing space, equipment, and workflow breakdowns for the standard Reference Center.
4. **Rural Health Equity Narrative**: Missing content on Tier 2/3 and rural healthcare access, tele-consultation support, and cold-chain sample transport.
5. **Command Center Operations**: Missing explanations of the 16 functional command areas and how real-time intelligence feeds into executive decision-making.

---

## 29. Data Gaps

1. **Infographic Data Models**: Currently no structured data models exist for the 21 infographics. Typed configuration files (e.g. `src/data/ecosystemData.ts`, `src/data/patientJourneyData.ts`, `src/data/diagnosticsData.ts`, `src/data/phasesData.ts`) must be established.
2. **Capability Status Registry**: No central registry maps each of CuraQuantis's 14+ modules to its verified capability status (*CONCEPT*, *PROTOTYPE*, *PLANNED*, *PRODUCTION*).
3. **Territory Target Data**: While territorial boundaries exist in `indiaTerritories.ts`, target center allocations (e.g. proposed hub distribution across zones) are not modeled.

---

## 30. Backend Gaps

1. **Authentication API**: No server-side authentication endpoints (`/api/auth/login`, `/api/auth/me`, `/api/auth/logout`) exist; authentication is currently simulated in the browser.
2. **Role-Based Access Control (RBAC)**: Backend does not verify session tokens or user roles on API routes.
3. **Server Consolidation**: Two nearly identical Express server scripts (`server/index.cjs` and `curaquantis/server.cjs`) exist; need to consolidate into a single clean backend structure.
4. **Document Storage**: Uploaded files in `ApplyPathway.tsx` are handled as mock file references rather than persisted to secure object storage (e.g. S3 / Cloud Storage).

---

## 31. Security & Governance Gaps

1. **Exposed Database Credentials**: Production MongoDB URI committed to `.env`. Must be replaced with environment variable injection.
2. **Plaintext Administrative Passwords**: Client-side authentication in `authStore.ts` must be eliminated.
3. **Lack of Rate Limiting**: Express backend currently lacks request rate limiting on application submissions and authentication attempts.
4. **Enforced Software Authority Matrix**: The governance rules ("Channel Partners cannot sign contracts or promise ROI") are well stated in text but must be strictly enforced across all portal forms and agreements.

---

## 32. Technical Risks

1. **Asset Bandwidth Overload**: Over 112 MB of uncompressed `.wav` audio files in `/public` will cause poor mobile performance if loaded without optimization.
2. **Navigation Breakpoints**: The current 9-link desktop navbar breaks layout on screens between 1024px and 1280px.
3. **Client-Side Auth Exposure**: Relying on `localStorage` for admin session tokens allows trivial inspection and manipulation via browser devtools.
4. **DOM Bloat with 21 Infographics**: Rendering 21 complex animations on a single page would cause high CPU/memory usage. **Mitigation**: Distribute infographics across appropriate dedicated routes, lazy-load off-screen components, and use CSS transforms instead of canvas redraws.

---

## 33. Implementation Dependencies

```
┌────────────────────────────────────────────────────────┐
│  Phase A: Design System & Shared Infographic Tokens    │
│  (HSL Variables, SVG Connectors, Status Badges)       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  Phase B: Global Layout & Navigation Restructuring     │
│  (17-Route Public Header, Mobile Drawer, Clean Footer) │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  Phase C: Homepage Architecture (15 Strategic Sections)│
│  (Hero -> Ecosystem -> AI -> Patient Journey -> CTA)   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  Phase D: Core Clinical Pages & Diagnostic Pipeline    │
│  (/healthcare, /diagnostics, /ai-technology, etc.)     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  Phase E: National Network, Rural Hub & Command Center │
│  (/network, /rural-healthcare, /command-center)        │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  Phase F: Commercial Portals, Strategy Explorer & QA   │
│  (Partner/Franchise Hubs, 52-Phase Explorer, Perf/SEO) │
└────────────────────────────────────────────────────────┘
```

---

## 34. Recommended Implementation Architecture

### Public Architecture (17 Dedicated Strategic Routes)
1. `/` — Home (Master 15-Section Connected Healthcare Ecosystem Narrative)
2. `/healthcare` — Healthcare Clinics & Reference Center Model
3. `/diagnostics` — Intelligent Diagnostics, Pathology & Imaging Network
4. `/ai-technology` — AI Architecture, Clinical Data Fusion & Tech Backbone
5. `/patient-care` — Patient Care Continuum & 8-Stage Journey
6. `/curavoice` — CuraVoice™ Conversational Healthcare Intelligence
7. `/network` — National Network, Zonal Architecture & Expansion Targets
8. `/rural-healthcare` — Rural Healthcare Equity & Hub-and-Spoke Model
9. `/professionals` — For Healthcare Professionals, Clinicians & Specialists
10. `/partners` — Channel Partners & Institutional Collaboration
11. `/investors` — Investor Decision Center & Unit Economics
12. `/franchise` — Franchise Network & 19-Stage Development Lifecycle
13. `/academy` — CuraQuantis™ Academy & Workforce Development Lifecycle
14. `/quality-governance` — Quality, Governance & Signature Circular Cycle
15. `/command-center` — National Command Center & Data-to-Action Loop
16. `/about` — About CuraQuantis, Board of Directors & Corporate Structure
17. `/contact` — Inbound Inquiries, Headquarters & Facility Locations

### Supplementary & Secure Routes
- `/demo-center` — Interactive Clinical AI Demo Center (with capability badges)
- `/virtual-clinic` — 5-Zone Reference Healthcare Center Tour (integrating 3D walkthrough)
- `/strategy-explorer` — Interactive 52-Phase Master Development Strategy Explorer
- `/insights` — Clinical Whitepapers, Research & Innovation
- `/partner-portal` — Commercial Expansion Gateway & Status Tracker
- `/apply/:pathway` — Multi-Step Partner & Franchise Application Wizard
- `/portal/partner-dashboard` — Secure Partner Docket & Status Tracker
- `/portal/admin` — Executive Scrutiny Board Management Console
- `/portal/login` — Unified Portal Sign-In

---

## 35. Recommended Development Sequence

- **PHASE A — Foundation & Cleanup**: Deprecate 16 legacy non-healthcare industry pages; clean up `index.html` metadata; extract shared infographic data contracts.
- **PHASE B — Design System & Infographic Primitives**: Implement `CapabilityStatusBadge`, SVG connection line components, pulse indicators, and responsive timeline containers.
- **PHASE C — Global Layout & Navigation**: Overhaul `Navbar.tsx` to reflect the 17 strategic public sections; eliminate horizontal overflow; polish `Footer.tsx`.
- **PHASE D — Homepage Transformation**: Build the 15-section narrative flow incorporating the Master Ecosystem Diagram, Phase 8 AI Architecture, and 8-Card Patient Journey.
- **PHASE E — Healthcare & Diagnostics Dual Pillar**: Implement `/healthcare` and `/diagnostics`, integrating the 11-step Diagnostic Pipeline.
- **PHASE F — AI & CuraVoice Repositioning**: Implement `/ai-technology`; move CuraVoice showcase from `/insights` to `/curavoice`; integrate authorization badges.
- **PHASE G — Virtual Clinic & Demo Center**: Create `/virtual-clinic` incorporating the 5 strategic zones; update `DemoCenter.tsx` with verified capability status tags.
- **PHASE H — National & Rural Network**: Implement `/network` and `/rural-healthcare` using `IndiaTerritoryMap` and the Hub-and-Spoke infographic.
- **PHASE I — Commercial, Partner & Franchise Infrastructure**: Connect existing application wizards with the 19-stage Franchise Lifecycle Timeline.
- **PHASE J — Quality, Governance & Command Center**: Implement `/quality-governance` and `/command-center`, incorporating the 7-stage Quality Cycle and the Data-to-Action loop.
- **PHASE K — 52-Phase Strategy Explorer & Insights**: Build the interactive 52-phase explorer grouped into 12 functional clusters at `/strategy-explorer`.
- **PHASE L — Performance, SEO & Accessibility**: Compress audio assets; optimize images; implement ARIA labels; generate sitemap; conduct cross-browser QA.

---

## 36. P0 / P1 / P2 / P3 Backlog

### P0 — Critical Priority (Core Strategic Foundation)
- [ ] Remove/deprecate 16 non-healthcare industry pages and update `index.html` metadata.
- [ ] Implement `CapabilityStatusBadge` (*CONCEPT*, *PROTOTYPE*, *PLANNED*, *PRODUCTION*).
- [ ] Redesign Homepage into 15-section ecosystem narrative.
- [ ] Implement Master CuraQuantis Ecosystem Infographic (Hub & Node).
- [ ] Implement Phase 8 AI Architecture Infographic (8-node pipeline).
- [ ] Implement 8-Card Patient Journey Infographic.
- [ ] Implement 11-Step Diagnostics Pipeline Infographic.
- [ ] Implement 7-Stage Circular Quality & Governance Infographic.
- [ ] Clearly label network targets (3,000 clinics, 7,000 labs, 10,000 locations) as **Strategic Targets**.
- [ ] Secure exposed credentials in `.env` and `authStore.ts`.

### P1 — Core Expansion Priority (Detailed Pillars & Expansion Architecture)
- [ ] Restructure `Navbar.tsx` to the 17 strategic public sections.
- [ ] Move CuraVoice showcase to dedicated route `/curavoice` with clinical oversight badges.
- [ ] Implement `/healthcare` with Reference Clinic architecture.
- [ ] Implement `/diagnostics` with full diagnostic network details.
- [ ] Implement `/ai-technology` with Clinical Data Fusion Engine overview.
- [ ] Implement `/rural-healthcare` with Hub-and-Spoke Infographic.
- [ ] Implement `/network` with National Hierarchy Infographic.
- [ ] Implement `/command-center` with 16 functional command areas and Data-to-Action loop.
- [ ] Implement `/franchise` with 19-Stage Franchise Lifecycle Infographic.
- [ ] Update `/demo-center` with capability status badges.
- [ ] Create `/virtual-clinic` incorporating 5-zone interactive tour.

### P2 — Supplementary & Explorer Priority (Deeper Architecture)
- [ ] Create `/strategy-explorer` with interactive 52-phase browser.
- [ ] Implement 10-step Research & Innovation Infographic on `/insights`.
- [ ] Implement 8-step Workforce & Academy Lifecycle on `/academy`.
- [ ] Implement Cybersecurity 8-stage pipeline on `/security`.
- [ ] Implement Expansion Gate component on expansion pages.

### P3 — Future Enterprise Features
- [ ] Real-time telemetry connection between Command Center and live clinic databases.
- [ ] Full server-side JWT authentication with multi-factor authentication for portal logins.
- [ ] WebRTC live tele-consultation rooms within the patient portal.
- [ ] Automated Cold-Chain IoT GPS sensor tracking integration.

---

## 37. Questions / Decisions Required

1. **Domain & Brand Consistency**:
   - The codebase contains references to `Zerokost Healthcare Pvt Ltd`, `GENQUANTAA pvt Ltd`, and `Genquantis Pvt Ltd` (holding company), alongside `CuraQuantis Health Clinics Pvt Ltd`.
   - *Decision Required*: Confirm exact brand text hierarchy for public headers: e.g., *"CuraQuantis™ Health Clinics — A Subsidiary of Genquantis Pvt. Ltd."*
2. **Deprecation Approval for Non-Healthcare Pages**:
   - Confirm immediate deprecation of the 16 non-healthcare industry routes (`/industries/finance`, `/industries/meat`, etc.) from routing and build bundles.
3. **Ventilator Hardware Portfolio**:
   - Confirm whether the Non-Invasive Ventilator (`/products/ventilator`) should be moved to a secondary "Hardware & Medical Devices" archive or excluded from primary navigation.
4. **Audio Compression**:
   - Confirm approval to compress the 112 MB of `.wav` files into `.mp3` / `.webm` format to reduce initial page load times.
5. **Virtual Clinic 3D Integration**:
   - Confirm whether the existing Three.js 3D walkthrough (`360deg.html`) should be embedded via an iframe inside `/virtual-clinic` alongside a 2D interactive 5-zone SVG floorplan.

---

## 38. Final Recommended Architecture

The final recommended architecture organizes CuraQuantis™ into three integrated layers:
1. **Public Web Experience**: A 17-page visual narrative guided by 21 interactive SVG infographics communicating how patients, diagnostics, AI intelligence, and clinicians connect.
2. **Commercial & Vetting Engine**: The preserved Partner & Franchise Portal (`/partner-portal`, `/apply`, `/portal/partner-dashboard`, `/portal/admin`), enforcing governance boundaries and territory selection.
3. **Scalable Infographic System**: Lightweight, responsive components built with Tailwind CSS, Framer Motion, and accessible vector graphics, ensuring seamless performance across desktop, tablet, and mobile devices.

---

## 39. Deliverables A through T Summary

| Item | Description | Codebase Audit Status | Location in this Report |
|---|---|---|---|
| **A** | Complete Codebase Audit | 187 files evaluated; architecture, routes, components, data, security audited | [Sections 1, 2, 3, 18](#1-executive-summary) |
| **B** | Current Website Architecture | Documented full 41-route map, hybrid React+Express setup | [Sections 3, 4](#3-repository-architecture) |
| **C** | Proposed Architecture | 17 public routes + supplementary & secure portals | [Section 34](#34-recommended-implementation-architecture) |
| **D** | Strategy-to-Code Mapping | Detailed action matrix matching Strategy requirements to existing files | [Section 19](#19-strategy-to-code-mapping) |
| **E** | 52-Phase Mapping | Traceability matrix from Phase 1 to Phase 52 with priority tags | [Section 20](#20-52-phase-traceability-matrix) |
| **F** | Homepage Transformation Plan | 15-section narrative sequence vs. existing 14 items | [Section 21](#21-homepage-gap-analysis) |
| **G** | Page-by-Page Transformation Plan | Audit of all 24 destination screens | [Section 22](#22-page-by-page-gap-analysis) |
| **H** | Infographic Implementation Plan | 21 core infographics mapped to components, data, and responsive layout | [Section 23](#23-infographic-mapping-21-core-infographics) |
| **I** | Component Reuse / New Component Plan | Catalog of reusable, redesign, new, and deprecated components | [Sections 24, 25, 26, 27](#24-components-to-reuse) |
| **J** | Data / Backend Implications | LocalStorage, MongoDB sync, config models, API gaps | [Sections 9, 11, 29, 30](#9-existing-data-architecture) |
| **K** | Security Implications | Plaintext passwords, exposed Mongo URI, hardcoded keys | [Sections 10, 18, 31](#18-existing-security-audit) |
| **L** | Responsive Strategy | Desktop horizontal -> Tablet compressed -> Mobile stacked timeline | [Section 14](#14-existing-responsive-architecture) |
| **M** | Performance Strategy | 112 MB audio compression, WebP images, SVG over Canvas | [Section 17](#17-existing-performance) |
| **N** | SEO & Accessibility Strategy | Semantic tags, WAI-ARIA, text equivalents for infographics | [Sections 15, 16](#15-existing-seo) |
| **O** | Development Dependency Graph | Sequence from Foundation -> Tokens -> Nav -> Homepage -> Pillars | [Section 33](#33-implementation-dependencies) |
| **P** | P0 / P1 / P2 / P3 Backlog | Prioritized checklist of tasks | [Section 36](#36-p0--p1--p2--p3-backlog) |
| **Q** | Exact List of Files Needing Modification | `Navbar.tsx`, `HeroSection.tsx`, `DemoCenter.tsx`, `Index.tsx`, etc. | [Section 25](#25-components-to-redesign) |
| **R** | Exact List of New Files Needing Creation | 14 new infographic components & 12 new page wrappers | [Section 26](#26-components-to-create) |
| **S** | Risks and Dependencies | Asset bandwidth, auth exposure, layout clipping | [Sections 32, 33](#32-technical-risks) |
| **T** | Questions Requiring Business Decisions | Brand name hierarchy, non-healthcare page removal, audio compression | [Section 37](#37-questions--decisions-required) |

---

## 40. Machine-Readable Implementation Map (JSON)

```json
[
  {
    "route": "/",
    "section": "Hero Section",
    "strategy_reference": "Section 4",
    "current_status": "existing",
    "action": "redesign",
    "components": ["HeroSection", "EcosystemEntryBadges"],
    "data_source": "static",
    "priority": "P0",
    "dependencies": [],
    "notes": "Update headline to 'Connected Healthcare. Intelligent Diagnostics. Continuous Care.' Add 5 entry points below hero."
  },
  {
    "route": "/",
    "section": "Master CuraQuantis Ecosystem",
    "strategy_reference": "Section 3",
    "current_status": "partial",
    "action": "redesign",
    "components": ["EcosystemMap"],
    "data_source": "config",
    "priority": "P0",
    "dependencies": ["HeroSection"],
    "notes": "Replace 6 isolated cards with interactive radial ecosystem map with CuraQuantis at center."
  },
  {
    "route": "/",
    "section": "How CuraQuantis Works - AI Architecture",
    "strategy_reference": "Section 5 (Phase 8)",
    "current_status": "missing",
    "action": "add",
    "components": ["AIArchitectureFlow"],
    "data_source": "config",
    "priority": "P0",
    "dependencies": ["EcosystemMap"],
    "notes": "8-node interactive horizontal/vertical pipeline emphasizing clinician decision authority."
  },
  {
    "route": "/",
    "section": "Patient Journey",
    "strategy_reference": "Section 6",
    "current_status": "missing",
    "action": "add",
    "components": ["PatientJourneyFlow"],
    "data_source": "config",
    "priority": "P0",
    "dependencies": ["AIArchitectureFlow"],
    "notes": "8-card animated journey: Discover -> Register -> Assess -> Consult -> Diagnose -> Review -> Care -> Follow-up."
  },
  {
    "route": "/diagnostics",
    "section": "Diagnostics Pipeline",
    "strategy_reference": "Section 7",
    "current_status": "partial",
    "action": "add",
    "components": ["DiagnosticPipelineFlow"],
    "data_source": "config",
    "priority": "P0",
    "dependencies": [],
    "notes": "11-step diagnostic flow from Patient ID to Validated Report; reusable for live test tracking in future."
  },
  {
    "route": "/curavoice",
    "section": "CuraVoice Conversational Intelligence",
    "strategy_reference": "Section 8",
    "current_status": "existing",
    "action": "reposition",
    "components": ["CuraVoiceAISection", "CuraVoiceFlow"],
    "data_source": "static",
    "priority": "P0",
    "dependencies": [],
    "notes": "Reposition from /insights to /curavoice; add clinical oversight and consent badges; compress audio assets."
  },
  {
    "route": "/demo-center",
    "section": "Clinical AI Demo Center",
    "strategy_reference": "Section 9",
    "current_status": "existing",
    "action": "redesign",
    "components": ["DemoCenter", "CapabilityStatusBadge"],
    "data_source": "config",
    "priority": "P1",
    "dependencies": ["CapabilityStatusBadge"],
    "notes": "Update all 14 project cards with accurate status badges (PROTOTYPE, PLANNED, DEMO); remove blanket 'Deployed' label."
  },
  {
    "route": "/virtual-clinic",
    "section": "Virtual Clinic 5-Zone Tour",
    "strategy_reference": "Section 10",
    "current_status": "partial",
    "action": "add",
    "components": ["VirtualClinicTour"],
    "data_source": "static",
    "priority": "P1",
    "dependencies": [],
    "notes": "Interactive 5-zone Reference Clinic model (Patient Access, Clinical Care, Diagnostics, Continuing Care, Operations) embedding 3D canvas."
  },
  {
    "route": "/network",
    "section": "National Network & Expansion Targets",
    "strategy_reference": "Section 11 & 12",
    "current_status": "partial",
    "action": "add",
    "components": ["NationalNetworkHierarchy", "IndiaTerritoryMap"],
    "data_source": "config",
    "priority": "P1",
    "dependencies": ["IndiaTerritoryMap"],
    "notes": "Display Local -> Regional -> State -> National hierarchy. Explicitly label 3,000 clinics and 7,000 labs as Strategic Targets."
  },
  {
    "route": "/rural-healthcare",
    "section": "Rural Healthcare Hub-and-Spoke",
    "strategy_reference": "Section 13",
    "current_status": "missing",
    "action": "add",
    "components": ["RuralHubSpokeFlow"],
    "data_source": "config",
    "priority": "P1",
    "dependencies": [],
    "notes": "Hub-and-spoke flow from Community Access Points to Regional Diagnostic Hubs."
  },
  {
    "route": "/franchise",
    "section": "Franchise Development Lifecycle",
    "strategy_reference": "Section 14",
    "current_status": "partial",
    "action": "add",
    "components": ["FranchiseLifecycleTimeline", "PartnerPortalHub"],
    "data_source": "config",
    "priority": "P1",
    "dependencies": ["PartnerPortalHub"],
    "notes": "19-stage progressive timeline showing ownership, documentation, and approval milestones."
  },
  {
    "route": "/quality-governance",
    "section": "Quality & Governance Cycle",
    "strategy_reference": "Section 15 & 23",
    "current_status": "missing",
    "action": "add",
    "components": ["QualityCycleCircular", "ExpansionGateWidget"],
    "data_source": "static",
    "priority": "P0",
    "dependencies": [],
    "notes": "Signature circular graphic (Build -> Prove -> Standardize -> Certify -> Replicate -> Monitor -> Improve) and Expansion Gate."
  },
  {
    "route": "/command-center",
    "section": "National Command Center & Command Loop",
    "strategy_reference": "Section 20 & 21",
    "current_status": "missing",
    "action": "add",
    "components": ["CommandCenterHierarchy", "CommandLoopDiagram"],
    "data_source": "config",
    "priority": "P1",
    "dependencies": [],
    "notes": "6-tier command hierarchy, 16 functional commands, and 10-step Data-to-Action loop emphasizing 'Alert ≠ Decision'."
  },
  {
    "route": "/strategy-explorer",
    "section": "52-Phase Master Development Strategy Explorer",
    "strategy_reference": "Section 26 & 27",
    "current_status": "missing",
    "action": "add",
    "components": ["StrategyPhaseExplorer"],
    "data_source": "config",
    "priority": "P2",
    "dependencies": [],
    "notes": "Interactive explorer grouping all 52 phases into 12 functional clusters with objectives, flows, and status."
  },
  {
    "route": "/partner-portal",
    "section": "Commercial Expansion Portal & Docket Management",
    "strategy_reference": "Section 24",
    "current_status": "existing",
    "action": "retain",
    "components": ["PartnerPortalHub", "ApplyPathway", "PartnerDashboard", "ManagementDashboard"],
    "data_source": "api",
    "priority": "P0",
    "dependencies": ["IndiaTerritoryMap"],
    "notes": "Retain complete application wizard, tracking docket, territory selector, and scrutiny board."
  }
]
```
