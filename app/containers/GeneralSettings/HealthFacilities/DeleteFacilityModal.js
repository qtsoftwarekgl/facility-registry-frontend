import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import { ThemeProvider } from '@material-ui/styles';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import ReactSelect from 'react-select';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import _ from 'lodash';
import { PapperBlock } from 'enl-components';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Type from 'enl-styles/Typography.scss';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { DATE_TIME_FORMAT } from '../../../lib/constants';

const styles = () => ({
  root: {
    justifyContent: 'center',
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 1200,
      minWidth: 1200
    },
    '& .MuiInputLabel-root': {
      fontSize: 16,
      position: 'relative',
      top: '-7px'
    },
    '& table .MuiIconButton-root': {
      padding: 0
    }
  },
  titleRoot: {
    marginBottom: 10,
    padding: 14
  },
  label: {
    fontWeight: 'bold'
  },
  value: {
    marginLeft: 10
  }
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
          color: '#db3131'
        },
      }
    }
  }
});

const initialState = {
  userAction: '',
  userHealthFacility: null,
  userHealthFacilityId: '',
  userActionAgree: false,
  userActionButton: true,
  userFacilityError: '',
  nurseAction: '',
  nurseHealthFacility: null,
  nurseHealthFacilityId: '',
  nurseActionButton: true,
  nurseActionAgree: false,
  nurseFacilityError: '',
  attendantHealthFacility: null,
  attendantHealthFacilityId: '',
  attendantAction: '',
  attendantActionAgree: false,
  attendantActionButton: true,
  attendantFacilityError: '',
  birthsActionButton: true,
  birthsActionAgree: false,
  birthsHealthFacilityId: '',
  birthsFacilityError: '',
  birthsHealthFacility: null,
  deathsAction: '',
  deathsActionAgree: false,
  deathsActionButton: true,
  deathsHealthFacilityId: '',
  deathsHealthFacility: null,
  deathsFacilityError: ''
};

class DeleteFacilityModal extends Component {
  constructor(props) {
    super(props);
    this.state = _.cloneDeep(initialState);
  }

  handleFormClose = () => {
    const { onClose } = this.props;
    this.setState(initialState, () => {
      onClose();
    });
  }

  handleHealthFacilitySelect = (selected, triggeredAction) => {
    const {
      userActionAgree,
      attendantActionAgree,
      nurseActionAgree,
      birthsActionAgree,
      deathsActionAgree
    } = this.state;
    const { action, name } = triggeredAction;
    if (action === 'clear') {
      if (name === 'user') {
        this.setState({
          userHealthFacility: null,
          userHealthFacilityId: '',
          userActionButton: true
        });
      } else if (name === 'nurse') {
        this.setState({
          nurseHealthFacility: null,
          nurseHealthFacilityId: '',
          nurseActionButton: true
        });
      } else if (name === 'attendant') {
        this.setState({
          attendantHealthFacility: null,
          attendantHealthFacilityId: '',
          attendantActionButton: true
        });
      } else if (name === 'births') {
        this.setState({
          birthsHealthFacility: null,
          birthsHealthFacilityId: '',
          birthsActionButton: true
        });
      } else if (name === 'deaths') {
        this.setState({
          deathsHealthFacility: null,
          deathsHealthFacilityId: '',
          deathsActionButton: true
        });
      }
    } else if (name === 'user') {
      this.setState({
        userHealthFacility: selected,
        userHealthFacilityId: selected.value,
        userFacilityError: '',
        userActionButton: !userActionAgree
      });
    } else if (name === 'nurse') {
      this.setState({
        nurseHealthFacility: selected,
        nurseHealthFacilityId: selected.value,
        nurseFacilityError: '',
        nurseActionButton: !nurseActionAgree
      });
    } else if (name === 'attendant') {
      this.setState({
        attendantHealthFacility: selected,
        attendantHealthFacilityId: selected.value,
        attendantFacilityError: '',
        attendantActionButton: !attendantActionAgree
      });
    } else if (name === 'births') {
      this.setState({
        birthsHealthFacility: selected,
        birthsHealthFacilityId: selected.value,
        birthsFacilityError: '',
        birthsActionButton: !birthsActionAgree
      });
    } else if (name === 'deaths') {
      this.setState({
        deathsHealthFacility: selected,
        deathsHealthFacilityId: selected.value,
        deathsFacilityError: '',
        deathsActionButton: !deathsActionAgree
      });
    }
  };

  handleUserAction = (e) => {
    const { userHealthFacilityId, userActionAgree } = this.state;
    if (e.target.value === 'SHIFT' && userHealthFacilityId === '') {
      this.setState({
        userFacilityError: 'Please select a facility.',
        userAction: e.target.value,
        userActionButton: true
      });
    } else {
      this.setState({
        userAction: e.target.value,
        userActionButton: !userActionAgree,
        userFacilityError: ''
      });
    }
  }

  handleNurseAction = (e) => {
    const { nurseHealthFacilityId, nurseActionAgree } = this.state;
    if (e.target.value === 'SHIFT' && nurseHealthFacilityId === '') {
      this.setState({
        nurseFacilityError: 'Please select a facility.',
        nurseAction: e.target.value,
        nurseActionButton: true
      });
    } else {
      this.setState({
        nurseAction: e.target.value,
        nurseActionButton: !nurseActionAgree,
        nurseFacilityError: ''
      });
    }
  }

  handleAttendantAction = (e) => {
    const { attendantHealthFacilityId, attendantActionAgree } = this.state;
    if (e.target.value === 'SHIFT' && attendantHealthFacilityId === '') {
      this.setState({
        attendantFacilityError: 'Please select a facility.',
        attendantAction: e.target.value,
        attendantActionButton: true
      });
    } else {
      this.setState({
        attendantAction: e.target.value,
        attendantActionButton: !attendantActionAgree,
        attendantFacilityError: ''
      });
    }
  }

  handleBirthsAction = (e) => {
    const { birthsHealthFacilityId, birthsActionAgree } = this.state;
    if (e.target.value === 'SHIFT' && birthsHealthFacilityId === '') {
      this.setState({
        birthsFacilityError: 'Please select a facility.',
        birthsAction: e.target.value,
        birthsActionButton: true
      });
    } else {
      this.setState({
        birthsAction: e.target.value,
        birthsActionButton: !birthsActionAgree,
        birthsFacilityError: ''
      });
    }
  }

  handleDeathsAction = (e) => {
    const {
      deathsHealthFacilityId,
      deathsActionAgree
    } = this.state;
    if (e.target.value === 'SHIFT' && deathsHealthFacilityId === '') {
      this.setState({
        deathsFacilityError: 'Please select a facility.',
        deathsAction: e.target.value,
        deathsActionButton: true
      });
    } else {
      this.setState({
        deathsAction: e.target.value,
        deathsActionButton: !deathsActionAgree,
        deathsFacilityError: ''
      });
    }
  }

  handleUserAgree = (e, actionType) => {
    const {
      userAction,
      userHealthFacilityId,
      nurseAction,
      nurseHealthFacilityId,
      attendantAction,
      attendantHealthFacilityId,
      birthsAction,
      birthsHealthFacilityId,
      deathsAction,
      deathsHealthFacilityId
    } = this.state;
    if (actionType === 'user') {
      if (userAction === 'SHIFT' && userHealthFacilityId === '') {
        this.setState({
          userFacilityError: 'Please select a facility.'
        });
      } else {
        this.setState({
          userActionAgree: e.target.checked,
          userActionButton: userAction !== '' ? !e.target.checked : true
        });
      }
    }
    if (actionType === 'nurse') {
      if (nurseAction === 'SHIFT' && nurseHealthFacilityId === '') {
        this.setState({
          nurseFacilityError: 'Please select a facility.'
        });
      } else {
        this.setState({
          nurseActionAgree: e.target.checked,
          nurseActionButton: nurseAction !== '' ? !e.target.checked : true
        });
      }
    }
    if (actionType === 'attendant') {
      if (attendantAction === 'SHIFT' && attendantHealthFacilityId === '') {
        this.setState({
          attendantFacilityError: 'Please select a facility.'
        });
      } else {
        this.setState({
          attendantActionAgree: e.target.checked,
          attendantActionButton: attendantAction !== '' ? !e.target.checked : true
        });
      }
    }
    if (actionType === 'births') {
      if (birthsAction === 'SHIFT' && birthsHealthFacilityId === '') {
        this.setState({
          birthsFacilityError: 'Please select a facility.'
        });
      } else {
        this.setState({
          birthsActionAgree: e.target.checked,
          birthsActionButton: birthsAction !== '' ? !e.target.checked : true
        });
      }
    }
    if (actionType === 'deaths') {
      if (deathsAction === 'SHIFT' && deathsHealthFacilityId === '') {
        this.setState({
          deathsFacilityError: 'Please select a facility.'
        });
      } else {
        this.setState({
          deathsActionAgree: e.target.checked,
          deathsActionButton: deathsAction !== '' ? !e.target.checked : true
        });
      }
    }
  }

  handleCopy = (data) => {
    const textField = document.createElement('textarea');
    textField.value = JSON.stringify(data);
    document.body.appendChild(textField);
    setTimeout(() => {
      textField.select();
      document.execCommand('copy');
      textField.remove();
    }, 1000);
  }

  handleAction = (actionType) => {
    const { handleFacilityAsset, data } = this.props;
    const btnName = actionType + 'ButtonDisabled';
    this.setState({ [btnName]: true });
    setTimeout(() => {
      this.setState({ [btnName]: false });
    }, 5000);
    const {
      userHealthFacilityId,
      userAction,
      userActionAgree,
      nurseAction,
      nurseHealthFacilityId,
      nurseActionAgree,
      attendantAction,
      attendantHealthFacilityId,
      attendantActionAgree,
      birthsHealthFacilityId,
      birthsAction,
      birthsActionAgree,
      deathsHealthFacilityId,
      deathsAction,
      deathsActionAgree
    } = this.state;
    if (actionType === 'user') {
      if (userActionAgree && userHealthFacilityId !== '' && userAction === 'SHIFT') {
        handleFacilityAsset({
          currentFacilityId: data._id,
          newFacilityId: userHealthFacilityId,
          type: 'users',
          action: 'shift'
        });
      } else if (userActionAgree && userAction === 'DELETE') {
        handleFacilityAsset({
          currentFacilityId: data._id,
          newFacilityId: data._id,
          type: 'users',
          action: 'delete'
        });
      }
    }
    if (actionType === 'nurse') {
      if (nurseActionAgree && nurseHealthFacilityId !== '' && nurseAction === 'SHIFT') {
        handleFacilityAsset({
          currentFacilityId: data._id,
          newFacilityId: nurseHealthFacilityId,
          type: 'nurses',
          action: 'shift'
        });
      } else if (nurseActionAgree && nurseAction === 'DELETE') {
        handleFacilityAsset({
          currentFacilityId: data._id,
          newFacilityId: data._id,
          type: 'nurses',
          action: 'delete'
        });
      }
    }
    if (actionType === 'attendant') {
      if (attendantActionAgree && attendantHealthFacilityId !== '' && attendantAction === 'SHIFT') {
        handleFacilityAsset({
          currentFacilityId: data._id,
          newFacilityId: attendantHealthFacilityId,
          type: 'attendants',
          action: 'shift'
        });
      } else if (attendantActionAgree && attendantAction === 'DELETE') {
        handleFacilityAsset({
          currentFacilityId: data._id,
          type: 'attendants',
          newFacilityId: data._id,
          action: 'delete'
        });
      }
    }
    if (actionType === 'births') {
      if (birthsActionAgree && birthsHealthFacilityId !== '' && birthsAction === 'SHIFT') {
        handleFacilityAsset({
          currentFacilityId: data._id,
          newFacilityId: birthsHealthFacilityId,
          type: 'births',
          action: 'shift'
        });
      } else if (birthsActionAgree && birthsAction === 'DELETE') {
        handleFacilityAsset({
          currentFacilityId: data._id,
          newFacilityId: data._id,
          type: 'births',
          action: 'delete'
        });
      }
    }
    if (actionType === 'deaths') {
      if (deathsActionAgree && deathsHealthFacilityId !== '' && deathsAction === 'SHIFT') {
        handleFacilityAsset({
          currentFacilityId: data._id,
          newFacilityId: deathsHealthFacilityId,
          type: 'deaths',
          action: 'shift'
        });
      } else if (deathsActionAgree && deathsAction === 'DELETE') {
        handleFacilityAsset({
          currentFacilityId: data._id,
          newFacilityId: data._id,
          type: 'deaths',
          action: 'delete'
        });
      }
    }
  }

  handleClear = (actionType) => {
    if (actionType === 'user') {
      this.setState({
        userActionAgree: false,
        userAction: '',
        userHealthFacility: null,
        userHealthFacilityId: ''
      });
    } else if (actionType === 'nurse') {
      this.setState({
        nurseActionAgree: false,
        nurseAction: '',
        nurseHealthFacility: null,
        nurseHealthFacilityId: ''
      });
    } else if (actionType === 'attendant') {
      this.setState({
        attendantActionAgree: false,
        attendantAction: '',
        attendantHealthFacility: null,
        attendantHealthFacilityId: ''
      });
    } else if (actionType === 'birth') {
      this.setState({
        birthsActionAgree: false,
        birthsAction: '',
        birthsHealthFacility: null,
        birthsHealthFacilityId: ''
      });
    } else if (actionType === 'death') {
      this.setState({
        deathsActionAgree: false,
        deathsAction: '',
        deathsHealthFacility: null,
        deathsHealthFacilityId: ''
      });
    }
  }

  render() {
    const {
      classes, open, data, onDelete
    } = this.props;
    const {
      userAction,
      userActionAgree,
      userHealthFacility,
      userFacilityError,
      userActionButton,
      nurseAction,
      nurseActionAgree,
      nurseFacilityError,
      nurseActionButton,
      nurseHealthFacility,
      attendantAction,
      attendantActionAgree,
      attendantActionButton,
      attendantHealthFacility,
      attendantFacilityError,
      birthsActionAgree,
      birthsActionButton,
      birthsHealthFacility,
      birthsFacilityError,
      birthsAction,
      deathsAction,
      deathsFacilityError,
      deathsHealthFacility,
      deathsActionAgree,
      deathsActionButton,
      userButtonDisabled,
      nurseButtonDisabled,
      attendantButtonDisabled,
      birthsButtonDisabled,
      deathsButtonDisabled
    } = this.state;
    const healthFacilityListFormatted = [];
    const { hospitals } = data;
    if (hospitals) {
      hospitals.forEach((item) => {
        if (data._id !== item._id) {
          healthFacilityListFormatted.push({
            value: item._id,
            label: item.name
          });
        }
      });
    }
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleFormClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          className={classes.root}
        >
          <DialogContent>
            <DialogTitle id="scroll-dialog-title" className={classes.titleRoot}>
              Delete Facility
            </DialogTitle>
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
                  <span className={classes.label}>Facility Location Code:</span>
                  <span className={classes.value}>{data && data.locationCode}</span>
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
                  <span className={classes.label}>Number Of Births:</span>
                  <span className={classes.value}>{data && data.birthsCount}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Number Of Deaths:</span>
                  <span className={classes.value}>{data && data.deathsCount}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Number Of Nurses:</span>
                  <span className={classes.value}>{data && data.nurseCount}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Number Of Attendants:</span>
                  <span className={classes.value}>{data && data.attendantCount}</span>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Number of Users:</span>
                  <span className={classes.value}>{data && data.usersCount}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span className={classes.label}>Status:</span>
                  <span className={classes.value}>{data && data.status}</span>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <strong>Note: </strong>
Please move/delete all assets (users/births/deaths/nurses/attendants) of the facility before delete.
            <br />
            <br />
            <PapperBlock whiteBg hideBlockSection>
              <Typography variant="h5" className={Type.textLeft} gutterBottom>
                <span>Users</span>
              </Typography>
              <Divider style={{ width: '100%' }} />
              {data && data.user_logs && (data.user_logs).length
                ? (
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
                              <IconButton onClick={() => this.handleCopy(data.user_logs)}>
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
                              <IconButton onClick={() => this.handleCopy(item)}>
                                <FileCopyIcon />
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Grid>
                ) : null}
              {data && data.usersCount ? (
                <>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={3}>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel>Action</InputLabel>
                        <ThemeProvider theme={theme}>
                          <Select
                            value={userAction}
                            onChange={this.handleUserAction}
                            inputProps={{
                              name: 'action'
                            }}
                          >
                            <MenuItem value="SHIFT">Shift</MenuItem>
                            <MenuItem value="DELETE">Delete</MenuItem>
                          </Select>
                        </ThemeProvider>
                      </FormControl>
                    </Grid>
                    {userAction === 'SHIFT' ? (
                      <>
                        <Grid item xs={12} sm={4} style={{ paddingTop: '40px' }}>
                          <span className={classes.label}>From:</span>
                          <span className={classes.value}>{data && data.name}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <InputLabel>
                            <span className={classes.label} style={{ marginTop: '15px', display: 'block' }}>To:</span>
                          </InputLabel>
                          <FormControl fullWidth className={classes.formControlSelect} error={userHealthFacility === null}>
                            <ThemeProvider theme={theme}>
                              <ReactSelect
                                menuPosition="fixed"
                                isClearable
                                value={userHealthFacility}
                                name="user"
                                options={healthFacilityListFormatted}
                                onChange={(value, triggeredAction) => this.handleHealthFacilitySelect(value, triggeredAction)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                              />
                            </ThemeProvider>
                            <FormHelperText>{userFacilityError}</FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2} />
                      </>
                    ) : null}
                  </Grid>
                  <Grid container spacing={1} style={{ padding: '5px 15px' }}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={userActionAgree}
                          onChange={(e) => this.handleUserAgree(e, 'user')}
                          name="user"
                          color="primary"
                        />
                      )}
                      label="Agree"
                    />
                  </Grid>
                  <Grid container spacing={1} style={{ padding: '12px' }}>
                    <Button color="primary" variant="outlined" disabled={userButtonDisabled || userActionButton} onClick={() => this.handleAction('user')} style={{ marginRight: 15 }}>
                  Submit
                    </Button>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => this.handleClear('user')}
                    >
                  Clear
                    </Button>
                  </Grid>
                </>
              ) : null }
            </PapperBlock>
            <PapperBlock whiteBg hideBlockSection>
              <Typography variant="h5" className={Type.textLeft} gutterBottom>
                <span>Nurses</span>
              </Typography>
              <Divider style={{ width: '100%' }} />
              {data && data.nurse_logs && (data.nurse_logs).length
                ? (
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
                            <IconButton onClick={() => this.handleCopy(data.nurse_logs)}>
                              <FileCopyIcon />
                            </IconButton>
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
                              <IconButton onClick={() => this.handleCopy(item)}>
                                <FileCopyIcon />
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Grid>
                ) : null}
              {data && data.nurseCount ? (
                <>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={3}>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel>Action</InputLabel>
                        <ThemeProvider theme={theme}>
                          <Select
                            value={nurseAction}
                            onChange={this.handleNurseAction}
                            inputProps={{
                              name: 'action'
                            }}
                          >
                            <MenuItem value="SHIFT">Shift</MenuItem>
                            <MenuItem value="DELETE">Delete</MenuItem>
                          </Select>
                        </ThemeProvider>
                      </FormControl>
                    </Grid>
                    {nurseAction === 'SHIFT' ? (
                      <>
                        <Grid item xs={12} sm={4} style={{ paddingTop: '40px' }}>
                          <span className={classes.label}>From:</span>
                          <span className={classes.value}>{data && data.name}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <InputLabel>
                            <span className={classes.label} style={{ marginTop: '15px', display: 'block' }}>To</span>
                          </InputLabel>
                          <FormControl fullWidth className={classes.formControlSelect} error={nurseHealthFacility === null}>
                            <ThemeProvider theme={theme}>
                              <ReactSelect
                                menuPosition="fixed"
                                isClearable
                                value={nurseHealthFacility}
                                name="nurse"
                                options={healthFacilityListFormatted}
                                onChange={(value, triggeredAction) => this.handleHealthFacilitySelect(value, triggeredAction)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                              />
                            </ThemeProvider>
                            <FormHelperText>{nurseFacilityError}</FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2} />
                      </>
                    ) : null}
                  </Grid>
                  <Grid container spacing={1} style={{ padding: '5px 15px' }}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={nurseActionAgree}
                          onChange={(e) => this.handleUserAgree(e, 'nurse')}
                          name="user"
                          color="primary"
                        />
                      )}
                      label="Agree"
                    />
                  </Grid>
                  <Grid container spacing={1} style={{ padding: '12px' }}>
                    <Button color="primary" variant="outlined" disabled={nurseButtonDisabled || nurseActionButton} onClick={() => this.handleAction('nurse')} style={{ marginRight: 15 }}>
                  Submit
                    </Button>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => this.handleClear('nurse')}
                    >
                  Clear
                    </Button>
                  </Grid>
                </>
              ) : null }
            </PapperBlock>
            <PapperBlock whiteBg hideBlockSection>
              <Typography variant="h5" className={Type.textLeft} gutterBottom>
                <span>Attendants</span>
              </Typography>
              <Divider style={{ width: '100%' }} />
              {data && data.attendant_logs && (data.attendant_logs).length
                ? (
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
                            <IconButton onClick={() => this.handleCopy(data.attendant_logs)}>
                              <FileCopyIcon />
                            </IconButton>
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
                              <IconButton onClick={() => this.handleCopy(item)}>
                                <FileCopyIcon />
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Grid>
                ) : null}
              {data && data.attendantCount ? (
                <>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={3}>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel>Action</InputLabel>
                        <ThemeProvider theme={theme}>
                          <Select
                            value={attendantAction}
                            onChange={this.handleAttendantAction}
                            inputProps={{
                              name: 'action'
                            }}
                          >
                            <MenuItem value="SHIFT">Shift</MenuItem>
                            <MenuItem value="DELETE">Delete</MenuItem>
                          </Select>
                        </ThemeProvider>
                      </FormControl>
                    </Grid>
                    {attendantAction === 'SHIFT' ? (
                      <>
                        <Grid item xs={12} sm={4} style={{ paddingTop: '40px' }}>
                          <span className={classes.label}>From:</span>
                          <span className={classes.value}>{data && data.name}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <InputLabel>
                            <span className={classes.label} style={{ marginTop: '15px', display: 'block' }}>To</span>
                          </InputLabel>
                          <FormControl fullWidth className={classes.formControlSelect} error={attendantHealthFacility === null}>
                            <ThemeProvider theme={theme}>
                              <ReactSelect
                                menuPosition="fixed"
                                isClearable
                                value={attendantHealthFacility}
                                name="attendant"
                                options={healthFacilityListFormatted}
                                onChange={(value, triggeredAction) => this.handleHealthFacilitySelect(value, triggeredAction)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                              />
                            </ThemeProvider>
                            <FormHelperText>{attendantFacilityError}</FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2} />
                      </>
                    ) : null}
                  </Grid>
                  <Grid container spacing={1} style={{ padding: '5px 15px' }}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={attendantActionAgree}
                          onChange={(e) => this.handleUserAgree(e, 'attendant')}
                          name="user"
                          color="primary"
                        />
                      )}
                      label="Agree"
                    />
                  </Grid>
                  <Grid container spacing={1} style={{ padding: '12px' }}>
                    <Button color="primary" variant="outlined" disabled={attendantButtonDisabled || attendantActionButton} onClick={() => this.handleAction('attendant')} style={{ marginRight: 15 }}>
                  Submit
                    </Button>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => this.handleClear('attendant')}
                    >
                  Clear
                    </Button>
                  </Grid>
                </>
              ) : null }
            </PapperBlock>
            <PapperBlock whiteBg hideBlockSection>
              <Typography variant="h5" className={Type.textLeft} gutterBottom>
                <span>Births</span>
              </Typography>
              <Divider style={{ width: '100%' }} />
              {data && data.birth_logs && (data.birth_logs).length
                ? (
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
                            <IconButton onClick={() => this.handleCopy(data.birth_logs)}>
                              <FileCopyIcon />
                            </IconButton>
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
                              <IconButton onClick={() => this.handleCopy(item)}>
                                <FileCopyIcon />
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Grid>
                ) : null}
              {data && data.birthsCount ? (
                <>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={3}>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel>Action</InputLabel>
                        <ThemeProvider theme={theme}>
                          <Select
                            value={birthsAction}
                            onChange={this.handleBirthsAction}
                            inputProps={{
                              name: 'action'
                            }}
                          >
                            <MenuItem value="SHIFT">Shift</MenuItem>
                            <MenuItem value="DELETE">Delete</MenuItem>
                          </Select>
                        </ThemeProvider>
                      </FormControl>
                    </Grid>
                    {birthsAction === 'SHIFT' ? (
                      <>
                        <Grid item xs={12} sm={4} style={{ paddingTop: '40px' }}>
                          <span className={classes.label}>From:</span>
                          <span className={classes.value}>{data && data.name}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <InputLabel>
                            <span className={classes.label} style={{ marginTop: '15px', display: 'block' }}>To</span>
                          </InputLabel>
                          <FormControl fullWidth className={classes.formControlSelect} error={birthsHealthFacility === null}>
                            <ThemeProvider theme={theme}>
                              <ReactSelect
                                menuPosition="fixed"
                                isClearable
                                value={birthsHealthFacility}
                                name="births"
                                options={healthFacilityListFormatted}
                                onChange={(value, triggeredAction) => this.handleHealthFacilitySelect(value, triggeredAction)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                              />
                            </ThemeProvider>
                            <FormHelperText>{birthsFacilityError}</FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2} />
                      </>
                    ) : null}
                  </Grid>
                  <Grid container spacing={1} style={{ padding: '5px 15px' }}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={birthsActionAgree}
                          onChange={(e) => this.handleUserAgree(e, 'births')}
                          name="births"
                          color="primary"
                        />
                      )}
                      label="Agree"
                    />
                  </Grid>
                  <Grid container spacing={1} style={{ padding: '12px' }}>
                    <Button color="primary" variant="outlined" disabled={birthsButtonDisabled || birthsActionButton} onClick={() => this.handleAction('births')} style={{ marginRight: 15 }}>
                  Submit
                    </Button>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => this.handleClear('births')}
                    >
                  Clear
                    </Button>
                  </Grid>
                </>
              ) : null }
            </PapperBlock>
            <PapperBlock whiteBg hideBlockSection>
              <Typography variant="h5" className={Type.textLeft} gutterBottom>
                <span>Deaths</span>
              </Typography>
              <Divider style={{ width: '100%' }} />
              {data && data.death_logs && (data.death_logs).length
                ? (
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
                            <IconButton onClick={() => this.handleCopy(data.death_logs)}>
                              <FileCopyIcon />
                            </IconButton>
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
                              <IconButton onClick={() => this.handleCopy(item)}>
                                <FileCopyIcon />
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Grid>
                ) : null}
              {data && data.deathsCount ? (
                <>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={3}>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel>Action</InputLabel>
                        <ThemeProvider theme={theme}>
                          <Select
                            value={deathsAction}
                            onChange={this.handleDeathsAction}
                            inputProps={{
                              name: 'action'
                            }}
                          >
                            <MenuItem value="SHIFT">Shift</MenuItem>
                            <MenuItem value="DELETE">Delete</MenuItem>
                          </Select>
                        </ThemeProvider>
                      </FormControl>
                    </Grid>
                    {deathsAction === 'SHIFT' ? (
                      <>
                        <Grid item xs={12} sm={4} style={{ paddingTop: '40px' }}>
                          <span className={classes.label}>From:</span>
                          <span className={classes.value}>{data && data.name}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <InputLabel>
                            <span className={classes.label} style={{ marginTop: '15px', display: 'block' }}>To</span>
                          </InputLabel>
                          <FormControl fullWidth className={classes.formControlSelect} error={deathsHealthFacility === null}>
                            <ThemeProvider theme={theme}>
                              <ReactSelect
                                menuPosition="fixed"
                                isClearable
                                value={deathsHealthFacility}
                                name="deaths"
                                options={healthFacilityListFormatted}
                                onChange={(value, triggeredAction) => this.handleHealthFacilitySelect(value, triggeredAction)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                              />
                            </ThemeProvider>
                            <FormHelperText>{deathsFacilityError}</FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2} />
                      </>
                    ) : null}
                  </Grid>
                  <Grid container spacing={1} style={{ padding: '5px 15px' }}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={deathsActionAgree}
                          onChange={(e) => this.handleUserAgree(e, 'deaths')}
                          name="deaths"
                          color="primary"
                        />
                      )}
                      label="Agree"
                    />
                  </Grid>
                  <Grid container spacing={1} style={{ padding: '12px' }}>
                    <Button color="primary" variant="outlined" disabled={deathsButtonDisabled || deathsActionButton} onClick={() => this.handleAction('deaths')} style={{ marginRight: 15 }}>
                  Submit
                    </Button>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => this.handleClear('deaths')}
                    >
                  Clear
                    </Button>
                  </Grid>
                </>
              ) : null }
            </PapperBlock>
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
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => onDelete(data._id)} variant="contained" disabled={!(data && (data.nurseCount === 0 && data.attendantCount === 0 && data.birthsCount === 0 && data.deathsCount === 0 && data.usersCount === 0))}>
              DELETE FACILITY
            </Button>
            <Button color="primary" variant="outlined" onClick={() => { this.handleFormClose(); }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteFacilityModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleFacilityAsset: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

const DeleteFacilityModalMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteFacilityModal);

export default withStyles(styles)(DeleteFacilityModalMapped);
