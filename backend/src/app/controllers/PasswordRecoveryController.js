import crypto from 'crypto';
import * as Yup from 'yup';

import { subHours } from 'date-fns';
import User from '../models/User';

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

    const token = crypto.randomBytes(32).toString('hex');
    const expiration_date = subHours(new Date(), 2);

    user.update({
      recovery_token: token,
      recovery_token_expiration_at: expiration_date,
    });

    return res.status(201).json();
  }
}

export default new PasswordRecoveryController();
