import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import {DATE_TIME_FORMAT} from '../../lib/constants'

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
  label: {
    fontWeight: 'bold'
  },
  value: {
    marginLeft: 10
  },
  label_head: {
    fontWeight: 'bold',
    fontSize: '1.125rem',
    borderBottom: '1px dashed #C0C0C0'
  },
}));


const UserViewModal = (props) => {
  const classes = useStyles();
  const {
    open, onClose, auditData
  } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        className={classes.root}
      >
        <DialogContent>
          <Grid container spacing={1}>
            <Grid container item xs={12} sm={9} spacing={1}>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <h6 className={classes.label_head}>
                    Audit Log Details
                  </h6>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>User Name:</span>
                  <span className={classes.value}>{auditData && auditData.userName ? auditData.userName : 'N/A'}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Entity:</span>
                  <span className={classes.value}>{auditData && auditData.entity ? auditData.entity : 'N/A'}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Path:</span>
                  <span className={classes.value}>{auditData && auditData.path ? auditData.path : 'N/A'}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Action:</span>
                  <span className={classes.value}>{auditData && auditData.action ? auditData.action : 'N/A'}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Http Method:</span>
                  <span className={classes.value}>{auditData && auditData.httpMethod ? auditData.httpMethod : 'N/A'}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>IP Address:</span>
                  <span className={classes.value}>{auditData && auditData.ip ? auditData.ip : 'N/A'}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>CreatedAt:</span>
                  <span className={classes.value}>{auditData && auditData.createdAt ? moment(auditData.createdAt).format(DATE_TIME_FORMAT) : 'N/A'}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Facility Code:</span>
                  <span className={classes.value}>{auditData && auditData.facilityCode ? auditData.facilityCode : 'N/A'}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={12}>
                  <span className={classes.label}>Payload:</span>
                  <span className={classes.value}>{auditData && auditData.payload ? auditData.payload : 'N/A'}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={12}>
                  <span className={classes.label}>Old Data:</span>
                  <span className={classes.value}>{auditData && auditData.oldData ? auditData.oldData : 'N/A'}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={12}>
                  <span className={classes.label}>New Data:</span>
                  <span className={classes.value}>{auditData && auditData.newData ? auditData.newData : 'N/A'}</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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

UserViewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  auditData: PropTypes.object.isRequired
};

export default UserViewModal;
