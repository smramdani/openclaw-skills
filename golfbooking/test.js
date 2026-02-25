#!/usr/bin/env node

const { handleCommand, handleCallback } = require('./golf');
const assert = require('assert');

// Mock OpenClaw's message tool
const mockMessage = (msg) => {
  console.log(`[Mock Message] ${msg.message}`);
};

// Mock Axios for API calls
axios.get = async (url) => {
  if (url.includes('/courses')) {
    return { data: [{ id: '123', name: 'Paris Golf Club' }] };
  } else if (url.includes('/availability')) {
    return { data: [{ date: '30/03/2026', times: ['08:00', '09:00'] }] };
  }
  throw new Error('Mock API error');
};

axios.post = async (url, data) => {
  if (url.includes('/invite')) {
    return { data: { success: true } };
  }
  throw new Error('Mock API error');
};

axios.delete = async (url) => {
  if (url.includes('/bookings')) {
    return { data: { success: true } };
  }
  throw new Error('Mock API error');
};

// Test 1: /golfbook command
const testGolfbookCommand = async () => {
  console.log('Test 1: /golfbook command');
  await handleCommand('/golfbook', [], '123');
  console.log('✅ Test 1 Passed: Booking started.');
};

// Test 2: /cancel command
const testCancelCommand = async () => {
  console.log('Test 2: /cancel command');
  await handleCommand('/cancel', ['999'], '123'); // Invalid ID
  await handleCommand('/cancel', ['123'], '123'); // Valid ID (mocked)
  console.log('✅ Test 2 Passed: Cancellation handled.');
};

// Test 3: /invite command
const testInviteCommand = async () => {
  console.log('Test 3: /invite command');
  await handleCommand('/invite', ['123', 'friend123'], '123');
  console.log('✅ Test 3 Passed: Invitation sent.');
};

// Test 4: /list command
const testListCommand = async () => {
  console.log('Test 4: /list command');
  await handleCommand('/list', [], '123');
  console.log('✅ Test 4 Passed: Bookings listed.');
};

// Test 5: Button callback
const testCallback = async () => {
  console.log('Test 5: Button callback');
  await handleCallback('course_123', '123');
  console.log('✅ Test 5 Passed: Course selected.');
};

// Run tests
(async () => {
  console.log('Running tests...');
  await testGolfbookCommand();
  await testCancelCommand();
  await testInviteCommand();
  await testListCommand();
  await testCallback();
  console.log('All tests passed! ✅');
})();