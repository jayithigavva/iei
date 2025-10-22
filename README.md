# Informal Economy Index (IEI) - Website & Dashboard

India's first youth-led index tracking the 90% working in the informal economy. Making the unseen visible through data, education, and community empowerment.

## 🚀 Quick Start

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd informal-index-voice-main

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Technologies Used

- **Vite** - Build tool
- **TypeScript** - Type-safe JavaScript
- **React** - UI framework
- **shadcn-ui** - Component library
- **Tailwind CSS** - Styling
- **Firebase Hosting** - Deployment

## 📊 Features

### Main Website
- Hero section with call-to-action
- Challenge section highlighting informal economy statistics
- What We Do - Our initiatives and impact
- Real Stories - QR-coded worker stories
- Data-Driven Insights with interactive charts
- Partnerships showcase
- Founder section
- Contact form

### IEI Dashboard
- **Bilingual Support:** English & Hindi with voice assistance
- **Survey Form:** Comprehensive IEI survey (7 sections)
- **IEI Scoring:** 5-dimension vulnerability assessment
  - Income (30%)
  - Social Security (25%)
  - Debt (20%)
  - Skills (15%)
  - Mobility (10%)
- **Live Visualizations:** Bar charts, heatmaps
- **Personalized Recommendations:** Dimension-specific action items
- **Google Sheets Integration:** Real-time data sync

## 🔥 Deployment (Firebase)

```sh
# Build for production
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

**Live URL:** https://informal-economy-index.web.app

## IEI Dashboard (Sheets integration)

Create a `.env` file at the project root with optional keys:

```
VITE_IEI_SHEET_CSV_URL=
VITE_GSCRIPT_WEBAPP_URL=
```

- VITE_IEI_SHEET_CSV_URL: Publish a sheet to the web as CSV that contains columns `District,Mean,Min,Max,Count` in the first five columns. Paste the CSV link here to hydrate district stats.
- VITE_GSCRIPT_WEBAPP_URL: Deploy the Apps Script below as a Web App and paste the URL to enable writing new survey submissions to your sheet.

Apps Script (Code.gs):

```
function doPost(e) {
  var ss = SpreadsheetApp.openById('YOUR_SHEET_ID');
  var sheet = ss.getSheetByName('Form Responses 1');
  var data = JSON.parse(e.postData.contents || '{}');
  
  // Match exact column order from your Google Sheet
  sheet.appendRow([
    new Date(), // Timestamp
    data.name || '',
    data.age || '',
    data.gender || '',
    data.education || '',
    data.migrant || '',
    data.hours || '',
    data.night || '',
    data.lt300 || '',
    data.workType || '',
    data.contract || '',
    data.debt || '',
    data.debtSrc || '',
    data.save || '',
    data.saveAmt || '',
    data.eShram || '',
    data.bank || '',
    data.schemes || '',
    data.educationLevel || '',
    data.trained || '',
    data.move || '',
    data.moveWithFamily || '',
    data.aspiration || '',
    data.overall || '',
    JSON.stringify(data.dim || {})
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy: Deploy -> New deployment -> Web app -> Execute as Me, Who has access: Anyone with the link. Replace `YOUR_SHEET_ID` with the ID from your sheet URL.
