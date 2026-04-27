import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, description, module: moduleName } = await req.json();

  if (!name || !email || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Tech Foundations Bug Report" <${process.env.GMAIL_USER}>`,
    to: 'mainnontechpm@gmail.com',
    subject: `Bug Report${moduleName ? ` – ${moduleName}` : ''}`,
    text: `Name: ${name}\nEmail: ${email}\n\nDescription:\n${description}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${moduleName ? `<p><strong>Module:</strong> ${moduleName}</p>` : ''}
      <p><strong>Description:</strong></p>
      <p style="white-space:pre-wrap">${description}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
