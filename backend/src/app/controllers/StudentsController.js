import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentsController {
  async index(req, res) {
    const { q } = req.query;
    const where =
      q !== undefined
        ? {
            name: {
              [Op.like]: `%${q}%`,
            },
          }
        : {};

    const students = await Student.findAll({
      where,
      order: [['name']],
    });

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
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
      age: Yup.number().positive(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
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
    return res.json(student);
  }
}

export default new StudentsController();
