import { ref, get } from "firebase/database";
import { db } from "@/config/firebase"; // Firebase konfigurace
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const snapshot = await get(ref(db, "friends"));
      const data = snapshot.val();

      const friends = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...(value as { name: string }), 
          }))
        : [];

      res.status(200).json(friends);
    } catch (error) {
      console.error("Chyba při načítání přátel:", error);
      res.status(500).json({ message: "Chyba serveru při načítání seznamu přátel." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
