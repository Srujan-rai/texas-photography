// src/app/actions/contact-form.ts (or .js)
"use server" // This directive marks the file as a server action

import nodemailer from "nodemailer"

export async function submitContactForm(formData: FormData) {
  const firstName = formData.get("first-name") as string
  const lastName = formData.get("last-name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const service = formData.get("service") as string
  const message = formData.get("message") as string

  // Basic validation (you can enhance this)
  if (!firstName || !lastName || !email || !service || !message) {
    return { success: false, message: "Please fill in all required fields." }
  }

  // Configure your email transporter
  // You'll need to replace these with your actual email service details
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // e.g., 'smtp.gmail.com' for Gmail
    port: parseInt(process.env.EMAIL_PORT || "587"), // e.g., 587 for TLS, 465 for SSL
    secure: process.env.EMAIL_SECURE === "true", // Use 'true' if port is 465, 'false' for 587 (TLS)
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  })

  try {
    // Send email to yourself (the predefined mail ID)
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender address (can be the same as EMAIL_USER)
      to: "dmashlesh@gmail.com", // Your predefined email address to receive messages
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Service Interested In:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // Optionally, send a confirmation email to the sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Your email address
      to: email, // Sender's email address
      subject: "Thank You for Contacting Dheeran Cinematics!",
      html: `
        <p>Dear ${firstName},</p>
        <p>Thank you for reaching out to Dheeran Cinematics. We have received your message and will get back to you within 24 hours.</p>
        <p>Here's a summary of your message:</p>
        <ul>
          <li><strong>Service Interested In:</strong> ${service}</li>
          <li><strong>Your Message:</strong> ${message}</li>
        </ul>
        <p>We look forward to connecting with you soon!</p>
        <p>Best regards,</p>
        <p>The Dheeran Cinematics Team</p>
      `,
    })

    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "There was an error sending your message. Please try again later." }
  }
}