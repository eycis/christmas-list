import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/config/databaseAdmin";
import { sendEmail } from "@/Services/sendEmailService";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {email} = body;

        const snapshot = await dbAdmin.collection("friends").where("selected", "==", false).get();
        const docs = snapshot.docs.filter(doc => doc.data().email !== email);

        if (docs.length === 0) {
            return NextResponse.json({ message: "Seznam je prázdný." }, { status: 404 });
        }

        const randomIndex = Math.floor(Math.random() * docs.length);
        const randomDoc = docs[randomIndex];
        const data = randomDoc.data();

        await dbAdmin.collection("friends").doc(randomDoc.id).update({selected: true});

        await sendEmail(email, data.name);

        return NextResponse.json({ data: data.name }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Interní chyba serveru. Zkuste to prosím později." }, { status: 500 });
    }
  }