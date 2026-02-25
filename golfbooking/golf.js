#!/usr/bin/env node

const { message } = require('openclaw');
const axios = require('axios');
const { openclawSecrets } = require('openclaw-secrets'); // Hypothetical secrets tool

// Load API credentials from secrets
const GOLF_API_KEY = openclawSecrets.get('GOLF_API_KEY');
const GOLF_API_URL = 'https://api.golfnow.com'; // Replace with actual API URL

// Mock database (replace with SQLite/PostgreSQL in production)
const bookings = {};

// Handle Telegram commands
async function handleCommand(cmd, args, chatId) {
  switch (cmd) {
    case '/book':
      await startBooking(chatId);
      break;
    case '/cancel':
      await cancelBooking(args[0], chatId);
      break;
    case '/update':
      await updateBooking(args[0], chatId);
      break;
    case '/invite':
      await inviteFriend(args[0], args[1], chatId);
      break;
    case '/list':
      await listBookings(chatId);
      break;
    default:
      await message({
        action: 'send',
        chatId,
        message: '❌ *Unknown command*. Try `/book`, `/cancel`, `/update`, `/invite`, or `/list`.'
      });
  }
}

// Start a new booking
async function startBooking(chatId) {
  // Fetch available courses from API
  const courses = await fetchCourses();
  
  // Send course selection buttons
  await message({
    action: 'send',
    chatId,
    message: '🏌️ *Golf Course Booking*\nSelect a course:',
    buttons: courses.map(course => [{
      text: course.name,
      callback_data: `course_${course.id}`
    }])
  });
}

// Fetch available courses from API
async function fetchCourses() {
  try {
    const response = await axios.get(`${GOLF_API_URL}/courses`, {
      headers: { Authorization: `Bearer ${GOLF_API_KEY}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    return [{ id: '123', name: 'Paris Golf Club' }]; // Fallback
  }
}

// Cancel a booking
async function cancelBooking(bookingId, chatId) {
  if (!bookings[bookingId]) {
    await message({ action: 'send', chatId, message: '❌ *Booking not found*.' });
    return;
  }
  
  // Call API to cancel booking
  try {
    await axios.delete(`${GOLF_API_URL}/bookings/${bookingId}`, {
      headers: { Authorization: `Bearer ${GOLF_API_KEY}` }
    });
    delete bookings[bookingId];
    await message({ action: 'send', chatId, message: '✅ *Booking cancelled*.' });
  } catch (error) {
    await message({ action: 'send', chatId, message: '❌ *Failed to cancel booking*.' });
  }
}

// Update a booking
async function updateBooking(bookingId, chatId) {
  if (!bookings[bookingId]) {
    await message({ action: 'send', chatId, message: '❌ *Booking not found*.' });
    return;
  }
  
  // Prompt for new date/time (simplified for example)
  await message({
    action: 'send',
    chatId,
    message: '📅 *Update Booking*\nEnter new date (DD/MM/YYYY):'
  });
}

// Invite a friend to a booking
async function inviteFriend(bookingId, friendUsername, chatId) {
  if (!bookings[bookingId]) {
    await message({ action: 'send', chatId, message: '❌ *Booking not found*.' });
    return;
  }
  
  // Call API to invite friend
  try {
    await axios.post(`${GOLF_API_URL}/bookings/${bookingId}/invite`, {
      username: friendUsername
    }, {
      headers: { Authorization: `Bearer ${GOLF_API_KEY}` }
    });
    await message({
      action: 'send',
      chatId,
      message: `✅ *Invitation sent* to @${friendUsername}.`
    });
  } catch (error) {
    await message({
      action: 'send',
      chatId,
      message: '❌ *Failed to send invitation*.'
    });
  }
}

// List upcoming bookings
async function listBookings(chatId) {
  const upcoming = Object.values(bookings).filter(b => b.status === 'confirmed');
  if (upcoming.length === 0) {
    await message({ action: 'send', chatId, message: '🏌️ *No upcoming bookings*.' });
    return;
  }
  
  const messageText = upcoming.map(b => `
📅 *${b.course}*
🗓 ${b.date} at ${b.time}
🆔 Booking ID: ${b.id}
`).join('\n');
  
  await message({
    action: 'send',
    chatId,
    message: `🏌️ *Your Upcoming Bookings*${messageText}`
  });
}

// Handle button callbacks (e.g., course selection)
async function handleCallback(callbackData, chatId) {
  const [type, id] = callbackData.split('_');
  if (type === 'course') {
    await selectCourse(id, chatId);
  }
}

// Select a course and prompt for date/time
async function selectCourse(courseId, chatId) {
  // Fetch available dates/times for the course
  const slots = await fetchAvailability(courseId);
  
  await message({
    action: 'send',
    chatId,
    message: '📅 *Select a date*:',
    buttons: slots.map(slot => [{
      text: slot.date,
      callback_data: `date_${courseId}_${slot.date}`
    }])
  });
}

// Fetch availability for a course
async function fetchAvailability(courseId) {
  try {
    const response = await axios.get(`${GOLF_API_URL}/availability?course=${courseId}`, {
      headers: { Authorization: `Bearer ${GOLF_API_KEY}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching availability:', error.message);
    return [{ date: '30/03/2026', times: ['08:00', '09:00'] }]; // Fallback
  }
}

// Export functions for OpenClaw
module.exports = { handleCommand, handleCallback };