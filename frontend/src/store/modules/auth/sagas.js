import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';
import {
  SignInSuccess,
  signFailure,
  PasswordRecoverySucess,
  ResetPasswordSucess,
} from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    if (!user.is_superuser) {
      console.tron.error('Usuário informado não é administrador.');
      return;
    }

    yield put(SignInSuccess(token, user));
    history.push('/students');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados.');
    yield put(signFailure());
  }
}

export function* passwordRecovery({ payload }) {
  try {
    const { email } = payload;
    yield call(api.post, 'sessions/recovery', { email });

    yield put(PasswordRecoverySucess());
    toast.success(
      `Foi enviado um email para “${email}” com as instruções para realizar a mudança de senha.`
    );
    history.push('/');
  } catch (err) {
    toast.error(
      'Falha durante a recuperação da sua senha. Verifique seus dados.'
    );
    yield put(signFailure());
  }
}

export function* passwordReset({ payload }) {
  try {
    const { token, password, confirmPassword } = payload;
    yield call(api.put, 'sessions/recovery', {
      token,
      password,
      confirm_password: confirmPassword,
    });

    yield put(ResetPasswordSucess());
    toast.success(`Sua senha foi alterada com sucesso!`);
    history.push('/');
  } catch (err) {
    toast.error('O Token informado é inválido ou ele foi expirado.');
    yield put(signFailure());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/PASSWORD_RECOVERY_REQUEST', passwordRecovery),
  takeLatest('@auth/RESET_PASSWORD_REQUEST', passwordReset),
]);
