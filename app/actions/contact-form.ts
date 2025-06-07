"use server"

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const firstName = formData.get("first-name")
    const lastName = formData.get("last-name")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const service = formData.get("service")
    const message = formData.get("message")

    // Create email content
    const htmlContent = `
      <h2>New Project Inquiry</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Service:</strong> ${service}</p>
      <h3>Message:</h3>
      <p>${message}</p>
    `

    const textContent = `
      New Project Inquiry
      
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone || "Not provided"}
      Service: ${service}
      
      Message:
      ${message}
    `

    // Call our custom API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "raisrujan@gmail.com",
        subject: `New Project Inquiry from ${firstName} ${lastName}`,
        html: htmlContent,
        text: textContent,
        from_email: email,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to send email")
    }

    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Error processing form:", error)
    return {
      success: false,
      message: "There was an error sending your message. Please try again later.",
    }
  }
}
