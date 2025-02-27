import { resolve } from 'path';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import exphbs from 'express-handlebars';
import HandlebarsIntl from 'handlebars-intl';
import pluralize from 'handlebars-pluralize';

import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );

    HandlebarsIntl.registerWith(Handlebars);
    Handlebars.registerHelper('pluralize', pluralize);
  }

  sendMail(message) {
    return this.transporter.sendMail({ ...mailConfig.default, ...message });
  }
}

export default new Mail();
