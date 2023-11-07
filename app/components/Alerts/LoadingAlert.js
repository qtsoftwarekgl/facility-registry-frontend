import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  alertTitle: {
    marginBottom: 10
  },
  alertContent: {
    width: 400,
    textAlign: 'center'
  },
  alertIcon: {
    width: 60,
    height: 60,
    color: '#0277bd'
  },
  alertActionContainer: {
    padding: 10
  },
  progress: {
    margin: theme.spacing(2),
  },
});

const LoadingAlert = (props) => {
  const {
    classes,
    message,
    open,
  } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.alertContent}>
          <DialogContentText id="alert-dialog-description">
            <div>
              {message || 'Please Wait...'}
            </div>
            <CircularProgress className={classes.progress} size={50} color="secondary" />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

LoadingAlert.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

LoadingAlert.defaultProps = {
  okButtonText: 'Ok'
};

export default withStyles(styles)(LoadingAlert);
