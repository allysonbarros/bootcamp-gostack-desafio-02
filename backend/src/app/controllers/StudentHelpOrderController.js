import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class StudentHelpOrderController {
  async index(req, res) {
    const student_id = req.params.id;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({ message: 'Student does not exists.' });
    }

    const help_orders = await HelpOrder.findAll({
      where: { student_id },
    });
    return res.json(help_orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const student_id = req.params.id;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({ message: 'Student does not exists.' });
    }

    const { question } = req.body;
    const { id } = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json({ id, student_id, question });
  }
}

export default new StudentHelpOrderController();
