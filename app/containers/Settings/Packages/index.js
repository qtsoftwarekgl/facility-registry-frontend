import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import { PapperBlock } from 'enl-components';
import Button from '@material-ui/core/Button';
import SuccessAlert from 'enl-components/Alerts/SuccessAlert';
import ConfirmationAlert from 'enl-components/Alerts/ConfirmationAlert';
import ErrorAlert from 'enl-components/Alerts/ErrorAlert';
import LoadingAlert from 'enl-components/Alerts/LoadingAlert';
import Typography from '@material-ui/core/Typography';
import Type from 'enl-styles/Typography.scss';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import EnhancedTable from '../../Pages/Table/EnhancedTable';
import styles from './package-list-jss';
import PackageCreateModel from './packageCreateModel';
import {
  fetchPackage, deletePackage, clearStore, packageUpdateStatus
} from './packageAction';
import ViewModal from './packageViewModel';
import { userProfile } from '../../Login/authActions';

const headCells = [
  {
    id: 'categoryName', numeric: false, show: true, label: 'Category Name'
  },
  {
    id: 'name', numeric: false, show: true, label: 'Package Name'
  },
  {
    id: 'servicesNames', numeric: false, show: true, label: 'Services Name'
  },
  {
    id: 'status', numeric: false, show: true, label: 'Status', statusType: 'switch'
  },
  {
    id: 'actions', numeric: false, show: true, isAction: true, label: 'Actions', actionType: 'edit_delete_view'
  },
];

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
});

class Packages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      showScuccessModel: false,
      showConfirmAlert: false,
      confirmAlertMessage: '',
      alertMessage: '',
      editData: {},
      packageDeleteStatus: '',
      packageList: [],
      showViewModel: false,
      showDeleteModal: false,
      viewData: {},
      loading: false,
      updateType: '',
      status: '',
      statusConfirmAlert: false,
      selectedItemId: '',
      selectedStatusValue: false,
      showLoadingModel: false,
      showErrorModel: false,
      toolTipOpen: false,
      name: ''
    };
  }

  componentDidMount() {
    const {
      handleFetchPackage
    } = this.props;
    handleFetchPackage({page:'1',limit:'20'});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const updatedState = {};
    const {
      statusUpdateStatus, handleClearStore, handleFetchPackage, profileData, handleUserProfile
    } = nextProps;
    const {
      selectedStatusValue, updateType,
    } = prevState;
    let callList = false;
    if (updateType === 'STATUS_UPDATE_PACKAGE') {
      if (statusUpdateStatus === 'ok') {
        updatedState.showLoadingModel = false;
        updatedState.showScuccessModel = true;
        updatedState.alertMessage = `Status updated to ${selectedStatusValue ? 'activate' : 'de-activate'}`;
        updatedState.updateType = '';
        handleClearStore();
        callList = true;
      } else if (statusUpdateStatus === 'error') {
        updatedState.showLoadingModel = false;
        updatedState.showErrorModel = true;
        updatedState.alertMessage = `Unable to update status to ${selectedStatusValue ? 'activate' : 'de-activate'}`;
        updatedState.updateType = '';
        handleClearStore();
        callList = true;
      }
    }
    if (nextProps.packageDeleteStatus === 'ok' && nextProps.packageDeleteStatus !== prevState.packageDeleteStatus) {
      updatedState.showLoadingModel = false;
      updatedState.showScuccessModel = true;
      callList = true;
      updatedState.packageDeleteStatus = nextProps.packageDeleteStatus;
      updatedState.alertMessage = 'package deleted successfully.';
    }
    if (nextProps.packageData !== prevState.packageList) {
      updatedState.packageList = nextProps.packageData;
    }
    if (nextProps.loading !== prevState.loading) {
      updatedState.loading = nextProps.loading;
    }
    if (callList) {
      const {
        page,
        limit,
        name,
        status
      } = prevState;
      const params = {
        page,
        limit,
        name,
        status
      };
      handleFetchPackage(params);
    }
    if (!profileData) {
      handleUserProfile();
    } else {
      updatedState.profileData = profileData;
      if (profileData.role === 'VIEWER') {
        headCells[9].show = false; // Status
        headCells[10].actionType = 'view'; // Actions
      }
    }
    return updatedState;
  }

  handleOpenCreateModel = () => {
    this.setState({
      showCreateModel: true
    });
  }

  clearFilter = () => {
    this.setState({
      name: '',
      status: ''
    });
    const {
      handleFetchPackage
    } = this.props;
    handleFetchPackage();
  }

  handleAction = async (action, currentrecord) => {
    let rowData = currentrecord;
    if (action === 'edit') {      
      this.setState({
        showCreateModel: true,
        editData: rowData,
        tableAction: action
      });      
    } else if(action === 'view'){
      this.setState({
        showViewModel: true,
        viewData: rowData,
        tableAction: action
      });
    } else if (action === 'delete') {
       this.setState({
        showConfirmAlert: true,
        confirmAlertMessage: 'Do you want to delete this record?',
        id: rowData._id
      });
      }    
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAlertClose = () => {
    this.setState({
      showScuccessModel: false
    });
  }

  formatData = (data) => {
    const res = [];
    if (!_.isEmpty(data)) {
      _.each(data, (row) => {
        const services = row.services.length ? row.services.map(o => o.name) : []
        const servicesNames = services.toString();
        let servicesList = []
        services.forEach((item,i) => {
          servicesList.push(<p>{(i+1) + ' . ' + item}</p>)
        })
        res.push({
              _id: row._id,
              name: row.name,
              services: row.services,
              servicesNames: servicesNames,
              servicesList: servicesList,
              categoryId: row.categoryId,
              status: row.status,
              categoryName: row.categoryName
        });
  });
    }
    return res;
  }

  handleSearch = () => {
    const {
      name,
      status
    } = this.state;
    const params = {};
    if (name) {
      params.name = name;
    }
    if (status) {
      params.status = status !== 'All' ? status : '';
    }
    if (!_.isEmpty(params)) {
      const { handleFetchPackage } = this.props;
      handleFetchPackage(params);
    } else {
      this.setState({ toolTipOpen: true });
    }
  }

  handlePageChange = (newPage) => {
    const { handleFetchPackage } = this.props;
    const {
      name,
      status
    } = this.state;
    const params = {
      limit: 20,
      page: newPage
    };
    if (name) {
      params.name = name;
    }
    if (status) {
      params.status = status !== 'All' ? status : '';
    }
    handleFetchPackage(params);
    this.setState({
      page: newPage
    });
  }

  handleStatusChange = (rowData, value) => {
    this.setState({
      selectedItemId: rowData._id,
      selectedStatusValue: value,
      statusConfirmAlert: true
    });
  }

  handleOnStatusConfirm = () => {
    const { handleUpdateStatus } = this.props;
    const { selectedItemId, selectedStatusValue } = this.state;
    const status = selectedStatusValue ? 'ACTIVE' : 'IN_ACTIVE';
    handleUpdateStatus(selectedItemId, { status });
    this.setState({
      showLoadingModel: true,
      statusConfirmAlert: false,
      updateType: 'STATUS_UPDATE_PACKAGE'
    });
  }

  handleErrorAlertClose = () => {
    this.setState({ showErrorModel: false, alertMessage: '' });
  }

  handleConfirm = async () => {
    const { handleDeletePackage } = this.props;
    const { id } = this.state;
    this.setState({
      showConfirmAlert: false,
      showLoadingModel: true,
    });
    handleDeletePackage(id);
  }

  handleTooltipClose = () => {
    this.setState({ toolTipOpen: false });
  };

  handleAlertConfirmationClose = () => {
    this.setState({ showConfirmAlert: false });
  }

  render() {
    const {
      classes, packageData, count, profileData
    } = this.props;
    const {
      page,
      showCreateModel,
      name,
      status,
      alertMessage,
      showScuccessModel,
      confirmAlertMessage,
      showViewModel,
      showConfirmAlert,
      viewData,
      editData,
      loading,
      selectedStatusValue,
      statusConfirmAlert,
      showLoadingModel,
      showErrorModel,
      tableAction,
      toolTipOpen,
    } = this.state;
   
    return (
      <div>
        <PapperBlock whiteBg hideBlockSection>
          <Typography variant="h5" className={Type.textLeft} gutterBottom>
            <span>Packages</span>
            {profileData && profileData.role !== 'VIEWER' ? (
              <Button
                onClick={this.handleOpenCreateModel}
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
                  <FormControl className={classes.formControl}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        className={classes.margin}
                        label="Package Name"
                        value={name}
                        inputProps={{
                          name: 'name'
                        }}
                        onChange={this.handleChange}
                      />
                    </ThemeProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Status</InputLabel>
                    <ThemeProvider theme={theme}>
                      <Select
                        value={status}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'status'
                        }}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="IN_ACTIVE">Inactive</MenuItem>
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
                      <span style={{ textTransform: 'capitalize' }}>Search</span>
                    </Button>
                  </Tooltip>
                </ClickAwayListener>
              </Grid>
              <Grid item xs={12} sm={12} align="center" className={classes.marginY1} m={0}>
                <Button
                  style={{ padding: 5, marginTop: 10, width: 100 }}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  className={classes.buttonLink}
                  onClick={this.clearFilter}
                >
                  Clear Filters
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </PapperBlock>
        <div>
          <EnhancedTable
            tableTitle="Packages"
            page={page}
            headCells={headCells}
            rows={this.formatData(packageData)}
            totalData={count}
            onPageChange={(newPage) => this.handlePageChange(newPage)}
            loading={loading}
            onActionClicked={(action, rowData) => this.handleAction(action, rowData)}
            handleStatusChange={(rowData, value) => this.handleStatusChange(rowData, value)}
            download={(headers) => this.exportCsv(headers)}
            profileData={profileData}
          />
        </div>
        <PackageCreateModel
          open={showCreateModel}
          editData={editData}
          onClose={() => {
            this.setState({
              showCreateModel: false,
              editData: {}
            });
            const { handleFetchPackage } = this.props;
            const params = {};
            if (name) {
              params.name = name;
            }
            if (status) {
              params.status = status !== 'All' ? status : '';
            }
            if (!_.isEmpty(params)) {
              handleFetchPackage(params);
            } else {
              handleFetchPackage();
            }
          }}
        />
        <SuccessAlert
          message={alertMessage}
          open={showScuccessModel}
          onClose={this.handleAlertClose}
        />
        <ErrorAlert
          message={alertMessage}
          open={showErrorModel}
          onClose={this.handleErrorAlertClose}
        />
        <ConfirmationAlert
          message={`Are you do you want to ${selectedStatusValue ? 'activate' : 'de-activate'} this package`}
          open={statusConfirmAlert}
          onClose={() => {
            this.setState({
              selectedItemId: '',
              selectedStatusValue: '',
              statusConfirmAlert: false
            });
          }}
          onConfirm={() => this.handleOnStatusConfirm()}
          onCancel={() => {
            this.setState({
              selectedItemId: '',
              selectedStatusValue: '',
              statusConfirmAlert: false,
            });
          }}
        />
         <ConfirmationAlert
            message={confirmAlertMessage}
            open={showConfirmAlert}
            onClose={this.handleAlertConfirmationClose}
            onConfirm={this.handleConfirm}
            onCancel={this.handleAlertConfirmationClose}
          />
        <ViewModal
          open={showViewModel}
          tableAction={tableAction}
          onClose={() => {
            this.setState({ showViewModel: false, viewData: {} });
          }}
          data={viewData}
        />
        <LoadingAlert
          open={showLoadingModel}
        />
      </div>
    );
  }
}

Packages.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFetchPackage: PropTypes.func.isRequired,
  handleDeletePackage: PropTypes.func.isRequired,
  handleUpdateStatus: PropTypes.func.isRequired,
  packageData: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
};

const packageReducer = 'packageReducer';
const adminAuthReducer = 'adminAuthReducer';
const mapStateToProps = state => ({
  packageData: state.get(packageReducer) && state.get(packageReducer).packageData ? state.get(packageReducer).packageData : [],
  count: state.get(packageReducer) && state.get(packageReducer).count ? state.get(packageReducer).count : 0,
  packageDeleteStatus: state.get(packageReducer) && state.get(packageReducer).packageDeleteStatus ? state.get(packageReducer).packageDeleteStatus : '',
  loading: state.get(packageReducer) && state.get(packageReducer).loading ? state.get(packageReducer).loading : false,
  packageUpdateStatus: state.get(packageReducer) && state.get(packageReducer).packageUpdateStatus ? state.get(packageReducer).packageUpdateStatus : '',
  statusUpdateStatus: state.get(packageReducer) && state.get(packageReducer).statusUpdateStatus ? state.get(packageReducer).statusUpdateStatus :'',
  profileData: state.get(adminAuthReducer) && state.get(adminAuthReducer).profileData ? state.get(adminAuthReducer).profileData : null
});

const mapDispatchToProps = dispatch => ({
  handleFetchPackage: bindActionCreators(fetchPackage, dispatch),
  handleDeletePackage: bindActionCreators(deletePackage, dispatch),
  handleUpdateStatus: bindActionCreators(packageUpdateStatus,dispatch),
  handleClearStore: bindActionCreators(clearStore, dispatch),
  handleUserProfile: bindActionCreators(userProfile, dispatch)
});

const PackagesMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Packages);

export default withStyles(styles)(PackagesMap);
