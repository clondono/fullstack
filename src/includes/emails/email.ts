import Bluebird from 'bluebird';
import Nodemailer from 'nodemailer';
import MandrillTransport from 'nodemailer-mandrill-transport';
import Path from 'path';
import SwigEmailTemplates from 'swig-email-templates';
import Config from '../../config';
import { EmailMessage, EmailSendObj } from '../../ts/interfaces/email';
import Logger from '../clients/logger';
const EmailTemplates: any = Bluebird.promisifyAll(SwigEmailTemplates);
const logger = new Logger();

const Templates: {
  renderAsync: (template: any, data: { [x: string]: any }) => any;
} = new EmailTemplates({
  root : Path.join(`${__dirname}/../templates`) || '/',
});

const transport = Nodemailer.createTransport(
  MandrillTransport({
    auth : {
      apiKey : Config.MANDRILL_API_KEY,
    },
  }),
);

async function send(opts: EmailMessage) {
  return new Bluebird((resolve, reject) => {
    transport.sendMail(opts, function(err: Error | null, info: any) {
      if (err) {
        reject();
      } else {
        resolve(info);
      }
    });
  });
}

const sendTo = async({
  subject,
  to = 'Config.CONTACT_US_ADDRESSES',
  headers,
  template,
  data,
  bcc,
}: EmailSendObj): Promise<void> => {
  try {
    const html: any = await Templates.renderAsync(template, data);
    const message: EmailMessage = {
      bcc,
      from : Config.EMAILS.DO_NOT_REPLY,
      to   : to || Config.EMAILS.CONTACT_US,
      subject,
      html,
    };
    await send(message);
  } catch (e) {
    logger.error(
      'Mandrill error sending mail',
      JSON.stringify({
        template,
        subject,
        to : Config.CONTACT_US_ADDRESSES,
        data,
      }),
    );
    logger.log({
      subject,
      to,
      headers,
      template,
      data,
      bcc,
    });
  }
};

export default {
  sendTo,
};
