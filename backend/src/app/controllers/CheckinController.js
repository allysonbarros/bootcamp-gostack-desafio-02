import * as Yup from 'yup';
import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const student_id = req.params.id;

    const checkins = await Checkin.findAll({
      where: { student_id },
    });
    return res.json(checkins);
  }

  async store(req, res) {
    const student_id = req.params.id;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({ message: 'Student does not exists.' });
    }

    // O usuário só pode fazer 5 checkins dentro de um período de 7 dias corridos.
    const { count: checkinsInLast7days } = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (checkinsInLast7days + 1 > 5) {
      return res.status(400).json({
        message: 'You can only perform the checkin 5 times within 7 days.',
      });
    }

    const checkin = await Checkin.create({
      student_id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
