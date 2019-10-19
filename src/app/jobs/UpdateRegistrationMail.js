import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class UpdateRegistrationMail {
  get key() {
    return 'UpdateRegistrationMail';
  }

  async handle({ data }) {
    const { registration } = data;

    await Mail.sendMail({
      to: `${registration.student.name} <${registration.student.email}>`,
      subject: 'Sua Matrícula foi atualizada! [GymPoint]',
      template: 'updated_registration',
      context: {
        student: registration.student,
        registration,
        created_at: format(
          parseISO(registration.createdAt),
          "dd 'de' MMMM 'de' yyyy'",
          {
            locale: pt,
          }
        ),
        updated_at: format(
          parseISO(registration.updatedAt),
          "dd 'de' MMMM 'de' yyyy'",
          {
            locale: pt,
          }
        ),
        start_date: format(
          parseISO(registration.start_date),
          "dd 'de' MMMM 'de' yyyy'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(registration.end_date),
          "dd 'de' MMMM 'de' yyyy'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new UpdateRegistrationMail();
