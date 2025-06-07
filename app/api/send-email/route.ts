import { type NextRequest, NextResponse } from "next/server"

// In production, this would use the Resend API
async function sendEmailWithResend(emailData: any) {
  // In preview mode, just log the email data
  if (process.env.NODE_ENV !== "production") {
    console.log("Email would be sent via Resend:", emailData)
    return { success: true, message: "Email logged (preview mode)" }
  }

  // In production, use Resend API to send the email
  try {
    // Make a direct HTTP request to Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Texas Photography <onboarding@resend.dev>", // You'll update this with your verified domain
        to: [emailData.to],
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text || undefined,
        reply_to: emailData.from_email,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to send email")
    }

    return {
      success: true,
      message: "Email sent successfully",
      id: data.id,
    }
  } catch (error) {
    console.error("Error sending email via Resend:", error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, html, text, from_email } = body

    // Validate required fields
    if (!to || !subject || !html) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Send the email using Resend
    const result = await sendEmailWithResend({
      to,
      subject,
      html,
      text,
      from_email,
    })

    return NextResponse.json({
      success: true,
      message: result.message,
      id: result.id,
    })
  } catch (error) {
    console.error("Error in email API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
