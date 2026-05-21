<div align="center">

<img src="https://img.shields.io/badge/Syntra-Client-7c3aed?style=for-the-badge&logoColor=white" alt="Syntra Client" />

# Syntra — Frontend

### Dashboard & embeddable chatbot widget for the Syntra AI support platform.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white)](https://socket.io)
[![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square&logoColor=white)](https://zustand-demo.pmnd.rs)

[Backend Repo](#) · [Live Demo](#) · [Report Bug](#)

</div>

---

## Overview

This is the frontend for **Syntra** — an AI-powered customer support platform. It includes two main surfaces:

- **Dashboard** — where org members manage knowledge sources, configure chatbots, handle escalated conversations, and monitor support activity in real time.
- **Chatbot Widget** — a lightweight embeddable chat UI that end users interact with on any website.

---

## ✨ Key Frontend Features

### 🔴 Real-Time Escalation Alerts
When a user raises a support ticket, agents on the dashboard get an **instant toast notification** via Socket.io — no polling, no page refresh.

### 🔢 Live Escalation Badge
The Conversations sidebar item shows a **live count** of pending escalated chats, updating in real time as conversations are escalated or resolved.

### 💬 Conversations Page
Lists all escalated conversations. Agents can open a chat, join it live, exchange messages in real time with the user, and mark it as resolved — all from one view.

### 🎨 Chatbot Widget
A fully embeddable chat UI served from `/widget`. Connects via Socket.io using a JWT session token (valid for 2 hours), supports AI replies, escalation flow, agent handover, and resolution — all in the same window.

### 🏢 Multi-Tenant Dashboard
Each organisation sees only their own chatbots, knowledge, conversations, and members — fully isolated via ScaleKit auth.

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

## 🚀 Getting Started

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

Create a `.env` file in the root:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔌 Socket Events (Client Side)

| Event | Direction | Description |
|-------|-----------|-------------|
| `join:org` | emit | Join org room on dashboard load |
| `join:conversation` | emit | Widget joins its conversation room |
| `new:escalation` | on | New escalated chat — show toast + update badge |
| `agent:joined` | on | Agent joined — show agent name in widget |
| `new:message` | on/emit | Real-time message exchange |
| `status:update` | on | Conversation status changed (ESCALATED/ACTIVE/EXPIRED/RESOLVED) |
| `chat:resolved` | on | Conversation resolved — update badge count |

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Part of the [Syntra](https://github.com/gauravssharma/syntra) platform · Built by [Gaurav Sharma](https://gaurav-olive.vercel.app/)

</div>
