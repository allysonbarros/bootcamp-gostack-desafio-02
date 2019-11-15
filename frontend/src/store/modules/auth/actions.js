export function SignInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {
      email,
      password,
    },
  };
}

export function SignInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {
      token,
      user,
    },
  };
}

export function PasswordRecoveryRequest(email) {
  return {
    type: '@auth/PASSWORD_RECOVERY_REQUEST',
    payload: {
      email,
    },
  };
}

export function PasswordRecoverySucess() {
  return {
    type: '@auth/PASSWORD_RECOVERY_SUCCESS',
  };
}

export function ResetPasswordRequest(token, password, confirmPassword) {
  return {
    type: '@auth/RESET_PASSWORD_REQUEST',
    payload: {
      token,
      password,
      confirmPassword,
    },
  };
}

export function ResetPasswordSucess() {
  return {
    type: '@auth/RESET_PASSWORD_SUCCESS',
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
