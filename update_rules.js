const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Simple .env parser
const envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf-8');
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let key = match[1].trim();
    let val = match[2].trim();
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    else if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    process.env[key] = val;
  }
});

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const source = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{product} {
      allow read: if true;
      allow write: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}`;

async function updateRules() {
    try {
        console.log("Updating ruleset...");
        const ruleset = await admin.securityRules().releaseFirestoreRulesetFromSource(source);
        console.log("Successfully updated Firestore rules! Released:", ruleset.name);
        process.exit(0);
    } catch (e) {
        console.error("Failed to update rules:", e);
        process.exit(1);
    }
}

updateRules();
