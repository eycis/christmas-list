import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/config/databaseAdmin";


export async function GET(req: NextRequest) {

    try {
        const snapshot = await dbAdmin.collection("friends").get();
        const docs = snapshot.docs;

        if (docs.length === 0) {
            return NextResponse.json({ message: "Seznam je prázdný." }, { status: 404 });
        }

        const randomIndex = Math.floor(Math.random() * docs.length);
        const randomDoc = docs[randomIndex];
        const data = randomDoc.data();

        await dbAdmin.collection("friends").doc(randomDoc.id).delete();
        console.log("🧹jméno smazané");

        return NextResponse.json({ data: data.name }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Interní chyba serveru. Zkuste to prosím později." }, { status: 500 });
    }
  }