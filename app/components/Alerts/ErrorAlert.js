import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = () => ({
  alertTitle: {
    marginBottom: 10,
    '& .MuiTypography-h6': {
      color: '#b92b2b'
    },
    '&:after': {
      backgroundColor: '#b92b2b'
    }
  },
  alertContent: {
    width: 400,
    textAlign: 'center'
  },
  alertIcon: {
    width: 60,
    height: 60,
    color: '#b92b2b'
  },
  alertActionContainer: {
    padding: 10
  }
});

const ErrorAlert = (props) => {
  const {
    classes,
    message,
    open,
    onClose,
    okButtonText
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
          Error
        </DialogTitle>
        <DialogContent className={classes.alertContent}>
          <DialogContentText id="alert-dialog-description">
            <div><CancelIcon className={classes.alertIcon} /></div>
            <div>{message}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.alertActionContainer}>
          <Button onClick={onClose} size="small" variant="contained" color="primary" autoFocus>
            {okButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  okButtonText: PropTypes.string
};

ErrorAlert.defaultProps = {
  okButtonText: 'Ok'
};

export default withStyles(styles)(ErrorAlert);
