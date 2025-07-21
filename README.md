# CodeCred - The Live Dev Portfolio

**Your Link-in-Bio is Now a Live Dev Portfolio**. Stop just listing links. Showcase your real-time GitHub activity, latest tech articles, and project showcases with dynamic, automated content blocks. Built for developers, by developers.

## Why CodeCred?

Generic "link-in-bio" tools are built for influencers, not engineers. They fail to answer the questions that matter to clients and recruiters: "What have you built?", "How do you think?", and "What's your real expertise?".

CodeCred transforms your profile from a static list into a living dashboard of your professional identity. It pulls data directly from the sources of truth—GitHub, your tech blog, and more—to create a dynamic, evidence-based portfolio that is always up-to-date.

➡️ Live Demo of the SaaS Version

## ✨ Features

CodeCred uses a modular system of "Blocks" to build your profile.

- **🔗 Standard Links**: The classic link list, fully customizable.
- **🐙 Live GitHub Showcase**: Display your contribution graph, pinned repositories with live star/fork counts, and recent activity.
- **✍️ Tech Blog Aggregator**: Connect your RSS feed or link your Dev.to, Hashnode, or Medium profile to automatically display your latest articles.
- **🛠️ Project Showcase**: Create rich project cards with descriptions, tech stack tags, and links to both the live demo and source code.
- **🎨 Full Customization**: Choose from developer-centric themes (like Dracula, Solarized) or use custom CSS for complete control.

## 🚀 Getting Started (Self-Hosting)

You can host your own instance of CodeCred for free. We recommend using Docker for the simplest setup.

### Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose (Recommended)
- A GitHub OAuth Application for authentication.

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/codecred.git
cd codecred
```

### 2. Configure Environment Variables

Copy the example environment file and fill in the required values.

```bash
cp .env.example .env
```

You will need to create a GitHub OAuth App to get your `GITHUB_ID` and `GITHUB_SECRET`. The callback URL should be `http://localhost:3000/api/auth/callback/github`.

### 3. Run with Docker (Recommended)

This is the easiest way to get started.

```bash
docker-compose up --build
```

Your CodeCred instance will be running at `http://localhost:3000`.

### 4. Run Manually (Without Docker)

If you prefer not to use Docker:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Your instance will be available at `http://localhost:3000`.

## ⚖️ Open Core & Licensing

CodeCred operates on an Open Core model.

- Community Edition (CE): The core of our product, including all features listed above, is free and open-source under the MIT License. This version is ideal for self-hosting. You can find its source code throughout this repository.
- Pro Version (SaaS): We also offer a managed Pro version with additional features designed for professionals, such as managed hosting, custom domains, advanced analytics, and priority support. The code for these premium features is located in the /pro directory and is governed by a _Commercial License_.

This model allows us to maintain a vibrant open-source community while building a sustainable business to support the project's long-term development.

## 🤝 Contributing

We welcome contributions of all kinds! Please see our `CONTRIBUTING.md` file for guidelines on how to get started.

## 📄 License

The core of CodeCred is licensed under the MIT License.
