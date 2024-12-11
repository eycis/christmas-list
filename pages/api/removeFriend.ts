import { get, ref, remove } from "firebase/database";
import { db } from "@/config/firebase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("----------------------------");
  if (req.method === "POST") {
    const { id } = req.body;

    console.log("id z apii endpoinnt:", id);

    try {
      await remove(ref(db, `friends/${id}`));
      
      const snapshot = await get(ref(db, "friends"));
      const data = snapshot.val();
      const updatedFriends = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...(value as { name: string }),
          }))
        : [];

        console.log("Aktualizovaný seznam přátel v API:", updatedFriends);

        res.status(200).json({ message: "Friend removed", friends: updatedFriends });
    } catch (error) {
      console.error("Chyba při odstraňování přítele:", error);
      res.status(500).json({ message: "Chyba serveru při odstraňování přítele." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
