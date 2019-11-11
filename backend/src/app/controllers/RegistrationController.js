import * as Yup from 'yup';
import { parseISO } from 'date-fns';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';
import UpdateRegistrationMail from '../jobs/UpdateRegistrationMail';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      order: [['id', 'start_date', 'end_date', 'price', 'active']],
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

    const { id } = await Registration.create({
      student_id,
      plan_id,
      start_date: parseISO(start_date),
    });

    const registration = await Registration.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
      attributes: [
        'id',
        'start_date',
        'end_date',
        'price',
        'created_at',
        'updated_at',
      ],
    });

    await Queue.add(RegistrationMail.key, {
      registration,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;
    const { plan_id, start_date } = req.body;

    if (plan_id) {
      const plan = await Plan.findOne({
        where: { id: req.body.plan_id },
      });

      if (!plan) {
        return res.status(404).json({ message: 'Plan does not exists.' });
      }
    }

    const registration = await Registration.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
      attributes: [
        'id',
        'start_date',
        'end_date',
        'price',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!registration) {
      return res.status(404).json({ message: 'Registration does not exists.' });
    }

    await registration.update({
      plan_id: plan_id || registration.plan.id,
      start_date,
    });

    await registration.reload({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
      attributes: [
        'id',
        'start_date',
        'end_date',
        'price',
        'createdAt',
        'updatedAt',
      ],
    });

    await Queue.add(UpdateRegistrationMail.key, {
      registration,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const { id } = req.params;
    const registration = await Registration.findByPk(id);

    await registration.destroy();
    return res.json();
  }
}

export default new RegistrationController();
