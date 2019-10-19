import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Queue from '../../lib/Queue';
import AnsweredHelpOrderMail from '../jobs/AnsweredHelpOrderMail';
import Student from '../models/Student';

class GymHelpOrderController {
  async index(req, res) {
    const help_orders = await HelpOrder.findAll({
      where: { answer: null },
    });
    return res.json(help_orders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const help_order_id = req.params.id;
    const help_order = await HelpOrder.findByPk(help_order_id);

    if (!help_order) {
      return res.status(404).json({ message: 'Helo Order does not exists.' });
    }

    const { answer } = req.body;
    await help_order.update({
      answer,
      answered_at: new Date(),
    });

    await help_order.reload({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    await Queue.add(AnsweredHelpOrderMail.key, {
      help_order,
    });

    return res.json(help_order);
  }
}

export default new GymHelpOrderController();
