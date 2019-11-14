import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';
import { SignInSuccess, signFailure } from './actions';

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

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
