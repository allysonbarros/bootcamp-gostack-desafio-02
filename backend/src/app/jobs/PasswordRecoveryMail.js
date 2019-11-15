import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class PasswordRecoveryMail {
  get key() {
    return 'PasswordRecoveryMail';
  }

  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Recuperação de Senha [GymPoint]',
      template: 'password_recovery',
      context: {
        user,
        FRONTEND_URL: process.env.FRONTEND_URL,
      },
    });
  }
}

export default new PasswordRecoveryMail();
