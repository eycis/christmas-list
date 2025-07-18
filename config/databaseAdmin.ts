import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    let serviceAccount;

    if (process.env.NODE_ENV === "production") {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);
    } else {

      serviceAccount = require("./serviceAccountKey.json");
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

  } catch (error) {
    console.error("❌ Firebase admin initialization failed:", error);
  }
}

export const dbAdmin = admin.firestore();
