import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/config/databaseAdmin";

export async function GET(req: NextRequest) {

    try {
        const snapshot = await dbAdmin.collection("friends").get();
        const docs = snapshot.docs;

        if (docs.length === 0) {
            return NextResponse.json({ message: "Seznam je prázdný." }, { status: 404 });
        }

        const data = docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Interní chyba serveru. Zkuste to prosím později." }, { status: 500 });
    }
  }