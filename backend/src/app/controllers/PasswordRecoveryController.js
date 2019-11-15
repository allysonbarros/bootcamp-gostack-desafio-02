import crypto from 'crypto';
import { subHours, isBefore } from 'date-fns';
import * as Yup from 'yup';

import User from '../models/User';
import Queue from '../../lib/Queue';
import PasswordRecoveryMail from '../jobs/PasswordRecoveryMail';

class PasswordRecoveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    const token = await crypto.randomBytes(32).toString('hex');
    const expiration_date = subHours(new Date(), 2);

    await user.reload();
    await user.update({
      recovery_token: token,
      recovery_token_expiration_at: expiration_date,
    });

    await Queue.add(PasswordRecoveryMail.key, {
      user,
    });

    return res.json();
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      token: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')]),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { token, password } = req.body;

    const user = await User.findOne({ where: { recovery_token: token } });

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    const tokenIsValid = isBefore(
      user.recovery_token_expiration_at,
      new Date()
    );
    if (!tokenIsValid) {
      return res.status(401).json({ error: 'Expired token.' });
    }

    await user.update({
      password,
      recovery_token: null,
      recovery_token_expiration_at: null,
    });
    return res.json();
  }
}

export default new PasswordRecoveryController();
