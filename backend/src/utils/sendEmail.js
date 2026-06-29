const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Check for email configs
  const hasSmtpConfig = !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );

  let transporter;

  if (hasSmtpConfig) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Mock / local fallback using Ethereal email or console log
    console.warn('SMTP settings not configured. Printing email to console logs.');
    transporter = {
      sendMail: async (mailOptions) => {
        console.log('====================================');
        console.log('MOCK EMAIL SENT');
        console.log(`To: ${mailOptions.to}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log(`Body HTML: \n${mailOptions.html}`);
        console.log('====================================');
        return { messageId: 'mock-message-id-' + Date.now() };
      }
    };
  }

  const message = {
    from: `${process.env.FROM_NAME || 'Nitru Connect Alerts'} <${process.env.FROM_EMAIL || 'no-reply@nitruconnect.com'}>`,
    to: options.to || process.env.ADMIN_EMAIL || 'admin@nitruconnect.com',
    subject: options.subject,
    html: options.html,
  };

  const info = await transporter.sendMail(message);
  return info;
};

const getLeadNotificationHtml = (lead) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px; background-color: #fafafa;">
      <h2 style="color: #0f3cc9; border-bottom: 2px solid #0f3cc9; padding-bottom: 10px; margin-top: 0;">New Service Enquiry Received</h2>
      <p style="font-size: 16px; color: #333;">A new business lead has submitted an enquiry request via Nitru Connect:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr style="background-color: #f2f4fc;">
          <th style="padding: 10px; text-align: left; font-weight: bold; border-bottom: 1px solid #e1e3e5;">Full Name</th>
          <td style="padding: 10px; border-bottom: 1px solid #e1e3e5;">${lead.fullName}</td>
        </tr>
        <tr>
          <th style="padding: 10px; text-align: left; font-weight: bold; border-bottom: 1px solid #e1e3e5;">Email Address</th>
          <td style="padding: 10px; border-bottom: 1px solid #e1e3e5;"><a href="mailto:${lead.email}" style="color: #0f3cc9; text-decoration: none;">${lead.email}</a></td>
        </tr>
        <tr style="background-color: #f2f4fc;">
          <th style="padding: 10px; text-align: left; font-weight: bold; border-bottom: 1px solid #e1e3e5;">Phone Number</th>
          <td style="padding: 10px; border-bottom: 1px solid #e1e3e5;"><a href="tel:${lead.phone}" style="color: #0f3cc9; text-decoration: none;">${lead.phone}</a></td>
        </tr>
        <tr>
          <th style="padding: 10px; text-align: left; font-weight: bold; border-bottom: 1px solid #e1e3e5;">Company Name</th>
          <td style="padding: 10px; border-bottom: 1px solid #e1e3e5;">${lead.companyName}</td>
        </tr>
        ${lead.businessType ? `
        <tr style="background-color: #f2f4fc;">
          <th style="padding: 10px; text-align: left; font-weight: bold; border-bottom: 1px solid #e1e3e5;">Business Type</th>
          <td style="padding: 10px; border-bottom: 1px solid #e1e3e5;">${lead.businessType}</td>
        </tr>
        ` : ''}
        <tr>
          <th style="padding: 10px; text-align: left; font-weight: bold; border-bottom: 1px solid #e1e3e5;">Selected Service</th>
          <td style="padding: 10px; border-bottom: 1px solid #e1e3e5; color: #0f3cc9; font-weight: bold;">${lead.selectedService}</td>
        </tr>
        <tr style="background-color: #f2f4fc;">
          <th style="padding: 10px; text-align: left; font-weight: bold; border-bottom: 1px solid #e1e3e5;">Source Page</th>
          <td style="padding: 10px; border-bottom: 1px solid #e1e3e5; font-size: 13px; color: #666;">${lead.sourcePage}</td>
        </tr>
        ${lead.uploadedFile ? `
        <tr>
          <th style="padding: 10px; text-align: left; font-weight: bold; border-bottom: 1px solid #e1e3e5;">Uploaded Document</th>
          <td style="padding: 10px; border-bottom: 1px solid #e1e3e5;"><a href="${lead.uploadedFile}" target="_blank" style="background-color: #0f3cc9; color: white; padding: 5px 10px; text-decoration: none; border-radius: 4px; font-size: 13px;">View Document</a></td>
        </tr>
        ` : ''}
      </table>
      
      <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #ffcc00; background-color: #fffef0;">
        <strong style="display: block; color: #665200; margin-bottom: 5px;">Message/Details:</strong>
        <p style="margin: 0; color: #555; line-height: 1.5; font-style: italic;">"${lead.message || 'No custom message provided.'}"</p>
      </div>
      
      <p style="margin-top: 25px; font-size: 12px; color: #888; text-align: center; border-top: 1px solid #eeeeee; padding-top: 15px;">
        This email alert was automatically generated by Nitru Connect Platform. Manage your enquiries from the <a href="${process.env.ADMIN_URL || 'http://localhost:5173/admin'}" style="color: #0f3cc9; text-decoration: none;">Admin Panel</a>.
      </p>
    </div>
  `;
};

module.exports = {
  sendEmail,
  getLeadNotificationHtml,
};
