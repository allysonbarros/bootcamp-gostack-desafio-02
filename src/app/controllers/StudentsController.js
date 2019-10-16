import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number()
        .positive()
        .required(),
      peso: Yup.number()
        .positive()
        .required(),
      altura: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validatation fails.' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });
    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const student = await Student.create(req.body);
    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number().positive(),
      peso: Yup.number().positive(),
      altura: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validatation fails.' });
    }

    const student = await Student.findByPk(req.params.id);
    const studentExists = await Student.findOne({
      where: {
        email: req.body.email,
        id: {
          [Op.not]: req.params.id,
        },
      },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    await student.update(req.body);
    student.reload();

    return res.json(student);
  }
}

export default new StudentsController();
