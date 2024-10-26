# AI DEV Agents Comparison - by Edukey

An experimental project to compare:

- GitHub **Copilot Workspace** + VSCode CW plugin + **SuperMaven** autocomplete,
- **Cursor Composer** + Cursor Tab autocomplete,
- **Aider** with Claude 3.5 Sonnet + VSCode & SuperMaven autocomplete,
- **Claude Dev (Cline)** with Claude 3.5 Sonnet + VSCode & SuperMaven autocomplete,
- "traditional" **ChatGPT (o1-mini)** + VSCode (copy/paste) & SuperMaven autocomplete

in Front-End development with Next.js, TailwindCSS, MongoDB Node.js Driver, and `next-intl` internationalization. See [what we will build](#landing-page-description) in the end.

## Setup

1. Install the following:

   - Cursor Composer (there is a free trial)
   - VSCode with:
     - SuperMaven (also free trial available)
     - Claude Dev (Cline) (open source, your own API key is required)
   - Aider CLI tool (open source, your own API key is required)
   - GitHub Copilot Workspace is in Closed Beta, so you need to sign up for it (I will share a link to my session - you can access it with your GitHub account even if you don't have a GitHub Copilot Workspace access)

2. Clone this repo and use main branch as a starting point for own comparisons.
3. You will find separate comparisons in folowing branches:

   - `github-copilot-workspace` compares GitHub Copilot Workspace + VSCode CW plugin + SuperMaven autocomplete
   - `cursor-composer` compares Cursor Composer + Cursor Tab autocomplete
   - `aider` compares Aider with Claude 3.5 Sonnet + VSCode & SuperMaven autocomplete
   - `claude-dev` compares Claude Dev (Cline) with Claude 3.5 Sonnet + VSCode & SuperMaven autocomplete
   - `chatgpt-o1-copy-paste` compares "traditional" ChatGPT + VSCode (copy/paste) & SuperMaven autocomplete & Continue

4. Folder structure:
   - `/public/images` contains Edukey logo, favicon and hero image in 2 sizes and in JPG and WebP format.
   - `.env` contains database connection string (you have `example.env` file to copy and rename).
   - `/locales` folder with empty `en.json` and `pl.json` files.

## Action Plan

We will create a series of videos and blog posts, starting with an introduction to the project and the AI tools we will use, and then we will create a series of comparisons, each comparing one of the AI tools with the others.

1. Introduction and manual copy/paste with ChatGPT (o1-mini or o1-preview or 4o with canvas) and SuperMaven autocomplete.
2. GitHub Copilot Workspace + VSCode CW plugin + SuperMaven autocomplete.
3. ...

## Landing Page description

**TL;DR**: we will build a responsive landing page for a startup, with a hero image, a 2-step form to sign on our "Waiting list", with validation on FE, BE, and in the database, and a toggle language selector.

Detailed description of the landing page we will build, together with desktop and mobile **designs** (export from Figma), is available in [Landing-Description.md](Landing-Description.md) file. We will use this descriptions as our base for prompts we send to AI tools.

## License

MIT License - I ask only for attribution, but you can use it for any purpose.
