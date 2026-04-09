bionest/ # ← Project folder renamed to bionest
├── app/ # All routing (App Router)
│ ├── (auth)/ # Route group - Auth pages
│ │ ├── layout.tsx
│ │ ├── sign-in/
│ │ │ └── page.tsx
│ │ ├── sign-up/
│ │ │ └── page.tsx
│ │ └── onboarding/
│ │ └── page.tsx
│ │
│ ├── (dashboard)/ # Route group - Protected dashboard
│ │ ├── layout.tsx # Sidebar layout
│ │ ├── page.tsx # /dashboard Home
│ │ ├── links/
│ │ │ ├── page.tsx
│ │ │ └── [id]/
│ │ │ └── page.tsx
│ │ ├── analytics/
│ │ │ └── page.tsx
│ │ ├── themes/
│ │ │ └── page.tsx
│ │ ├── settings/
│ │ │ └── page.tsx
│ │ └── billing/
│ │ └── page.tsx
│ │
│ ├── discover/ # Public social-style directory
│ │ └── page.tsx # /discover
│ │
│ ├── [username]/ # Public bio page (e.g. /bayisa)
│ │ └── page.tsx
│ │
│ ├── api/
│ │ └── webhooks/
│ │ ├── clerk/
│ │ │ └── route.ts
│ │ └── stripe/
│ │ └── route.ts
│ │
│ ├── globals.css
│ ├── layout.tsx # Root layout
│ └── page.tsx # Marketing Landing Page
│
├── components/
│ ├── ui/ # shadcn/ui
│ ├── dashboard/
│ │ ├── Sidebar.tsx
│ │ ├── Header.tsx
│ │ ├── KPICard.tsx
│ │ └── BioPreview.tsx
│ ├── bio/
│ │ ├── BioAvatar.tsx
│ │ ├── LinkCard.tsx
│ │ └── QRButton.tsx
│ ├── discover/ # New for discover page
│ │ ├── ProfileCard.tsx
│ │ ├── SearchBar.tsx
│ │ └── FilterChips.tsx
│ ├── forms/
│ │ ├── NewLinkForm.tsx
│ │ └── ProfileForm.tsx
│ └── common/
│ ├── LoadingSpinner.tsx
│ └── ErrorBoundary.tsx
│
├── lib/
│ ├── prisma.ts
│ ├── auth.ts
│ ├── utils.ts
│ ├── analytics.ts
│ └── search.ts # Helpers for discover search
│
├── hooks/
│ ├── useClickLogger.ts
│ └── useUser.ts
│
├── actions/
│ ├── link.actions.ts
│ ├── profile.actions.ts
│ ├── analytics.actions.ts
│ ├── discover.actions.ts # Search public profiles
│ └── billing.actions.ts
│
├── types/
│ ├── index.ts
│ ├── user.ts
│ ├── link.ts
│ ├── profile.ts
│ └── click.ts
│
├── prisma/
│ └── schema.prisma # Main database schema
│
├── public/
│ ├── images/
│ └── favicon.ico
│
├── .env
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
