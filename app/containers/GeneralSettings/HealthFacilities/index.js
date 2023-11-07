import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { lightBlue } from '@material-ui/core/colors';
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
import AddIcon from '@material-ui/icons/Add';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import EnhancedTable from '../../Pages/Table/EnhancedTable';
import styles from './user-list-jss';
import HealtFacilityCreateModel from './HealthFacilityCreateModel';
import {
  fetchHealthFacilities, deleteFacility, updateHealthFacility, clearStore, facilityAsset
} from './healthFacilityActions';
import ViewModal from './FacilityViewModel';
import DeleteFacilityModal from './DeleteFacilityModal';
import UploadModel from './UploadModel';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';
import * as XLSX from "xlsx";
import { userProfile } from '../../Login/authActions';
import moment from 'moment';
import StatusChangeAlert from '../../../components/Alerts/StatusChangeAlert';
import { DATE_FORMAT, FACILITY_TYPE } from '../../../lib/constants';
import MomentUtils from '@date-io/moment';
import ReactSelect from 'react-select';
import SelectDropdown from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { fetchProvinces } from '../../App/CommonRedux/provinceActions';
import { fetchDistricts } from '../../App/CommonRedux/districtActions';
import { fetchSectors } from '../../App/CommonRedux/sectorActions';
import { fetchCells } from '../../App/CommonRedux/cellActions';
import { fetchVillages } from '../../App/CommonRedux/villageActions';
const headCells = [
  {
    id: 'name', numeric: false, show: true, label: 'Facility Name'
  },
  {
    id: 'code', numeric: false, show: true, label: 'Facility Code'
  },
  {
    id: 'province', numeric: false, show: true, label: 'Province'
  },
  {
    id: 'district', numeric: false, show: true, label: 'District'
  },
  {
    id: 'sector', numeric: false, show: true, label: 'Sector'
  },
  {
    id: 'cell', numeric: false, show: true, label: 'Cell'
  },
  {
    id: 'village', numeric: false, show: true, label: 'Village'
  },
  // {
  //   id: 'locationCode', numeric: false, show: true, label: 'Facility location code'
  // },
  {
    id: 'category', numeric: false, show: false, label: 'Facility Category'
  },
  {
    id: 'type', numeric: false, show: false, label: 'Facility Type'
  },
  {
    id: 'facilityOpeningDate', numeric: false, show: true, label: 'Facility Opening Date', isDate: true
  },
  {
    id: 'facilityClosingDate', numeric: false, show: true, label: 'Facility Closing Date', isDate: true
  },
  {
    id: 'pobox', numeric: false, show: true, label: 'P.O.Box'
  },
  {
    id: 'phonenumber', numeric: false, show: true, label: 'Phone Number'
  },
  {
    id: 'email', numeric: false, show: true, label: 'Email'
  },
  {
    id: 'status', numeric: false, show: true, label: 'Status', statusType: 'switch'
  },
  {
    id: 'actions', numeric: false, show: true, isAction: true, label: 'Actions', actionType: 'edit_view_delete'
  },
];

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
});

class HealthFacilities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      showStatusAlert: false,
      deactivateReason: '',
      showScuccessModel: false,
      alertMessage: '',
      editData: {},
      facilityDeleteStatus: '',
      facilityList: [],
      showViewModel: false,
      showDeleteModal: false,
      viewData: {},
      loading: false,
      updateType: '',
      status: '',
      statusConfirmAlert: false,
      showUploadModel: false,
      selectedItemId: '',
      selectedStatusValue: false,
      showLoadingModel: false,
      showErrorModel: false,
      toolTipOpen: false,
      opening_from_date:null,
      opening_to_date:null,
      type:'',
      province: '',
      district: '',
      sector: '',
      cell: '',
      village: '',
      provinceDefaultValue: null,
      districtDefaultValue: null,
      sectorDefaultValue: null,
      cellDefaultValue: null,
      villageDefaultValue: null,      
      handlefetchFacilityDetails: this.handlefetchFacilityDetails.bind(this)
    };
  }

  componentDidMount() {
    const {
      handleFetchFacilities, handleFetchProvinces
    } = this.props;
    handleFetchProvinces();
    handleFetchFacilities({page:'1',limit:'20'});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const updatedState = {};
    const {
      facilityUpdateStatus, handleClearStore, handleFetchFacilities, facilityAssetStatus, profileData, handleUserProfile
    } = nextProps;
    const {
      selectedStatusValue, updateType, viewData, handlefetchFacilityDetails
    } = prevState;
    let callList = false;
    if (updateType === 'STATUS_UPDATE') {
      if (facilityUpdateStatus === 'ok') {
        updatedState.showLoadingModel = false;
        updatedState.showScuccessModel = true;
        updatedState.alertMessage = `Status updated to ${selectedStatusValue ? 'Active' : 'Inactive'}`;
        updatedState.updateType = '';
        handleClearStore();
        callList = true;
      } else if (facilityUpdateStatus === 'error') {
        updatedState.showLoadingModel = false;
        updatedState.showErrorModel = true;
        updatedState.alertMessage = `Unable to update status to ${selectedStatusValue ? 'Active' : 'Inactive'}`;
        updatedState.updateType = '';
        handleClearStore();
        callList = true;
      }
    }
    if (facilityAssetStatus === 'ok') {
      handleClearStore();
      handlefetchFacilityDetails(viewData);
    }
    if (nextProps.facilityDeleteStatus === 'ok' && nextProps.facilityDeleteStatus !== prevState.facilityDeleteStatus) {
      updatedState.showLoadingModel = false;
      updatedState.showScuccessModel = true;
      callList = true;
      updatedState.facilityDeleteStatus = nextProps.facilityDeleteStatus;
      updatedState.alertMessage = 'Health facility deleted successfully.';
    }
    if (nextProps.facilities !== prevState.facilityList) {
      updatedState.facilityList = nextProps.facilities;
    }
    if (nextProps.loading !== prevState.loading) {
      updatedState.loading = nextProps.loading;
    }
    if (callList) {
      const {
        page,
        limit,
        name,
        code,
        locationCode,
        status
      } = prevState;
      const params = {
        page,
        limit,
        name,
        code,
        locationCode,
        status
      };
      handleFetchFacilities(params);
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

  handlefetchFacilityDetails = async (rowData) => {
    const params = {
      facilityId: rowData._id
    };
    const res = await API.get(URL.HEALTHFACILITY_COUNT, { params })
      .then(async (response) => response.data)
      .catch((error) => {
        console.log(error);
      });
    rowData.province = res.province ? res.province.name : '';
    rowData.district = res.district ? res.district.name : '';
    rowData.sector = res.sector ? res.sector.name : '';
    rowData.cell = res.cell ? res.cell.name : '';
    rowData.village = res.village ? res.village.name : '';
    rowData.category = res.category ? res.category : '';
    rowData.type = res.type ? res.type : '';
    rowData.facilityOpeningDate = res.facilityOpeningDate ? res.facilityOpeningDate : '';
    rowData.facilityClosingDate = res.facilityClosingDate ? res.facilityClosingDate : '';
    rowData.pobox = res.pobox ? res.pobox : '';
    rowData.phonenumber = res.phonenumber ? res.phonenumber : '';
    rowData.email = res.email ? res.email : '';
    rowData.streetAddress = res.streetAddress ? res.streetAddress : '';
    rowData.deactivateReason = res.deactivateReason ? res.deactivateReason : '';
    // rowData.attendantCount = res.no_of_attendants ? res.no_of_attendants : 0;
    // rowData.nurseCount = res.no_of_nurses ? res.no_of_nurses : 0;
    // rowData.birthsCount = res.no_of_births ? res.no_of_births : 0;
    // rowData.deathsCount = res.no_of_deaths ? res.no_of_deaths : 0;
    // rowData.usersCount = res.no_of_active_users ? res.no_of_active_users : 0;
    // const al = res.facility && res.facility.asset_logs ? res.facility.asset_logs : [];
    // rowData.user_logs = _.filter(al, a => a.type === 'users');
    // rowData.nurse_logs = _.filter(al, a => a.type === 'nurses');
    // rowData.attendant_logs = _.filter(al, a => a.type === 'attendants');
    // rowData.birth_logs = _.filter(al, a => a.type === 'births');
    // rowData.death_logs = _.filter(al, a => a.type === 'deaths');
    // rowData.logs = res.facility.logs || [];
    this.setState({ viewData: rowData });
    return rowData;
  }

  handleAction = async (action, currentrecord) => {
    let rowData = currentrecord;
    if (action === 'edit') {
      this.setState({
        showCreateModel: true,
        editData: rowData,
        tableAction: action
      });
    } else if (action === 'view') {
      this.setState({
        showViewModel: true,
        viewData: rowData,
        tableAction: action
      });
    }
    // else if (action === 'view' || action === 'delete') {
    //   rowData = await this.handlefetchFacilityDetails(rowData);
    //   if (action === 'delete') {
    //     const hospitals = await API.get(`${URL.HEALTH_FACILITIES_LIST}?fields=name,cityName,status`)
    //       .then(async (response) => response.data)
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //     rowData.hospitals = hospitals || [];
    //     this.setState({
    //       showDeleteModal: true,
    //       viewData: rowData,
    //       tableAction: action
    //     });
    //   } else {
    //     this.setState({
    //       showViewModel: true,
    //       viewData: rowData,
    //       tableAction: action
    //     });
    //   }
    // }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  clearFilter = () => {
    this.setState({
      name: '',
      code: '',
      locationCode: '',
      status: '',
      type: '',
      opening_from_date: null,
      opening_to_date: null,
      provinceDefaultValue: null,
      districtDefaultValue: null,
      sectorDefaultValue: null,
      cellDefaultValue: null,
      villageDefaultValue: null,
      province: '',
      district: '',
      sector: '',
      cell: '',
      village: ''
    });
    const {
      handleFetchFacilities
    } = this.props;
    handleFetchFacilities();
  }

  handleConfirm = (id) => {
    const { handleDeleteFacility } = this.props;

    this.setState({
      showDeleteModal: false,
      showLoadingModel: true,
      updateType: 'STATUS_DELETE'
    });
    handleDeleteFacility(id);
  }

  handleAlertClose = () => {
    this.setState({
      showScuccessModel: false
    });
  }

  importCsv = async () => {
    this.setState({ showUploadModel: true });
  }

  exportCsv = async () => {
    let Heading = [['name', 'latitude', 'longitude', 'category', 'type',  'province', 'district', 'sector','cell', 'village', 'facilityOpeningDate', 'facilityClosingDate', 'streetAddress', 'pobox', 'phonenumber', 'email', 'status']];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, Heading);
    XLSX.utils.sheet_add_json(ws, [], { origin: 'A2', skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'template.xlsx');
  }


  formatData = (data) => {
    const res = [];
    if (!_.isEmpty(data)) {
      _.each(data, (row) => {
        res.push({
          _id: row._id,
          name: row.name,
          status: row.status,
          code: row.code,
          locationCode: row.locationCode,
          latitude: row.latitude,
          longitude: row.longitude,
          category: row.category,
          type: row.type,
          province: row.province ? row.province.name : '',
          provinceId: row.province,
          district: row.district ? row.district.name : '',
          districtId: row.district,
          sector: row.sector ? row.sector.name : '',
          sectorId: row.sector,
          cell: row.cell ? row.cell.name : '',
          cellId: row.cell,
          village: row.village ? row.village.name : '',
          villageId: row.village,
          provinceSelectedValue: row.province,
          districtSelectedValue: row.district,
          sectorSelectedValue: row.sector,
          cellSelectedValue: row.cell,
          villageSelectedValue: row.village,
          facilityOpeningDate : row.facilityOpeningDate ? row.facilityOpeningDate : '' ,
          facilityClosingDate : row.facilityClosingDate ? row.facilityClosingDate : '',
          pobox : row.pobox,
          phonenumber : row.phonenumber,
          email : row.email,
          streetAddress : row.streetAddress,
          deactivateReason : row.deactivateReason,
          additionalServices: row.additionalServices,
          packages: row.packages
        });
      });
    }
    return res;
  }

  handlePageChange = (newPage) => {
    const { handleFetchFacilities } = this.props;
    const {
      name,
      code,
      locationCode,
      status,
      type,
      opening_from_date,
      opening_to_date,
      province,
      district,
      sector,
      cell,
      village
    } = this.state;
    const params = {
      limit: 20,
      page: newPage
    };
    if (name) {
      params.name = name;
    }
    if (code) {
      params.code = code;
    }
    if (locationCode) {
      params.locationCode = locationCode;
    }
    if (status) {
      params.status = status !== 'All' ? status : '';
    }
    if (type) {
      params.type = type;
    }
    if(opening_from_date){
      params.opening_from_date = moment(opening_from_date).format('YYYY-MM-DD');
    }
    if(opening_to_date){
      params.opening_to_date = moment(opening_to_date).format('YYYY-MM-DD');
    }
    if(province){
      params.province = province;
    }
    if(district){
      params.district = district;
    }
    if(sector){
      params.sector = sector;
    }
    if(cell){
      params.cell = cell;
    }
    if(village){
      params.village = village;
    }
    handleFetchFacilities(params);
    this.setState({
      page: newPage
    });
  }

  handleSearch = () => {
    const {
      name,
      code,
      locationCode,
      status,
      type,
      opening_from_date,
      opening_to_date,
      province,
      district,
      sector,
      cell,
      village
    } = this.state;
    const params = {};
    if (name) {
      params.name = name;
    }
    if (code) {
      params.code = code;
    }
    if (locationCode) {
      params.locationCode = locationCode;
    }
    if (status) {
      params.status = status !== 'All' ? status : '';
    }
    if (type) {
      params.type = type;
    }
    if(opening_from_date){
      params.opening_from_date = moment(opening_from_date).format('YYYY-MM-DD');
    }
    if(opening_to_date){
      params.opening_to_date = moment(opening_to_date).format('YYYY-MM-DD');
    }
    if(province){
      params.province = province;
    }
    if(district){
      params.district = district;
    }
    if(sector){
      params.sector = sector;
    }
    if(cell){
      params.cell = cell;
    }
    if(village){
      params.village = village;
    }
    if (!_.isEmpty(params)) {
      const { handleFetchFacilities } = this.props;
      handleFetchFacilities(params);
    } else {
      this.setState({ toolTipOpen: true });
    }
  }

  downloadDataCsv = async (headers) => {
    const {
      name,
      code,
      locationCode,
      status,
      page,
      type,
      opening_from_date,
      opening_to_date,
      province,
      district,
      sector,
      cell,
      village
    } = this.state;
    const params = {
      limit: 100000,
      page: page
    };
    if (name) {
      params.name = name;
    }
    if (code) {
      params.code = code;
    }
    if (locationCode) {
      params.locationCode = locationCode;
    }
    if (status && status !== 'All') {
      params.status = status;
    }
    if (type) {
      params.type = type;
    }
    if(opening_from_date){
      params.opening_from_date = moment(opening_from_date).format('YYYY-MM-DD');
    }
    if(opening_to_date){
      params.opening_to_date = moment(opening_to_date).format('YYYY-MM-DD');
    }
    if(province){
      params.province = province;
    }
    if(district){
      params.district = district;
    }
    if(sector){
      params.sector = sector;
    }
    if(cell){
      params.cell = cell;
    }
    if(village){
      params.village = village;
    }
    params.skipPagination = true;
    this.setState({
      showLoadingModel: true,
    });
    const res = await API.get(URL.HEALTH_FACILITIES, { data: {}, params })
      .then(async (response) => response)
      .catch((error) => {
        console.log(error);
      });
    if(res.status === 'error') {
      let message = res && res.data ? res.data + res.message : res.message
      this.setState({
        showLoadingModel: false,
        showErrorModel : true,
        alertMessage : message
      });
    }
    if(res.status === 'ok') {
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
      res.data.forEach((row) => {
        const formatData = [];
        keys.forEach(key => {
          let value = '';
          if (row[key] != null && (key === 'province' || key === 'district' || key === 'sector' || key === 'cell' || key === 'village')) {
            value = row[key].name;
          } else if (key === 'facilityClosingDate' || key === 'facilityOpeningDate') {
            if (row[key] != null && row[key] != '') {
              value = moment(row[key]).format(DATE_FORMAT);
            } else {
              value = 'N/A'
            }
          } else if (key === 'status') {
            if (row[key] == '') {
              value = 'INACTIVE'
            } else {
              value = row[key]
            }
          } else {
            value = row[key];
          }
          if (value) {
            formatData.push(value);
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
      hiddenElement.download = `health-facilities-${+new Date()}.csv`;
      hiddenElement.click();
      this.setState({
        showLoadingModel: false,
      });
    }
  }

  handleTooltipClose = () => {
    this.setState({ toolTipOpen: false });
  };

  handleStatusChange = (rowData, value) => {
    const statusChange = value === true ? this.setState({showStatusAlert: false, statusConfirmAlert: true}) : this.setState({showStatusAlert: true, statusConfirmAlert: false})
    this.setState({
      selectedItemId: rowData._id,
      selectedStatusValue: value,
      statusChange
    });
  }

  handleOnStatusConfirm = () => {
    const { handleUpdateHealthFacility } = this.props;
    const { selectedItemId, selectedStatusValue, deactivateReason } = this.state;
    const status = selectedStatusValue ? 'ACTIVE' : 'INACTIVE';
    handleUpdateHealthFacility(selectedItemId, { status, deactivateReason });
    this.setState({
      deactivateReason: '',
      showLoadingModel: true,
      statusConfirmAlert: false,
      updateType: 'STATUS_UPDATE'
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

  handleErrorAlertClose = () => {
    this.setState({ showErrorModel: false, alertMessage: '' });
  }

  handleChangeDropdown = (selected, act, name) => {
    const {action} = act;
    const stateCopy = _.cloneDeep(this.state);
    const {handleFetchDistricts, handleFetchSectors, handleFetchCells, handleFetchVillages} = this.props;
    if (name === 'province') {
      console.log("action",action)
      if (action === 'clear') {
        stateCopy.provinceDefaultValue = null;
        stateCopy.province = '';
      } else {
        stateCopy.province = selected.value;
        stateCopy.provinceDefaultValue = selected;
        this.setState(stateCopy, () => { handleFetchDistricts(selected.value) });
      }
      stateCopy.districtDefaultValue = null;
      stateCopy.sectorDefaultValue = null;
      stateCopy.cellDefaultValue = null;
      stateCopy.villageDefaultValue = null;
      stateCopy.district = '';
      stateCopy.sector = '';
      stateCopy.cell = '';
      stateCopy.village = '';
      stateCopy.districtsOptions = [];
      stateCopy.sectorsOptions = [];
      stateCopy.cellsOptions = [];
      stateCopy.villagesOptions = [];
    }
    if (name === 'district') {
      if (action === 'clear') {
        stateCopy.districtDefaultValue = null;
        stateCopy.district = '';
      } else {
        stateCopy.district = selected.value;
        stateCopy.districtDefaultValue = selected;
        this.setState(stateCopy, () => { handleFetchSectors(selected.value) });
      }
      stateCopy.sectorDefaultValue = null;
      stateCopy.cellDefaultValue = null;
      stateCopy.villageDefaultValue = null;
      stateCopy.sector = '';
      stateCopy.cell = '';
      stateCopy.village = '';
      stateCopy.sectorsOptions = [];
      stateCopy.cellsOptions = [];
      stateCopy.villagesOptions = [];
    }

    if (name === 'sector') {
      if (action === 'clear') {
        stateCopy.sectorDefaultValue = null;
        stateCopy.sector = '';
      } else {
        stateCopy.sector = selected.value;
        stateCopy.sectorDefaultValue = selected;
        this.setState(stateCopy, () => { handleFetchCells(selected.value) });
      }
      stateCopy.cellDefaultValue = null;
      stateCopy.villageDefaultValue = null;
      stateCopy.cell = '';
      stateCopy.village = '';
      stateCopy.cellsOptions = [];
      stateCopy.villagesOptions = [];
    }

    if (name === 'cell') {
      if (action === 'clear') {
        stateCopy.cellDefaultValue = null;
        stateCopy.cell = '';
      } else {
        stateCopy.cell = selected.value;
        stateCopy.cellDefaultValue = selected;
        this.setState(stateCopy, () => { handleFetchVillages(selected.value) });
      }
      stateCopy.villageDefaultValue = null;
      stateCopy.village = '';
      stateCopy.villagesOptions = [];
    }

    if (name === 'village') {
      if (action === 'clear') {
        stateCopy.villageDefaultValue = null;
        stateCopy.village = '';
      } else {
        stateCopy.village = selected.value; 
        stateCopy.villageDefaultValue = selected;
      }
    }
    this.setState(stateCopy);
  }

  handleDateChange = (name, date) => {
    const stateCopy = _.cloneDeep(this.state);
    const dateCopy = new Date(date);
    if(name === 'opening_from_date'){
      dateCopy.setDate(dateCopy.getDate() + 1);
      stateCopy.opening_from_date= date;
      stateCopy.opening_to_date= dateCopy;
      this.setState(stateCopy);
    }
    if(name === 'opening_to_date'){
      stateCopy.opening_to_date= date;
      this.setState(stateCopy);
    }
  }

  render() {
    const {
      classes, facilities, count, handleFacilityAsset, profileData, provinces, districts, sectors, cells, villages
    } = this.props;
    const provincesOptions = provinces ? provinces.map(item => ({ value: item._id, label: item.name })) : [];
    const districtsOptions = districts ? districts.map(item => ({ value: item._id, label: item.name })) : [];
    const sectorsOptions = sectors ? sectors.map(item => ({ value: item._id, label: item.name })) : [];
    const cellsOptions = cells ? cells.map(item => ({ value: item._id, label: item.name })) : [];
    const villagesOptions = villages ? villages.map(item => ({ value: item._id, label: item.name })) : [];
    const {
      page,
      showCreateModel,
      name,
      code,
      locationCode,
      status,
      type,
      opening_from_date,
      opening_to_date,
      province,
      district,
      sector,
      cell,
      village,
      provinceDefaultValue,
      districtDefaultValue,
      sectorDefaultValue,
      cellDefaultValue,
      villageDefaultValue,
      alertMessage,
      showScuccessModel,
      showViewModel,
      showDeleteModal,
      viewData,
      editData,
      showUploadModel,
      loading,
      selectedStatusValue,
      statusConfirmAlert,
      showStatusAlert,
      showLoadingModel,
      showErrorModel,
      toolTipOpen,
      tableAction
    } = this.state;
    return (
      <div>
        <PapperBlock whiteBg hideBlockSection>
          <Typography variant="h5" className={Type.textLeft} gutterBottom>
            <span>Facility Registry</span>
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
                        label="Name"
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
                    <ThemeProvider theme={theme}>
                      <TextField
                        className={classes.margin}
                        label="Facility Code"
                        value={code}
                        inputProps={{
                          name: 'code'
                        }}
                        onChange={this.handleChange}
                      />
                    </ThemeProvider>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        className={classes.margin}
                        label="Facility Location Code"
                        value={locationCode}
                        inputProps={{
                          name: 'locationCode'
                        }}
                        onChange={this.handleChange}
                      />
                    </ThemeProvider>
                  </FormControl>
                </Grid> */}
                {/* </Grid> */}
                {/* <Grid container spacing={1}> */}
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
                        <MenuItem value="INACTIVE">Inactive</MenuItem>
                        {/* <MenuItem value="DELETED">Deleted</MenuItem> */}
                      </Select>
                    </ThemeProvider>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>                    
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <ThemeProvider theme={theme}>
                          <DatePicker
                            label="Facility Opening From Date"
                            format={DATE_FORMAT}
                            value={opening_from_date ? opening_from_date : null}
                            onChange={(date) => this.handleDateChange('opening_from_date', date)}
                            animateYearScrolling={false}
                            // maxDate={opening_from_date || new Date()}
                            autoOk
                          />
                        </ThemeProvider>
                      </MuiPickersUtilsProvider>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>                    
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <ThemeProvider theme={theme}>
                          <DatePicker
                            label="Facility Opening To Date"
                            format={DATE_FORMAT}
                            value={opening_to_date ? opening_to_date :null}
                            onChange={(date) => this.handleDateChange('opening_to_date', date)}
                            animateYearScrolling={false}
                            // maxDate={opening_to_date || new Date()}
                            autoOk
                          />
                        </ThemeProvider>
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <ThemeProvider theme={theme}>
                      <InputLabel>Facility Type</InputLabel>
                      <SelectDropdown
                        value={type}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'type'
                        }}
                      >
                        {FACILITY_TYPE.map((item) => (
                          <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}
                      </SelectDropdown>
                    </ThemeProvider>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={4} style={{ paddingLeft: 10, paddingRight: 20 }}>
                <Grid item xs={4}>
                  <InputLabel>Province</InputLabel>
                  <FormControl className={classes.formControl}>
                    <ReactSelect
                      value={provinceDefaultValue}
                      options={provincesOptions}
                      isClearable
                      onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'province'); }}
                    />
                  </FormControl>
                </Grid>
                 <Grid item xs={4}>
                  <InputLabel>District</InputLabel>
                  <FormControl className={classes.formControl}>
                    <ReactSelect
                      isClearable
                      value={districtDefaultValue}
                      options={districtsOptions}
                      onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'district'); }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel>Sector</InputLabel>
                  <FormControl className={classes.formControl}>
                    <ReactSelect
                      isClearable
                      options={sectorsOptions}
                      value={sectorDefaultValue}
                      onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'sector'); }}
                    />
                  </FormControl>
                </Grid>

                <Grid container direction="row" spacing={4} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={4}>
                  <InputLabel>Cell</InputLabel>
                  <FormControl className={classes.formControl}>
                    <ReactSelect
                      isClearable
                      options={cellsOptions}
                      value={cellDefaultValue}
                      onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'cell'); }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel>Village</InputLabel>
                  <FormControl className={classes.formControl}>
                    <ReactSelect
                      isClearable
                      options={villagesOptions}
                      value={villageDefaultValue}
                      onChange={(selected, action) => { this.handleChangeDropdown(selected, action, 'village'); }}
                    />
                  </FormControl>
                </Grid>
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
              <Grid item xs={12} sm={12} align="center" className={classes.marginY1}>
                <Button
                  style={{ padding: 5, marginTop: 10, width: 100 }}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => this.clearFilter()}
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
            tableTitle="Facility Registry"
            page={page}
            headCells={headCells}
            rows={this.formatData(facilities)}
            totalData={count}
            onPageChange={(newPage) => this.handlePageChange(newPage)}
            loading={loading}
            onActionClicked={(action, rowData) => this.handleAction(action, rowData)}
            handleStatusChange={(rowData, value) => this.handleStatusChange(rowData, value)}
            upload={() => this.importCsv()}
            download={() => this.exportCsv()}
            downloadDataCsv={(headers) => this.downloadDataCsv(headers)}
            profileData={profileData}
          />
        </div>
        <HealtFacilityCreateModel
          open={showCreateModel}
          editData={editData}
          onClose={() => {
            this.setState({
              showCreateModel: false,
              editData: {}
            });
            const { handleFetchFacilities } = this.props;
            const params = {page:'1',limit:'20'};
            if (name) {
              params.name = name;
            }
            if (code) {
              params.code = code;
            }
            if (locationCode) {
              params.locationCode = locationCode;
            }
            if (status) {
              params.status = status !== 'All' ? status : '';
            }
            if (type) {
              params.type = type;
            }
            if(opening_from_date){
              params.opening_from_date = moment(opening_from_date).format('YYYY-MM-DD');
            }
            if(opening_to_date){
              params.opening_to_date = moment(opening_to_date).format('YYYY-MM-DD');
            }
            if(province){
              params.province = province;
            }
            if(district){
              params.district = district;
            }
            if(sector){
              params.sector = sector;
            }
            if(cell){
              params.cell = cell;
            }
            if(village){
              params.village = village;
            }
            if (!_.isEmpty(params)) {
              handleFetchFacilities(params);
            } else {
              handleFetchFacilities({page:'1',limit:'20'});
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
          message={`Are you do you want to ${selectedStatusValue ? 'active' : 'inactive'} this facility`}
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
        <ViewModal
          open={showViewModel}
          tableAction={tableAction}
          onClose={() => {
            this.setState({ showViewModel: false, viewData: {} });
          }}
          data={viewData}
        />
        <DeleteFacilityModal
          open={showDeleteModal}
          onClose={() => {
            this.setState({ showDeleteModal: false, viewData: {} });
          }}
          data={viewData}
          onDelete={this.handleConfirm}
          classes={classes}
          handleFacilityAsset={handleFacilityAsset}
        />

        <UploadModel
          open={showUploadModel}
          onClose={() => {
            this.setState({ showUploadModel: false });
          }}
        />
        <LoadingAlert
          open={showLoadingModel}
        />
      </div>
    );
  }
}

HealthFacilities.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFetchFacilities: PropTypes.func.isRequired,
  handleDeleteFacility: PropTypes.func.isRequired,
  handleUpdateHealthFacility: PropTypes.func.isRequired,
  facilities: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  handleFacilityAsset: PropTypes.func.isRequired,
  handleFetchProvinces: PropTypes.func.isRequired,
  handleFetchDistricts: PropTypes.func.isRequired,
  handleFetchSectors: PropTypes.func.isRequired,
  handleFetchCells: PropTypes.func.isRequired,
  handleFetchVillages: PropTypes.func.isRequired,
  provinces: PropTypes.array,
  districts: PropTypes.array,
  sectors: PropTypes.array,
  cells: PropTypes.array,
  villages: PropTypes.array,
};

HealthFacilities.defaultProps = {
  provinces: [],
  districts: [],
  sectors: [],
  cells: [],
  villages: []
};

const provinceReducer = 'provinceReducer';
const districtReducer = 'districtReducer';
const sectorReducer = 'sectorReducer';
const cellReducer = 'cellReducer';
const villageReducer = 'villageReducer';
const facilityCrudReducer = 'healthFacilityCrudReducer';
const adminAuthReducer = 'adminAuthReducer';
const mapStateToProps = state => ({
  provinces: state.get(provinceReducer) && state.get(provinceReducer).provinces ? state.get(provinceReducer).provinces : [],
  districts: state.get(districtReducer) && state.get(districtReducer).districts ? state.get(districtReducer).districts : [],
  sectors: state.get(sectorReducer) && state.get(sectorReducer).sectors ? state.get(sectorReducer).sectors : [],
  cells: state.get(cellReducer) && state.get(cellReducer).cells ? state.get(cellReducer).cells : [],
  villages: state.get(villageReducer) && state.get(villageReducer).villages ? state.get(villageReducer).villages : [],
  facilities: state.get(facilityCrudReducer) && state.get(facilityCrudReducer).healthFacilities ? state.get(facilityCrudReducer).healthFacilities : [],
  count: state.get(facilityCrudReducer) && state.get(facilityCrudReducer).count ? state.get(facilityCrudReducer).count : 0,
  facilityDeleteStatus: state.get(facilityCrudReducer) && state.get(facilityCrudReducer).facilityDeleteStatus ? state.get(facilityCrudReducer).facilityDeleteStatus : '',
  loading: state.get(facilityCrudReducer) && state.get(facilityCrudReducer).loading ? state.get(facilityCrudReducer).loading : false,
  facilityUpdateStatus: state.get(facilityCrudReducer) && state.get(facilityCrudReducer).facilityUpdateStatus ? state.get(facilityCrudReducer).facilityUpdateStatus : '',
  facilityAssetStatus: state.get(facilityCrudReducer) && state.get(facilityCrudReducer).facilityAssetStatus ? state.get(facilityCrudReducer).facilityAssetStatus : '',
  profileData: state.get(adminAuthReducer) && state.get(adminAuthReducer).profileData ? state.get(adminAuthReducer).profileData : null
});

const mapDispatchToProps = dispatch => ({
  handleFetchProvinces: bindActionCreators(fetchProvinces, dispatch),
  handleFetchDistricts: bindActionCreators(fetchDistricts, dispatch),
  handleFetchSectors: bindActionCreators(fetchSectors, dispatch),
  handleFetchCells: bindActionCreators(fetchCells, dispatch),
  handleFetchVillages: bindActionCreators(fetchVillages, dispatch),
  handleFetchFacilities: bindActionCreators(fetchHealthFacilities, dispatch),
  handleDeleteFacility: bindActionCreators(deleteFacility, dispatch),
  handleUpdateHealthFacility: bindActionCreators(updateHealthFacility, dispatch),
  handleFacilityAsset: bindActionCreators(facilityAsset, dispatch),
  handleClearStore: bindActionCreators(clearStore, dispatch),
  handleUserProfile: bindActionCreators(userProfile, dispatch)
});

const HealthFacilityMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(HealthFacilities);

export default withStyles(styles)(HealthFacilityMap);
