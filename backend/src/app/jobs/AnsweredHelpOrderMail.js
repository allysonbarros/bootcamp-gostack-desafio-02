import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class AnsweredHelpOrderMail {
  get key() {
    return 'AnsweredHelpOrderMail';
  }

  async handle({ data }) {
    const { help_order } = data;

    await Mail.sendMail({
      to: `${help_order.student.name} <${help_order.student.email}>`,
      subject: 'Seu Pedido de Auxílio foi Respondido! [GymPoint]',
      template: 'answered_help_order',
      context: {
        help_order,
        student: help_order.student,
        created_at: format(
          parseISO(help_order.createdAt),
          "dd 'de' MMMM 'de' yyyy'",
          {
            locale: pt,
          }
        ),
        answered_at: format(
          parseISO(help_order.answered_at),
          "dd 'de' MMMM 'de' yyyy'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new AnsweredHelpOrderMail();
