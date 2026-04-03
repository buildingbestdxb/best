"use server"

import { Resend } from 'resend';
import  Email from '../../emails/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendMailToJobSeeker(name:string,email:string){
    try {
        console.log("name",name)
        console.log("email",email)
        const { data, error } = await resend.emails.send({
            from: `Best <enquiry@bestbcc.com>`,
            to: email,
            subject: 'Thank you for applying to Best',
            react:<Email name={name}/>,
        });

        if(data){
            console.log("Mail sent successfully")
        }else{
            console.log("Mail not sent",error)
        }
    } catch (error) {
        console.log("Error sending mail to job seeker",error)
    }
}
