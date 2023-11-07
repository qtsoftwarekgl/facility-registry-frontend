import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 1200,
      minWidth: 1200
    },
    '& table .MuiIconButton-root': {
      padding: 0
    }
  },
  titleRoot: {
    marginBottom: 10
  },
  label: {
    fontWeight: 'bold'
  },
  value: {
    marginLeft: 10
  }
}));


const ServiceViewModel = (props) => {
  const classes = useStyles();
  const {
    open, onClose, data,
  } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          onClose();
        }}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="scroll-dialog-title" className={classes.titleRoot}>
          Service Info
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid container item xs={12} sm={12}>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Service Name:</span>
                <span className={classes.value}>{data && data.name}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Status:</span>
                <span className={classes.value}>{data && data.status}</span>
              </Grid>
            </Grid>
          </Grid>
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ServiceViewModel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ServiceViewModel;
