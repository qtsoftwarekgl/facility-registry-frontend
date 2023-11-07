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
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectDropdown from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import _ from 'lodash';
import SuccessAlert from 'enl-components/Alerts/SuccessAlert';
import ErrorAlert from 'enl-components/Alerts/ErrorAlert';
import LoadingAlert from 'enl-components/Alerts/LoadingAlert';
import ConfirmationAlert from 'enl-components/Alerts/ConfirmationAlert';
import AsyncSelect from 'react-select/async';
import {
  FACILITY_CATEGORY_ERROR,
  PACKAGE_TYPE_ERROR
} from './constants';
import { createPackage, updatePackage, clearStore } from './packageAction';
import { getErrorMessage } from '../../../utils/helpers';
import { fetchFacilitytcList } from '../../FacilityTC/FacilitytcActions';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';

const styles = () => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 900,
      minWidth: 900
    },
    '& .MuiDialog-paperScrollPaper': {
      maxHeight: 'inherit'
    },
    '& .MuiDialogContent-root': {
      overflowY: 'initial'
    },
    '& .MuiDialog-paper': {
      overflowY: 'initial'
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

let formSubmit = false;

const initialState = {
  form: {
    categoryName: '',
    name: '',
    status: 'ACTIVE',
    categoryId: '',
    services: [],
  },
  error: {
    categoryName: '',
    name: '',
    status: '',
    services: '',
  },
  id: '',
  created: false,
  showScuccessModel: false,
  showErrorModel: false,
  showConfirmModel: false,
  alertMessage: '',
  confirmAlertMessage: '',
  packageCreatedStatus: '',
  packageUpdateStatus: '',
  showLoadingModel: false,
  hasUpdateHappened: false,
  ActiveServiceList: [],
};

class PackageCreateModel extends Component {
  constructor(props) {
    super(props);
    this.state = _.cloneDeep(initialState);
  }

  componentDidMount() {
    const { handleFetchFacilitytc } = this.props;
    handleFetchFacilitytc({ page: 1, limit: 500 });
    this.setState(initialState);
    this.getServices();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { handlePackageClearStore, handleFetchFacilitytc ,facilitytcList } = nextProps;
    let callUserList = false;
    if (callUserList) {
      handleFetchFacilitytc({ page, limit });
    }
    
    const updatedState = {};
    if (nextProps.packageCreatedStatus === 'ok' && nextProps.packageCreatedStatus !== prevState.packageCreatedStatus && !formSubmit) {
      formSubmit = true;
      updatedState.showScuccessModel = true;
      updatedState.showLoadingModel = false;
      updatedState.packageCreatedStatus = nextProps.packageCreatedStatus;
      updatedState.alertMessage = 'New package created successfully.';
    }

    if (nextProps.packageUpdateStatus === 'ok' && nextProps.packageUpdateStatus !== prevState.packageUpdateStatus && !formSubmit) {
      formSubmit = true;
      updatedState.showScuccessModel = true;
      updatedState.showLoadingModel = false;
      updatedState.packageUpdateStatus = nextProps.packageUpdateStatus;
      updatedState.alertMessage = 'Package updated successfully.';
    }

    if (nextProps.packageCreatedStatus === 'error') {
      formSubmit = true;
      updatedState.showErrorModel = true;
      updatedState.showLoadingModel = false;
      updatedState.packageCreatedStatus = nextProps.packageCreatedStatus;
      updatedState.alertMessage = getErrorMessage(nextProps.errorMessage);
      handlePackageClearStore();
    }

    if (nextProps.packageUpdateStatus === 'error') {
      formSubmit = true;
      updatedState.showErrorModel = true;
      updatedState.showLoadingModel = false;
      updatedState.packageUpdateStatus = nextProps.packageUpdateStatus;
      updatedState.alertMessage = getErrorMessage(nextProps.errorMessage);
      handlePackageClearStore();
    }

    if (!nextProps.editData._id) {
      updatedState.id = '';
    }
    if (nextProps.editData && nextProps.editData._id && nextProps.editData._id !== prevState.id && !formSubmit) {
      formSubmit = true;
      updatedState.hasUpdateHappened = false;
      const data = nextProps.editData;
      const category = facilitytcList.find(o => { return o._id === data.categoryId})
      updatedState.form = {
        categoryName: category.name,
        name: data.name,
        categoryId: data.categoryId,
        status: data.status,
        services: data.services && data.services.length ? data.services.map(item => ({value: item._id, label: item.name, status: item.status})) : []
      };
      updatedState.id = nextProps.editData._id;
    }
    return updatedState;
  }

  getServices = async () => {
    const stateCopy = _.cloneDeep(this.state);
    stateCopy.ActiveServiceList = [];
    stateCopy.serviceList = [];
    const res = await API.get(URL.SERVICE+'?status=ACTIVE&page=1&limit=100000')
    .then(async (response) => {
      const result = response.data;
      this.setState({serviceList: result});
      const data = await result.map(item => ({ value: item._id, label: item.name, status: item.status }));
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
    this.setState({ActiveServiceList: res});
  }

  handleChangeDropdown = (selected, actionType, name) => {
    const stateCopy = _.cloneDeep(this.state);
    const { action } = actionType;
    if (action) {
      stateCopy.hasUpdateHappened = true;
      this.setState(stateCopy);
    }
    const {serviceList} = this.state;
    const allServices = _.cloneDeep(serviceList);
    stateCopy.ActiveServiceList = allServices.length ? allServices.map(item => ({ value: item._id, label: item.name, status: item.status })) : [];
    if (name === 'services') {
      const stateCopy = _.cloneDeep(this.state);
      stateCopy.hasUpdateHappened = true;
      stateCopy.selectedPackages = selected;
      stateCopy.form[name] = selected;
      stateCopy.error[name] = '';
      this.setState(stateCopy);
      return selected;
    }
    this.setState(stateCopy);
  }

  handleDateChange = (name, date) => {
    const stateCopy = _.cloneDeep(this.state);
    if (date) {
      stateCopy.hasUpdateHappened = true;
      this.setState(stateCopy);
    }
    stateCopy.form[name] = date;
    stateCopy.error[name] = '';
    this.setState(stateCopy);
  }

  handleChange = event => {
    const stateCopy = _.cloneDeep(this.state);
    if (event.target.value) {
      stateCopy.hasUpdateHappened = true;
      this.setState(stateCopy);
    }
    const { value } = event.target;
    const { name } = event.target;
    if (name === 'categoryName' || name === 'name') {
      stateCopy.form[name] = value;
      stateCopy.error[name] = '';
      this.setState(stateCopy);
    }
  }

  handleChangeCategory = event => {
    const { facilitytcList } = this.props;
    const category = facilitytcList.find(o => { return o.name === event.target.value})
    const stateCopy = _.cloneDeep(this.state);
    if (event.target.value) {
      stateCopy.hasUpdateHappened = true;
      this.setState(stateCopy);
    }
    if(category){
      stateCopy.form.categoryId = category._id;
    }
    const { value } = event.target;
    const { name } = event.target;
    if (name === 'categoryName' || name === 'name') {
      stateCopy.form[name] = value;
      stateCopy.error[name] = '';
      this.setState(stateCopy);
    }
  }

  handleValidation = () => {
    let validation = true;
    const stateCopy = _.cloneDeep(this.state);
    const { form } = stateCopy;
    if (!form.categoryName || form.categoryName === '') {
      stateCopy.error.categoryName = FACILITY_CATEGORY_ERROR;
      validation = false;
    }
    if (!form.name || form.name === '') {
      stateCopy.error.name = PACKAGE_TYPE_ERROR;
      validation = false;
    }
    this.setState(stateCopy);
    return validation;
  }

  handleAlertClose = () => {
    const { onClose } = this.props;
    this.setState(initialState, () => {
      formSubmit = false;
      onClose();
    });
  }

  handleErrorAlertClose = () => {
    this.setState({ showErrorModel: false });
  }

  handleAlertConfirmationClose = () => {
    this.setState({ showConfirmModel: false });
  }

  handleConfirm = async () => {
    formSubmit = false;
    const packageData = _.cloneDeep(this.state);
    const { form } = packageData;
    form.services = form.services.map(item => ({_id: item.value, name: item.label, status: item.status}));
    this.setState({ showConfirmModel: false, showLoadingModel: true });
    const { id } = this.state;
    const { handleCreatePackage, handleUpdatePackage } = this.props;
    if (id) {
      handleUpdatePackage(id, form);
    } else {
      handleCreatePackage(form);
    }
  }

  handleSubmit = () => {
    const { id } = this.state;
    if (this.handleValidation()) {
      if (id) {
        this.setState({ showConfirmModel: true, confirmAlertMessage: 'Do you want to update this record' });
      } else {
        this.setState({ showConfirmModel: true, confirmAlertMessage: 'Do you want to add new package' });
      }
    }
  }

  handleFormClose = () => {
    const { onClose } = this.props;
    this.setState(initialState, () => {
      formSubmit = false;
      onClose();
    });
  }

  render() {
    const { classes, open, facilitytcList } = this.props;
    const {
      form,
      error,
      alertMessage,
      showScuccessModel,
      confirmAlertMessage,
      showConfirmModel,
      showErrorModel,
      id,
      showLoadingModel,
      hasUpdateHappened,
      ActiveServiceList
    } = this.state;
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
              {id ? 'Edit Packages' : 'Create Packages'}
            </DialogTitle>
            <form>
              <Grid container direction="row" spacing={6} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={4} sm={4}>
                  <FormControl className={classes.formControl} fullWidth error={error.categoryName}>
                    <ThemeProvider theme={theme}>
                      <InputLabel>
                        Facility Category
                        <span style={{ color: '#db3131' }}>*</span>
                      </InputLabel>
                      <SelectDropdown
                        value={form.categoryName}
                        onChange={this.handleChangeCategory}
                        inputProps={{
                          name: 'categoryName'
                        }}
                        required
                      >
                        {
                          facilitytcList.map((item)=> {
                            if(item.type === "FACILITY_CATEGORY" && item.status === "ACTIVE"){
                              return(
                                <MenuItem value={item.name}>{item.name}</MenuItem>
                              )
                            }
                          })
                        }
                      </SelectDropdown>
                    </ThemeProvider>
                    {error.categoryName ? (<FormHelperText>{error.categoryName}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <FormControl error={error.name} className={classes.formControl} fullWidth>
                    <ThemeProvider theme={theme}>
                      <TextField
                        id="filled-basic"
                        label="Package Name"
                        value={form.name}
                        required
                        inputProps={{
                          name: 'name'
                        }}
                        onChange={this.handleChange}
                      />
                    </ThemeProvider>
                    {error.name ? (<FormHelperText>{error.name}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={6} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={8}>
                    <InputLabel>
                      Services
                      <span style={{ color: '#db3131' }}>*</span>
                    </InputLabel>
                    <FormControl error={error.services} className={classes.formControl} fullWidth>
                      <AsyncSelect
                        cacheOptions
                        isClearable
                        isMulti
                        defaultOptions={ActiveServiceList}
                        value={form.services}
                        onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'services'); }}
                        inputProps={{
                          name: 'services'
                        }}
                        required
                      />
                      {error.services ? (<FormHelperText>{error.services}</FormHelperText>) : null}
                    </FormControl>
                  </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary" variant="contained" disabled={!hasUpdateHappened}>
              Submit
            </Button>
            <Button onClick={this.handleFormClose} color="primary" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>
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
          message={confirmAlertMessage}
          open={showConfirmModel}
          onClose={this.handleAlertConfirmationClose}
          onConfirm={this.handleConfirm}
          onCancel={this.handleAlertConfirmationClose}
        />
        <LoadingAlert
          open={showLoadingModel}
        />
      </div>
    );
  }
}

PackageCreateModel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  handleUpdatePackage: PropTypes.func.isRequired,
  handleCreatePackage: PropTypes.func.isRequired,
  facilitytcList: PropTypes.array,
};

PackageCreateModel.defaultProps = {
  facilitytcList: [],
};

const packageReducer = 'packageReducer';
const facilitytcReducer = 'facilitytcReducer';

const mapStateToProps = state => ({
  packageCreatedStatus: state.get(packageReducer) && state.get(packageReducer).packageCreatedStatus ? state.get(packageReducer).packageCreatedStatus : '',
  packageUpdateStatus: state.get(packageReducer) && state.get(packageReducer).packageUpdateStatus ? state.get(packageReducer).packageUpdateStatus : '',
  errorMessage: state.get(packageReducer) && state.get(packageReducer).errorMessage ? state.get(packageReducer).errorMessage : '',
  facilitytcList: state.get(facilitytcReducer) && state.get(facilitytcReducer).facilitytcList ? state.get(facilitytcReducer).facilitytcList : [],
});

const mapDispatchToProps = dispatch => ({
  handleCreatePackage: bindActionCreators(createPackage, dispatch),
  handleUpdatePackage: bindActionCreators(updatePackage, dispatch),
  handlePackageClearStore: bindActionCreators(clearStore, dispatch),
  handleFetchFacilitytc: bindActionCreators(fetchFacilitytcList, dispatch),
});

const PackageCreateModelMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageCreateModel);

export default withStyles(styles)(PackageCreateModelMapped);
