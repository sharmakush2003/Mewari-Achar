const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf-8');
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
});

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function run() {
  try {
    console.log("Setting up app_config/settings...");
    await db.collection('app_config').doc('settings').set({
      force_update: false
    });
    console.log("Successfully created app_config/settings!");
  } catch (err) {
    console.error(err);
  }
  process.exit();
}

run();
