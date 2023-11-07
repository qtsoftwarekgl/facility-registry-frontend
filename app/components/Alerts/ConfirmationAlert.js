import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HelpIcon from '@material-ui/icons/Help';

const styles = () => ({
  alertTitle: {
    marginBottom: 10,
    '& .MuiTypography-h6': {
      color: '#e37734'
    },
    '&:after': {
      backgroundColor: '#e37734'
    }
  },
  alertContent: {
    width: 400,
    textAlign: 'center'
  },
  alertIcon: {
    width: 60,
    height: 60,
    color: '#e37734'
  },
  alertActionContainer: {
    padding: 10
  }
});

const ConfirmationAlert = (props) => {
  const {
    classes,
    message,
    open,
    onClose,
    onConfirm,
    onCancel,
    confirmButtonText,
    cancelButtonText
  } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.alertTitle}>
          Please Confirm
        </DialogTitle>
        <DialogContent className={classes.alertContent}>
          <DialogContentText id="alert-dialog-description">
            <div><HelpIcon className={classes.alertIcon} /></div>
            <div>{message}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.alertActionContainer}>
          <Button onClick={onCancel} size="small" variant="contained" autoFocus>
            {cancelButtonText}
          </Button>
          <Button onClick={onConfirm} size="small" variant="contained" color="primary">
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmationAlert.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string
};

ConfirmationAlert.defaultProps = {
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel'
};

export default withStyles(styles)(ConfirmationAlert);
