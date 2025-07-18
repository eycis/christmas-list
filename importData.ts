// databaseAdmin.ts (bez aliasu, čistě ESM kompatibilní)
import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const serviceAccountPath = path.resolve(process.cwd(), "config/serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const dbAdmin = admin.firestore();

async function importFriends() {

  const snapshot = await dbAdmin.collection("friends").get();
  const batch = dbAdmin.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log("🧹 Kolekce 'users' byla vymazána.");

  const filePath = path.join(process.cwd(), "data", "data.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(fileData);

  const friends = jsonData.friends;

  for (const friend of friends) {
    await dbAdmin.collection("friends").add({
      name: friend.name,
      email: friend.email?? "",
      selected: friend.selected,
      hasName: friend.hasName,
    });
  }

  console.log("✅ Všichni přátelé byli úspěšně nahráni.");
}

importFriends().catch((error) => {
  console.error("❌ Chyba při nahrávání přátel:", error);
});
