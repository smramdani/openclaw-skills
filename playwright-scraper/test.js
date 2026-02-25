#!/usr/bin/env node

const { exec } = require('child_process');
const assert = require('assert');
const fs = require('fs');

// Test 1: Basic scraping
const testBasicScraping = () => {
  exec('node scrape.js --url "https://example.com" --output markdown', (error, stdout, stderr) => {
    if (error) {
      console.error('Test 1 Failed:', stderr);
      return;
    }
    assert(stdout.includes('Example Domain'));
    console.log('Test 1 Passed: Basic scraping works.');
  });
};

// Test 2: JSON output
const testJsonOutput = () => {
  exec('node scrape.js --url "https://example.com" --output json', (error, stdout, stderr) => {
    if (error) {
      console.error('Test 2 Failed:', stderr);
      return;
    }
    try {
      const result = JSON.parse(stdout);
      assert(result.title === 'Example Domain');
      console.log('Test 2 Passed: JSON output works.');
    } catch (e) {
      console.error('Test 2 Failed: Invalid JSON output.');
    }
  });
};

// Test 3: Markdown conversion
const testMarkdownConversion = () => {
  exec('node scrape.js --url "https://example.com" --output markdown', (error, stdout, stderr) => {
    if (error) {
      console.error('Test 3 Failed:', stderr);
      return;
    }
    assert(stdout.includes('# Example Domain'));
    assert(stdout.includes('**Source:**'));
    console.log('Test 3 Passed: Markdown conversion works.');
  });
};

// Test 4: Screenshot capture
const testScreenshotCapture = () => {
  exec('node scrape.js --url "https://example.com" --output markdown --screenshot', (error, stdout, stderr) => {
    if (error) {
      console.error('Test 4 Failed:', stderr);
      return;
    }
    assert(fs.existsSync('screenshot.png'));
    fs.unlinkSync('screenshot.png'); // Clean up
    console.log('Test 4 Passed: Screenshot capture works.');
  });
};

// Run tests
console.log('Running tests...');
testBasicScraping();
testJsonOutput();
testMarkdownConversion();
testScreenshotCapture();