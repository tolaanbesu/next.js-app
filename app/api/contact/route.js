import nodemailer from "nodemailer";

export async function POST(req){
  try { 
    const {name, email, subject, message} = await req.json();

    if(!name || !email || !subject || !message){
        return new Response(JSON.stringify({error:"missing fields"}), {status:400});
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    const mailoptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject:`Contact Form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailoptions)

    return new Response(JSON.stringify({success: true}, {status:200}))

    }
    catch(error){
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({error: "Internal Server Error"}), {status:500});
    }
}