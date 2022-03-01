export const AuthSelectors = {
  selectAuthState: (state) => (state.auth.accessToken ? true : false),
  selectLoginRequestStatus: (state) => state.auth.loginRequestStatus,
  selectRegisterRequestStatus: (state) => state.auth.registerRequestStatus,
  selectLoginError: (state) => state.auth.error,
  selectRegisterError: (state) => state.auth.error
}
