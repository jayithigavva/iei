# Google Apps Script Setup Guide

## Step 1: Open Your Google Sheet
1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/1phlSur3t9uLxomF3v50fhoHvNPdsC1f6-X5ih2ZDKSE/edit
2. Make sure you're on the "Form Responses 1" tab

## Step 2: Create Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById('1phlSur3t9uLxomF3v50fhoHvNPdsC1f6-X5ih2ZDKSE');
    var sheet = ss.getSheetByName('Form Responses 1');
    
    // Check if postData exists and has contents
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
    
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
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testScript() {
  var testData = {
    name: 'Test User',
    age: 25,
    gender: 'Male',
    education: '12th or above',
    migrant: 'No',
    hours: 8,
    night: 'No',
    lt300: 5,
    workType: 'Daily wage laborer',
    contract: 'No',
    debt: 'No',
    debtSrc: 'None',
    save: 'Yes',
    saveAmt: 1000,
    eShram: 'No',
    bank: 'Yes',
    schemes: 'PM-JAY',
    educationLevel: '12th or above',
    trained: 'No',
    move: 'No',
    moveWithFamily: '',
    aspiration: 'Government job',
    overall: 45.5,
    dim: { income: 50, social: 40, debt: 30, skills: 60, mobility: 35 }
  };
  
  var mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  return doPost(mockEvent);
}
```

## Step 3: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon → **Web app**
3. Set these options:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Click **Authorize access** and allow permissions
6. Copy the **Web app URL** (it looks like: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec)

## Step 4: Create .env file
1. In your project root folder, create a file named `.env`
2. Add this content (replace YOUR_WEBAPP_URL with the URL from Step 3):

```
VITE_GSCRIPT_WEBAPP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_IEI_SHEET_CSV_URL=
```

## Step 5: Test the Setup
1. Run your development server: `npm run dev`
2. Go to http://localhost:8080/dashboard
3. Fill out the survey form and submit
4. Check your Google Sheet to see if a new row was added

## Troubleshooting
- If you get permission errors, make sure the Apps Script is deployed as "Anyone" can access
- If data doesn't appear, check the browser console for errors
- Make sure the sheet ID in the script matches your actual sheet ID
