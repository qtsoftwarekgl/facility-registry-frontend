import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import moment from 'moment';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { PapperBlock } from 'enl-components';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Type from 'enl-styles/Typography.scss';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { DATE_TIME_FORMAT, DATE_FORMAT } from '../../../lib/constants';
import PackageServiceTable from '../../Pages/Table/PackageServiceTable';

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


const FacilityViewModal = (props) => {
  const classes = useStyles();
  const {
    open, onClose, data,
  } = props;

  const handleCopy = (log) => {
    const textField = document.createElement('textarea');
    textField.value = JSON.stringify(log);
    document.body.appendChild(textField);
    setTimeout(() => {
      textField.select();
      document.execCommand('copy');
      textField.remove();
    }, 1000);
  };

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
          Facility Info
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid container item xs={12} sm={12}>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Facility Name:</span>
                <span className={classes.value}>{data && data.name}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Facility Code:</span>
                <span className={classes.value}>{data && data.code}</span>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12}>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Facility Category:</span>
                <span className={classes.value}>{data && data.category ? data.category : 'N/A'}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Facility Type:</span>
                <span className={classes.value}>{data && data.type ? data.type : 'N/A'}</span>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12}>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Status:</span>
                <span className={classes.value}>{data && data.status}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Resident Province:</span>
                <span className={classes.value}>{data && data.province}</span>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12}>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Resident District:</span>
                <span className={classes.value}>{data && data.district}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Resident Sector:</span>
                <span className={classes.value}>{data && data.sector}</span>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12}>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Resident Cell:</span>
                <span className={classes.value}>{data && data.cell}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Resident Village:</span>
                <span className={classes.value}>{data && data.village}</span>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12}>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Latitude:</span>
                <span className={classes.value}>{data && data.latitude}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Longitude:</span>
                <span className={classes.value}>{data && data.longitude}</span>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12}>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Facility Opening Date:</span>
                <span className={classes.value}>{data && data.facilityOpeningDate ? moment(data.facilityOpeningDate).format(DATE_FORMAT) : 'N/A'}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Facility Closing Date:</span>
                <span className={classes.value}>{data && data.facilityClosingDate ? moment(data.facilityClosingDate).format(DATE_FORMAT) : 'N/A'}</span>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12}>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>P.O.Box:</span>
                <span className={classes.value}>{data && data.pobox? data.pobox : 'N/A'}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Street Address:</span>
                <span className={classes.value}>{data && data.streetAddress? data.streetAddress : 'N/A'}</span>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                <span className={classes.label}>Email:</span>
                <span className={classes.value}>{data && data.email? data.email : 'N/A'}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.label}>Phone Number:</span>
                <span className={classes.value}>{data && data.phonenumber? data.phonenumber : 'N/A'}</span>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12}>                
              {data && data.deactivateReason ? <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Reason For Status Change:</span>
                  <span className={classes.value}>{data && data.deactivateReason ? data.deactivateReason : ''}</span>
                </Grid> : null}              
            </Grid>
          </Grid>
          
          <br />
          {data && data.user_logs && (data.user_logs).length
            ? (
              <PapperBlock whiteBg hideBlockSection>
                <Typography variant="h5" className={Type.textLeft} gutterBottom>
                  <span>Users</span>
                </Typography>
                <Divider style={{ width: '100%' }} />
                <Grid container spacing={1}>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Action</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Done By</th>
                        <th>
                          <Tooltip title="Copy">
                            <IconButton onClick={() => handleCopy(data.user_logs)}>
                              <FileCopyIcon />
                            </IconButton>
                          </Tooltip>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data.user_logs
                      ).map((item) => (
                        <tr>
                          <td>{moment(item.date).format(DATE_TIME_FORMAT)}</td>
                          <td>{item.action}</td>
                          <td>{item.fromFacilityName}</td>
                          <td>{item.toFacilityName}</td>
                          <td>{item.doneBy ? item.doneBy.surName + ' ' + item.doneBy.postNames : '-'}</td>
                          <td>
                            <IconButton onClick={() => handleCopy(item)}>
                              <FileCopyIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Grid>
              </PapperBlock>
            ) : null}
          {data && data.nurse_logs && (data.nurse_logs).length
            ? (
              <PapperBlock whiteBg hideBlockSection>
                <Typography variant="h5" className={Type.textLeft} gutterBottom>
                  <span>Nurses</span>
                </Typography>
                <Divider style={{ width: '100%' }} />
                <Grid container spacing={1}>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Action</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Done By</th>
                        <th>
                          <Tooltip title="Copy">
                            <IconButton onClick={() => handleCopy(data.user_logs)}>
                              <FileCopyIcon />
                            </IconButton>
                          </Tooltip>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data.nurse_logs
                      ).map((item) => (
                        <tr>
                          <td>{moment(item.date).format(DATE_TIME_FORMAT)}</td>
                          <td>{item.action}</td>
                          <td>{item.fromFacilityName}</td>
                          <td>{item.toFacilityName}</td>
                          <td>{item.doneBy ? item.doneBy.surName + ' ' + item.doneBy.postNames : '-'}</td>
                          <td>
                            <IconButton onClick={() => handleCopy(item)}>
                              <FileCopyIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Grid>
              </PapperBlock>
            ) : null}
          {data && data.attendant_logs && (data.attendant_logs).length
            ? (
              <PapperBlock whiteBg hideBlockSection>
                <Typography variant="h5" className={Type.textLeft} gutterBottom>
                  <span>Attendants</span>
                </Typography>
                <Divider style={{ width: '100%' }} />
                <Grid container spacing={1}>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Action</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Done By</th>
                        <th>
                          <Tooltip title="Copy">
                            <IconButton onClick={() => handleCopy(data.attendant_logs)}>
                              <FileCopyIcon />
                            </IconButton>
                          </Tooltip>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data.attendant_logs
                      ).map((item) => (
                        <tr>
                          <td>{moment(item.date).format(DATE_TIME_FORMAT)}</td>
                          <td>{item.action}</td>
                          <td>{item.fromFacilityName}</td>
                          <td>{item.toFacilityName}</td>
                          <td>{item.doneBy ? item.doneBy.surName + ' ' + item.doneBy.postNames : '-'}</td>
                          <td>
                            <IconButton onClick={() => handleCopy(item)}>
                              <FileCopyIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Grid>
              </PapperBlock>
            ) : null}
          {data && data.birth_logs && (data.birth_logs).length
            ? (
              <PapperBlock whiteBg hideBlockSection>
                <Typography variant="h5" className={Type.textLeft} gutterBottom>
                  <span>Births</span>
                </Typography>
                <Divider style={{ width: '100%' }} />
                <Grid container spacing={1}>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Action</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Done By</th>
                        <th>
                          <Tooltip title="Copy">
                            <IconButton onClick={() => handleCopy(data.user_logs)}>
                              <FileCopyIcon />
                            </IconButton>
                          </Tooltip>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data.birth_logs
                      ).map((item) => (
                        <tr>
                          <td>{moment(item.date).format(DATE_TIME_FORMAT)}</td>
                          <td>{item.action}</td>
                          <td>{item.fromFacilityName}</td>
                          <td>{item.toFacilityName}</td>
                          <td>{item.doneBy ? item.doneBy.surName + ' ' + item.doneBy.postNames : '-'}</td>
                          <td>
                            <IconButton onClick={() => handleCopy(item)}>
                              <FileCopyIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Grid>
              </PapperBlock>
            ) : null}
          {data && data.death_logs && (data.death_logs).length
            ? (
              <PapperBlock whiteBg hideBlockSection>
                <Typography variant="h5" className={Type.textLeft} gutterBottom>
                  <span>Deaths</span>
                </Typography>
                <Divider style={{ width: '100%' }} />
                <Grid container spacing={1}>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Action</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Done By</th>
                        <th>
                          <Tooltip title="Copy">
                            <IconButton onClick={() => handleCopy(data.user_logs)}>
                              <FileCopyIcon />
                            </IconButton>
                          </Tooltip>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data.death_logs
                      ).map((item) => (
                        <tr>
                          <td>{moment(item.date).format(DATE_TIME_FORMAT)}</td>
                          <td>{item.action}</td>
                          <td>{item.fromFacilityName}</td>
                          <td>{item.toFacilityName}</td>
                          <td>{item.doneBy ? item.doneBy.surName + ' ' + item.doneBy.postNames : '-'}</td>
                          <td>
                            <IconButton onClick={() => handleCopy(item)}>
                              <FileCopyIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Grid>
              </PapperBlock>
            ) : null}
          {data && data.logs && (data.logs).length
            ? (
              <PapperBlock whiteBg hideBlockSection>
                <Typography variant="h5" className={Type.textLeft} gutterBottom>
                  <span>Facility Actions</span>
                </Typography>
                <Divider style={{ width: '100%' }} />
                <Grid container spacing={1}>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Action</th>
                        <th>Done By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data.logs).map((item) => (
                        <tr>
                          <td>{moment(item.date).format(DATE_TIME_FORMAT)}</td>
                          <td>{item.action}</td>
                          <td>{item.doneBy ? item.doneBy.surName + ' ' + item.doneBy.postNames : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Grid>
              </PapperBlock>
            ) : null}
        {data && data.packages ? <PackageServiceTable
          data={data}
        /> : null}
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

FacilityViewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default FacilityViewModal;
