import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import SelectDropdown from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import _ from 'lodash';
import SuccessAlert from 'enl-components/Alerts/SuccessAlert';
import ErrorAlert from 'enl-components/Alerts/ErrorAlert';
import LoadingAlert from 'enl-components/Alerts/LoadingAlert';
import ConfirmationAlert from 'enl-components/Alerts/ConfirmationAlert';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';
import {
  FACILITY_NAME_ERROR,
  FACILITY_CODE_ERROR,
  FACILITY_PROVINCE_ERROR,
  FACILITY_DISTRICT_ERROR,
  FACILITY_SECTOR_ERROR,
  FACILITY_CELL_ERROR,
  FACILITY_VILLAGE_ERROR,
  FACILITY_CATEGORY_ERROR,
  FACILITY_TYPE_ERROR,
  FACILITY_PACKAGE_ERROR,
  FACILITY_SERVICE_ERROR
} from './constants';
import { fetchProvinces } from '../../App/CommonRedux/provinceActions';
import { fetchDistricts } from '../../App/CommonRedux/districtActions';
import { fetchSectors } from '../../App/CommonRedux/sectorActions';
import { fetchCells } from '../../App/CommonRedux/cellActions';
import { createHealthFacility, updateHealthFacility, clearStore } from './healthFacilityActions';
import { getErrorMessage } from '../../../utils/helpers';
import { REGEX, FACILITY_CATEGORY, FACILITY_TYPE, DATE_FORMAT } from '../../../lib/constants';
import moment from 'moment';
import { fetchFacilitytcList, fetchPackagesByCategoryList } from '../../FacilityTC/FacilitytcActions';
import { fetchService } from '../../Settings/Services/serviceActions';
import AsyncSelect from 'react-select/async';
import PackageServiceTable from '../../Pages/Table/PackageServiceTable';

const styles = () => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 1200,
      minWidth: 1200
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
    name: '',
    // code: '',
    province: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
    locationCode: '',
    category: '',
    packages: null,
    additionalServices: null,
    type: '',
    status: 'ACTIVE',
    latitude: 0.00,
    longitude: 0.00,
    facilityOpeningDate: null,
    facilityClosingDate: null,
    pobox: '',
    streetAddress: '',
    phonenumber: '',
    email: '',
  },
  error: {
    name: '',
    // code: '',
    province: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
    category: '',
    packages: '',
    additionalServices: '',
    type: '',
    locationCode: '',
    latitude: '',
    longitude: '',
    // facilityOpeningDate:'',
    // facilityClosingDate:'',
    // pobox:'',
    phonenumber: '',
    email: '',
  },
  id: '',
  created: false,
  showScuccessModel: false,
  showErrorModel: false,
  showConfirmModel: false,
  alertMessage: '',
  confirmAlertMessage: '',
  facilityCreatedStatus: '',
  facilityUpdateStatus: '',
  provinceDefaultValue: null,
  districtDefaultValue: null,
  sectorDefaultValue: null,
  cellDefaultValue: null,
  villageDefaultValue: null,
  showLoadingModel: false,
  districtsOptions: [],
  villageLoading: false,
  districtLoading: false,
  sectorLoading: false,
  cellLoading: false,
  hasUpdateHappened: false,
  facilityPackagesList: [],
  facilityServiceList: [],
  actualFacilityServiceList: [],
};

class HealthFacilityCreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = _.cloneDeep(initialState);
  }

  componentDidMount() {
    const {
      handleFetchProvinces,
      handleFetchFacilitytc,
      handleFetchService
    } = this.props;
    handleFetchProvinces();
    handleFetchFacilitytc({ page: 1, limit: 500 });
    handleFetchService({status: 'ACTIVE',page:'1',limit:'100000'});
    this.setState(initialState);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { handleHealthFacilityClearStore, handleFetchFacilitytc, facilitytcList, handleGetPackageByCategory, getPackagesByCategory, serviceList } = nextProps;
    const updatedState = {};
    const {
      page, limit
    } = prevState;
    let callUserList = false;
    if (callUserList) {
      handleFetchFacilitytc({ page, limit });
      
    }
    
    if (nextProps.facilityCreatedStatus === 'ok' && nextProps.facilityCreatedStatus !== prevState.facilityCreatedStatus && !formSubmit) {
      formSubmit = true;
      updatedState.showScuccessModel = true;
      updatedState.showLoadingModel = false;
      updatedState.facilityCreatedStatus = nextProps.facilityCreatedStatus;
      updatedState.alertMessage = 'New facility created successfully.';
    }
    
    if (nextProps.facilityUpdateStatus === 'ok' && nextProps.facilityUpdateStatus !== prevState.facilityUpdateStatus && !formSubmit) {
      formSubmit = true;
      updatedState.showScuccessModel = true;
      updatedState.showLoadingModel = false;
      updatedState.facilityUpdateStatus = nextProps.facilityUpdateStatus;
      updatedState.alertMessage = 'Facility updated successfully.';
    }
    
    if (nextProps.facilityCreatedStatus === 'error') {
      formSubmit = true;
      updatedState.showErrorModel = true;
      updatedState.showLoadingModel = false;
      updatedState.facilityCreatedStatus = nextProps.facilityCreatedStatus;
      updatedState.alertMessage = getErrorMessage(nextProps.errorMessage);
      handleHealthFacilityClearStore();
    }
    
    if (nextProps.facilityUpdateStatus === 'error') {
      formSubmit = true;
      updatedState.showErrorModel = true;
      updatedState.showLoadingModel = false;
      updatedState.facilityUpdateStatus = nextProps.facilityUpdateStatus;
      updatedState.alertMessage = getErrorMessage(nextProps.errorMessage);
      handleHealthFacilityClearStore();
    }
    
    if (!nextProps.editData._id) {
      updatedState.id = '';
    }
    if (nextProps.editData && nextProps.editData._id && nextProps.editData._id !== prevState.id && !formSubmit) {

      formSubmit = true;
      updatedState.hasUpdateHappened = false;
      const data = nextProps.editData;

      updatedState.form = {
        name: data.name,
        // code: data.code,
        locationCode: data.locationCode,
        latitude: data.latitude,
        longitude: data.longitude,
        status: data.status,
        province: data.provinceId ? data.provinceId._id : null,
        district: data.districtId ? data.districtId._id : null,
        sector: data.sectorId ? data.sectorId._id : null,
        cell: data.cellId ? data.cellId._id : null,
        village: data.villageId ? data.villageId._id : null,
        category: data.category,
        type: data.type,
        // facilityOpeningDate: moment(data.facilityClosingDate).format(DATE_FORMAT),
        // facilityClosingDate: moment(data.facilityClosingDate).format(DATE_FORMAT),
        facilityOpeningDate: data.facilityOpeningDate,
        facilityClosingDate: data.facilityClosingDate,
        pobox: data.pobox,
        streetAddress: data.streetAddress,
        phonenumber: data.phonenumber,
        email: data.email,
        packages: data.packages && data.packages.length ? data.packages.map(item => ({ value: item._id, label: item.name, services: item.services, categoryId: item.categoryId })) : data.packages,
        additionalServices: data.additionalServices && data.additionalServices.length ? data.additionalServices.map(item => ({value: item._id, label: item.name, status: item.status})) : []
      };
      if (data.category) {
        const category = facilitytcList.find(o => { return (o.name).toUpperCase === (data.category).toUpperCase})
        handleGetPackageByCategory({categoryId: category._id, status: 'ACTIVE'});
      }
      updatedState.provinceDefaultValue = data.provinceSelectedValue ? updatedState.provinceDefaultValue = { value: data.provinceSelectedValue._id, label: data.provinceSelectedValue.name } : '';
      updatedState.districtDefaultValue = data.districtSelectedValue ? updatedState.districtDefaultValue = { value: data.districtSelectedValue._id, label: data.districtSelectedValue.name } : '';
      updatedState.sectorDefaultValue = data.sectorSelectedValue ? updatedState.sectorDefaultValue = { value: data.sectorSelectedValue._id, label: data.sectorSelectedValue.name } : '';
      updatedState.cellDefaultValue = data.cellSelectedValue ? updatedState.cellDefaultValue = { value: data.cellSelectedValue._id, label: data.cellSelectedValue.name } : '';
      updatedState.villageDefaultValue = data.villageSelectedValue ? updatedState.villageDefaultValue = { value: data.villageSelectedValue._id, label: data.villageSelectedValue.name } : '';
      updatedState.id = nextProps.editData._id;
      updatedState.actualFacilityServiceList = data.additionalServices ? data.additionalServices : [];
      if (data.packages && data.packages.length) {
        const packages = data.packages.map(item => ({ value: item.value, label: item.label, services: item.services }));
        const selected_package_services = _.uniq(_.flatten(packages.map(item => item.services)));
        if (selected_package_services.length) {
          const filteredServices = _.differenceBy(serviceList, selected_package_services, '_id');
          updatedState.facilityServiceList = filteredServices.length ? filteredServices.map(item => ({ value: item._id, label: item.name, status: item.status })) : [];
        }
      } else if (serviceList && serviceList.length) {
        updatedState.facilityServiceList = serviceList.map(item => ({ value: item._id, label: item.name, status: item.status }));
      }
    } else {
      if (serviceList && serviceList.length) {
        updatedState.facilityServiceList = serviceList.map(item => ({ value: item._id, label: item.name, status: item.status }));
      }
    }
    return updatedState;
  }
  
  handleDateChange = (name, date) => {
    const stateCopy = _.cloneDeep(this.state);
    if (date) {
      stateCopy.hasUpdateHappened = true;
      this.setState(stateCopy);
    }
    console.log(name, date);
    stateCopy.form[name] = date;
    stateCopy.error[name] = '';
    this.setState(stateCopy);
  }

  handleChange = async (event) => {
    const {facilitytcList} = this.props;
    const stateCopy = _.cloneDeep(this.state);
    if (event.target.value) {
      stateCopy.hasUpdateHappened = true;
      this.setState(stateCopy);
    }
    const { value } = event.target;
    const { name } = event.target;
    const namePattern = new RegExp('^[a-zA-Z- ()]*$');
    const codePattern = new RegExp('^[0-9/]*$');
    if (name === 'name' && namePattern.test(value)) {
      stateCopy.form[name] = value;
      stateCopy.error[name] = '';
      this.setState(stateCopy);
    }
    // else if (name === 'code' && codePattern.test(value)) {
    //   stateCopy.form[name] = value;
    //   stateCopy.error[name] = '';
    //   this.setState(stateCopy);
    // }
    else if (name === 'category' || name === 'type' || name === "pobox" || name === "streetAddress" || name === "phonenumber" || name === "email") {
      if (name === 'category') {
        stateCopy.form.packages = [];
        stateCopy.facilityPackagesList = [];
        const category = facilitytcList.find(o => { return o.name === value})
        const data = await this.getPackagesBasedonCategory(category);
        stateCopy.form['packages'] = data ? data : [];
        stateCopy.hasUpdateHappened = true;
        stateCopy.selectedPackages = data ? data : [];
        console.log("data***", data)
        if (data && data.length) {
          const packages = data.map(item => ({ value: item.value, label: item.label, services: item.services }));
          const selected_package_services = _.uniq(_.flatten(packages.map(item => item.services)));
          if (selected_package_services.length) {
            const {actualFacilityServiceList} = this.state;
            const allServices = _.cloneDeep(actualFacilityServiceList);
            const filteredServices = _.differenceBy(allServices, selected_package_services, '_id');
            stateCopy.facilityServiceList = filteredServices.length ? filteredServices.map(item => ({ value: item._id, label: item.name, status: item.status })) : [];
          }
        }
      }
      stateCopy.form[name] = value;
      stateCopy.error[name] = '';
      this.setState(stateCopy);
    } else if (name === 'latitude' || name === 'longitude') {
      stateCopy.form[name] = value;
      stateCopy.error[name] = '';
      this.setState(stateCopy);
    }
  }

  getPackagesBasedonCategory = async (category) => {
    const data = [];
    const params = {categoryId: category._id, status: 'ACTIVE'};
    const res = await API.get(URL.GET_PACKAGES_BY_CATEGORY, { data: {}, params })
    .then(response => {
      const results = response.data;
      if (results.length) {
        results.forEach((item) => {
          data.push({
            id: item._id,
            value: item._id,
            label: item.name,
            status: item.status,
            services: item.services,
            categoryId: item.categoryId
          });
        });
        return data;
      }
    })
    .catch(() => []);
    this.setState({facilityPackagesList: res});
    return res;
  }

  handleChangeDropdown = (selected, actionType, name) => {
    const stateCopy = _.cloneDeep(this.state);
    const { action } = actionType;
    if (action) {
      stateCopy.hasUpdateHappened = true;
      this.setState(stateCopy);
    }
    if (name === 'village') {
      if (action === 'clear') {
        stateCopy.villageDefaultValue = null;
        stateCopy.form[name] = '';
        this.setState(stateCopy, () => { this.getVillage(); });
        stateCopy.form.locationCode = '';
      } else {
        stateCopy.form[name] = selected.value;
        stateCopy.error[name] = '';
        stateCopy.villageDefaultValue = selected;
        stateCopy.form.locationCode = selected.code;
        stateCopy.error.locationCode = '';
      }
    }
    if (name === 'province') {
      if (action === 'clear') {
        stateCopy.provinceDefaultValue = null;
        stateCopy.form[name] = '';
      } else {
        stateCopy.form[name] = selected.value;
        stateCopy.error[name] = '';
        stateCopy.districtLoading = true;
        stateCopy.provinceDefaultValue = selected;
        this.setState(stateCopy, () => { this.getDistrict(); });
      }
      stateCopy.districtDefaultValue = null;
      stateCopy.sectorDefaultValue = null;
      stateCopy.cellDefaultValue = null;
      stateCopy.villageDefaultValue = null;
      stateCopy.form.district = '';
      stateCopy.form.sector = '';
      stateCopy.form.cell = '';
      stateCopy.form.village = '';
      stateCopy.form.locationCode = '';
      stateCopy.districtsOptions = [];
      stateCopy.sectorsOptions = [];
      stateCopy.cellsOptions = [];
      stateCopy.villagesOptions = [];
    }
    if (name === 'district') {
      if (action === 'clear') {
        stateCopy.districtDefaultValue = null;
        stateCopy.form[name] = '';
        this.setState(stateCopy, () => { this.getDistrict(); });
      } else {
        stateCopy.form[name] = selected.value;
        stateCopy.error[name] = '';
        stateCopy.sectorLoading = true;
        stateCopy.districtDefaultValue = selected;
        this.setState(stateCopy, () => { this.getSector(); });
      }
      stateCopy.sectorDefaultValue = null;
      stateCopy.cellDefaultValue = null;
      stateCopy.villageDefaultValue = null;
      stateCopy.form.sector = '';
      stateCopy.form.cell = '';
      stateCopy.form.village = '';
      stateCopy.form.locationCode = '';
      stateCopy.sectorsOptions = [];
      stateCopy.cellsOptions = [];
      stateCopy.villagesOptions = [];
    }
    if (name === 'sector') {
      if (action === 'clear') {
        stateCopy.sectorDefaultValue = null;
        stateCopy.form[name] = '';
        this.setState(stateCopy, () => { this.getSector(); });
      } else {
        stateCopy.form[name] = selected.value;
        stateCopy.error[name] = '';
        stateCopy.cellLoading = true;
        stateCopy.sectorDefaultValue = selected;
        this.setState(stateCopy, () => { this.getCell(); });
      }
      stateCopy.cellDefaultValue = null;
      stateCopy.villageDefaultValue = null;
      stateCopy.form.cell = '';
      stateCopy.form.village = '';
      stateCopy.form.locationCode = '';
      stateCopy.cellsOptions = [];
      stateCopy.villagesOptions = [];
    }
    if (name === 'cell') {
      if (action === 'clear') {
        stateCopy.cellDefaultValue = null;
        stateCopy.form[name] = '';
        this.setState(stateCopy, () => { this.getCell(); });
      } else {
        stateCopy.form[name] = selected.value;
        stateCopy.error[name] = '';
        stateCopy.cellDefaultValue = selected;
        stateCopy.villageLoading = true;
        this.setState(stateCopy, () => { this.getVillage(); });
      }
      stateCopy.villageDefaultValue = null;
      stateCopy.form.village = '';
      stateCopy.form.locationCode = '';
      stateCopy.villagesOptions = [];
    }
    if (name === 'packages') {
      const stateCopy = _.cloneDeep(this.state);
      
      if (selected===null || !selected.length) {
        stateCopy.hasUpdateHappened = true;
        stateCopy.selectedPackages = selected;
        stateCopy.form[name] = [];
        stateCopy.error[name] = '';
      } else {
        const packages = selected.map(item => ({ value: item.value, label: item.label, services: item.services }));
        const selected_package_services = _.uniq(_.flatten(packages.map(item => item.services)));
        if (selected_package_services.length) {
          const {actualFacilityServiceList} = this.state;
          const allServices = _.cloneDeep(actualFacilityServiceList);
          const filteredServices = _.differenceBy(allServices, selected_package_services, '_id');
          stateCopy.facilityServiceList = filteredServices.length ? filteredServices.map(item => ({ value: item._id, label: item.name, status: item.status })) : [];
        }
        stateCopy.hasUpdateHappened = true;
        stateCopy.selectedPackages = selected;
        stateCopy.form[name] = packages;
        stateCopy.error[name] = '';
      }

      this.setState(stateCopy);
      return selected;
    }
    if (name === 'additionalServices') {
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

  getDistrict = async () => {
    const { form } = this.state;
    const params = { provinceId: form.province };
    const res = await API.get(URL.DISTRICTS_LIST, { data: {}, params })
      .then(async (response) => {
        const result = response.data;
        const data = await result.map(item => ({ value: item._id, label: item.name }));
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ districtsOptions: res, districtLoading: false });
  }

  getSector = async () => {
    const { form } = this.state;
    const params = { districtId: form.district };
    const res = await API.get(URL.SECTORS_LIST, { data: {}, params })
      .then(async (response) => {
        const result = response.data;
        const data = await result.map(item => ({ value: item._id, label: item.name }));
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ sectorsOptions: res, sectorLoading: false });
  }

  getCell = async () => {
    const { form } = this.state;
    const params = { sectorId: form.sector };
    const res = await API.get(URL.CELLS_LIST, { data: {}, params })
      .then(async (response) => {
        const result = response.data;
        const data = await result.map(item => ({ value: item._id, label: item.name }));
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ cellsOptions: res, cellLoading: false });
  }

  getVillage = async () => {
    const { form } = this.state;
    const params = { cellId: form.cell };
    const res = await API.get(URL.VILLAGES_LIST, { data: {}, params })
      .then(async (response) => {
        const result = response.data;
        const data = await result.map(item => ({ value: item._id, label: item.name, code: item.code }));
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ villagesOptions: res, villageLoading: false });
  }

  handleValidation = () => {
    let validation = true;
    const stateCopy = _.cloneDeep(this.state);
    const { form } = stateCopy;
    if (!form.name) {
      stateCopy.error.name = FACILITY_NAME_ERROR;
      validation = false;
    }
    if (!form.latitude) {
      stateCopy.error.latitude = 'Please enter a Facility latitude';
      validation = false;
    }
    if (!form.longitude) {
      stateCopy.error.longitude = 'Please enter a Facility longitude';
      validation = false;
    }
    if (!form.phonenumber) {
      stateCopy.error.phonenumber = 'Please enter valid Facility Phone number.';
      validation = false;
    }
    if (!form.email) {
      stateCopy.error.email = 'Please enter valid Facility Email';
      validation = false;
    }
    if (form.phonenumber && form.phonenumber !== '' && !REGEX.PHONE_WITH_COUNTRY_CODE.test(form.phonenumber)) {
      stateCopy.error.phonenumber = 'Please enter a valid phone number with country code. eg: +250xxxxxxx, +256xxxxxxx, +243xxxxxxx or +257xxxxxxx';
      validation = false;
    }
    if (form.email && form.email !== '' && !REGEX.EMAIL.test(form.email)) {
      validation = false;
      stateCopy.error.email = 'Please enter valid email.';
    }
    if (!form.province) {
      stateCopy.error.province = FACILITY_PROVINCE_ERROR;
      validation = false;
    }
    if (!form.district) {
      stateCopy.error.district = FACILITY_DISTRICT_ERROR;
      validation = false;
    }
    if (!form.sector) {
      stateCopy.error.sector = FACILITY_SECTOR_ERROR;
      validation = false;
    }
    if (!form.cell) {
      stateCopy.error.cell = FACILITY_CELL_ERROR;
      validation = false;
    }
    if (!form.village) {
      stateCopy.error.village = FACILITY_VILLAGE_ERROR;
      validation = false;
    }
    if (!form.category) {
      stateCopy.error.category = FACILITY_CATEGORY_ERROR;
      validation = false;
    }
    if (!form.type) {
      stateCopy.error.type = FACILITY_TYPE_ERROR;
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
    const facilityData = _.cloneDeep(this.state);
    const { form } = facilityData;
    if (form.packages && form.packages.length) {
      form.packages = form.packages.map(item => ({_id: item.value, name: item.label, services: item.services}));
    }
    if (form.additionalServices && form.additionalServices.length) {
      form.additionalServices = form.additionalServices.map(item => ({_id: item.value, name: item.label, status: item.status}));
    }
    this.setState({ showConfirmModel: false, showLoadingModel: true });
    const { id } = this.state;
    const { handleCreateFacility, handleUpdateHealthFacility } = this.props;
    if (id) {
      handleUpdateHealthFacility(id, form);
    } else {
      handleCreateFacility(form);
    }
  }

  handleSubmit = () => {
    const { id } = this.state;
    if (this.handleValidation()) {
      if (id) {
        this.setState({ showConfirmModel: true, confirmAlertMessage: 'Do you want to update this record' });
      } else {
        this.setState({ showConfirmModel: true, confirmAlertMessage: 'Do you want to add new facility' });
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
    const { classes, open, provinces, facilitytcList, getPackagesByCategory } = this.props;
    const provincesOptions = provinces ? provinces.map(item => ({ value: item._id, label: item.name })) : [];
    const {
      form,
      error,
      alertMessage,
      showScuccessModel,
      confirmAlertMessage,
      showConfirmModel,
      showErrorModel,
      id,
      provinceDefaultValue,
      districtDefaultValue,
      sectorDefaultValue,
      cellDefaultValue,
      villageDefaultValue,
      showLoadingModel,
      districtsOptions,
      sectorsOptions,
      cellsOptions,
      villagesOptions,
      districtLoading,
      sectorLoading,
      cellLoading,
      villageLoading,
      hasUpdateHappened,
      facilityServiceList,
      facilityPackagesList,
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
              {id ? 'Edit Facility' : 'Create Facility'}
            </DialogTitle>
            <form>
              <Grid container direction="row" spacing={6} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={4}>
                  <FormControl error={error.name} className={classes.formControl} fullWidth>
                    <ThemeProvider theme={theme}>
                      <TextField
                        id="filled-basic"
                        label="Facility Name"
                        value={form.name}
                        required
                        inputProps={{
                          name: 'name'
                        }}
                        onChange={this.handleChange}
                      />
                    </ThemeProvider>
                    {error.name ? (<FormHelperText>{FACILITY_NAME_ERROR}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <FormControl className={classes.formControl} fullWidth error={error.type}>
                    <ThemeProvider theme={theme}>
                      <InputLabel>
                        Facility Type
                        <span style={{ color: '#db3131' }}>*</span>
                      </InputLabel>
                      <SelectDropdown
                        value={form.type}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'type'
                        }}
                        required
                      >
                        {
                          facilitytcList.map((item)=> {
                            if(item.type === "FACILITY_TYPE" && item.status === "ACTIVE"){
                              return(
                                <MenuItem value={item.name}>{item.name}</MenuItem>
                              )
                            }
                          })
                        }
                      </SelectDropdown>
                    </ThemeProvider>
                    {error.type ? (<FormHelperText>{error.type}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <FormControl className={classes.formControl} fullWidth error={error.category}>
                    <ThemeProvider theme={theme}>
                      <InputLabel>
                        Facility Category
                        <span style={{ color: '#db3131' }}>*</span>
                      </InputLabel>
                      <SelectDropdown
                        value={form.category}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'category'
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
                    {error.category ? (<FormHelperText>{error.category}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={6} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={4}>
                  <FormControl error={error.latitude} className={classes.formControl} fullWidth>
                    <ThemeProvider theme={theme}>
                      <TextField
                        id="filled-basic"
                        type="number"
                        label="Facility Latitude"
                        value={form.latitude}
                        required
                        inputProps={{
                          name: 'latitude',
                          step: '.01'
                        }}
                        onChange={this.handleChange}
                      />
                    </ThemeProvider>
                    {error.latitude ? (<FormHelperText>{error.latitude}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl error={error.longitude} className={classes.formControl} fullWidth>
                    <ThemeProvider theme={theme}>
                      <TextField
                        id="filled-basic"
                        label="Facility longitude"
                        value={form.longitude}
                        required
                        type="number"
                        inputProps={{
                          name: 'longitude',
                          step: '.01'
                        }}
                        onChange={this.handleChange}
                      />
                    </ThemeProvider>
                    {error.longitude ? (<FormHelperText>{error.longitude}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={6} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={4}>
                  <InputLabel>
                    Resident Province
                    <span style={{ color: '#db3131' }}>*</span>
                  </InputLabel>
                  <FormControl error={error.province} className={classes.formControl} fullWidth>
                    <Select
                      cacheOptions
                      options={provincesOptions}
                      value={provinceDefaultValue}
                      isClearable
                      onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'province'); }}
                      maxMenuHeight={150}
                    />
                    {error.province ? (<FormHelperText>{FACILITY_PROVINCE_ERROR}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel>
                    Resident District
                    <span style={{ color: '#db3131' }}>*</span>
                  </InputLabel>
                  <FormControl error={error.district} className={classes.formControl} fullWidth>
                    <Select
                      cacheOptions
                      isClearable
                      isLoading={districtLoading}
                      value={districtDefaultValue}
                      options={districtsOptions}
                      maxMenuHeight={150}
                      menuPlacement="auto"
                      onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'district'); }}
                    />
                    {error.district ? (<FormHelperText>{FACILITY_DISTRICT_ERROR}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel>
                    Resident Sector
                    <span style={{ color: '#db3131' }}>*</span>
                  </InputLabel>
                  <FormControl error={error.sector} className={classes.formControl} fullWidth>
                    <Select
                      cacheOptions
                      isClearable
                      isLoading={sectorLoading}
                      options={sectorsOptions}
                      value={sectorDefaultValue}
                      maxMenuHeight={150}
                      menuPlacement="auto"
                      onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'sector'); }}
                    />
                    {error.sector ? (<FormHelperText>{FACILITY_SECTOR_ERROR}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={6} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={4}>
                  <InputLabel>
                    Resident Cell
                    <span style={{ color: '#db3131' }}>*</span>
                  </InputLabel>
                  <FormControl error={error.cell} className={classes.formControl} fullWidth>
                    <Select
                      cacheOptions
                      isClearable
                      isLoading={cellLoading}
                      options={cellsOptions}
                      value={cellDefaultValue}
                      maxMenuHeight={150}
                      menuPlacement="auto"
                      onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'cell'); }}
                    />
                    {error.cell ? (<FormHelperText>{FACILITY_CELL_ERROR}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel>
                    Resident Village
                    <span style={{ color: '#db3131' }}>*</span>
                  </InputLabel>
                  <FormControl error={error.village} className={classes.formControl} fullWidth>
                    <Select
                      cacheOptions
                      isClearable
                      isLoading={villageLoading}
                      options={villagesOptions}
                      value={villageDefaultValue}
                      maxMenuHeight={150}
                      menuPlacement="auto"
                      onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'village'); }}
                    />
                    {error.village ? (<FormHelperText>{FACILITY_VILLAGE_ERROR}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl error={error.streetAddress} className={classes.formControl} fullWidth>
                    <ThemeProvider theme={theme}>
                      <TextField
                        id="filled-basic"
                        label="Street Address"
                        value={form.streetAddress}
                        // required
                        inputProps={{
                          name: 'streetAddress'
                        }}
                        onChange={this.handleChange}
                      />
                    </ThemeProvider>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={6} style={{ paddingLeft: 20, paddingRight: 20 }}>
              <Grid item xs={4}>
                  <FormControl error={error.pobox} className={classes.formControl} fullWidth>
                    <ThemeProvider theme={theme}>
                      <TextField
                        id="filled-basic"
                        label="P.O.Box"
                        value={form.pobox}
                        // required
                        inputProps={{
                          name: 'pobox'
                        }}
                        onChange={this.handleChange}
                      />
                    </ThemeProvider>
                    {/* {error.pobox ? (<FormHelperText>{error.pobox}</FormHelperText>) : null} */}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControlInput} fullWidth>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <ThemeProvider theme={theme}>
                        <DatePicker
                          label="Facility Opening Date"
                          format={DATE_FORMAT}
                          value={form.facilityOpeningDate ? form.facilityOpeningDate : null}
                          onChange={(date) => this.handleDateChange('facilityOpeningDate', date)}
                          animateYearScrolling={false}
                          autoOk
                        />
                      </ThemeProvider>
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
                {id ? <Grid item xs={4}>
                  <FormControl className={classes.formControlInput}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <ThemeProvider theme={theme}>
                        <DatePicker
                          label="Facility Closing Date"
                          format={DATE_FORMAT}
                          value={form.facilityClosingDate ? form.facilityClosingDate : null}
                          onChange={(date) => this.handleDateChange('facilityClosingDate', date)}
                          animateYearScrolling={false}
                          // maxDate={form.facilityClosingDate || new Date()}
                          autoOk
                        />
                      </ThemeProvider>
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid> : null}
              </Grid>
              <Grid container direction="row" spacing={6} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={4}>
                  <FormControl error={error.phonenumber} className={classes.formControl} fullWidth>
                    <ThemeProvider theme={theme}>
                      <TextField
                        id="filled-basic"
                        label="Phone number"
                        required
                        minlength="10"
                        maxlength="15"
                        value={form.phonenumber}
                        inputProps={{
                          name: 'phonenumber'
                        }}
                        onChange={this.handleChange}
                      />
                    </ThemeProvider>
                    {error.phonenumber ? (<FormHelperText>{error.phonenumber}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl error={error.email} className={classes.formControl} fullWidth>
                    <ThemeProvider theme={theme}>
                      <TextField
                        id="filled-basic"
                        label="Email"
                        value={form.email}
                        required
                        inputProps={{
                          name: 'email'
                        }}
                        onChange={this.handleChange}
                      />
                    </ThemeProvider>
                    {error.email ? (<FormHelperText>{error.email}</FormHelperText>) : null}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={6} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={4}>
                  <InputLabel>
                    Packages
                  </InputLabel>
                  <FormControl error={error.packages} className={classes.formControl} fullWidth>
                    <AsyncSelect
                      cacheOptions
                      isClearable
                      isMulti
                      defaultOptions={facilityPackagesList}
                      value={form.packages}
                      onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'packages'); }}
                      inputProps={{
                        name: 'packages'
                      }}
                    />
                    {/* {error.packages ? (<FormHelperText>{error.packages}</FormHelperText>) : null} */}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel>
                    Additional Services
                  </InputLabel>
                  <FormControl error={error.additionalServices} className={classes.formControl} fullWidth>
                    <AsyncSelect
                      cacheOptions
                      isClearable
                      isMulti
                      defaultOptions={facilityServiceList}
                      value={form.additionalServices}
                      onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'additionalServices'); }}
                      inputProps={{
                        name: 'additionalServices'
                      }}
                    />
                    {/* {error.additionalServices ? (<FormHelperText>{error.additionalServices}</FormHelperText>) : null} */}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={6} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={12}>
                  {form.packages ? <PackageServiceTable data={form}/> : null}
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

HealthFacilityCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleFetchProvinces: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  handleUpdateHealthFacility: PropTypes.func.isRequired,
  handleCreateFacility: PropTypes.func.isRequired,
  provinces: PropTypes.array,
  facilitytcList: PropTypes.array,
};

HealthFacilityCreateModal.defaultProps = {
  provinces: [],
  districts: [],
  sectors: [],
  cells: [],
  facilitytcList: [],
};

const provinceReducer = 'provinceReducer';
const districtReducer = 'districtReducer';
const sectorReducer = 'sectorReducer';
const cellReducer = 'cellReducer';
const healthFacilityReducer = 'healthFacilityCrudReducer';
const facilitytcReducer = 'facilitytcReducer';
const serviceReducer = 'serviceReducer';

const mapStateToProps = state => ({
  provinces: state.get(provinceReducer) && state.get(provinceReducer).provinces ? state.get(provinceReducer).provinces : [],
  districts: state.get(districtReducer) && state.get(districtReducer).districts ? state.get(districtReducer).districts : [],
  sectors: state.get(sectorReducer) && state.get(sectorReducer).sectors ? state.get(sectorReducer).sectors : [],
  cells: state.get(cellReducer) && state.get(cellReducer).cells ? state.get(cellReducer).cells : [],
  facilitytcList: state.get(facilitytcReducer) && state.get(facilitytcReducer).facilitytcList ? state.get(facilitytcReducer).facilitytcList : [],
  facilityCreatedStatus: state.get(healthFacilityReducer) && state.get(healthFacilityReducer).facilityCreatedStatus ? state.get(healthFacilityReducer).facilityCreatedStatus : '',
  facilityUpdateStatus: state.get(healthFacilityReducer) && state.get(healthFacilityReducer).facilityUpdateStatus ? state.get(healthFacilityReducer).facilityUpdateStatus : '',
  errorMessage: state.get(healthFacilityReducer) && state.get(healthFacilityReducer).errorMessage ? state.get(healthFacilityReducer).errorMessage : '',
  getPackagesByCategory: state.get(facilitytcReducer) && state.get(facilitytcReducer).getPAckagesByCategoryList ? state.get(facilitytcReducer).getPAckagesByCategoryList : [],
  serviceList: state.get(serviceReducer) && state.get(serviceReducer).serviceData ? state.get(serviceReducer).serviceData : [],
});

const mapDispatchToProps = dispatch => ({
  handleFetchProvinces: bindActionCreators(fetchProvinces, dispatch),
  handleFetchDistricts: bindActionCreators(fetchDistricts, dispatch),
  handleFetchSectors: bindActionCreators(fetchSectors, dispatch),
  handleFetchCells: bindActionCreators(fetchCells, dispatch),
  handleCreateFacility: bindActionCreators(createHealthFacility, dispatch),
  handleUpdateHealthFacility: bindActionCreators(updateHealthFacility, dispatch),
  handleHealthFacilityClearStore: bindActionCreators(clearStore, dispatch),
  handleFetchFacilitytc: bindActionCreators(fetchFacilitytcList, dispatch),
  handleGetPackageByCategory: bindActionCreators(fetchPackagesByCategoryList, dispatch),
  handleFetchService: bindActionCreators(fetchService, dispatch)
});

const HealthFacilityCreateMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(HealthFacilityCreateModal);

export default withStyles(styles)(HealthFacilityCreateMapped);
