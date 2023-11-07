import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { lightBlue } from '@material-ui/core/colors';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SuccessAlert from 'enl-components/Alerts/SuccessAlert';
import ConfirmationAlert from 'enl-components/Alerts/ConfirmationAlert';
import ErrorAlert from 'enl-components/Alerts/ErrorAlert';
import LoadingAlert from 'enl-components/Alerts/LoadingAlert';
import Typography from '@material-ui/core/Typography';
import Type from 'enl-styles/Typography.scss';
import Divider from '@material-ui/core/Divider';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import EnhancedTable from '../../Pages/Table/EnhancedTable';
import styles from './user-list-jss';
import UserViewModal from './UserViewModal';
import { fetchUserList } from './userListActions';
import { updateUser, updateUserClear } from './updateUserActions';
import StatusChangeAlert from '../../../components/Alerts/StatusChangeAlert';
import {
  ROLES, PAGE, LIMIT
} from '../../../lib/constants';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';
import {
  getErrorMessage
} from '../../../utils/helpers';
import { userProfile } from '../../Login/authActions';

const headCells = [
  {
    id: 'createdAt', numeric: false, show: true, label: 'Created Date-Time', isDate: true
  },
  {
    id: 'surName', numeric: false, show: true, label: 'Surname'
  },
  {
    id: 'postNames', numeric: false, show: true, label: 'Post-Names'
  },
  {
    id: 'phoneNumber', numeric: false, show: true, label: 'Telephone'
  },
  {
    id: 'email', numeric: false, show: true, label: 'Email'
  },
  {
    id: 'facilityType', numeric: false, show: true, label: 'Facility Type', isCommunity: true
  },
  {
    id: 'facilityName', numeric: false, show: true, label: 'Facility Name'
  },
  {
    id: 'displayFacilityArea', numeric: false, show: true, label: 'Facility Area'
  },
  {
    id: 'role', numeric: false, show: true, label: 'Role'
  },
  {
    id: 'ministry', numeric: false, show: false, label: 'Ministry'
  },
  {
    id: 'status', numeric: false, show: true, label: 'Status', statusType: 'switch'
  },
  {
    id: 'actions', numeric: false, show: true, isAction: true, label: 'Actions', actionType: 'edit_view_delete'
  }
];

const theme = createMuiTheme({
  palette: {
    primary: lightBlue
  },
  spacing: 1
});

const STATUS_UPDATE = 'STATUS_UPDATE';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertMessage: '',
      showErrorAlert: false,
      errorAlertMessage: '',
      page: PAGE,
      limit: LIMIT,
      showUserViewModal: false,
      showActionModal: false,
      actionData: null,
      surname: '',
      email: '',
      role: '',
      ministry: '',
      facilityName: '',
      status: '',
      statusConfirmAlert: false,
      selectedItemId: '',
      selectedStatusValue: false,
      selectedUserName: '',
      updateType: '',
      toolTipOpen: false,
      showStatusAlert: false,
      deactivateReason: '',
      showScuccessModel: false,
      selectedIds: []
    };
    this.handleAction = this.handleAction.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { handleFetchUserList } = this.props;
    const { page, limit } = this.state;
    handleFetchUserList({ page, limit });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const updatedState = {};
    const {
      userUpdated,
      handleUpdateUserClear,
      handleFetchUserList,
      errorMessage,
      profileData, handleUserProfile
    } = nextProps;
    const {
      selectedUserName, selectedStatusValue, updateType, page, limit
    } = prevState;
    let callUserList = false;
    if (updateType === STATUS_UPDATE) {
      if (userUpdated === 'ok') {
        updatedState.showAlert = true;
        updatedState.alertMessage = `${selectedUserName} status updated to ${selectedStatusValue ? 'Active' : 'Inactive'}`;
        updatedState.updateType = '';
        handleUpdateUserClear();
        callUserList = true;
      } else if (userUpdated === 'error') {
        updatedState.showErrorAlert = true;
        updatedState.errorAlertMessage = getErrorMessage(errorMessage);
        updatedState.updateType = '';
        handleUpdateUserClear();
      }
    }

    if (callUserList) {
      const {
        surname,
        email,
        role,
        ministry,
        facilityName,
        status
      } = prevState;
      const params = {
        page,
        limit,
        name: surname,
        email,
        role,
        facilityName,
        ministry: (ministry && ministry !== 'All') ? ministry : '',
        status: (status && status !== 'All') ? status : ''
      };
      handleFetchUserList(params);
    }
    if (!profileData) {
      handleUserProfile();
    } else {
      updatedState.profileData = profileData;
      // console.log(profileData.role)
      if (profileData.role === 'VIEWER') {
        headCells[10].show = false; // Status
        headCells[11].actionType = 'view'; // Actions
      }
    }
    return updatedState;
  }

  handleAction = (action, rowData) => {
    // const { userList } = this.props;
    const { history } = this.props;
    if (action === 'edit') {
      history.push(`/edit-user/${rowData._id}`);
    } else if (action === 'view') {
      this.setState({
        showUserViewModal: true,
        actionData: rowData
      });
    }
  }

  exportCsv = async (headers) => {
    let params = {};
    const {
      surname,
      email,
      role,
      facilityName,
      ministry,
      status
    } = this.state;
    if (surname || email || role || ministry || facilityName || status) {
      params = {
        name: surname,
        email,
        facilityName,
        role: (role && role !== 'All') ? role : '',
        ministry: (ministry && ministry !== 'All') ? ministry : '',
        status: (status && status !== 'All') ? status : ''
      };
    }
    params.skipPagination = true;
    const res = await API.get(URL.USERS, { data: {}, params })
      .then(async (response) => response.data)
      .catch((error) => {
        console.log(error);
      });
    const heading = [];
    const keys = [];
    headers.forEach((row) => {
      if (row.show && row.id !== 'actions') {
        heading.push(row.label);
        keys.push(row.id);
      }
    });
    let csv = heading.join(',');
    csv += '\n';
    res.forEach((row) => {
      const formatData = [];
      keys.forEach(key => {
        if (row[key]) {
          formatData.push(row[key]);
        } else {
          formatData.push('N/A');
        }
      });
      csv += formatData.join(',');
      csv += '\n';
    });
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = `users-${+new Date()}.csv`;
    hiddenElement.click();
  }

  handleAlertClose = () => {
    this.setState({
      showAlert: false,
      alertMessage: '',
      showActionModal: false
    });
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleStatusChange = (rowData, value) => {
    const statusChange = value === true ? this.setState({showStatusAlert: false, statusConfirmAlert: true}) : this.setState({showStatusAlert: true, statusConfirmAlert: false})
    this.setState({
      selectedItemId: rowData._id,
      selectedStatusValue: value,
      statusConfirmAlert: true,
      statusChange,
      selectedUserName: `${rowData.surName} ${rowData.postNames}`
    });
  }

  handleOnStatusConfirm = () => {
    const { handleUpdateUser } = this.props;
    const { selectedItemId, selectedStatusValue, deactivateReason } = this.state;
    const status = selectedStatusValue ? 'ACTIVE' : 'INACTIVE';
    handleUpdateUser(selectedItemId, { status, deactivateReason });
    this.setState({
      deactivateReason: '',
      statusConfirmAlert: false,
      updateType: STATUS_UPDATE
    });
  }

  handleConfirmRevert = (reason) => {
    this.setState({
      deactivateReason: reason,
      statusConfirmAlert: true,
      showStatusAlert: false,
    });
  }

  handleStatusAlertClose = () => {
    this.setState({
      showStatusAlert: false,
      deactivateReason: ''
    });
  }

  handlePageChange = (newPage) => {
    const { handleFetchUserList } = this.props;
    const {
      limit,
      surname,
      email,
      role,
      facilityName,
      ministry,
      status
    } = this.state;
    const params = {
      page: newPage,
      limit,
      name: surname,
      email,
      facilityName,
      role: (role && role !== 'All') ? role : '',
      ministry: (ministry && ministry !== 'All') ? ministry : '',
      status: (status && status !== 'All') ? status : ''
    };
    handleFetchUserList(params);
    this.setState({
      page: newPage
    });
  }

  handleSearch = () => {
    const { handleFetchUserList } = this.props;
    const {
      surname,
      email,
      role,
      facilityName,
      ministry,
      status
    } = this.state;
    if (surname || email || role || ministry || facilityName || status) {
      this.setState({
        page: PAGE,
        limit: LIMIT
      });
      const params = {
        page: PAGE,
        limit: LIMIT,
        name: surname,
        email,
        facilityName,
        role: (role && role !== 'All') ? role : '',
        ministry: (ministry && ministry !== 'All') ? ministry : '',
        status: (status && status !== 'All') ? status : ''
      };
      handleFetchUserList(params);
    } else {
      this.setState({ toolTipOpen: true });
    }
  }

  handleTooltipClose = () => {
    this.setState({ toolTipOpen: false });
  };

  handleClearFilters = () => {
    this.setState({
      surname: '',
      email: '',
      role: '',
      facilityName: '',
      ministry: '',
      status: ''
    });
    const { handleFetchUserList } = this.props;
    const { page, limit } = this.state;
    handleFetchUserList({ page, limit });
  }

  render() {
    const {
      classes, userList, count, loading, updateLoading, profileData
    } = this.props;
    const title = brand.name;
    const description = brand.desc;
    const {
      showAlert,
      alertMessage,
      showErrorAlert,
      errorAlertMessage,
      page,
      showUserViewModal,
      actionData,
      surname,
      email,
      facilityName,
      role,
      status,
      statusConfirmAlert,
      selectedStatusValue,
      selectedUserName,
      toolTipOpen,
      showStatusAlert
    } = this.state;

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock whiteBg hideBlockSection>
          <Typography variant="h5" className={Type.textLeft} gutterBottom>
            <span>User List</span>
            {profileData && profileData.role !== 'VIEWER' ? (
              <Button
                href="/create-user"
                className={classes.buttonAddNew}
                variant="contained"
                color="secondary"
                size="small"
              >
              Add New
                {' '}
                <AddIcon />
              </Button>
            ) : null}
          </Typography>
          <Divider style={{ width: '100%' }} />
          <Grid container spacing={1}>
            <Grid container item xs={12} sm={9}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControlInput} style={{ paddingRight: 8, paddingLeft: 8 }}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        className={classes.margin}
                        label="Name"
                        value={surname}
                        onChange={this.handleChange('surname')}
                      />
                    </ThemeProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControlInput} style={{ paddingRight: 8, paddingLeft: 8 }}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        className={classes.margin}
                        label="Email"
                        value={email}
                        onChange={this.handleChange('email')}
                      />
                    </ThemeProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControlInput} style={{ paddingRight: 8, paddingLeft: 8 }}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        className={classes.margin}
                        label="Facility Name"
                        value={facilityName}
                        onChange={this.handleChange('facilityName')}
                      />
                    </ThemeProvider>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="role-simple">Role</InputLabel>
                    <ThemeProvider theme={theme}>
                      <Select
                        value={role}
                        onChange={this.handleChange('role')}
                        inputProps={{
                          name: 'role',
                          id: 'role-simple',
                        }}
                      >
                        <MenuItem value="All">All</MenuItem>
                        {
                          ROLES.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
                        }
                      </Select>
                    </ThemeProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="status-simple">Status</InputLabel>
                    <ThemeProvider theme={theme}>
                      <Select
                        value={status}
                        onChange={this.handleChange('status')}
                        inputProps={{
                          name: 'status',
                          id: 'status-simple',
                        }}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="INACTIVE">Inactive</MenuItem>
                        {/* <MenuItem value="DELETED">Deleted</MenuItem> */}
                      </Select>
                    </ThemeProvider>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={3} alignContent="center">
              <Grid item xs={12} sm={12} align="center" className={classes.marginY1}>
                <ClickAwayListener onClickAway={this.handleTooltipClose}>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    placement="top"
                    onClose={this.handleTooltipClose}
                    open={toolTipOpen}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Please enter a value for one filter and try"
                  >
                    <Button
                      onClick={() => this.handleSearch()}
                      style={{ width: 100 }}
                      variant="contained"
                      color="primary"
                      className={classes.buttonSearch}
                      size="small"
                    >
                      Search
                    </Button>
                  </Tooltip>
                </ClickAwayListener>
              </Grid>
              <Grid item xs={12} sm={12} align="center" className={classes.marginY1}>
                <Button
                  style={{ padding: 5, marginTop: 10, width: 100 }}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => this.handleClearFilters()}
                  className={classes.buttonLink}
                >
                  <span>Clear Filters</span>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </PapperBlock>
        <div>
          <EnhancedTable
            multiselect
            loading={loading}
            tableTitle="Users"
            page={page}
            headCells={headCells}
            rows={userList}
            totalData={count || 0}
            onPageChange={(newPage) => this.handlePageChange(newPage)}
            onActionClicked={(action, rowData) => this.handleAction(action, rowData)}
            handleStatusChange={(rowData, value) => this.handleStatusChange(rowData, value)}
            download={(headers) => this.exportCsv(headers)}
          />
        </div>
        <UserViewModal
          open={showUserViewModal}
          onClose={() => {
            this.setState({
              showUserViewModal: false
            });
          }}
          userData={actionData}
        />
        <SuccessAlert
          message={alertMessage}
          open={showAlert}
          onClose={this.handleAlertClose}
        />
        <ConfirmationAlert
          message={`Are you sure want to update ${selectedUserName} status to ${selectedStatusValue ? 'Active' : 'Inactive'} ?`}
          open={statusConfirmAlert}
          onClose={() => {
            this.setState({
              selectedItemId: '',
              selectedStatusValue: '',
              deactivateReason:'',
              statusConfirmAlert: false
            });
          }}
          onConfirm={() => this.handleOnStatusConfirm()}
          onCancel={() => {
            this.setState({
              selectedItemId: '',
              selectedStatusValue: '',
              deactivateReason:'',
              statusConfirmAlert: false,
            });
          }}
        />
         <StatusChangeAlert
          message="Please enter the reason to change the status"
          open={showStatusAlert}
          onClose={this.handleStatusAlertClose}
          onConfirm={(reason) => this.handleConfirmRevert(reason)}
          onCancel={this.handleStatusAlertClose}
        />
        <ErrorAlert
          message={errorAlertMessage}
          open={showErrorAlert}
          onClose={() => {
            this.setState({
              showErrorAlert: false,
              errorAlertMessage: ''
            });
          }}
        />
        <LoadingAlert
          open={updateLoading}
        />
      </div>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFetchUserList: PropTypes.func.isRequired,
  userList: PropTypes.array,
  count: PropTypes.number,
  handleUpdateUser: PropTypes.func.isRequired,
  userUpdated: PropTypes.string, // eslint-disable-line
  handleUpdateUserClear: PropTypes.func.isRequired, // eslint-disable-line
  loading: PropTypes.bool,
  updateLoading: PropTypes.bool,
  history: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  userList: [],
  count: 0,
  userUpdated: '',
  updateMessage: '',
  loading: false,
  updateLoading: false,
};

const userListReducer = 'userListReducer';
const updateUserReducer = 'updateUserReducer';
const adminAuthReducer = 'adminAuthReducer';
const mapStateToProps = state => ({
  loading: state.get(userListReducer) && state.get(userListReducer).loading ? state.get(userListReducer).loading : false,
  userList: state.get(userListReducer) && state.get(userListReducer).userList ? state.get(userListReducer).userList : [],
  count: state.get(userListReducer) && state.get(userListReducer).count ? state.get(userListReducer).count : 0,
  userUpdated: state.get(updateUserReducer) && state.get(updateUserReducer).userUpdated ? state.get(updateUserReducer).userUpdated : '',
  updateMessage: state.get(updateUserReducer) && state.get(updateUserReducer).updateMessage ? state.get(updateUserReducer).updateMessage : '',
  errorMessage: state.get(updateUserReducer) && state.get(updateUserReducer).errorMessage ? state.get(updateUserReducer).errorMessage : '',
  updateLoading: state.get(updateUserReducer) && state.get(updateUserReducer).loading,
  profileData: state.get(adminAuthReducer) && state.get(adminAuthReducer).profileData ? state.get(adminAuthReducer).profileData : null
});

const mapDispatchToProps = dispatch => ({
  handleFetchUserList: bindActionCreators(fetchUserList, dispatch),
  handleUpdateUser: bindActionCreators(updateUser, dispatch),
  handleUpdateUserClear: bindActionCreators(updateUserClear, dispatch),
  handleUserProfile: bindActionCreators(userProfile, dispatch)
});

const UserListMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);

export default withStyles(styles)(UserListMapped);
