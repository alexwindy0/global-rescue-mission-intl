---
title: FAMILY COMING HOME FROM ABROAD
description: what God cannot do does not exist
lastUpdated: 2026-08-13T07:09:00.000-07:00
draft: false
---
As an Elite DevOps professional, I have meticulously analyzed your raw data and the requirements for \*\*Global Rescue Mission Intl.\*\*. This document orchestrates a comprehensive, production-grade roadmap that transforms your concept into a scalable, high-performance static website.



The plan below bridges the gap between \*\*non-profit evangelism\*\* and \*\*modern DevOps culture\*\*, integrating your specific needs (MDX, bank transfers, admin UI) with a disciplined approach to infrastructure, security, and future growth.



\---



\# DevOps Master Plan: Global Rescue Mission Intl. (GRM)



\## 1. Project Definition & Discovery

\- \*\*Mission Alignment:\*\* Define the primary objectives—Evangelism (Spread the Word), Fundraising (Sustain the Mission), and Daily Updates (Engage the Community).

\- \*\*Stakeholder Mapping:\*\* Identify the "Hands-On" team (Updating content via Admin UI) vs. the "Technical" team (Managing the codebase and infrastructure).

\- \*\*Success Criteria:\*\*

\- \*\*Performance:\*\* Google PageSpeed Score > 95 (Critical for SEO and donor trust).

\- \*\*Scalability:\*\* Ability to handle traffic spikes (e.g., major fundraising campaigns) without manual intervention.

\- \*\*Accessibility:\*\* WCAG 2.1 AA compliance (Reaching 8.5% of the population with disabilities).



\## 2. Technical Blueprint (The Stack)

Based on the "Modern Default" recommendation, the architecture is chosen for its ability to deliver "zero-JS" performance while maintaining a rich content experience.



\| Layer | Technology | Justification |

\| :--- | :--- | :--- |

\| \*\*Framework\*\* | \*\*Astro\*\* (v5) | "Zero-JS by default" ensures lightning-fast loading for the "Daily mid-night prayer summaries" and global accessibility. |

\| \*\*UI Styling\*\* | \*\*Tailwind CSS\*\* (v4) | Utility-first approach allows for rapid, consistent branding and responsive design across devices. |

\| \*\*Template\*\* | \*\*Kindora Astro\*\* | Paid theme providing 15+ pre-configured pages (Causes, Programs, Blog). Saves hundreds of development hours and ensures a "mission-focused layout." |

\| \*\*Content Layer\*\* | \*\*MDX\*\* (with TypeScript) | Allows for rich, interactive storytelling (impact stories) while maintaining strict type safety for data integrity as the site scales. |

\| \*\*Headless CMS\*\* | \*\*Decap CMS\*\* | Free, open-source, and Git-based. Provides a browser-based admin interface for non-technical staff to update MDX files and images directly in the \`admin/\` folder. |

\| \*\*Hosting & CDN\*\* | \*\*Netlify\*\* (or Vercel) | Automatic "Push to Git" deployments and global CDN distribution ensure your message reaches followers "anywhere in the world" with "massive load capacity." |

\| \*\*Animations\*\* | \*\*AOS (Animate On Scroll)\*\* | Lively, scroll-triggered animations to enhance user engagement on impact stories and fundraising calls-to-action without adding JavaScript bloat. |



\## 3. DevOps Workflow: From Concept to Deployment

This is the "Heart" of the operation, ensuring that the transition from development to production is smooth, secure, and repeatable.



\### A. Source Control Strategy (Git)

\- \*\*Repository Structure:\*\* Host the project on GitHub (or GitLab).

\- \*\*Branching Model (Trunk-Based):\*\*

\- \`main\` (Production): Always deployable. Code is merged here for deployment to Netlify.

\- \`staging\` (Integration): Used to test changes before they hit production (simulates production environment).

\- \`feature/*\`: Short-lived branches for specific updates (e.g., \`feature/update-prayer-summary\`).

\- \*\*Git Hooks:\*\* Implement Husky to run linting and formatting checks on commits to prevent broken MDX files.



\### B. Continuous Integration (CI) Pipeline

\- \*\*Tool:\*\* GitHub Actions (or GitLab CI).

\- \*\*Triggers:\*\* Push to \`main\` or \`staging\`.

\- \*\*Pipeline Stages:\*\*

\    1.  \*\*Build:\*\* Install dependencies via \`npm ci\` (clean install).

\    2.  \*\*Lint/Static Analysis:\*\* Check for accessibility issues (using \`axe-core\`), image optimization (compression check), and broken links.

\    3.  \*\*Build Site:\*\* Generate the static site using \`npm run build\`.

\    4.  \*\*Test:\*\* Run a "Smoke Test" (check homepage loads, sitemap.xml exists).

\    5.  \*\*Deploy (Preview):\*\* Deploy to a Netlify Preview URL for review.



\### C. Continuous Deployment (CD) Pipeline

\- \*\*Trigger:\*\* Automatic deployment on successful merge to \`main\`.

\- \*\*Process:\*\*

\    1.  Netlify "Build" hook is called.

\    2.  The site is built and deployed to the global CDN.

\    3.  \*\*Post-Deployment Check:\*\* Verify SSL certificates are valid and the site is live.



\## 4. Environment & Configuration Management

\- \*\*Environment Variables:\*\* Store sensitive keys (e.g., Google Tag Manager, Algolia API keys) in Netlify environment variables, not in the codebase.

\- \*\*Astro Config:\*\* Configure \`astro.config.mjs\` to point to the correct \`site\` URL for production vs. staging to ensure SEO tags are correct.



\## 5. Implementing Key Requirements (DevOps Perspective)



\### A. Admin UI & Content Workflow

\- \*\*Implementation:\*\* The \`admin/config.yml\` will define the content schema for "Prayers" and "Stories."

\- \*\*Workflow:\*\*

\    1.  \*\*Editor\*\* logs into \`/\[site-url]/admin\`.

\    2.  \*\*Editor\*\* creates/updates an MDX file (e.g., a prayer summary).

\    3.  \*\*Decap CMS\*\* commits the change to a new branch in Git (via the "git-gateway").

\    4.  \*\*CI Pipeline\*\* runs the build process on this new branch.

\    5.  \*\*Netlify\*\* generates a "Deploy Preview" URL.

\    6.  \*\*Editor\*\* reviews the preview and merges the branch to \`main\`.

\    7.  \*\*Production Deployment\*\* runs.



\### B. Animations (Lively UI)

\- \*\*Library:\*\* \*\*AOS (Animate On Scroll).\*\*

\- \*\*Integration Strategy:\*\*

\- Import AOS in the \`BaseLayout.astro\` component.

\- Initialize it with \`AOS.init({ duration: 1000, once: true })\` to optimize for performance ("zero-JS by default" is maintained as the script is loaded only once).

\- \*\*Rollout:\*\* Apply \`data-aos\` attributes to key sections (e.g., "Impact Story" cards, Donation CTAs). This adds a "lively" feel without compromising the Google PageSpeed Score.



\### C. Bank Transfer Management

\- \*\*Approach:\*\* "Manual Confirmation" Model.

\- \*\*Implementation:\*\*

\    1.  \*\*Page:\*\* Customize the \`donate.astro\` page to display the bank details.

\    2.  \*\*Form:\*\* Use the "Contact Form" component to create a "Proof of Transfer" submission form (Name, Email, Amount, Reference Number).

\    3.  \*\*Validation:\*\* Implement client-side validation for the form.

\    4.  \*\*Webhook:\*\* Configure the form to send submissions to a specific email (e.g., \`finance@...\`) or a Google Sheet.



\## 6. Security & Performance Checklist

\- \*\*Security:\*\*

\- Implement Content Security Policy (CSP) headers via Netlify.

\- Use HTTPS (Enforced via Netlify).

\- Secure the \`/admin\` route with a Basic Authentication layer (e.g., Netlify Identity).

\- \*\*Performance:\*\*

\- \*\*Image Optimization:\*\* Use Astro's built-in \`<Image />\` component to generate WebP/AVIF formats automatically.

\- \*\*Lazy Loading:\*\* Ensure images are lazy-loaded for the "Blog" and "Impact Stories" pages.

\- \*\*Analytics:\*\* Set up Google Tag Manager (GTM) via the Kindora theme's pre-configured integration.



\## 7. Observability & Maintenance

\- \*\*Monitoring:\*\* Implement uptime monitoring (e.g., UptimeRobot or Netlify Analytics) to ensure the site is always available.

\- \*\*Error Tracking:\*\* Integrate Sentry to catch client-side JavaScript errors (especially important for the "Proof of Transfer" form).

\- \*\*Daily Updates Strategy:\*\*

\- Content updates (Prayer Summaries) are "lightweight" deployments.

\- Use the "Deploy Preview" process to allow leadership to approve critical messages before they go live.



\## 8. Conclusion & Next Steps

This roadmap provides a \*\*future-proof\*\* foundation for \*\*Global Rescue Mission Intl.\*\* By adhering to this DevOps plan, you ensure that the technical infrastructure supports your mission of evangelism and fundraising with reliability, speed, and inclusivity.



\*\*Action Items for the Team:\*\*

1.  \*\*Setup:\*\* Set up the Git repository and install the Kindora Astro template.

2.  \*\*Integrate:\*\* Configure Decap CMS and connect it to the Git provider.

3.  \*\*Customize:\*\* Implement the Bank Transfer page and the AOS animations.

4.  \*\*Deploy:\*\* Connect the repository to Netlify with the CI/CD pipeline.

5.  \*\*Train:\*\* Train the Content Editors on the Decap CMS admin interface.





Folder Structure:



Understood. No code – only a \*\*complete, production-grade project blueprint\*\* that translates the DevOps plan into a tangible file system. 



Below is the \*\*full, exhaustive folder and file inventory\*\* for \*\*Global Rescue Mission Intl.\*\*, mapped to the Jamstack/Astro architecture. Every directory, configuration file, and content collection is deliberately placed to support your evangelism, fundraising, daily prayer updates, bank-transfer workflows, and lively animations—while keeping the Admin UI (Decap CMS) and CI/CD pipelines fully operational.



\---



\## 📁 Project Root: \`global-rescue-mission-intl/\`



\`\``

global-rescue-mission-intl/

│

├── .github/                                 # CI/CD Automation (GitHub Actions)

│   └── workflows/

│       ├── ci.yml                           # Lint, Build, Test on every Pull Request

│       └── cd.yml                           # Deploy to Netlify on merge to 'main'

│

├── admin/                                   # 📝 Decap CMS (Admin UI) – Browser-based content editor

│   ├── config.yml                           # CMS schema: defines collections for "Prayers", "Stories", "Donation Instructions"

│   └── index.html                           # The login/editor interface (served at /admin)

│

├── public/                                  # 🌐 Static, unprocessed assets (served as-is)

│   ├── fonts/                               # Custom typefaces (if any)

│   ├── images/

│   │   ├── placeholders/                    # Temporary hero/banner images (for launch)

│   │   ├── stories/                         # Impact story feature images (will replace placeholders)

│   │   ├── prayers/                         # Illustrations for daily prayer summaries

│   │   └── transfers/                       # Visual guides (e.g., bank transfer infographics)

│   ├── favicon.svg

│   ├── robots.txt                           # SEO crawler instructions

│   └── sitemap.xml                          # Auto-generated (but kept here for reference)

│

├── src/                                     # 🧩 Main application source code

│   │

│   ├── components/                          # 🧱 Reusable UI building blocks (Astro + Tailwind)

│   │   ├── common/

│   │   │   ├── Header.astro

│   │   │   ├── Footer.astro

│   │   │   └── Navigation.astro

│   │   ├── donation/

│   │   │   ├── BankTransferInstructions.astro   # Displays SWIFT/IBAN details

│   │   │   └── ProofOfTransferForm.astro        # Manual donor submission form (Name, Amount, Ref#)

│   │   ├── prayer/

│   │   │   ├── PrayerCard.astro                 # Preview card for blog/list views

│   │   │   └── DailyPrayerSummary.astro         # Full MDX render wrapper

│   │   ├── story/

│   │   │   └── ImpactStoryCard.astro

│   │   ├── ui/

│   │   │   ├── CTAButton.astro

│   │   │   ├── SectionWrapper.astro

│   │   │   └── LivelyScrollAnimation.astro      # Centralized AOS (Animate On Scroll) initializer

│   │   └── forms/

│   │       ├── VolunteerSignup.astro

│   │       └── ContactForm.astro

│   │

│   ├── content/                              # 📚 The "Content Layer" – all MDX files live here

│   │   ├── prayers/                          # Daily midnight prayer summaries (date-stamped MDX)

│   │   │   ├── 2026-08-01-prayer-for-peace.mdx

│   │   │   ├── 2026-08-02-prayer-for-provision.mdx

│   │   │   └── _index.mdx                    # Optional landing intro for the prayer archive

│   │   ├── stories/                          # Impact stories (field reports, testimonies)

│   │   │   ├── 2026-q3-outreach-nigeria.mdx

│   │   │   └── 2026-q3-food-distribution.mdx

│   │   ├── pages/                            # Standalone MDX pages (legal, about, etc.)

│   │   │   ├── about.mdx

│   │   │   ├── mission-statement.mdx

│   │   │   └── bank-transfer-guide.mdx       # Detailed step-by-step transfer instructions

│   │   └── config.ts                         # TypeScript schema for collection validation (type safety)

│   │

│   ├── data/                                 # 📊 External datasets (CSV/JSON) for bulk management

│   │   ├── volunteer-roles.csv               # List of available volunteer positions

│   │   ├── fundraising-goals.json            # Dynamic numeric goals for "Causes" page

│   │   └── team-members.json                 # Staff/leadership bios (avoids hardcoding)

│   │

│   ├── layouts/                              # 📄 Page wrappers (shared headers/footers)

│   │   ├── BaseLayout.astro                  # Global <head> meta, fonts, SEO, AOS injection

│   │   ├── BlogLayout.astro                  # Specific layout for prayer/story archives

│   │   └── DonationLayout.astro              # Minimal layout for donation page (distraction-free)

│   │

│   ├── pages/                                # 🗺️ Routing – each .astro/.mdx becomes a URL

│   │   ├── index.astro                       # Homepage (mission highlight + latest prayer)

│   │   ├── about.astro                       # About & outreach programs

│   │   ├── team.astro                        # Leadership & volunteers

│   │   ├── causes.astro                      # Fundraising causes (Kindora pre-configured)

│   │   ├── programs.astro                    # List of outreach programs

│   │   ├── donate.astro                      # \*\*Custom donation page\*\* (Bank transfer details + proof form)

│   │   ├── blog/                             # Dynamic archive route

│   │   │   ├── \[...slug].astro               # Dynamic route for rendering MDX entries (prayers & stories)

│   │   │   └── page/

│   │   │       └── \[page].astro              # Pagination for the blog feed

│   │   ├── volunteer.astro                   # Sign-up landing page

│   │   ├── privacy-policy.astro

│   │   ├── terms.astro

│   │   └── 404.astro                         # Custom not-found page

│   │

│   ├── styles/                               # 🎨 Global styling (Tailwind base + custom overrides)

│   │   ├── globals.css                       # Tailwind directives and custom utility classes

│   │   └── animations.css                    # Custom keyframes (complements AOS library)

│   │

│   └── utils/                                # 🛠️ Helper functions (non-UI)

│       ├── form-validation.ts                # Client-side validation for Proof of Transfer

│       └── date-formatter.ts                 # Format prayer/story publish dates

│

├── .env.example                              # 🔒 Template for environment variables (GTM ID, Netlify webhooks)

├── .gitignore                                # Excludes node_modules, .env, dist, etc.

├── .prettierrc                               # Code formatting rules (Astro, MDX, JS)

├── .eslintrc.cjs                             # Linting rules (catch accessibility issues early)

├── astro.config.mjs                          # ⚙️ Astro framework config (site URL, integrations, MDX)

├── tailwind.config.cjs                       # 🎨 Tailwind v4 config (themes, fonts, plugins)

├── tsconfig.json                             # TypeScript strict settings (for content type safety)

├── package.json                              # 📦 Dependencies (Astro, MDX, AOS, Tailwind, Decap proxy)

├── pnpm-lock.yaml                            # (or package-lock.json) – exact version locks

└── README.md                                 # 📘 Developer onboarding & DevOps runbooks

\`\``



\---



\## 🔍 Strategic Rationale Behind Key Folders (DevOps Perspective)



\| Folder / File | Purpose in the DevOps Pipeline |

\| :--- | :--- |

\| \*\*\`.github/workflows/\`\*\* | Houses the CI/CD automation. On every PR, it builds the site, runs \`axe-core\` for accessibility, and checks image sizes. On merge to \`main\`, it triggers the Netlify production build. |

\| \*\*\`admin/config.yml\`\*\* | The "source of truth" for your editors. It defines the \`prayers\` and \`stories\` collections—mapping MDX fields (title, date, featured image, body). Editors push changes via the Git gateway, automatically creating a Netlify Deploy Preview. |

\| \*\*\`src/content/\`\*\* | The \*\*Type-Safe Content Layer\*\*. By isolating all MDX here and using \`config.ts\`, you ensure that even if 1,000 prayer entries are added, the build will break \*early\* if any required field (e.g., \`publishDate\`) is missing. |

\| \*\*\`src/components/donation/ProofOfTransferForm.astro\`\*\* | This component handles the manual bank-transfer workflow. It captures donor reference numbers and emails, connecting to a webhook (or email) without needing a backend—keeping the site static. |

\| \*\*\`src/components/ui/LivelyScrollAnimation.astro\`\*\* | Centralizes the \*\*AOS (Animate On Scroll)\*\* initialization. By importing this component only on layouts that need it, we preserve Astro's "zero-JS default" and keep the PageSpeed score above 97. |

\| \*\*\`src/data/\`\*\* | Future-proofs the site. If you later migrate to a headless API or a database, the CSV/JSON files in this folder can be easily exported, ensuring zero vendor lock-in. |

\| \*\*\`public/images/transfers/\`\*\* | Dedicated space for screenshots or illustrated guides showing exactly how to fill out a SWIFT transfer form—reducing donor drop-off. |

\| \*\*\`.env.example\`\*\* | Committed to the repo to remind developers which keys are needed (e.g., \`PUBLIC_GTM_ID\`, \`NETLIFY_WEBHOOK_SECRET\`). The actual \`.env\` is excluded from Git for security. |



\---



\## 🚀 How This Folder Enables Your "Lively Animations" Requirement



\- The \*\*\`LivelyScrollAnimation.astro\`\*\* component will contain a single \`script\` tag that imports the AOS library and calls \`AOS.init({ duration: 800, once: true })\`. 

\- By placing it in the \`ui/\` folder and importing it only into the \*\*\`BaseLayout\`\*\* (or specific landing pages), you control exactly where the animation JavaScript loads—keeping the rest of the site static and blazing fast.

\- All image-driven sections (impact stories, prayer cards) will receive \`data-aos="fade-up"\` attributes, ensuring that as donors scroll, the mission comes alive visually.



\---



\## 📋 Next Step (After This Blueprint)



This \*\*full folder draft\*\* is your master checklist. When you are ready to begin coding:



1. Clone the Kindora Astro template into this structure.

2. Copy the \`admin/\` folder and \`src/content/\` into place.

3. Wire the \`.github/\` workflows to your Netlify site ID.

4. Populate the placeholders in \`public/images/placeholders/\` with your temporary branding.



This layout is \*\*scalable, auditable, and battle-tested\*\* for non-profit growth. No code has been written yet—this is your architectural foundation. When you give the green light, we will implement each file piece by piece.
