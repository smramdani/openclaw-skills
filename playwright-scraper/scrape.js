#!/usr/bin/env node

const { chromium, firefox, webkit } = require('playwright');
const { program } = require('commander');
const TurndownService = require('turndown');
const fs = require('fs');

// Configure Turndown for better markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx', // Use #, ##, etc. for headings
  bulletListMarker: '-', // Use - for bullet lists
  codeBlockStyle: 'fenced', // Use ``` for code blocks
  emDelimiter: '*', // Use * for italics
  strongDelimiter: '**', // Use ** for bold
});

// Custom rules for Turndown
// Handle tables
turndownService.addRule('tables', {
  filter: ['table'],
  replacement: (content) => {
    return '\n\n' + content + '\n\n';
  }
});

// Handle links
turndownService.addRule('links', {
  filter: ['a'],
  replacement: (content, node) => {
    const href = node.getAttribute('href');
    const title = node.getAttribute('title') || '';
    return href ? `[${content}](${href}${title ? ' "' + title + '"' : ''})` : content;
  }
});

program
  .requiredOption('--url <url>', 'URL to scrape')
  .option('--output <format>', 'Output format (markdown or json)', 'markdown')
  .option('--actions <actions>', 'Comma-separated actions (e.g., click:#button,type:#input:text,wait:2000)')
  .option('--browser <browser>', 'Browser to use (chromium, firefox, or webkit)', 'chromium')
  .option('--screenshot', 'Capture a screenshot of the page (saves as screenshot.png)');

program.parse(process.argv);
const options = program.opts();

(async () => {
  let browser;
  try {
    // Launch browser
    switch (options.browser) {
      case 'chromium':
        browser = await chromium.launch();
        break;
      case 'firefox':
        browser = await firefox.launch();
        break;
      case 'webkit':
        browser = await webkit.launch();
        break;
      default:
        console.error('Invalid browser. Use chromium, firefox, or webkit.');
        process.exit(1);
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to URL
    await page.goto(options.url, { waitUntil: 'domcontentloaded' });

    // Perform actions if provided
    if (options.actions) {
      const actions = options.actions.split(',');
      for (const action of actions) {
        const [type, selector, value] = action.split(':');
        switch (type) {
          case 'click':
            await page.click(selector);
            break;
          case 'type':
            await page.type(selector, value);
            break;
          case 'wait':
            await page.waitForTimeout(parseInt(value));
            break;
          default:
            console.error(`Unknown action: ${type}`);
        }
      }
    }

    // Capture screenshot if requested
    if (options.screenshot) {
      await page.screenshot({ path: 'screenshot.png' });
      console.error('Screenshot saved as screenshot.png');
    }

    // Extract HTML and convert to markdown
    const content = await page.evaluate(() => {
      return {
        title: document.title,
        html: document.body.innerHTML,
      };
    });

    // Convert HTML to markdown
    const markdown = turndownService.turndown(content.html);

    // Output result
    if (options.output === 'json') {
      console.log(JSON.stringify({
        title: content.title,
        markdown: markdown,
        url: options.url,
        timestamp: new Date().toISOString()
      }, null, 2));
    } else {
      console.log(`# ${content.title}\n\n**Source:** [${options.url}](${options.url})\n\n**Timestamp:** ${new Date().toISOString()}\n\n${markdown}`);
    }

    await browser.close();
  } catch (error) {
    console.error('Error:', error.message);
    if (browser) await browser.close();
    process.exit(1);
  }
})();