import debugLib from 'debug';
import nodemailer from 'nodemailer';
const debug = debugLib('eventsapp:emailer');

export type SendmailOptions = {
  to: string;
  subject?: string;
  body?: string;
  from?: string;
};

function buildTransportFromEnv() {
  const SMTP_HOST = process.env.SMTP_HOST || '';
  const SMTP_PORT = parseInt(process.env.SMTP_PORT || '-1');
  const SMTP_SECURE = !process.env.SMTP_TLS;
  const SMTP_USER = process.env.SMTP_USER || '';
  const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
  const errorlist: string[] = [];
  if (SMTP_HOST === '') {
    errorlist.push('No SMTP_HOST defined');
  }
  if (SMTP_PORT === -1) {
    errorlist.push('No SMTP_PORT defined');
  }
  if (errorlist.length > 0) {
    debug(errorlist);
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });
}

const _transporter = buildTransportFromEnv();

const Default = {
  from: '"Events App" <events@nwest.link>',
  subject: 'Information from Events App',
  body: '<p>This email is just a test email, since no body was configured.</p>',
};

// async..await is not allowed in global scope, must use a wrapper
export async function sendmail(options: SendmailOptions) {
  if (_transporter === null) {
    debug(`Not sending mail, _transporter not set up.`);
    debug(options);
    return;
  }
  debug(`Attempting to send email to ${options.to}`);

  // send mail with defined transport object
  let info = await _transporter.sendMail({
    from: options.from || Default.from, // sender address
    to: options.to, // list of receivers
    subject: options.subject || Default.subject, // Subject line
    html: options.body || Default.body, // html body
  });

  debug(info);
}
