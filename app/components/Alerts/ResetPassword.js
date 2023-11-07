import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { lightBlue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';
import SuccessAlert from 'enl-components/Alerts/SuccessAlert';
import ErrorAlert from 'enl-components/Alerts/ErrorAlert';
import { REGEX } from '../../lib/constants';
import { resetPassword, resetPasswordClear } from '../../containers/App/CommonRedux/resetPasswordAction';
import { unsetLocalStorage, getErrorMessage } from '../../utils/helpers';
import history from '../../utils/history';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 900,
      minWidth: 900
    }
  },
  titleRoot: {
    marginBottom: 10
  },
  workingAt: {
    fontWeight: 'bold'
  },
  radioLabel: {
    '& .MuiTypography-root': {
      fontSize: 14
    }
  },
  formControl: {
    padding: 5,
    minWidth: '100%'
  },
  formControlInput: {
    width: '100%',
    '& label + div input': {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 0,
      paddingRight: 0
    },
    padding: 14
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: lightBlue
  },
  spacing: 1
});

const ResetPassword = (props) => {
  const classes = useStyles();
  const {
    open,
    handleResetPassword,
    handleResetPasswordClear,
    errorMessage,
    passwordUpdated,
    handleClose
  } = props;

  let infoBtn = null;
  const [validatingPassword, setValidatingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [showedPassInfo, setShowedPassInfo] = useState(true);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState('');
  const [successAlertMessage, setSuccessAlertMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    setPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setConfirmPasswordError('');
    setValidatingPassword(false);
    setShowedPassInfo(true);
  }, [open]);

  useEffect(() => {
    if (passwordUpdated === 'ok') {
      setShowSuccessAlert(true);
      setSuccessAlertMessage('Password reset successfully.');
      handleResetPasswordClear();
    }
    if (passwordUpdated === 'error') {
      setShowErrorAlert(true);
      if (errorMessage === 'server_error.current_password_not_match') {
        setErrorAlertMessage(getErrorMessage(errorMessage));
      } else {
        setErrorAlertMessage('Please try again.');
      }
      handleResetPasswordClear();
    }
  }, [passwordUpdated]);

  const validatePassword = () => {
    setPasswordError('');
    setConfirmPasswordError('');
    setCurrentPasswordError('');
    let valid = true;
    if (!REGEX.PASSWORD.test(password)) {
      valid = false;
      if (showedPassInfo) {
        setShowedPassInfo(false);
        infoBtn.click();
      }
      setPasswordError('Please enter strong password.');
    }
    if (!currentPassword) {
      setCurrentPasswordError('Please enter current password.');
    }
    if (!confirmPassword) {
      valid = false;
      setConfirmPasswordError('Please enter confirm password.');
    }
    if (password && confirmPassword && password !== confirmPassword) {
      valid = false;
      setConfirmPasswordError('Password and confirm passwod must be equal.');
    }
    return valid;
  };

  useEffect(() => {
    if (validatingPassword) {
      validatePassword();
    }
  }, [password, confirmPassword]);

  const handleAction = () => {
    if (validatePassword()) {
      const data = {
        currentPassword,
        newPassword: password,
        confirmPassword
      };
      handleResetPassword(data);
    }
  };

  const handleCloseClick = () => {
    history.push('/facility-registry');
  };

  return (
    <div>
      <Dialog
        open={open}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="scroll-dialog-title" className={classes.titleRoot}>
          { window.location.pathname === '/reset-user-password' ? 'Change Password' : 'Reset Password' }
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={10} sm={6}>
              <FormControl className={classes.formControlInput}>
                <ThemeProvider theme={theme}>
                  <TextField
                    error={currentPasswordError !== ''}
                    helperText={currentPasswordError}
                    id="outlined-full-width"
                    label="Current Password"
                    placeholder="Current Password"
                    fullWidth
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </ThemeProvider>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={10} sm={6}>
              <FormControl className={classes.formControlInput}>
                <ThemeProvider theme={theme}>
                  <TextField
                    error={passwordError !== ''}
                    helperText={passwordError}
                    id="outlined-full-width"
                    label="New Password"
                    placeholder="New Password"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </ThemeProvider>
              </FormControl>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Tooltip
                title="Strong password details"
                style={{
                  marginTop: 35, marginLeft: -15, color: 'red', padding: 0
                }}
              >
                <IconButton
                  aria-label="password-info"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  ref={(btnRef) => { infoBtn = btnRef; }}
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div style={{ padding: 10 }}>
                  <p style={{ fontWeight: '600' }}>Password must be.</p>
                  <ol>
                    <li>10-16 characters length.</li>
                    <li>Atleast one uppercase.</li>
                    <li>Atleast one lowercase.</li>
                    <li>Atleast one number.</li>
                    <li>Atleast any one of the symbols !@#$%^&*_</li>
                  </ol>
                </div>
              </Popover>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControlInput}>
                <ThemeProvider theme={theme}>
                  <TextField
                    error={confirmPasswordError !== ''}
                    helperText={confirmPasswordError}
                    id="outlined-full-width"
                    label="Confirm New Password"
                    placeholder="Confirm New Password"
                    fullWidth
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </ThemeProvider>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {window.location.pathname === '/reset-user-password' ? (
            <Button onClick={() => handleCloseClick()} color="primary" variant="outlined">
            Cancel
            </Button>
          ) : null }
          <Button onClick={() => handleAction()} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ErrorAlert
        message={errorAlertMessage}
        open={showErrorAlert}
        onClose={() => {
          setShowErrorAlert(false);
          setErrorAlertMessage('');
        }}
      />
      <SuccessAlert
        message={successAlertMessage}
        open={showSuccessAlert}
        onClose={() => {
          setShowSuccessAlert(false);
          setSuccessAlertMessage('');
          unsetLocalStorage();
          handleClose();
          window.location.href = '/login';
        }}
      />
    </div>
  );
};

ResetPassword.propTypes = {
  open: PropTypes.bool.isRequired,
  handleResetPassword: PropTypes.func.isRequired,
  handleResetPasswordClear: PropTypes.func.isRequired,
  passwordUpdated: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};
const resetPasswordReducer = 'resetPasswordReducer';
const mapStateToProps = state => ({
  passwordUpdated: state.get(resetPasswordReducer) && state.get(resetPasswordReducer).passwordUpdated ? state.get(resetPasswordReducer).passwordUpdated : '',
  errorMessage: state.get(resetPasswordReducer) && state.get(resetPasswordReducer).message ? state.get(resetPasswordReducer).message : '',
});

const mapDispatchToProps = dispatch => ({
  handleResetPassword: bindActionCreators(resetPassword, dispatch),
  handleResetPasswordClear: bindActionCreators(resetPasswordClear, dispatch)
});

const ResetPasswordMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);

export default ResetPasswordMapped;
