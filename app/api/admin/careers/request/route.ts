import SenderTemplate from "@/emails/SenderTemplate";
import JobRequest from "@/models/JobRequest";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
      
      const {
        fullName,
        email,
        phone,
        nationality,
        cityandcountry,
        gender,
        dob,
        experience,
        experienceinconstruction,
        experienceinuae,
        currentposition,
        currentemployer,
        currentsalary,
        expectedsalary,
        noticeperiod,
        hasrelative,
        relativeName,
        haspreviouswork,
        hasresponsibilities,
        softwares,
        companyType,
        skills,
        resume,
        coverLetter,
        linkedinProfile,
        appliedFor
      } = await request.json();
      
      const jobRequest = await JobRequest.create({
        fullName,
        email,
        phone,
        nationality,
        cityandcountry,
        gender,
        dob,
        experience,
        experienceinconstruction,
        experienceinuae,
        currentposition,
        currentemployer,
        currentsalary,
        expectedsalary,
        noticeperiod,
        hasrelative,
        relativeName,
        haspreviouswork,
        hasresponsibilities,
        softwares,
        companyType,
        skills,
        resume,
        coverLetter,
        linkedinProfile,
        appliedFor
      });

      await resend.emails.send({
        from: `Best BCC <noreply@bestbcc.com>`,
        to: ['careers@bestbcc.com'],
        subject: 'Enquiry from website [bestbcc.com]',
        react: SenderTemplate({ fullName, email, phone, appliedFor }),
        replyTo: email,
    });

      return NextResponse.json({ data: jobRequest, success: true }, { status: 200 });
    } catch (error) {
      console.error("Error creating job request:", error);
      return NextResponse.json({ error: "Failed to create job request" }, { status: 500 });
    }
  }


  export async function GET(request: NextRequest){
    try {
      const searchParams = request.nextUrl.searchParams
      const id = searchParams.get('id')
      if(id){
        const jobRequest = await JobRequest.findById(id)
        return NextResponse.json({ data: jobRequest, success: true }, { status: 200 });
      }
        const jobRequests = await JobRequest.find()
        return NextResponse.json({ data: jobRequests, success: true }, { status: 200 });
    } catch (error) {
        console.error("Error fetching job requests:", error);
        return NextResponse.json({ error: "Failed to fetch job requests" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest){
    try {
        const searchParams = request.nextUrl.searchParams
        const id = searchParams.get('id')
        if(id){
            const jobRequest = await JobRequest.findByIdAndDelete(id)
            if(!jobRequest){
                return NextResponse.json({ error: "Job request not found" }, { status: 404 });
            }
            return NextResponse.json({ message: "Job request deleted successfully", success: true }, { status: 200 });
        }
    } catch (error) {
        console.error("Error deleting job request:", error);
        return NextResponse.json({ error: "Failed to delete job request" }, { status: 500 });
    }
}

  