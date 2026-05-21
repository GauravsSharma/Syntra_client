<div align="center">

<img src="https://img.shields.io/badge/Syntra-Client-7c3aed?style=for-the-badge&logoColor=white" alt="Syntra Client" />

# Syntra — Frontend

### Dashboard & embeddable chatbot widget for the Syntra AI support platform.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white)](https://socket.io)
[![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square&logoColor=white)](https://zustand-demo.pmnd.rs)

[Backend Repo](https://github.com/GauravsSharma/Syntra_server) · [Live Demo](https://syntra-one.vercel.app/) · [Report Bug](#)

</div>

---

## Overview

This is the frontend for **Syntra** — an AI-powered customer support platform. It includes two main surfaces:

- **Dashboard** — where org members manage knowledge sources, configure chatbots, handle escalated conversations, and monitor support activity in real time.
- **Chatbot Widget** — a lightweight embeddable chat UI that end users interact with on any website.

---

## 🚀 Getting Started — Step by Step

Follow these steps in order to go from a fresh account to a fully deployed AI chatbot on your website.

---

### Step 1 — Knowledge Base

> **Dashboard → Knowledge**

This is where you teach your chatbot everything it needs to know. Syntra supports three ways to add knowledge:

**🌐 Website URL**
Enter any public website URL. Syntra will crawl the page and extract its content automatically — great for documentation sites, help centres, or landing pages.

**📄 Upload File**
Upload a CSV file containing your FAQs, product info, or any structured content. Syntra parses it and makes it available to the AI instantly.

**✏️ Manual Text**
Copy-paste FAQs, internal notes, policies, or any custom content directly into the editor. Best for content that isn't published anywhere online.

> ⚠️ **Plan Limits**
> | Plan | Knowledge Sources/Section |
> |------|--------------------------|
> | Free | 1 |
> | Ninja ($9.99/mo) | 2 |
> | Ninja Pro ($29.99/mo) | 5 |

---

### Step 2 — Sections

> **Dashboard → Sections**

Sections let you organise your knowledge and control how the AI responds for different topics.

**How to create a section:**

1. Click **"Create your first section"**
2. Enter a **Section Name** (e.g. `Billing Policy`, `Product FAQ`)
3. Add a **Description** — this tells the AI routing model *when* to activate this section
4. Select **Knowledge Sources** — attach one or more sources from Step 1
5. Choose a **Tone** for this section:

| Tone | Style | Best For |
|------|-------|----------|
| **Strict** | Fact-based only. No small talk. | Legal, compliance, billing |
| **Neutral** | Professional, concise, direct | General product info |
| **Friendly** | Warm and conversational | FAQs, onboarding |
| **Empathetic** | Support-first, apologetic, calming | Complaints, refunds |

6. Optionally set **Scope Rules** — define allowed and blocked topics to keep the AI focused
7. Click **"Create Section"**

> 💡 You can create multiple sections with different tones — one chatbot, many personalities.

---

### Step 3 — Chatbot Playground

> **Dashboard → Chatbot**

This is where you customise the look of your chatbot and test it before deploying.

**Appearance:**
- **Primary Color** — choose from preset colors to match your brand
- **Welcome Message** — the first message users see when they open the chat

Click **"Save Changes"** after customising.

**Test Environment:**
The left panel is a live playground — send messages to test how your chatbot responds using your actual knowledge sources and sections. Make sure answers are correct before embedding.

**Embed Code:**
Once satisfied, copy the embed snippet shown at the bottom:

```html
<script
  src="https://syntra.app/widget.js"
  data-id="your-chatbot-id"
  defer>
</script>
```

Paste this before the closing `</head>` tag on your website. The chatbot widget will appear automatically.

---

### Step 4 — Conversations

> **Dashboard → Conversations**

Your team's live support inbox. Shows all **escalated conversations** — chats where the AI couldn't answer and a user raised a support ticket.

**How it works:**
- When AI can't answer, it asks the user if they'd like to raise a ticket
- If the user agrees, the conversation appears here instantly via Socket.io — no refresh needed
- A team member opens the conversation and joins the live chat
- Agent and user exchange messages in real time
- Once resolved, agent clicks **"Resolve"** — conversation is closed and logged with agent email + timestamp

**If no agent joins within 10 minutes:**
- Conversation is automatically marked as expired
- AI asks the user for their email address
- Org owner receives an email notification about the missed escalation

---

### Step 5 — Settings

> **Dashboard → Settings**

Manage your organisation details and invite team members who can handle escalated conversations from the Conversations tab.

---

### Step 6 — Billing

> **Dashboard → Billing**

View your current plan, usage, and upgrade when needed.

| Plan | Price | AI Messages/mo | Knowledge Sources/section |
|------|-------|---------------|--------------------------|
| **Free** | $0 | 100 | 1 |
| **Ninja** | $9.99/mo | 2,000 | 2 |
| **Ninja Pro** | $29.99/mo | 10,000 | 5 |

> All plans include SSL security, 99.9% uptime SLA, and email support.

Click **"Manage subscription"** to upgrade or cancel your plan.

---

## ✨ Key Features

### 🔴 Real-Time Escalation Alerts
When a user raises a support ticket, agents get an **instant toast notification** — no polling, no page refresh. Powered by Socket.io.

### 🔢 Live Escalation Badge
The Conversations sidebar shows a live count of pending escalated chats, updating in real time as conversations come in or get resolved.

### 🎨 Chatbot Customisation
Set your brand color and welcome message. Test everything in the live playground before going live.

### 🔌 One-Line Embed
Drop your chatbot into any website with a single script tag — no framework or coding knowledge required.

### 🏢 Multi-Tenant
Each organisation sees only their own chatbots, knowledge, conversations, and members — fully isolated.

---

## 🛠️ Tech Stack

| Purpose | Technology |
|---------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Real-Time | Socket.io Client |
| Server State | React Query (TanStack) |
| Global State | Zustand |
| HTTP | Axios |
| Auth | ScaleKit |
| Animations | Framer Motion |

---

## 💻 Local Setup

### Prerequisites
- Node.js 18+
- Syntra backend running ([Backend Repo](#))

### Installation

```bash
git clone https://github.com/gauravssharma/syntra-client.git
cd syntra-client
npm install
```

### Environment Variables

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔌 Socket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `join:org` | emit | Join org room on dashboard load |
| `join:conversation` | emit | Widget joins its conversation room |
| `new:escalation` | on | New escalated chat — show toast + update badge |
| `agent:joined` | on | Agent joined — show agent name in widget |
| `new:message` | on/emit | Real-time message exchange |
| `status:update` | on | Conversation status changed |
| `chat:resolved` | on | Conversation resolved — update badge count |

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Part of the [Syntra](https://github.com/gauravssharma/syntra) platform · Built by [Gaurav Sharma](https://gaurav-olive.vercel.app/)

⭐ Star this repo if you find it useful!

</div>
