import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      order: [['start_date', 'desc']],
      include: [
        {
          model: Student,
          as: 'student',
        },
        {
          model: Plan,
          as: 'plan',
        },
      ],
    });
    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findOne({
      where: { id: req.body.student_id },
    });

    if (!student) {
      return res.status(404).json({ message: 'Student does not exists.' });
    }

    const plan = await Plan.findOne({
      where: { id: req.body.plan_id },
    });

    if (!plan) {
      return res.status(404).json({ message: 'Plan does not exists.' });
    }

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: parseISO(start_date),
      end_date: addMonths(parseISO(start_date), plan.duration),
      price: plan.price * plan.duration,
    });

    // TODO: Adicionar o envio de emails.

    return res.json(registration);
  }

  async update(req, res) {
    // TODO: Implementar o método para atualização de uma matrícula.
    return res.json();
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);
    await registration.destroy();
    return res.json();
  }
}

export default new RegistrationController();
