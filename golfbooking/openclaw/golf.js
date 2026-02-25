const { exec, message } = require('openclaw');
const path = require('path');

const RUST_BINARY_PATH = path.join(__dirname, '../rust_core/target/release/golfbooking_core');

async function handleCommand(cmd, args, chatId, userId) {
  try {
    switch (cmd) {
      case '/golfbook':
        if (args.length < 3) {
          await message({ action: 'send', chatId, message: '❌ *Usage*: `/golfbook <course_id> <date> <time>`' });
          return;
        }
        const [courseId, date, time] = args;
        const bookResult = await exec({ command: `${RUST_BINARY_PATH} book ${courseId} ${date} ${time} ${userId}` });
        await message({ action: 'send', chatId, message: `🏌️ *Booking confirmed!*\n${bookResult.stdout}` });
        break;
      case '/golfcancel':
        if (args.length < 1) {
          await message({ action: 'send', chatId, message: '❌ *Usage*: `/golfcancel <booking_id>`' });
          return;
        }
        const [bookingId] = args;
        const cancelResult = await exec({ command: `${RUST_BINARY_PATH} cancel ${bookingId}` });
        await message({ action: 'send', chatId, message: `🗑️ *Booking cancelled*\n${cancelResult.stdout}` });
        break;
      case '/golflist':
        const listResult = await exec({ command: `${RUST_BINARY_PATH} list ${userId}` });
        const bookings = JSON.parse(listResult.stdout);
        if (bookings.length === 0) {
          await message({ action: 'send', chatId, message: '🏌️ *No upcoming bookings*.' });
          return;
        }
        const messageText = bookings.map(b => `
📅 *${b.course_id}* on ${b.date} at ${b.time}
🆔 Booking ID: ${b.booking_id || 'N/A'}`).join('\n');
        await message({ action: 'send', chatId, message: `🏌️ *Your Upcoming Bookings*${messageText}` });
        break;
      default:
        await message({ action: 'send', chatId, message: '❌ *Unknown command*. Try `/golfbook`, `/golfcancel`, or `/golflist`.' });
    }
  } catch (error) {
    await message({ action: 'send', chatId, message: `❌ *Error*: ${error.message}` });
  }
}

module.exports = { handleCommand };