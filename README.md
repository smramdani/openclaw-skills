# OpenClaw Custom Skills

A collection of custom **AgentSkills** for OpenClaw, designed for automation, web scraping, and specialized tasks like golf course management.

## 📌 Skills Overview

### 🏌️ **GolfBooking**
- **Description**: Manage golf course bookings via Telegram. Reserve tee times, cancel/update bookings, and invite friends.
- **Commands**: `/book`, `/cancel`, `/update`, `/invite`, `/list`.
- **Status**: ✅ Active
- [Read more](./golfbooking/README.md)

### 🕷️ **Playwright Scraper**
- **Description**: Web scraping with Playwright. Extract content as markdown or JSON, capture screenshots, and interact with dynamic pages.
- **Usage**: `playwright-scrape --url "https://example.com" --output markdown`.
- **Status**: ✅ Active
- [Read more](./playwright-scraper/README.md)

## 🛠 Installation
1. **Clone the repository**:
   ```bash
   git clone git@github.com:<your-username>/skills.git
   cd skills
   ```

2. **Install dependencies for a skill**:
   ```bash
   cd golfbooking
   npm install
   ```

## 📂 Directory Structure
```
/skills
├── README.md                # Shared documentation (this file)
├── golfbooking/             # GolfBooking Skill
│   ├── README.md            # Skill-specific documentation
│   ├── golf.js              # Main script
│   ├── test.js              # Test script
│   └── package.json         # Dependencies
└── playwright-scraper/      # Playwright Scraper Skill
    ├── README.md            # Skill-specific documentation
    ├── scrape.js            # Main script
    └── ...
```

## 🤝 Contributing
- **Add a new skill**: Create a folder with a `README.md` and main script.
- **Submit improvements**: Fork the repo and open a PR.
- **Report issues**: Use GitHub Issues.

## 📜 License
MIT