import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendConfirmationEmail(application) {
  const { firstName, lastName, email } = application

  const mailOptions = {
    from: `"Zitra Campus Ambassador Program" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: 'Application Received - Zitra Campus Ambassador Program',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; width: 60px; height: 60px; background: linear-gradient(135deg, #60B74B, #538251); border-radius: 12px; line-height: 60px; color: white; font-weight: bold; font-size: 24px;">Z</div>
        </div>

        <h1 style="color: #60B74B; text-align: center; margin-bottom: 30px;">Application Received!</h1>

        <p>Dear ${firstName} ${lastName},</p>

        <p>Thank you for applying to the <strong>Zitra Campus Ambassador Program</strong>! We're excited that you want to join our team of campus influencers.</p>

        <div style="background: #f8fdf7; border-left: 4px solid #60B74B; padding: 15px 20px; margin: 25px 0;">
          <p style="margin: 0;"><strong>What happens next?</strong></p>
          <ul style="margin: 10px 0 0 0; padding-left: 20px;">
            <li>Our team will review your application within 7-14 business days</li>
            <li>If shortlisted, you'll be invited for an interview</li>
            <li>Selected ambassadors will receive onboarding instructions</li>
          </ul>
        </div>

        <p>In the meantime, make sure you have the Zitra app installed and your account is active. This will be important for your role as a Campus Ambassador.</p>

        <p>If you have any questions, feel free to reach out to us at <a href="mailto:ambassadors@zitrabank.com" style="color: #60B74B;">ambassadors@zitrabank.com</a></p>

        <p style="margin-top: 30px;">Best regards,<br><strong>The Zitra Team</strong></p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

        <p style="font-size: 12px; color: #888; text-align: center;">
          This email was sent because you applied to the Zitra Campus Ambassador Program.<br>
          © ${new Date().getFullYear()} Zitra Bank. All rights reserved.
        </p>
      </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Confirmation email sent to:', email)
    return true
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    return false
  }
}

export async function sendAdminNotification(application) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER

  const mailOptions = {
    from: `"Zitra Ambassador Portal" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Application: ${application.firstName} ${application.lastName} - ${application.university}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #60B74B;">New Ambassador Application</h2>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${application.firstName} ${application.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${application.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${application.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>University:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${application.university}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Department:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${application.department}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>CGPA:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${application.cgpa}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Zitra Account:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${application.hasZitraAccount === 'yes' ? 'Yes - ' + application.zitraAccountNumber : 'No'}</td>
          </tr>
        </table>

        <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.vercel.app'}/admin" style="display: inline-block; background: #60B74B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View in Admin Dashboard</a></p>

        <p style="font-size: 12px; color: #888; margin-top: 30px;">
          Submitted: ${new Date().toLocaleString('en-NG', { dateStyle: 'full', timeStyle: 'short' })}
        </p>
      </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Admin notification sent')
    return true
  } catch (error) {
    console.error('Error sending admin notification:', error)
    return false
  }
}

export default transporter
