import { dbAdmin } from "./config/databaseAdmin"
import fs from "fs";
import path from "path";

async function importFriends() {
  const filePath = path.join(process.cwd(), "data", "data.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(fileData);

  const friends = jsonData.friends;

  for (const friend of friends) {
    await dbAdmin.collection("friends").add({
      name: friend.name
    });
  }

  console.log("✅ Všichni přátelé byli úspěšně nahráni.");
}

importFriends().catch((error) => {
  console.error("❌ Chyba při nahrávání přátel:", error);
});
