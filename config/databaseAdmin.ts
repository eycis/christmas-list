import * as admin from "firebase-admin";
//import serviceAccount from "@/config/serviceAccountKey.json";

//production ver:
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error("error with firebase service account:", error);
  }
}

export const dbAdmin = admin.firestore();

//uncomment if on dev:
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//   });
// }

// const dbAdmin = admin.firestore();

// export { dbAdmin };
