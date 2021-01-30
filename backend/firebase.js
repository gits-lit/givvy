const admin = require('firebase-admin');

// load in environment variables
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIV_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL
});

module.exports = {
  database: admin.firestore()
}