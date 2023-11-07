import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import brand from 'enl-api/dummy/brand';
import logo from 'enl-images/logo.svg';
import { FormattedMessage } from 'react-intl';
import Link from '@material-ui/core/Link';
import Recaptcha from 'react-google-invisible-recaptcha';
import SuccessAlert from 'enl-components/Alerts/SuccessAlert';
import ErrorAlert from 'enl-components/Alerts/ErrorAlert';
import messages from './messages';
import styles from './login-jss';
import {
  emailExist,
  emailExistClear,
  auth,
  authClear,
  forgotPassword,
  getOtp,
  getOtpClear,
  forgotPasswordClear
} from './authActions';
import { REGEX, CAPTCHA_KEY, ACTIVE_CAPTCHA } from '../../lib/constants';
import _ from 'lodash';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#fff',
    },
    error: { main: '#E85656' }
  },
  overrides: {
    MuiFormLabel: {
      color: '#ffffff',
      asterisk: {
        color: '#db3131',
        '&$error': {
          color: '#db3131'
        },
      }
    },
    MuiInputLabel: {
      root: {
        color: '#ffffff',
      },
    },
    MuiInput: {
      root: {
        color: '#ffffff'
      },
      underline: {
        '&:after': {
          borderBottom: '1px solid white',
        },
        '&:before': {
          borderBottom: '1px solid white',
        },
        '&&&&:hover:before': {
          borderBottom: '1px solid white'
        }
      }
    }
  }
});

class LoginForm extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      emailValidated: false,
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      loginError: '',
      showPassword: false,
      showForgetEmail: false,
      submitEmail: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      confirmPasswordError: '',
      currentPasswordError: '',
      newPasswordError: '',
      showOtp: false,
      showNewPassword: false,
      showConfirmPassword: false,
      successAlertMessage: '',
      showSuccessAlert: false,
      showErrorAlert: false
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const updatedState = {};
    const {
      authSuccess,
      authMessage,
      authResponse,
      handleAuthClear,
      isEmailExist,
      handleCheckEmailExistClear,
      handleGetOtp,
      otpStatus,
      handleGetOtpClear,
      forgotPasswordStatus,
      message
    } = nextProps;
    if (isEmailExist === 'ok') {
      if (prevState && prevState.email && prevState.showForgetEmail) {
        const data = {
          email: prevState.email
        };
        handleGetOtp(data);
      } else {
        updatedState.emailError = '';
        updatedState.emailValidated = true;
      }
      handleCheckEmailExistClear();
    } else if (isEmailExist === 'error') {
      const temp = _.includes(message, 'user_is_inactive');
      if (message && temp) {
        updatedState.emailError = 'User is Inactive, Please contact your administrator';
      } else {
        updatedState.emailError = 'Email doesn\'t exist.';
      }
      handleCheckEmailExistClear();
    }
    if (authSuccess === 'ok') {
      if (authResponse.user && authResponse.user.isRequiredToResetPassword === true) {
        window.location.href = '/reset-user-password';
       } else {
        window.location.href = '/facility-registry';
      }
      handleAuthClear();
    } else if (authSuccess === 'error') {
      if(authMessage) {
        if(_.includes(authMessage, 'user_is_inactive')){
          updatedState.loginError = 'User is Inactive, Please contact your Administrator.';
        } 
        if(_.includes(authMessage, 'max_retry_count_reached.')){
          updatedState.loginError = 'Invalid Email or Password. Your account is locked. Please contact Administrator to reactivate.';
        } 
        if(_.includes(authMessage, 'invalid_email_or_password.')){
          let message = authMessage.split('.')[2];
          updatedState.loginError = 'Invalid Email or Password'+ '\n' + message;
        }
      }
      handleAuthClear();
    }

    if (otpStatus === 'ok') {
      updatedState.showForgetEmail = false;
      updatedState.emailValidated = false;
      updatedState.submitEmail = true;
      handleGetOtpClear();
    } else if (otpStatus === 'error') {
      updatedState.loginError = 'Invalid email or password.';
    }

    if (forgotPasswordStatus === 'ok') {
      updatedState.showSuccessAlert = true;
      updatedState.successAlertMessage = 'Password updated successfully.';
      updatedState.showForgetEmail = false;
      updatedState.emailValidated = false;
      updatedState.submitEmail = false;
    } else if (forgotPasswordStatus === 'error') {
      updatedState.showErrorAlert = true;
      updatedState.successAlertMessage = 'Unable to update password. Please try again.';
      updatedState.showForgetEmail = false;
      updatedState.emailValidated = false;
      updatedState.submitEmail = false;
    }
    return updatedState;
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleSuccessAlertClose = () => {
    const { handleChangePasswordClear } = this.props;
    this.setState({
      successAlertMessage: '',
      showSuccessAlert: false,
      email: '',
      showErrorAlert: false
    });
    handleChangePasswordClear();
  }

  handleClickShowOtp = () => {
    const { showOtp } = this.state;
    this.setState({ showOtp: !showOtp });
  };

  handleMouseDownOtp = event => {
    event.preventDefault();
  }

  handleClickShowNewPassword = () => {
    const { showNewPassword } = this.state;
    this.setState({ showNewPassword: !showNewPassword });
  }

  handleMouseDownNewPassword = event => {
    event.preventDefault();
  }

  handleClickShowConfirmPassword = () => {
    const { showConfirmPassword } = this.state;
    this.setState({ showConfirmPassword: !showConfirmPassword });
  }

  handleMouseDownConfirmPassword = event => {
    event.preventDefault();
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleFormSubmit = () => {
    event.preventDefault(); // eslint-disable-line
    const { handleCheckEmailExist, handleAuth } = this.props;
    const { emailValidated, email, password } = this.state;
    if (emailValidated) {
      let valid = true;
      this.setState({
        emailError: '',
        passwordError: '',
        loginError: ''
      });
      if (!REGEX.EMAIL.test(email)) {
        valid = false;
        this.setState({
          emailError: 'Please enter valid email.'
        });
      }
      if (!password) {
        valid = false;
        this.setState({
          passwordError: 'Please enter password.'
        });
      }
      if (valid) {
        const authData = {
          email,
          password
        };
        handleAuth(authData);
      }
    } else if (!REGEX.EMAIL.test(email)) {
      this.setState({
        emailError: 'Please enter valid email.'
      });
    } else {
      handleCheckEmailExist(email);
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      emailError: '',
      passwordError: '',
      loginError: ''
    });
  }

  handleForgotPasswordData = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.validatePasswordData();
  }

  handleShowForgotEmail() {
    this.setState({
      showForgetEmail: true,
      emailValidated: false,
      email: '',
      emailError: ''
    });
  }

  handleUpdatePassword() {
    const { handleForgotPasswordUpdate } = this.props;
    const {
      currentPassword, confirmPassword, newPassword, email
    } = this.state;
    let valid = true;
    if (this.validatePasswordData()) {
      if (newPassword !== confirmPassword) {
        valid = false;
        this.setState({
          confirmPasswordError: 'New password and confirm password not matched'
        });
      } else if (newPassword && confirmPassword) {
        this.setState({
          confirmPasswordError: ''
        });
      }
      if (valid) {
        const data = {
          currentPassword,
          confirmPassword,
          newPassword,
          email
        };
        handleForgotPasswordUpdate(data);
      }
    }
  }

  handleBackBtn() {
    const { emailValidated } = this.state;
    if (emailValidated) {
      this.setState({
        emailValidated: false,
      });
    }
  }

  handleSubmitEmail() {
    const { email } = this.state;
    const { handleCheckEmailExist } = this.props;
    let valid = true;
    if (!REGEX.EMAIL.test(email)) {
      valid = false;
      this.setState({
        emailError: 'Please enter valid email.'
      });
    }
    if (valid) {
      handleCheckEmailExist(email);
    }
  }

  validatePasswordData() {
    let valid = true;
    const { currentPassword, confirmPassword, newPassword } = this.state;
    if (!currentPassword || REGEX.PASSWORD.test(currentPassword)) {
      valid = false;
      this.setState({
        currentPasswordError: 'Please enter valid OTP.'
      });
    } else {
      this.setState({
        currentPasswordError: ''
      });
    }
    if (!confirmPassword || !REGEX.PASSWORD.test(confirmPassword)) {
      valid = false;
      this.setState({
        confirmPasswordError: 'Please enter confirm password.'
      });
    } else {
      this.setState({
        confirmPasswordError: ''
      });
    }
    if (!newPassword || !REGEX.PASSWORD.test(newPassword)) {
      valid = false;
      this.setState({
        newPasswordError: 'Please enter new password.'
      });
    } else {
      this.setState({
        newPasswordError: ''
      });
    }
    return valid;
  }

  handleSignIn() {
    this.setState({
      showForgetEmail: false,
      emailValidated: false,
      submitEmail: false,
      email: ''
    });
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleFormSubmit();
    }
  }

  render() {
    const {
      classes,
      loading,
      checkingEmail
    } = this.props;
    const {
      emailValidated,
      showPassword,
      email,
      password,
      emailError,
      passwordError,
      loginError,
      showForgetEmail,
      submitEmail,
      currentPassword,
      newPassword,
      confirmPassword,
      newPasswordError,
      confirmPasswordError,
      currentPasswordError,
      showOtp,
      showNewPassword,
      showConfirmPassword,
      successAlertMessage,
      showSuccessAlert,
      showErrorAlert
    } = this.state;
    return (
      <>
        <Paper className={classes.sideWrap}>
          <div className={classes.wrapper} style={{ paddingTop: '1vh' }}>
            {/* <Hidden mdUp>
              <div className={classes.headLogo}>
                <NavLink to="/login" className={classes.brand}>
                  <img src={logo} alt={brand.name} />
                </NavLink>
              </div>
            </Hidden> */}
            {showForgetEmail || submitEmail ? (
              <Typography
                variant="h4"
                className={classes.title}
                style={{
                  position: 'relative', top: 10, textAlign: 'center', fontSize: 21
                }}
              >
                <FormattedMessage {...messages.forgotPassword} />
              </Typography>
            )
              : (
                <Typography
                  variant="h4"
                  className={classes.title}
                  style={{
                    position: 'relative', top: 10, textAlign: 'center', fontSize: 21
                  }}
                >
                  <FormattedMessage {...messages.login} />
                </Typography>
              )
            }
            {!showForgetEmail && !submitEmail && !emailValidated ? (
              <section className={classes.pageFormSideWrap}>
                <form onSubmit={this.handleFormSubmit}>
                  <div>
                    {!emailValidated ? (
                      <div>
                        <FormControl
                          fullWidth
                          className={classes.formControlInput}
                          style={{ marginTop: 56 }}
                        >
                          <ThemeProvider theme={theme}>
                            <TextField
                              name="email"
                              placeholder="Email"
                              error={emailError !== ''}
                              helperText={emailError}
                              className={classes.margin}
                              label="Email"
                              value={email}
                              autoFocus
                              onChange={(e) => this.handleChange(e)}
                            />
                          </ThemeProvider>
                        </FormControl>
                      </div>
                    ) : null}
                    {loginError ? (
                      <div>
                        <FormControl
                          fullWidth
                          className={classes.formControl}
                          style={{ position: 'relative', top: 16 }}
                          error={loginError !== ''}
                        >
                          <FormHelperText style={{ fontWeight: 'bold', color: '#E85656', textAlign: 'center' }}>{loginError}</FormHelperText>
                        </FormControl>
                      </div>
                    ) : null}
                    <div className={classes.btnArea} style={{ margin: 0 }}>
                      <Button
                        onClick={() => this.handleFormSubmit()}
                        variant="contained"
                        disabled={loading || checkingEmail}
                        fullWidth
                        color="primary"
                        size="large"
                        type="submit"
                        style={{
                          backgroundColor: '#fff', color: '#03a9f4', marginTop: 34, marginBottom: 74
                        }}
                      >
                        {(loading || checkingEmail) && <CircularProgress size={24} className={classes.buttonProgress} />}
                        {emailValidated
                          ? <FormattedMessage {...messages.loginButtonLogin} />
                          : <FormattedMessage {...messages.loginButtonContinue} />
                        }
                        {!loading && !checkingEmail && <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} />}
                      </Button>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Link style={{ color: 'white', cursor: 'pointer' }} onClick={() => this.handleShowForgotEmail()}> Forgot Password </Link>
                    </div>
                  </div>
                </form>
              </section>
            ) : (
              showForgetEmail ? (
                <section className={classes.pageFormSideWrap}>
                  <form onSubmit={this.handleFormSubmit}>
                    <div>
                      {!emailValidated ? (
                        <div>
                          <FormControl
                            fullWidth
                            className={classes.formControlInput}
                            style={{ marginTop: 56 }}
                          >
                            <ThemeProvider theme={theme}>
                              <TextField
                                name="email"
                                error={emailError !== ''}
                                helperText={emailError}
                                className={classes.margin}
                                label="Email"
                                value={email}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </ThemeProvider>
                          </FormControl>
                        </div>
                      ) : null}
                      {loginError ? (
                        <div>
                          <FormControl
                            fullWidth
                            className={classes.formControl}
                            style={{ position: 'relative', top: 16 }}
                            error={loginError !== ''}
                          >
                            <FormHelperText style={{ fontWeight: 'bold', color: '#E85656', textAlign: 'center' }}>{loginError}</FormHelperText>
                          </FormControl>
                        </div>
                      ) : null}
                      <div className={classes.btnArea} style={{ margin: '32px 0 38px' }}>
                        <Button
                          onClick={() => this.handleSubmitEmail()}
                          variant="contained"
                          disabled={loading || checkingEmail}
                          fullWidth
                          color="primary"
                          size="large"
                          style={{ backgroundColor: '#fff', color: '#03a9f4' }}
                        >
                          {(loading || checkingEmail) && <CircularProgress size={24} className={classes.buttonProgress} />}
                          <FormattedMessage {...messages.forgotPasswordEmailSubmit} />
                          {!loading && !checkingEmail && <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} />}
                        </Button>
                      </div>
                      <div className={classes.btnArea} style={{ position: 'relative', top: emailError !== '' ? 38 : 60, margin: '32px 0 18px' }}>
                        <Link onClick={() => this.handleSignIn()} style={{ color: 'white', cursor: 'pointer' }}> SIGN IN </Link>
                      </div>
                    </div>
                  </form>
                </section>
              ) : (
                submitEmail
                  ? (
                    <section className={classes.pageFormSideWrap}>
                      <form>
                        <div>
                          <div>
                            <p style={{ color: 'white', position: 'relative', top: 10 }}>OTP sent to registered email</p>
                            <div>
                              <FormControl
                                fullWidth
                                className={classes.formControlInput}
                              >
                                <ThemeProvider theme={theme}>
                                  <TextField
                                    style={{ marginTop: 10, marginBottom: 0 }}
                                    name="currentPassword"
                                    error={currentPasswordError !== ''}
                                    helperText={currentPasswordError}
                                    className={classes.margin}
                                    type={showOtp ? 'text' : 'password'}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment
                                          position="end"
                                          style={{
                                            paddingTop: 0,
                                            paddingBottom: 22,
                                            position: 'absolute',
                                            right: 0,
                                            top: 15
                                          }}
                                        >
                                          <IconButton
                                            style={{ color: '#fff' }}
                                            aria-label="Tosignggle password visibility"
                                            onClick={this.handleClickShowOtp}
                                            onMouseDown={this.handleMouseDownOtp}
                                          >
                                            {showOtp ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>
                                      )
                                    }}
                                    label="OTP"
                                    value={currentPassword}
                                    onChange={(e) => this.handleForgotPasswordData(e)}
                                  />
                                </ThemeProvider>
                              </FormControl>
                            </div>
                            <div>
                              <FormControl
                                fullWidth
                                className={classes.formControlInput}
                              >
                                <ThemeProvider theme={theme}>
                                  <TextField
                                    style={{ marginTop: 10, marginBottom: 0 }}
                                    name="newPassword"
                                    error={newPasswordError !== ''}
                                    helperText={newPasswordError}
                                    className={classes.margin}
                                    label="New Password"
                                    value={newPassword}
                                    onPaste={(e) => { e.preventDefault(); }}
                                    type={showNewPassword ? 'text' : 'password'}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment
                                          position="end"
                                          style={{
                                            paddingTop: 0,
                                            paddingBottom: 22,
                                            position: 'absolute',
                                            right: 0,
                                            top: 15
                                          }}
                                        >
                                          <IconButton
                                            style={{ color: '#fff' }}
                                            aria-label="Tosignggle password visibility"
                                            onClick={this.handleClickShowNewPassword}
                                            onMouseDown={this.handleMouseDownNewPassword}
                                          >
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>
                                      )
                                    }}
                                    onChange={(e) => this.handleForgotPasswordData(e)}
                                  />
                                </ThemeProvider>
                              </FormControl>
                            </div>
                            <div>
                              <FormControl
                                fullWidth
                                className={classes.formControlInput}
                              >
                                <ThemeProvider theme={theme}>
                                  <TextField
                                    style={{ marginTop: 10, marginBottom: 0 }}
                                    name="confirmPassword"
                                    error={confirmPasswordError !== ''}
                                    helperText={confirmPasswordError}
                                    className={classes.margin}
                                    label="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => this.handleForgotPasswordData(e)}
                                    onPaste={(e) => { e.preventDefault(); }}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment
                                          position="end"
                                          style={{
                                            paddingTop: 0,
                                            paddingBottom: 22,
                                            position: 'absolute',
                                            right: 0,
                                            top: 15
                                          }}
                                        >
                                          <IconButton
                                            style={{ color: '#fff' }}
                                            aria-label="Tosignggle password visibility"
                                            onClick={this.handleClickShowConfirmPassword}
                                            onMouseDown={this.handleMouseDownConfirmPassword}
                                          >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>
                                      )
                                    }}
                                  />
                                </ThemeProvider>
                              </FormControl>
                            </div>
                          </div>
                          <div className={classes.btnArea} style={{ margin: '32px 0 10px' }}>
                            <Button
                              onClick={() => this.handleUpdatePassword()}
                              variant="contained"
                              disabled={loading || checkingEmail}
                              fullWidth
                              color="primary"
                              size="large"
                              style={{ backgroundColor: '#fff', color: '#03a9f4' }}
                            >
                              {(loading || checkingEmail) && <CircularProgress size={24} className={classes.buttonProgress} />}
                              <FormattedMessage {...messages.forgotPasswordEmailSubmit} />
                              {!loading && !checkingEmail && <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} />}
                            </Button>
                          </div>
                          <div className={classes.btnArea} style={{ position: 'relative', top: 7, margin: '0 0 0' }}>
                            <Link onClick={() => this.handleSignIn()} style={{ color: 'white', cursor: 'pointer' }}> SIGN IN </Link>
                          </div>
                        </div>
                      </form>
                    </section>
                  ) : (
                    <React.Fragment>
                      <div style={{ paddingTop: 10 }}>
                        <FormControl className={classes.formControlInput} style={{ marginTop: 56 }}>
                          <ThemeProvider theme={theme}>
                            <TextField
                              name="password"
                              error={passwordError !== ''}
                              helperText={passwordError}
                              label="Password"
                              placeholder="Password"
                              fullWidth
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => this.handleChange(e)}
                              onPaste={(e) => { e.preventDefault(); }}
                              onKeyPress={this.handleKeyPress}
                              autoFocus
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment
                                    position="end"
                                    style={{
                                      paddingTop: 0,
                                      paddingBottom: 22,
                                      position: 'absolute',
                                      right: 0,
                                      top: 15
                                    }}
                                  >
                                    <IconButton
                                      style={{ color: '#fff' }}
                                      aria-label="Tosignggle password visibility"
                                      onClick={this.handleClickShowPassword}
                                      onMouseDown={this.handleMouseDownPassword}
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }}
                            />
                          </ThemeProvider>
                        </FormControl>
                      </div>
                      {loginError ? (
                        <div>
                          <FormControl
                            fullWidth
                            className={classes.formControl}
                            style={{ position: 'relative', top: 16 }}
                            error={loginError !== ''}
                          >
                            <FormHelperText style={{ fontWeight: 'bold', color: '#E85656', textAlign: 'center' }}>{loginError}</FormHelperText>
                          </FormControl>
                        </div>
                      ) : null}
                      <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <NavLink to="#" onClick={() => this.handleBackBtn()} style={{ textDecoration: 'none' }}>
                          <span style={{ color: '#fff', cursor: 'pointer' }}>Go back</span>
                        </NavLink>
                      </div>
                      <div className={classes.btnArea} style={{ margin: '32px 0 66px' }}>
                        <Button
                          onClick={() => this.handleFormSubmit()}
                          variant="contained"
                          disabled={loading || checkingEmail}
                          fullWidth
                          color="primary"
                          size="large"
                          type="submit"
                          style={{ backgroundColor: '#fff', color: '#03a9f4' }}
                        >
                          {(loading || checkingEmail) && <CircularProgress size={24} className={classes.buttonProgress} />}
                          {emailValidated
                            ? <FormattedMessage {...messages.loginButtonLogin} />
                            : <FormattedMessage {...messages.loginButtonContinue} />
                          }
                          {!loading && !checkingEmail && <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} />}
                        </Button>
                      </div>
                    </React.Fragment>
                  )
              )
            )}
          </div>
          <SuccessAlert
            message={successAlertMessage}
            open={showSuccessAlert}
            onClose={this.handleSuccessAlertClose}
          />

          <ErrorAlert
            message={successAlertMessage}
            open={showErrorAlert}
            onClose={this.handleSuccessAlertClose}
          />
          {ACTIVE_CAPTCHA === 'YES' ? (
            <Recaptcha
              ref={ref => this.recaptcha = ref}
              sitekey={CAPTCHA_KEY}
              onResolved={() => console.log('Human detected.')}
            />
          ) : null}
        </Paper>
      </>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAuth: PropTypes.func.isRequired,
  handleCheckEmailExist: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  checkingEmail: PropTypes.bool,
  handleForgotPasswordUpdate: PropTypes.func.isRequired,
  handleChangePasswordClear: PropTypes.func.isRequired
};

LoginForm.defaultProps = {
  messagesAuth: null,
  loading: false,
  checkingEmail: false
};

const mapDispatchToProps = dispatch => ({
  handleCheckEmailExist: bindActionCreators(emailExist, dispatch),
  handleCheckEmailExistClear: bindActionCreators(emailExistClear, dispatch),
  handleAuth: bindActionCreators(auth, dispatch),
  handleAuthClear: bindActionCreators(authClear, dispatch),
  handleForgotPasswordUpdate: bindActionCreators(forgotPassword, dispatch),
  handleGetOtp: bindActionCreators(getOtp, dispatch),
  handleGetOtpClear: bindActionCreators(getOtpClear, dispatch),
  handleChangePasswordClear: bindActionCreators(forgotPasswordClear, dispatch),
});

const adminAuthReducer = 'adminAuthReducer';
const mapStateToProps = state => ({
  checkingEmail: state.get(adminAuthReducer) && state.get(adminAuthReducer).checkingEmail ? state.get(adminAuthReducer).checkingEmail : false,
  isEmailExist: state.get(adminAuthReducer) && state.get(adminAuthReducer).emailExist ? state.get(adminAuthReducer).emailExist : '',
  loading: state.get(adminAuthReducer) && state.get(adminAuthReducer).loading ? state.get(adminAuthReducer).loading : false,
  authSuccess: state.get(adminAuthReducer) && state.get(adminAuthReducer).authSuccess ? state.get(adminAuthReducer).authSuccess : '',
  authMessage: state.get(adminAuthReducer) && state.get(adminAuthReducer).authMessage ? state.get(adminAuthReducer).authMessage : '',
  authResponse: state.get(adminAuthReducer) && state.get(adminAuthReducer).authResponse ? state.get(adminAuthReducer).authResponse : {},
  otpStatus: state.get(adminAuthReducer) && state.get(adminAuthReducer).otpStatus ? state.get(adminAuthReducer).otpStatus : '',
  forgotPasswordStatus: state.get(adminAuthReducer) && state.get(adminAuthReducer).forgotPasswordStatus ? state.get(adminAuthReducer).forgotPasswordStatus : '',
  message: state.get(adminAuthReducer) && state.get(adminAuthReducer).message ? state.get(adminAuthReducer).message : '',
  ...state,
});

const LoginFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default withStyles(styles)(LoginFormMapped);
