import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { registration } = data;

    await Mail.sendMail({
      to: `${registration.student.name} <${registration.student.email}>`,
      subject: 'Matrícula realizada! [GymPoint]',
      template: 'registration',
      context: {
        student: registration.student,
        registration,
        start_date: format(
          parseISO(registration.start_date),
          "dd 'de' MMMM 'de' yyyy.'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(registration.end_date),
          "dd 'de' MMMM 'de' yyyy.'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new RegistrationMail();
