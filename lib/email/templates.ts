/* ── Email to YOU — new lead notification ── */
export function adminNotificationTemplate({
  name,
  email,
  phone,
  company,
  service,
  budget,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: -apple-system, sans-serif; background: #f5f4e8; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
    .card { background: #ffffff; border: 1px solid #d4d3c0; border-radius: 8px; overflow: hidden; }
    .header { background: #0F2D24; padding: 28px 32px; }
    .header h1 { color: #F5F4E8; font-size: 20px; margin: 0; font-weight: 500; }
    .header p { color: #7A9990; font-size: 12px; margin: 6px 0 0; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #7A9990; margin-bottom: 4px; }
    .value { font-size: 15px; color: #0F2D24; font-weight: 500; }
    .message-box { background: #f5f4e8; border-left: 3px solid #1B4D3E; border-radius: 0 4px 4px 0; padding: 16px; margin-top: 24px; }
    .message-box p { color: #3D5A50; font-size: 14px; line-height: 1.7; margin: 0; }
    .divider { height: 1px; background: #D4D3C0; margin: 24px 0; }
    .footer { padding: 20px 32px; background: #f5f4e8; }
    .footer p { font-size: 11px; color: #7A9990; margin: 0; }
    .badge { display: inline-block; background: #1B4D3E; color: #F5F4E8; font-size: 10px; padding: 3px 10px; border-radius: 99px; font-weight: 500; letter-spacing: 0.08em; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <h1>🔔 New Project Enquiry</h1>
        <p>Received via roshysdigital.com/contact</p>
      </div>
      <div class="body">
        <div class="field">
          <div class="label">Name</div>
          <div class="value">${name}</div>
        </div>
        <div class="field">
          <div class="label">Email</div>
          <div class="value">${email}</div>
        </div>
        ${phone ? `
        <div class="field">
          <div class="label">Phone</div>
          <div class="value">${phone}</div>
        </div>` : ""}
        ${company ? `
        <div class="field">
          <div class="label">Company / Brand</div>
          <div class="value">${company}</div>
        </div>` : ""}
        <div class="field">
          <div class="label">Service Interested In</div>
          <div class="value"><span class="badge">${service.replace(/-/g, " ").toUpperCase()}</span></div>
        </div>
        ${budget ? `
        <div class="field">
          <div class="label">Budget Range</div>
          <div class="value">${budget.replace(/-/g, " ").replace("under", "Under ₹").replace("plus", "+")}</div>
        </div>` : ""}
        <div class="divider"></div>
        <div class="label">Message</div>
        <div class="message-box">
          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      </div>
      <div class="footer">
        <p>Roshy's Digital · roshysdigital.com</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/* ── Auto-reply to the USER ── */
export function userAutoReplyTemplate({ name }: { name: string }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: -apple-system, sans-serif; background: #f5f4e8; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
    .card { background: #ffffff; border: 1px solid #d4d3c0; border-radius: 8px; overflow: hidden; }
    .header { background: #0F2D24; padding: 40px 32px; text-align: center; }
    .logo { color: #F5F4E8; font-size: 22px; font-weight: 400; letter-spacing: 0.15em; margin: 0 0 4px; }
    .logo span { color: #7A9990; font-size: 11px; display: block; letter-spacing: 0.3em; margin-top: 4px; }
    .body { padding: 40px 32px; text-align: center; }
    .emoji { font-size: 40px; margin-bottom: 20px; }
    h2 { font-size: 26px; color: #0F2D24; font-weight: 400; margin: 0 0 12px; font-style: italic; }
    p { font-size: 14px; color: #3D5A50; line-height: 1.75; margin: 0 0 16px; }
    .highlight { font-weight: 600; color: #0F2D24; }
    .timeline { background: #f5f4e8; border-radius: 6px; padding: 20px 24px; margin: 28px 0; text-align: left; }
    .timeline-item { display: flex; gap: 12px; margin-bottom: 12px; }
    .timeline-item:last-child { margin-bottom: 0; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #1B4D3E; flex-shrink: 0; margin-top: 6px; }
    .timeline-text { font-size: 13px; color: #3D5A50; }
    .divider { height: 1px; background: #D4D3C0; margin: 28px 0; }
    .footer { padding: 20px 32px; background: #f5f4e8; text-align: center; }
    .footer p { font-size: 11px; color: #7A9990; margin: 0; }
    .social { display: flex; gap: 16px; justify-content: center; margin-top: 12px; }
    .social a { font-size: 11px; color: #1B4D3E; text-decoration: none; font-weight: 500; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div class="logo">ROSHY'S<span>DIGITAL</span></div>
      </div>
      <div class="body">
        <div class="emoji">✦</div>
        <h2>We've got your message, ${name}.</h2>
        <p>
          Thank you for reaching out to Roshy's Digital. We've received your enquiry
          and our team will review it shortly.
        </p>
        <p>
          We typically respond within <span class="highlight">24 hours</span> on business days.
        </p>

        <div class="timeline">
          <div class="timeline-item">
            <div class="dot"></div>
            <div class="timeline-text"><strong>Enquiry received</strong> — We've got your message.</div>
          </div>
          <div class="timeline-item">
            <div class="dot" style="background:#D4D3C0"></div>
            <div class="timeline-text"><strong>Team review</strong> — We'll review your requirements.</div>
          </div>
          <div class="timeline-item">
            <div class="dot" style="background:#D4D3C0"></div>
            <div class="timeline-text"><strong>Discovery call</strong> — We'll reach out to schedule a call.</div>
          </div>
          <div class="timeline-item">
            <div class="dot" style="background:#D4D3C0"></div>
            <div class="timeline-text"><strong>Proposal</strong> — Custom strategy built for your goals.</div>
          </div>
        </div>

        <div class="divider"></div>
        <p style="font-size:13px">
          In the meantime, explore our work at
          <a href="https://roshysdigital.com/work" style="color:#1B4D3E;font-weight:500">roshysdigital.com/work</a>
        </p>
      </div>
      <div class="footer">
        <p>© Roshy's Digital · roshysdigital.com</p>
        <div class="social">
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">WhatsApp</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}