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

## ⏰ Scheduling RSS Feed Updates (Self-Hosted)

For the RSS Feed block to work correctly in a self-hosted environment, you need to set up a scheduler to periodically call the feed-fetching API endpoint. This keeps the articles on your profile pages up-to-date.

The standard way to do this on Linux-based systems is using a system cron job.

### How It Works

The cron job will use a command-line tool like `curl` or `wget` to send a `GET` request to the application's API endpoint. This triggers the same logic that Vercel Cron Jobs would, causing the application to check for and update any stale RSS feeds.

### Setup Instructions

#### 1. Set Your Cron Secret:

Make sure you have set the `CRON_SECRET` variable in your `.env` file. This is a secret key that protects the endpoint from being triggered by unauthorized users.

#### 2. Edit Your Crontab:

Open your system's crontab file for editing by running the following command in your terminal:

```bash
crontab -e
```

#### 3. Add the Cron Job:

Add the following line to the file. This example schedules the job to run at the beginning of every hour.

```bash
# This command uses curl to trigger the RSS feed update endpoint every hour.
# The --silent and --output /dev/null flags prevent curl from printing output.
0 * * * * curl --silent --output /dev/null "http://localhost:3000/api/cron/rss-fetch?cron_secret=YOUR_SECRET_KEY"
```

_Important:_

- Replace `http://localhost:3000` with the actual URL of your running CodeCred instance if it's not running on the same machine or on a different port.
- Replace `YOUR_SECRET_KEY` with the same value you set for `CRON_SECRET` in your `.env` file.

#### 4. Save and Close:

Save the crontab file. Your system will now automatically run the command on the schedule you defined.

Your RSS feeds will now be fetched and updated in the background, ensuring your profile page always shows your latest articles.

## ⚖️ Open Core & Licensing

CodeCred operates on an Open Core model.

- Community Edition (CE): The core of our product, including all features listed above, is free and open-source under the MIT License. This version is ideal for self-hosting. You can find its source code throughout this repository.
- Pro Version (SaaS): We also offer a managed Pro version with additional features designed for professionals, such as managed hosting, custom domains, advanced analytics, and priority support. The code for these premium features is located in the /pro directory and is governed by a _Commercial License_.

This model allows us to maintain a vibrant open-source community while building a sustainable business to support the project's long-term development.

## 🤝 Contributing

We welcome contributions of all kinds! Please see our `CONTRIBUTING.md` file for guidelines on how to get started.

## 📄 License

The core of CodeCred is licensed under the MIT License.
