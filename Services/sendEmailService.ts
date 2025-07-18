import { Resend } from 'resend';

export async function sendEmail(recipient: string, data: string) 
    {

    const resend = new Resend(process.env.RESEND_API_KEY);

    const subject = "Vylosované jméno"

    const message = `Pššššt! Váš vylosovaný kamarád je: ${data}. Nikomu ani muk!`;

    const msg = {
        to: recipient,
        from: `Budapešt 2025 <${process.env.RESEND_SENDER_EMAIL}>`,
        subject: subject,
        text: message,
        html: `<p>${message}</p>`, 
    }

    try {
        await resend.emails.send(msg);
        return {success: true};
    }catch(error: any){
        if(error.response){
            console.log("mail neposlán");
            console.error("response:", error.response.body);
        } else {
            console.error("něco je špatně: ", error);
        }
        return {success: false};
    }
}