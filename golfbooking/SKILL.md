# GolfBooking Skill

## Description
A custom OpenClaw AgentSkill for managing golf course bookings via Telegram. This skill allows users to:
- **Book tee times** at golf courses.
- **Cancel or update** existing reservations.
- **Invite friends** to join a booking.
- **Receive confirmations and reminders** via Telegram.

## Requirements
- Node.js (v18+)
- OpenClaw with Telegram integration
- Golf course API access (e.g., GolfNow, Club Prophet, or custom backend)
- Database (optional, for persistence)

## Installation
1. Navigate to the skill directory:
   ```bash
   cd /root/.openclaw/workspace/skills/golf-course-manager
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
1. **Telegram Bot**:
   - Create a Telegram bot using [BotFather](https://t.me/BotFather).
   - Note the **bot token** and **chat ID** for OpenClaw.

2. **Golf Course API**:
   - Obtain API credentials from your golf course management provider.
   - Store credentials securely using OpenClaw's secrets tool:
     ```bash
     openclaw secrets set GOLF_API_KEY "your_api_key"
     ```

3. **Database (Optional)**:
   - Set up a SQLite or PostgreSQL database for storing bookings.
   - Configure the connection in `golf.js`.

## Usage
### Commands
- `/book`: Start a new booking.
- `/cancel <booking_id>`: Cancel an existing booking.
- `/update <booking_id>`: Update an existing booking.
- `/invite <booking_id> <friend_username>`: Invite a friend to a booking.
- `/list`: List your upcoming bookings.

### Example Workflow
1. User sends `/book`.
2. Bot prompts for course, date, and time.
3. Bot confirms the booking and provides a **booking ID**.
4. User can `/invite` friends or `/cancel` the booking.

## Files
- `golf.js`: Main script (handles Telegram interactions and API calls).
- `test.js`: Test script (mocks API responses and Telegram interactions).
- `package.json`: Dependencies (Axios, SQLite3, etc.).

## OpenClaw Integration
This skill uses OpenClaw's `message` tool to interact with users via Telegram. Example:
```javascript
message({
  action: "send",
  message: "🏌️ *Golf Course Booking*\nSelect a course:",
  buttons: [
    [{ text: "Paris Golf Club", callback_data: "course_123" }],
    [{ text: "Saint-Cloud Golf Course", callback_data: "course_456" }]
  ]
});
```

## Testing
Run the test script to verify functionality:
```bash
node test.js
```

## Future Enhancements
- Add **payment integration** for booking fees.
- Support **multiple golf courses** with a unified interface.
- Add **weather forecasts** for booked dates.