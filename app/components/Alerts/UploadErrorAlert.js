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
import Grid from "@material-ui/core/Grid";

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
  alertErrContent: {
    // width: 400,
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

const UploadErrorAlert = (props) => {
  const {
    classes,
    message,
    data,
    open,
    onClose,
    okButtonText
  } = props;
  
    function formatData(data){
        const temparray = [];
        data.forEach((item,i) => {
            temparray.push(<p>{(i+1) + ' . ' + item}</p>)
        })
        return temparray;
    }

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
        <DialogContent className={classes.alertErrContent}>
          <DialogContentText id="alert-dialog-description">
            <div><CancelIcon className={classes.alertIcon} /></div>
            <div>{message}</div>
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} style={{ "margin-top": "5px" }}>
                    <div style={{"border": "1px solid red","padding": "5px 5px 5px 5px", "max-height": "330px", "overflow": "scroll", "textAlign" : 'left' }}>{formatData(data)}</div>
                    </Grid>
                </Grid>
                
            </div>
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

UploadErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  okButtonText: PropTypes.string
};

UploadErrorAlert.defaultProps = {
  okButtonText: 'Ok'
};

export default withStyles(styles)(UploadErrorAlert);
