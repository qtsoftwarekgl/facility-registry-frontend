import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { lightBlue } from '@material-ui/core/colors';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  FormControl,
  TextField,
  FormHelperText,
  Button,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

const styles = () => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 500,
      minWidth: 500,
    },
  },
  alertTitle: {
    marginBottom: 10,
    '& .MuiTypography-h6': {
      color: '#e37734',
    },
    '&:after': {
      backgroundColor: '#e37734',
    },
  },
  alertContent: {
    width: '100%',
    textAlign: 'center',
  },
  alertIcon: {
    width: 60,
    height: 60,
    color: '#e37734',
  },
  alertActionContainer: {
    padding: 10,
  },
  formControlInput: {
    width: '100%',
    '& label + div input': {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 0,
      paddingRight: 0,
    },
    padding: 10,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: '#db3131',
        '&$error': {
          color: '#db3131',
        },
      },
    },
  },
});

const StatusChangeAlert = (props) => {
  const {
    classes,
    message,
    open,
    onClose,
    onConfirm,
    onCancel,
    confirmButtonText,
    cancelButtonText,
  } = props;

  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');

  const handleConfirm = () => {
    setReasonError('');
    if (!reason) {
      setReasonError('Please enter reason to change the status.');
    } else {
      onConfirm(reason);
      setReason('');
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-title" className={classes.alertTitle}>
          Reason For Change
        </DialogTitle>
        <DialogContent className={classes.alertContent}>
          <DialogContentText id="alert-dialog-description">
            <div>
              <HelpIcon className={classes.alertIcon} />
            </div>
            <div>{message}</div>
          </DialogContentText>
          <div>
            <FormControl
              className={classes.formControlInput}
              fullWidth
              error={reasonError !== ''}
            >
              <ThemeProvider theme={theme}>
                <TextField
                  multiline
                  className={classes.margin}
                  label="Reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </ThemeProvider>
              <FormHelperText>{reasonError}</FormHelperText>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions className={classes.alertActionContainer}>
          <Button onClick={onCancel} size="small" variant="contained" autoFocus>
            {cancelButtonText}
          </Button>
          <Button
            onClick={() => handleConfirm()}
            size="small"
            variant="contained"
            color="primary"
          >
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

StatusChangeAlert.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
};

StatusChangeAlert.defaultProps = {
  confirmButtonText: 'Status change',
  cancelButtonText: 'Cancel',
};

export default withStyles(styles)(StatusChangeAlert);
