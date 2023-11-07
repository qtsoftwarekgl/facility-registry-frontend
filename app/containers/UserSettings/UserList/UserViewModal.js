import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import defaultUserImg from 'enl-images/user-default.jpg';
import Grid from '@material-ui/core/Grid';
import * as URL from '../../../lib/apiUrls';
import { ROLE } from './constants';
import {
  getNationality
} from '../../../utils/helpers';

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
    open, onClose, userData
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
        <DialogTitle id="scroll-dialog-title" className={classes.titleRoot}>
          {userData && userData.surName ? userData.surName : ''}
          {' '}
          {userData && userData.postNames ? userData.postNames : ''}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3} spacing={1} style={{ margin: 'auto 0' }}>
              <div style={{
                height: 170,
                marginLeft: 20,
                marginTop: 0,
                marginRight: 50,
                border: '1px dashed black'
              }}
              >
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={`${URL.ASSET_URL}${userData && userData.photo}`}
                  alt=""
                  onError={(e) => { e.target.src = defaultUserImg; }}
                />
              </div>
            </Grid>
            <Grid container item xs={12} sm={9} spacing={1}>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <h6 className={classes.label_head}>
Users Details
                  </h6>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <h6 className={classes.label_head}>
Job Attributes
                  </h6>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Type of Document:</span>
                  <span className={classes.value}>{userData && userData.documentType}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Role:</span>
                  <span className={classes.value}>
                    {userData && userData.role ? ROLE[userData.role] : ''}
                  </span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Document Number:</span>
                  <span className={classes.value}>{userData && userData.documentNumber}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Ministry:</span>
                  <span className={classes.value}>{userData && userData.ministry ? userData.ministry : 'N/A'}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Surname:</span>
                  <span className={classes.value}>{userData && userData.surName}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Facility Name:</span>
                  <span className={classes.value}>{userData && userData.facilityName ? userData.facilityName : 'N/A'}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Post-Names:</span>
                  <span className={classes.value}>{userData && userData.postNames}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Facility Type:</span>
                  <span className={classes.value}>{userData && userData.facilityType ? userData.facilityType : 'N/A'}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Date of Birth:</span>
                  <span className={classes.value}>{userData && userData.dateOfBirth}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Facility Area:</span>
                  <span className={classes.value}>{userData && userData.displayFacilityArea ? userData.displayFacilityArea : 'N/A'}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Sex:</span>
                  <span className={classes.value}>{userData && userData.sex}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Facility ID:</span>
                  <span className={classes.value}>{userData && userData.facilityId ? userData.facilityId : 'N/A'}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Email:</span>
                  <span className={classes.value}>{userData && userData.email}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Accept Terms and Conditions:</span>
                  <span className={classes.value}>
                    {userData && userData.isConditionsAgreed}
                  </span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Nationality:</span>
                  <span className={classes.value}>{userData && userData.nationality ? getNationality(userData.nationality) : ''}</span>
                </Grid>
                  {userData && userData.deactivateReason ? <Grid item xs={12} sm={6}>
                    <span className={classes.label}>Reason For Status Change:</span>
                    <span className={classes.value}>{userData && userData.deactivateReason ? userData.deactivateReason : ''}</span>
                  </Grid> : null}
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Telephone Number:</span>
                  <span className={classes.value}>{userData && userData.phoneNumber}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Staus:</span>
                  <span className={classes.value}>{userData && userData.status}</span>
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
  userData: PropTypes.object.isRequired
};

export default UserViewModal;
