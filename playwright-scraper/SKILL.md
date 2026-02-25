# Playwright Scraper Skill

## Description
A custom AgentSkill for web scraping using Playwright. This skill allows you to:
- Launch a browser (Chromium, Firefox, or WebKit).
- Navigate to a URL.
- Extract readable content (text or markdown).
- Perform basic interactions (click, type, wait).
- Capture screenshots of the page.
- Handle errors gracefully (timeouts, missing elements).

## Requirements
- Node.js (v18+)
- Playwright (`npm install playwright`)
- Turndown (`npm install turndown`)

## Installation
1. Navigate to the skill directory:
   ```bash
   cd /root/.openclaw/workspace/skills/playwright-scraper
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage
### Basic Scraping
```bash
node scrape.js --url "https://example.com" --output markdown
```

### Scraping with Interactions
```bash
node scrape.js --url "https://example.com" --output json --actions "click:#button,type:#input:hello,wait:2000"
```

### Capture Screenshot
```bash
node scrape.js --url "https://example.com" --output markdown --screenshot
```

### Options
| Option        | Description                                                                 | Required | Default     |
|---------------|-----------------------------------------------------------------------------|----------|-------------|
| `--url`       | URL to scrape.                                                              | Yes      | -           |
| `--output`    | Output format (`markdown` or `json`).                                      | No       | `markdown`  |
| `--actions`   | Comma-separated actions (e.g., `click:#button,type:#input:text,wait:2000`). | No       | -           |
| `--browser`   | Browser to use (`chromium`, `firefox`, or `webkit`).                        | No       | `chromium`  |
| `--screenshot`| Capture a screenshot of the page (saves as `screenshot.png`).              | No       | -           |

## Examples
### Extract Readable Content
```bash
node scrape.js --url "https://example.com" --output markdown
```

### Extract Content as JSON
```bash
node scrape.js --url "https://example.com" --output json
```

### Perform Interactions Before Scraping
```bash
node scrape.js --url "https://example.com/login" --actions "type:#username:user,type:#password:pass,click:#submit,wait:3000" --output json
```

### Capture Screenshot
```bash
node scrape.js --url "https://example.com" --output markdown --screenshot
```

## Testing
Run the test script to verify functionality:
```bash
node test.js
```

## Files
- `scrape.js`: Main scraping script (supports markdown conversion, interactions, and screenshots).
- `test.js`: Test script.
- `package.json`: Dependencies (Playwright, Turndown, Commander).

## OpenClaw Integration
This skill is integrated into OpenClaw as a **custom tool**. You can call it directly using:
```bash
exec --command "playwright_scrape --url 'https://example.com' --output markdown"
```

### Tool Definition
The tool is defined in `/root/.openclaw/config/tools/playwright_scrape.json` with the following options:
- `--url`: URL to scrape (required).
- `--output`: Output format (`markdown` or `json`).
- `--actions`: Comma-separated interactions (e.g., `click:#button,wait:2000`).
- `--browser`: Browser to use (`chromium`, `firefox`, or `webkit`).
- `--screenshot`: Capture a screenshot of the page.