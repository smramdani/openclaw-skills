# GolfBooking Skill

A custom **OpenClaw AgentSkill** for managing golf course bookings via Telegram. Reserve tee times, cancel or update bookings, and invite friends—all from your Telegram chat!

## ✨ Features
- **Book tee times** at golf courses.
- **Cancel or update** existing reservations.
- **Invite friends** to join a booking.
- **List upcoming bookings**.
- **Receive confirmations and reminders** via Telegram.

## 🛠 Requirements
- **Node.js** (v18+)
- **OpenClaw** with Telegram integration
- **Golf course API** (e.g., GolfNow, Club Prophet, or custom backend)
- **Database** (optional, for persistence)

## ⚙️ Configuration
### 1. Telegram Bot
1. Create a bot using [BotFather](https://t.me/BotFather).
2. Note the **bot token** and **chat ID** for OpenClaw.
3. Store the token securely:
   ```bash
   openclaw secrets set TELEGRAM_BOT_TOKEN "your_bot_token"
   ```

### 2. Golf Course API
1. Obtain API credentials from your golf course provider.
2. Store the API key securely:
   ```bash
   openclaw secrets set GOLF_API_KEY "your_api_key"
   ```

### 3. Database (Optional)
- Use **SQLite** or **PostgreSQL** for storing bookings.
- Configure the connection in `golf.js`.

## 🚀 Usage
### Commands
| Command                     | Description                                  |
|-----------------------------|----------------------------------------------|
| `/book`                     | Start a new booking.                         |
| `/cancel <booking_id>`      | Cancel an existing booking.                  |
| `/update <booking_id>`      | Update an existing booking.                  |
| `/invite <booking_id> <friend_username>` | Invite a friend to a booking. |
| `/list`                     | List your upcoming bookings.                 |

### Example Workflow
1. **User sends `/book`** → Bot prompts for course selection.
2. **User selects a course** → Bot prompts for date/time.
3. **User confirms** → Bot sends a confirmation with a **booking ID**.
4. **User invites friends** → Bot sends invitations via Telegram.

![Telegram Workflow](https://via.placeholder.com/400x200?text=Telegram+Booking+Flow)

## 📂 Files
- `golf.js`: Main script (handles Telegram interactions and API calls).
- `test.js`: Test script (mocks API responses and Telegram interactions).
- `package.json`: Dependencies (Axios, SQLite3, etc.).

## 🤖 OpenClaw Integration
This skill uses OpenClaw's `message` tool to interact with users via Telegram. Example:

```javascript
message({
  action: "send",
  chatId: "123",
  message: "🏌️ *Golf Course Booking*\nSelect a course:",
  buttons: [
    [{ text: "Paris Golf Club", callback_data: "course_123" }],
    [{ text: "Saint-Cloud Golf Course", callback_data: "course_456" }]
  ]
});
```

## 🧪 Testing
Run the test script to verify functionality:
```bash
cd /root/.openclaw/workspace/skills/golfbooking
npm install
node test.js
```

## 🚀 Future Enhancements
- **Payment integration** for booking fees.
- **Weather forecasts** for booked dates.
- **Support for multiple golf courses** with a unified interface.