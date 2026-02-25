# OpenClaw Skills

A collection of **reusable AgentSkills** for OpenClaw, designed to extend its functionality with specialized tools for web scraping, automation, and more.

## Purpose
This repository contains skills to:
- Scrape and interact with websites (e.g., Playwright scraper).
- Automate workflows (e.g., tmux control, weather fetching).
- Integrate with external services (e.g., GitHub, APIs).

## Skills
### Playwright Scraper
A **web scraping skill** using Playwright to extract data from dynamic websites.

#### Features
- Supports **Chromium, Firefox, and WebKit**.
- Outputs data in **Markdown or JSON**.
- Captures **screenshots** of pages.
- Handles **interactions** (clicks, typing, waiting).

#### Usage
1. Install dependencies:
   ```bash
   cd playwright-scraper && npm install
   ```
2. Run the scraper:
   ```bash
   node scrape.js --url "https://example.com" --output markdown
   ```

#### Examples
- **Basic scraping**:
  ```bash
  node scrape.js --url "https://example.com" --output markdown
  ```
- **With interactions**:
  ```bash
  node scrape.js --url "https://example.com" --actions "click:#button,wait:2000" --output json
  ```
- **Capture screenshot**:
  ```bash
  node scrape.js --url "https://example.com" --output markdown --screenshot
  ```

#### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/smramdani/openclaw-skills.git
   ```
2. Navigate to the skill directory:
   ```bash
   cd openclaw-skills/playwright-scraper
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-skill`).
3. Commit your changes (`git commit -m "Add new skill: skill-name"`).
4. Push to the branch (`git push origin feature/new-skill`).
5. Open a Pull Request.

## License
This repository is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.