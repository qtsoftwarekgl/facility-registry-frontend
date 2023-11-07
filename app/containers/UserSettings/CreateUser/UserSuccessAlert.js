import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = () => ({
  alertTitle: {
    marginBottom: 10,
    '& .MuiTypography-h6': {
      color: 'green'
    },
    '&:after': {
      backgroundColor: 'green'
    }
  },
  alertContent: {
    width: 400,
    textAlign: 'center'
  },
  alertIcon: {
    width: 60,
    height: 60,
    color: 'green'
  },
  alertActionContainer: {
    padding: 10
  }
});

const SuccessAlert = (props) => {
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
          Success
        </DialogTitle>
        <DialogContent className={classes.alertContent}>
          <DialogContentText id="alert-dialog-description">
            <div><CheckCircleIcon className={classes.alertIcon} /></div>
            <div>{message}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.alertActionContainer}>
          <Button href="/user-list" size="small" variant="contained" color="primary" autoFocus>
            Back to User List
          </Button>
          <Button onClick={onClose} size="small" variant="contained" color="primary" autoFocus>
            {okButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  okButtonText: PropTypes.string
};

SuccessAlert.defaultProps = {
  okButtonText: 'Ok'
};

export default withStyles(styles)(SuccessAlert);
