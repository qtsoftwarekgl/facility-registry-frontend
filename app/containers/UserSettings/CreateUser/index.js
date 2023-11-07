import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { lightBlue } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Type from 'enl-styles/Typography.scss';
import { Card, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import AsyncSelect from 'react-select/async';
import ReactSelect from 'react-select';
import _ from 'lodash';
import ErrorAlert from 'enl-components/Alerts/ErrorAlert';
import LoadingAlert from 'enl-components/Alerts/LoadingAlert';
import defaultUserImg from 'enl-images/user-default.jpg';
import moment from 'moment';
import SuccessAlert from './UserSuccessAlert';
import { createNewUser, createNewUserClear, editUser, editNewUserClear, getUser } from './userActions';
import styles from './create-user-jss';
import {
  MINISTRIES, REGEX, PHONE_LENGTH, DATE_FORMAT, VITAL_STATUS
} from '../../../lib/constants';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';
import {
  docInputValildation, documentNumberValidation, getErrorMessage, getNationality
} from '../../../utils/helpers';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue
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

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      form: {
        surName:'',
        postNames: '',
        dateOfBirth : null,
        sex : '',
        maritalStatus: '',
        nationality : '',
        domicileCountry:'',
        domicileProvince:'',
        domicileDistrict:'',
        domicileSector:'',
        domicileCell:'',
        domicileVillage:'',
        civilStatus:'',
        documentNumber:'',
        phoneNumber:'',
        email:'',
        password:'',
      },
      docType: 'NID',
      docNumber: '',
      document: null,
      showAlert: false,
      showErrorAlert: false,
      errorAlertMessage: '',
      rolesList: [],
      healthFacilityList: [],
      embassyList: [],
      provinceList: [],
      districtList: [],
      sectorList: [],
      cellList: [],
      districtLoading: false,
      sectorLoading: false,
      cellLoading: false,
      roles: null,
      role: null,
      ministry: '',
      healthFacility: null,
      embassy: null,
      position: '',
      institutionName: '',
      province: null,
      district: null,
      sector: null,
      cell: null,
      phoneNumber: '',
      email: '',
      password:'',
      tempCitizen: null,
      selectedCitizen: null,
      citizenPhotoUrl: '',
      docNumberError: '',
      showErrorBorder: false,
      roleError: '',
      ministryError: '',
      healthFacilityError: '',
      embassyError: '',
      positionError: '',
      institutionNameError: '',
      provinceError: '',
      districtError: '',
      sectorError: '',
      cellError: '',
      phoneNumberError: '',
      emailError: '',
      passwordError: '',
      surNameError:'',
      postNamesError:'',
      dateOfBirthError:'',
      nationalityError:'',
      sexError:'',
      validationTriggered: false
    };
  }

  componentDidMount() {
    this.handleGetRoles();
    
    const { handleGetUser } = this.props;
    const id = this.props.match.params.id;
    this.setState({
      userId: id ? id : '',
      mode: id ? 'Edit' : 'Create'
    });
    if (id) {
      handleGetUser(id)
    }
    // this.handleGetEmbassies();
    // this.handleGetHealthFacilities();
    // this.handleGetProvinces();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { userCreated, message, handleCreateNewUserClear, userUpdated, handleEditNewUserClear, getUserResultData } = nextProps;
    const updatedState = {};
    if (getUserResultData && prevState.id != getUserResultData._id) {
      updatedState.id = getUserResultData._id;
      updatedState.document = getUserResultData.documentNumber;
      updatedState.docType = getUserResultData.documentType;
      updatedState.status =  getUserResultData.status;
      if (getUserResultData && getUserResultData.role) {
        const label = getUserResultData.role === "ADMIN" ? "Admin" : getUserResultData.role === "VIEWER" ? "Viewer" : "";
        updatedState.role = { value: getUserResultData.role, label: label } || null;
      }
      if (getUserResultData.documentType !== 'OTHER') {
        updatedState.email =  getUserResultData.email;
        updatedState.phoneNumber =  getUserResultData.phoneNumber
        updatedState.selectedCitizen = {
          documentType: getUserResultData.documentType,
          documentNumber: getUserResultData.documentNumber,
          surName: getUserResultData.surName,
          postNames: getUserResultData.postNames,
          dateOfBirth: getUserResultData.dateOfBirth,
          maritalStatus: getUserResultData.maritalStatus,
          sex: getUserResultData.sex,
          nationality: getUserResultData.nationality,
          domicileCountry: getUserResultData.domicileCountry,
          domicileDistrict: getUserResultData.domicileDistrict,
          domicileProvince: getUserResultData.domicileProvince,
          domicileSector: getUserResultData.domicileSector,
          domicileCell: getUserResultData.domicileCell,
          domicileVillage: getUserResultData.domicileVillage,
          licenseNumber: getUserResultData.licenseNumber,
          licenseExpiryDate: getUserResultData.licenseExpiryDate,
          qualification: getUserResultData.qualification,
          photo: getUserResultData.photo,
          status: getUserResultData.status,
          facilityId: getUserResultData.facilityId,
          applicationNumber: getUserResultData.applicationNumber,
          nin: getUserResultData.nin,
          nid: getUserResultData.nid,
          passportNumber: getUserResultData.passportNumber,
          fatherName: getUserResultData.fatherName,
          motherName: getUserResultData.motherName,
          birthCountry: getUserResultData.birthCountry,
          countryOfBirth: getUserResultData.countryOfBirth,
          villageId: getUserResultData.villageId,
          civilStatus: getUserResultData.civilStatus,
          spouse: getUserResultData.spouse,
          applicantType: getUserResultData.applicantType
        };
      } else {
        updatedState.form = {
          surName : getUserResultData.surName ? getUserResultData.surName : '',
          postNames : getUserResultData.postNames,
          dateOfBirth : getUserResultData.dateOfBirth,
          sex : getUserResultData.sex,
          maritalStatus: getUserResultData.maritalStatus,
          nationality : getUserResultData.nationality,
          domicileCountry: getUserResultData.domicileCountry,
          domicileProvince: getUserResultData.domicileProvince,
          domicileDistrict: getUserResultData.domicileDistrict,
          domicileSector: getUserResultData.domicileSector,
          domicileCell: getUserResultData.domicileCell,
          domicileVillage: getUserResultData.domicileVillage,
          civilStatus: getUserResultData.civilStatus,
          documentNumber: getUserResultData.documentNumber,
          document: getUserResultData.documentNumber,
          phoneNumber: getUserResultData.phoneNumber,
          email: getUserResultData.email,
          password:'',
          status: getUserResultData.status,
        }
      }
    }
    if (userCreated === 'ok') {
      updatedState.showAlert = true;
      updatedState.showAlertMessage = 'New user created successfully.';
      updatedState.docNumber = '';
      updatedState.role = '';
      updatedState.roles = null;
      updatedState.ministry = '';
      updatedState.healthFacility = '';
      updatedState.embassy = '';
      updatedState.position = '';
      updatedState.institutionName = '';
      updatedState.province = '';
      updatedState.district = '';
      updatedState.sector = '';
      updatedState.cell = '';
      updatedState.phoneNumber = '';
      updatedState.email = '';
      updatedState.password='',
      updatedState.tempCitizen = null;
      updatedState.selectedCitizen = null;
      updatedState.citizenPhotoUrl = '';
      handleCreateNewUserClear();
    } else if (userCreated === 'error') {
      updatedState.showErrorAlert = true;
      if (message === 'server_error.document_id_already_exists') {
        updatedState.errorAlertMessage = 'Application / User already exist with this document number.';
      } else {
        updatedState.errorAlertMessage = getErrorMessage(message);
      }
      handleCreateNewUserClear();
    }

    if (userUpdated === 'ok') {
      updatedState.showAlert = true;
      updatedState.showAlertMessage = 'User updated successfully.';
      updatedState.docNumber = '';
      updatedState.role = '';
      updatedState.roles = null;
      updatedState.ministry = '';
      updatedState.healthFacility = '';
      updatedState.embassy = '';
      updatedState.position = '';
      updatedState.institutionName = '';
      updatedState.province = '';
      updatedState.district = '';
      updatedState.sector = '';
      updatedState.cell = '';
      updatedState.phoneNumber = '';
      updatedState.email = '';
      updatedState.password='',
      updatedState.tempCitizen = null;
      updatedState.selectedCitizen = null;
      updatedState.citizenPhotoUrl = '';
      handleEditNewUserClear();
    } else if (userUpdated === 'error') {
      updatedState.showErrorAlert = true;
      if (message === 'server_error.document_id_already_exists') {
        updatedState.errorAlertMessage = 'Application / User already exist with this document number.';
      } else {
        updatedState.errorAlertMessage = getErrorMessage(message);
      }
      handleEditNewUserClear();
    }
    return updatedState;
  }
  
  handleClose = () => {
    this.setState({
      showAlert: false
    });
    window.location.reload(false);
  }
  
  handleChange = name => event => {
    const { docType } = this.state;
    if (docType !== "OTHER" ) {
      if (name === 'docType') {
        this.setState({
          docType: event.target.value,
          docNumber: '',
          document: null,
          role: null,
          ministry: '',
          healthFacility: null,
          embassy: null,
          position: '',
          institutionName: '',
          province: null,
          district: null,
          sector: null,
          cell: null,
          phoneNumber: '',
          email: '',
          password:'',
          tempCitizen: null,
          selectedCitizen: null,
          citizenPhotoUrl: '',
          docNumberError: '',
          showErrorBorder: false,
          roleError: '',
          ministryError: '',
          healthFacilityError: '',
          embassyError: '',
          positionError: '',
          institutionNameError: '',
          provinceError: '',
          districtError: '',
          sectorError: '',
          cellError: '',
          phoneNumberError: '',
          emailError: '',
          passwordError: '',
          validationTriggered: false
        });
      } else {
        this.setState({
          [name]: event.target.value,
        });
      }
    } else if (docType === 'OTHER') {
      const stateCopy = _.cloneDeep(this.state);
      if (name === 'docType') {                
        stateCopy.docType = event.target.value;
        stateCopy.form.surName = '';
        stateCopy.form.postNames = '';
        stateCopy.form.dateOfBirth = null;
        stateCopy.form.maritalStatus = '';
        stateCopy.form.sex = '';
        stateCopy.form.documentNumber = '';
        stateCopy.form.nationality = '';
        stateCopy.form.domicileCountry = '';
        stateCopy.form.domicileProvince = '';
        stateCopy.form.domicileDistrict = '';
        stateCopy.form.domicileSector = '';
        stateCopy.form.domicileVillage = '';
        stateCopy.form.domicileCell = '';
        stateCopy.form.civilStatus = '';
        stateCopy.form.phoneNumber = '';
        stateCopy.form.email = '';
        stateCopy.form.password = '';
        stateCopy.role = '';
        stateCopy.phoneNumberError = '';
        stateCopy.emailError = '';
        stateCopy.passwordError = '';
        stateCopy.surNameError = '';
        stateCopy.postNamesError = '';
        stateCopy.dateOfBirthError = '';
        stateCopy.nationalityError = '';
        stateCopy.sexError = '';
        stateCopy.roleError = '';
      }
      if (name === 'sex') {
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'surName'){
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'postNames'){
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'dateOfBirth'){
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'maritalStatus'){
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'nationality'){
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'documentNumber'){
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'domicileCountry'){
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'domicileProvince'){
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'domicileDistrict'){
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'domicileSector'){
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'domicileCell'){
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'domicileVillage'){
        stateCopy.form[name] = event.target.value;
      }
      if(name === 'citizenStatus'){
        stateCopy.form[name] = event.target.value;
      }
      if (name === 'phoneNumber') {
        stateCopy.form[name] = event.target.value;
        if (stateCopy.form.phoneNumber.length < PHONE_LENGTH) {
          stateCopy.form[name] = event.target.value;
        } else {
          stateCopy.form[name] = event.target.value.slice(0, PHONE_LENGTH);
        }
      }
      if (name === 'email') {
        stateCopy.form[name] = event.target.value;
      }
      if (name === 'password') {
        stateCopy.form[name] = event.target.value;
      }      
      this.setState(stateCopy);
    }
    const { validationTriggered } = this.state;
    if (validationTriggered) {
      setTimeout(() => {
        this.validateUserData();
      }, 30);
    }
  };

  handleGetCitizens = async (value) => {
    this.setState({
      docNumberError: '',
      docNumber: value
    });
    const { docType } = this.state;
    const valid = documentNumberValidation(docType, value);
    if (valid.isValid) {
      const docData = {
        documentType: docType,
        documentNumber: value
      };
      const res = await API.post(URL.GET_CITIZEN, docData)
        .then(async (response) => {
          const result = response.data;
          if (result.citizenStatus !== '13') {
            if (moment().diff(moment(result.dateOfBirth, 'DD-MM-YYYY'), 'years') > 18) {
              this.setState({
                tempCitizen: response.data
              });
              const data = [{
                value: result.documentNumber.replace(/\s/g, ''),
                label: `${result.surName} - ${result.documentNumber.replace(/\s/g, '')}`
              }];
              return data;
            }
            this.setState({
              showErrorAlert: true,
              errorAlertMessage: 'User minimum age must be 18 years.'
            });
            return [];
          }
          this.setState({
            showErrorAlert: true,
            errorAlertMessage: 'User should be alive.'
          });
          return [];
        })
        .catch(() => []);
      return res;
    }
    this.setState({
      docNumberError: valid.errorMsg
    });
    return [];
  }

  handleCitizenSelect = (selected, triggeredAction) => {
    const { tempCitizen } = this.state;
    if (triggeredAction.action === 'clear') {
      this.setState({
        docNumber: '',
        document: null,
        role: null,
        ministry: '',
        healthFacility: null,
        embassy: null,
        position: '',
        institutionName: '',
        province: null,
        district: null,
        sector: null,
        cell: null,
        districtList: [],
        sectorList: [],
        cellList: [],
        phoneNumber: '',
        email: '',
        password:'',
        selectedCitizen: '',
        citizenPhotoUrl: '',
        docNumberError: '',
        roleError: '',
        ministryError: '',
        healthFacilityError: '',
        embassyError: '',
        positionError: '',
        institutionNameError: '',
        provinceError: '',
        districtError: '',
        sectorError: '',
        cellError: '',
        phoneNumberError: '',
        emailError: '',
        passwordError: ''
      });
    } else {
      this.setState({
        docNumber: selected.value,
        docNumberError: '',
        document: {
          value: tempCitizen.documentNumber.replace(/\s/g, ''),
          label: `${tempCitizen.surName} - ${tempCitizen.documentNumber.replace(/\s/g, '')}`
        },
        selectedCitizen: tempCitizen,
        showErrorBorder: false
      });
      this.setState({
        citizenPhotoUrl: tempCitizen.photo
      });
    }
  }

  handleGetRoles = () => {
    API.get(`${URL.ROLES_LIST}?fields=name,status,value,ministry,role`)
      .then(response => {
        if (response && response.status === 'ok') {
          const results = response.data;
          this.setState({
            roles: results,
            rolesList: results
          });
        }
      });
  }

  handleRoleSelect = (selected, triggeredAction) => {
    if (triggeredAction.action === 'clear') {
      this.setState({
        role: null,
        ministry: '',
        healthFacility: null,
        embassy: null,
        position: '',
        institutionName: '',
        province: null,
        district: null,
        sector: null,
        cell: null,
        districtList: [],
        sectorList: [],
        cellList: [],
        roleError: 'Please select role.',
        ministryError: '',
        healthFacilityError: '',
        embassyError: '',
        positionError: '',
        institutionNameError: '',
        provinceError: '',
        districtError: '',
        sectorError: '',
        cellError: '',
      });
    } else {
      const { roles } = this.state;
      const selectedRole = _.find(roles, { value: selected.value });
      this.setState({
        role: selected,
        ministry: selectedRole && selectedRole.ministry ? selectedRole.ministry : '',
        healthFacility: null,
        embassy: null,
        position: '',
        institutionName: '',
        province: null,
        district: null,
        sector: null,
        cell: null,
        districtList: [],
        sectorList: [],
        cellList: [],
        roleError: '',
        ministryError: '',
        healthFacilityError: '',
        embassyError: '',
        positionError: '',
        institutionNameError: '',
        provinceError: '',
        districtError: '',
        sectorError: '',
        cellError: '',
      });
    }
  }

  handleGetHealthFacilities = () => {
    API.get(`${URL.HEALTH_FACILITIES_LIST}?fields=name,status`)
      .then(response => {
        if (response && response.status === 'ok') {
          const results = response.data;
          this.setState({
            healthFacilityList: results
          });
        }
      });
  }

  handleHealthFacilitySelect = (selected, triggeredAction) => {
    if (triggeredAction.action === 'clear') {
      this.setState({
        healthFacility: null,
        healthFacilityError: ''
      });
    } else {
      this.setState({
        healthFacility: selected,
        healthFacilityError: ''
      });
    }
  }

  handleGetEmbassies = () => {
    API.get(`${URL.EMBASSIES_LIST}?feilds=name,cityName,status`)
      .then(response => {
        if (response && response.status === 'ok') {
          const results = response.data;
          this.setState({
            embassyList: results
          });
        }
      });
  }

  handleEmbassySelect = (selected, triggeredAction) => {
    if (triggeredAction.action === 'clear') {
      this.setState({
        embassy: null
      });
    } else {
      this.setState({
        embassy: selected
      });
    }
  }

  handleGetProvinces = () => {
    API.get(`${URL.PROVINCES_LIST}`)
      .then(response => {
        if (response && response.status === 'ok') {
          const results = response.data;
          this.setState({
            provinceList: results
          });
        }
      });
  }

  handleProvinceSelect = (selected, triggeredAction) => {
    if (triggeredAction.action === 'clear') {
      this.setState({
        province: null,
        district: null,
        sector: null,
        cell: null,
        districtList: [],
        sectorList: [],
        cellList: [],
        districtError: '',
        sectorError: '',
        cellError: '',
      });
    } else {
      this.setState({
        province: selected,
        district: null,
        sector: null,
        cell: null,
        districtList: [],
        sectorList: [],
        cellList: [],
        provinceError: '',
        districtError: '',
        sectorError: '',
        cellError: '',
      });
      this.handleGetDistricts(selected.value);
    }
  }

  handleGetDistricts = (proviceId) => {
    this.setState({
      districtLoading: true
    });
    API.get(`${URL.DISTRICTS_LIST}?fields=name,code,provinceId,status`, { params: { provinceId: proviceId } })
      .then(response => {
        if (response && response.status === 'ok') {
          const results = response.data;
          this.setState({
            districtList: results,
            districtLoading: false
          });
        } else {
          this.setState({
            districtLoading: false
          });
        }
      })
      .catch(() => {
        this.setState({
          districtLoading: false
        });
      });
  }

  handleDistrictSelect = (selected, triggeredAction) => {
    if (triggeredAction.action === 'clear') {
      this.setState({
        district: null,
        sector: null,
        cell: null,
        sectorList: [],
        cellList: [],
        sectorError: '',
        cellError: ''
      });
    } else {
      this.setState({
        district: selected,
        sector: null,
        cell: null,
        sectorList: [],
        cellList: [],
        districtError: '',
        sectorError: '',
        cellError: ''
      });
      this.handleGetSectors(selected.value);
    }
  }

  handleGetSectors = (districtId) => {
    this.setState({
      sectorLoading: true
    });
    API.get(`${URL.SECTORS_LIST}?fields=name,code,districtId,status`, { params: { districtId } })
      .then(response => {
        if (response && response.status === 'ok') {
          const results = response.data;
          this.setState({
            sectorLoading: false,
            sectorList: results
          });
        } else {
          this.setState({
            sectorLoading: false
          });
        }
      })
      .catch(() => {
        this.setState({
          sectorLoading: false
        });
      });
  }

  handleSectorSelect = (selected, triggeredAction) => {
    if (triggeredAction.action === 'clear') {
      this.setState({
        sector: null,
        cell: null,
        cellList: [],
        sectorError: '',
        cellError: ''
      });
    } else {
      this.setState({
        sector: selected,
        cell: null,
        cellList: [],
        sectorError: '',
        cellError: ''
      });
      this.handleGetCells(selected.value);
    }
  }

  handleGetCells = (sectorId) => {
    this.setState({
      cellLoading: true
    });
    API.get(`${URL.CELLS_LIST}?fields=name,code,sectorId,status`, { params: { sectorId } })
      .then(response => {
        if (response && response.status === 'ok') {
          const results = response.data;
          this.setState({
            cellLoading: false,
            cellList: results
          });
        } else {
          this.setState({
            cellLoading: false
          });
        }
      })
      .catch(() => {
        this.setState({
          cellLoading: false
        });
      });
  }

  handleCellSelect = (selected, triggeredAction) => {
    if (triggeredAction.action === 'clear') {
      this.setState({
        cell: null,
        cellError: ''
      });
    } else {
      this.setState({
        cell: selected,
        cellError: ''
      });
    }
  }

  validateUserData = () => {
    let valid = true;
    this.setState({
      docNumberError: '',
      roleError: '',
      ministryError: '',
      healthFacilityError: '',
      embassyError: '',
      positionError: '',
      institutionNameError: '',
      provinceError: '',
      districtError: '',
      sectorError: '',
      cellError: '',
      phoneNumberError: '',
      surNameError:'',
      postNamesError:'',
      dateOfBirthError:'',
      nationalityError:'',
      sexError:'',
      emailError: '',
      passwordError: ''
    });
    const {
      form,
      docType,
      selectedCitizen,
      role,
      email,
      password,
      userId
    } = this.state;
    if(docType !== 'OTHER') {
      if (!selectedCitizen) {
        valid = false;
        this.setState({
          docNumberError: 'Please enter document number and select citizen.',
          showErrorBorder: true
        });
      }
      if (!role) {
        valid = false;
        this.setState({
          roleError: 'Please select role.'
        });
      }

      if (!REGEX.EMAIL.test(email)) {
        valid = false;
        this.setState({
          emailError: 'Please enter valid email.'
        });
      }
      if (!userId && !REGEX.PASSWORD.test(password)) {
        valid = false;
        this.setState({
          passwordError: 'Please enter valid password.'
        });
      }
    } else {
      if (!role) {
        valid = false;
        this.setState({
          roleError: 'Please select role.'
        });
      }
      if (form.surName === '') {
        this.setState({
          surNameError: 'Please enter surName.'
        });
        valid = false;
      }
      if (form.postNames === '') {
        this.setState({
          postNamesError: 'Please enter postNames.'
        });
        valid = false;
      }
      if (form.dateOfBirth === null) {
        valid = false;
        this.setState({
          dateOfBirthError: 'Please enter date Of Birth.'
        });
      }
      if (form.nationality === '') {
        this.setState({
          nationalityError: 'Please enter nationality.'
        });
        valid = false;
      }
      if (form.sex === '') {
        this.setState({
          sexError: 'Please enter gender.'
        });
        valid = false;
      }
      if (!REGEX.PHONE.test(form.phoneNumber)) {
        valid = false;
        this.setState({
          phoneNumberError: 'Please enter valid phone number. eg: 072xxxxxxx, 073xxxxxxx, 078xxxxxxx or 079xxxxxxx'
        });
      } else if (!form.phoneNumber) {
        valid = false;
        this.setState({
          phoneNumberError: 'Please enter valid phone number. Numbers and ()+- only allowed.'
        });
      }
      if (!REGEX.EMAIL.test(form.email)) {
        valid = false;
        this.setState({
          emailError: 'Please enter valid email.'
        });
      }
      if (!userId && !REGEX.PASSWORD.test(form.password)) {
        valid = false;
        this.setState({
          passwordError: 'Please enter valid password.'
        });
      }
    }
    return valid;
  }

  handleDateChange = (name, date) => {
    const stateCopy = _.cloneDeep(this.state);    
    stateCopy.form[name] = date;
    this.setState(stateCopy);
  }

  handleSubmit = () => {
    if (this.validateUserData()) {
      this.setState({
        validationTriggered: false
      });

      const {
        form,
        roles,
        docType,
        docNumber,
        role,
        ministry,
        healthFacility,
        embassy,
        position,
        institutionName,
        province,
        district,
        sector,
        cell,
        phoneNumber,
        email,
        password,
        citizenPhotoUrl,
        selectedCitizen,
        tempCitizen,
        userId
      } = this.state;

      const userData = {}
      if (docType !== 'OTHER') {
        userData.documentType = docType,
        userData.documentNumber = docNumber,
        userData.surName = selectedCitizen.surName ? selectedCitizen.surName : '',
        userData.postNames = selectedCitizen.postNames ? selectedCitizen.postNames : '',
        userData.dateOfBirth = selectedCitizen.dateOfBirth ? moment(selectedCitizen.dateOfBirth, DATE_FORMAT).format(DATE_FORMAT) : '',       
        userData.dateOfExpiry = selectedCitizen.dateOfExpiry ? moment(selectedCitizen.dateOfExpiry, DATE_FORMAT).format(DATE_FORMAT) : '',
        userData.maritalStatus = selectedCitizen.maritalStatus ? selectedCitizen.maritalStatus : '',
        userData.sex = selectedCitizen.sex ? selectedCitizen.sex : '',
        userData.nationality = selectedCitizen.nationality ? selectedCitizen.nationality : '',
        userData.phoneNumber = phoneNumber ? phoneNumber : '',
        userData.email = email ? email.toLowerCase()  : '',
        userData.password = password ? password : '',
        userData.accessType = role ? role.value : '',
        userData.residentialCountry = selectedCitizen.domicileCountry ? selectedCitizen.domicileCountry : '';
        userData.domicileCountry = selectedCitizen.domicileCountry ? selectedCitizen.domicileCountry : '';
        userData.domicileDistrict = selectedCitizen.domicileDistrict ? selectedCitizen.domicileDistrict : '';
        userData.domicileProvince =  selectedCitizen.domicileProvince ? selectedCitizen.domicileProvince : '';
        userData.domicileSector = selectedCitizen.domicileSector ? selectedCitizen.domicileSector : '';
        userData.domicileCell = selectedCitizen.domicileCell ? selectedCitizen.domicileCell : '';
        userData.domicileVillage = selectedCitizen.domicileVillage ? selectedCitizen.domicileVillage : '';
        userData.citizenStatus = tempCitizen && tempCitizen.citizenStatus || '';
        userData.issueNumber = tempCitizen && tempCitizen.issueNumber && tempCitizen.issueNumber;
        userData.dateOfIssue = tempCitizen && tempCitizen.dateOfIssue && tempCitizen.dateOfIssue;
        userData.placeOfIssue = tempCitizen && tempCitizen.placeOfIssue && tempCitizen.placeOfIssue;
        userData.applicationNumber= tempCitizen && tempCitizen.applicationNumber && tempCitizen.applicationNumber;
        userData.nin = tempCitizen && tempCitizen.nin && tempCitizen.nin;
        userData.nid = tempCitizen && tempCitizen.nid && tempCitizen.nid;
        userData.passportNumber = tempCitizen && tempCitizen.passportNumber && tempCitizen.passportNumber;
        userData.refugeeNumber = tempCitizen && tempCitizen.refugeeNumber && tempCitizen.refugeeNumber;
        userData.fatherName = tempCitizen && tempCitizen.fatherName && tempCitizen.fatherName;
        userData.motherName = tempCitizen && tempCitizen.motherName && tempCitizen.motherName;
        userData.birthCountry = tempCitizen && tempCitizen.birthCountry && tempCitizen.birthCountry;
        userData.countryOfBirth = tempCitizen && tempCitizen.countryOfBirth && tempCitizen.countryOfBirth;
        userData.villageId = tempCitizen && tempCitizen.villageId && tempCitizen.villageId;
        userData.civilStatus = tempCitizen && tempCitizen.civilStatus && tempCitizen.civilStatus;
        userData.spouse = tempCitizen && tempCitizen.spouse && tempCitizen.spouse;
        userData.applicantType = tempCitizen && tempCitizen.applicantType && tempCitizen.applicantType;
        userData.status = selectedCitizen.status ? selectedCitizen.status : '';
      } else {
        userData.documentType = docType,
        userData.documentNumber = form.documentNumber,
        userData.surName = form.surName ? form.surName : '',
        userData.postNames = form.postNames ? form.postNames : '',
        userData.dateOfBirth = form.dateOfBirth ? moment(form.dateOfBirth, DATE_FORMAT).format(DATE_FORMAT) : '',       
        userData.maritalStatus = form.maritalStatus ? form.maritalStatus : '',
        userData.citizenStatus =  form.citizenStatus ? form.citizenStatus : '',
        userData.sex = form.sex ? form.sex : '',
        userData.nationality = form.nationality ? form.nationality : '',
        userData.phoneNumber = form.phoneNumber ? form.phoneNumber : '',
        userData.email = form.email ? form.email.toLowerCase()  : '',
        userData.password = form.password ? form.password : '',
        userData.accessType = role ? role.value : '',
        userData.residentialCountry = form.domicileCountry ? form.domicileCountry : '';
        userData.domicileCountry = form.domicileCountry ? form.domicileCountry :'';
        userData.domicileDistrict = form.domicileDistrict ? form.domicileDistrict :'';
        userData.domicileProvince =  form.domicileProvince ? form.domicileProvince :'';
        userData.domicileSector = form.domicileSector ? form.domicileSector :'';
        userData.domicileCell = form.domicileCell ? form.domicileCell :'';
        userData.domicileVillage = form.domicileVillage ? form.domicileVillage :'';
        userData.status = form.status ? form.status :'';
      }

      const selectedRole = _.find(roles, { value: role.value });
      if (selectedRole) {
        userData.role = selectedRole.role;
        userData.facilityType = selectedRole.facilityType;
      }

      const roleValue = role && role.value ? role.value : '';

      if (roleValue !== 'SUPER_ADMIN' && roleValue !== 'VIEWER' && roleValue !== 'SECONDARY_ADMIN') {
        userData.ministry = ministry;
      }

      if (roleValue === 'LAUNCHER') {
        userData.position = position;
        userData.institutionName = institutionName;
      }

      if (roleValue === 'NOTIFIER_HF' || roleValue === 'CR_HF') {
        userData.facilityId = healthFacility.value;
      } else if (roleValue === 'NOTIFIER_EMBASSY' || roleValue === 'CR_EMBASSY') {
        userData.facilityId = embassy.value;
      } else if (roleValue === 'NOTIFIER_DISTRICT' || roleValue === 'CR_DISTRICT') {
        userData.facilityId = district.value;
        userData.residentialProvince = province.value;
        userData.residentialDistrict = district.value;
      } else if (roleValue === 'NOTIFIER_SECTOR' || roleValue === 'CR_SECTOR') {
        userData.facilityId = sector.value;
        userData.residentialProvince = province.value;
        userData.residentialDistrict = district.value;
        userData.residentialSector = sector.value;
      } else if (roleValue === 'CR_CELL') {
        userData.facilityId = cell.value;
        userData.residentialProvince = province.value;
        userData.residentialDistrict = district.value;
        userData.residentialSector = sector.value;
        userData.residentialCell = cell.value;
      }
      const { handleCreateNewUser, handleEditUser } = this.props;
      if (userId) {
        userData._id = userId;
        handleEditUser(userData, 'USERS', userId)
      } else {
        handleCreateNewUser(userData, 'USERS');
      }
    } else {
      this.setState({
        validationTriggered: true
      });
    }
  };

  render() {
    const {
      classes,
      loading
    } = this.props;

    const {
      form,
      role,
      docType,
      document,
      showAlert,
      showErrorAlert,
      errorAlertMessage,
      selectedCitizen,
      phoneNumber,
      email,
      password,
      citizenPhotoUrl,
      docNumberError,
      showErrorBorder,
      roleError,
      phoneNumberError,
      emailError,
      passwordError,
      surNameError,
      postNamesError,
      dateOfBirthError,
      nationalityError,
      sexError,
      rolesList,
      healthFacilityList,
      embassyList,
      provinceList,
      districtList,
      sectorList,
      cellList,
      userId,
      mode,
      showAlertMessage
    } = this.state;
    const title = 'RBC - FR - Create User';
    const description = 'RBC - FR - Create User';
    const roleValue = role && role.value ? role.value : '';

    const rolesListFormatted = [];
    rolesList.forEach((item) => {
      rolesListFormatted.push({
        value: item.value,
        label: item.name
      });
    });

    const healthFacilityListFormatted = [];
    healthFacilityList.forEach((item) => {
      healthFacilityListFormatted.push({
        value: item._id,
        label: item.name
      });
    });

    const embassyListFormatted = [];
    embassyList.forEach((item) => {
      embassyListFormatted.push({
        value: item._id,
        label: `${item.name} (${item.cityName})`
      });
    });

    const provinceListFormatted = [];
    provinceList.forEach((item) => {
      provinceListFormatted.push({
        value: item._id,
        label: item.name
      });
    });

    const districtListFormatted = [];
    districtList.forEach((item) => {
      districtListFormatted.push({
        value: item._id,
        label: item.name
      });
    });

    const sectorListFormatted = [];
    sectorList.forEach((item) => {
      sectorListFormatted.push({
        value: item._id,
        label: item.name
      });
    });

    const cellListFormatted = [];
    cellList.forEach((item) => {
      cellListFormatted.push({
        value: item._id,
        label: item.name
      });
    });
    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h5" className={Type.textLeft} gutterBottom>
              <span>{mode} User</span>
            </Typography>
            <Divider />
            <form className={classes.container} noValidate autoComplete="off">
              <Grid container direction="row" spacing={3}>
                <Grid item xs={4}>
                  <FormControl className={classes.formControlSelect} fullWidth>
                    <InputLabel>
                      <span>Identification Document</span>
                      <span className={classes.required}>*</span>
                    </InputLabel>
                    <ThemeProvider theme={theme}>
                      <Select
                        disabled={userId}
                        value={docType}
                        onChange={this.handleChange('docType')}
                      >
                        <MenuItem value="NID">NID (National ID)</MenuItem>
                        <MenuItem value="NID_APPLICATION_NUMBER">NID Application Number</MenuItem>
                        <MenuItem value="NIN">NIN</MenuItem>
                        <MenuItem value="OTHER">Other</MenuItem>
                      </Select>
                    </ThemeProvider>
                  </FormControl>
                </Grid>
                { docType !== 'OTHER' && !userId ?
                <Grid item xs={4}>
                  <div style={{ paddingTop: 14 }}>
                    <InputLabel>
                      <span style={{ fontSize: 10 }}>Document Number</span>
                      <span className={classes.required}>*</span>
                    </InputLabel>
                    <FormControl className={classes.formControl} fullWidth>
                      <ThemeProvider theme={theme}>
                        <AsyncSelect
                          onBlur={() => this.setState({ docNumberError: '' })}
                          loadOptions={this.handleGetCitizens}
                          onKeyDown={(e) => docInputValildation(e, docType)}
                          value={document}
                          isClearable
                          onChange={(value, triggeredAction) => { this.handleCitizenSelect(value, triggeredAction); }}
                        />
                      </ThemeProvider>
                    </FormControl>
                  </div>
                </Grid>
                : null }
                <Grid item xs={12} sm={4}>
                  <FormControl error={docNumberError !== ''} style={{ paddingTop: 40 }}>
                    <FormHelperText>{docNumberError}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                className={showErrorBorder ? classNames(classes.defaultContainer, classes.borderDanger) : classes.defaultContainer}
              >
                <Grid
                  container
                  direction="row"
                  spacing={3}
                  xs={10}
                  sm={10}
                  style={{ padding: 20 }}
                >
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl} error={surNameError !== ''} >
                      <ThemeProvider theme={theme}>
                        <TextField
                          disabled={docType !== 'OTHER'}
                          required
                          value={docType !== 'OTHER' ? (selectedCitizen && selectedCitizen.surName ? selectedCitizen.surName : '') : form.surName}
                          onChange={this.handleChange('surName')}
                          label="Surname"
                          inputProps={{
                            name: 'surName'
                          }}
                        />
                      </ThemeProvider>
                      <FormHelperText>{surNameError}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl} error={postNamesError !== ''}>
                      <ThemeProvider theme={theme}>
                        <TextField
                          disabled={docType !== 'OTHER'}
                          required
                          value={docType !== 'OTHER' ? (selectedCitizen && selectedCitizen.postNames ? selectedCitizen.postNames : '') : form.postNames}
                          onChange={this.handleChange('postNames')}
                          label="Post-Names"
                        />
                      </ThemeProvider>
                      <FormHelperText>{postNamesError}</FormHelperText>
                    </FormControl>
                  </Grid>
                  {docType !== 'OTHER' ? ( <>
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl}>
                      <ThemeProvider theme={theme}>
                        <TextField
                          disabled
                          required
                          value={selectedCitizen && selectedCitizen.dateOfBirth ? selectedCitizen.dateOfBirth : ''}
                          label="Date of Birth"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </ThemeProvider>
                    </FormControl>
                  </Grid>
                  </> ) : ( <>
                    <Grid item xs={4}>
                      <FormControl className={classes.formControl} error={dateOfBirthError !== ''}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <ThemeProvider theme={theme}>
                            <DatePicker
                              label="Date of Birth"
                              required
                              format={DATE_FORMAT}
                              value={form.dateOfBirth}
                              animateYearScrolling={false}
                              onChange={(date) => this.handleDateChange('dateOfBirth',date)}
                              autoOk
                              maxDate={moment().subtract(18, 'years')}
                            />
                          </ThemeProvider>
                        </MuiPickersUtilsProvider>
                        <FormHelperText>{dateOfBirthError}</FormHelperText>
                      </FormControl>
                    </Grid>  
                  </> )}
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl}>
                      <InputLabel>
                        <span>Marital Status</span>
                        {docType !== 'OTHER' ? (<span className={classes.required}>*</span> ) : null}
                      </InputLabel>
                      <ThemeProvider theme={theme}>
                        <Select
                          disabled={docType !== 'OTHER'}
                          value={docType !== 'OTHER' ? (selectedCitizen && selectedCitizen.maritalStatus ? selectedCitizen.maritalStatus : '') : form.maritalStatus}
                          onChange={this.handleChange('maritalStatus')}
                        >
                          <MenuItem value="SINGLE">Single</MenuItem>
                          <MenuItem value="MARRIED">Married</MenuItem>
                          <MenuItem value="WIDOWED">Widowed</MenuItem>
                          <MenuItem value="DIVORCED">Divorced</MenuItem>
                          <MenuItem value="UNKNOWN">Unknown</MenuItem>
                        </Select>
                      </ThemeProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl} error={sexError !== ''}>
                      <InputLabel>
                        <span>Sex</span>
                        <span className={classes.required}>*</span>
                      </InputLabel>
                      <ThemeProvider theme={theme}>
                        <Select
                          disabled={docType !== 'OTHER'}
                          value={docType !== 'OTHER' ? (selectedCitizen && selectedCitizen.sex ? selectedCitizen.sex : '') : form.sex}
                          onChange={this.handleChange('sex')}
                        >
                          <MenuItem value="MALE">Male</MenuItem>
                          <MenuItem value="FEMALE">Female</MenuItem>
                        </Select>
                      </ThemeProvider>
                      <FormHelperText>{sexError}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                  <FormControl fullWidth className={classes.formControl}  error={nationalityError !== ''}> 
                      <ThemeProvider theme={theme}>
                        <TextField
                          disabled={docType !== 'OTHER'}
                          required
                          label="Nationality"
                          value= {selectedCitizen && selectedCitizen.nationality ? getNationality(selectedCitizen.nationality) : form.nationality}
                          onChange={this.handleChange('nationality')}
                        />
                      </ThemeProvider>
                      <FormHelperText>{nationalityError}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl}>
                      <ThemeProvider theme={theme}>
                        <TextField
                          disabled={docType !== 'OTHER'}
                          required={docType !== 'OTHER'}
                          label="Document Number"
                          value={docType !== 'OTHER' ? (selectedCitizen && selectedCitizen.documentNumber ? selectedCitizen.documentNumber : '') : form.documentNumber}
                          onChange={this.handleChange('documentNumber')}                          
                        />
                      </ThemeProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl}>
                      <ThemeProvider theme={theme}>
                        <TextField
                          disabled={docType !== 'OTHER'}
                          required={docType !== 'OTHER'}
                          label="Country"
                          value={docType !== 'OTHER' ? (selectedCitizen && selectedCitizen.domicileCountry ? selectedCitizen.domicileCountry : '') : form.domicileCountry}
                          onChange={this.handleChange('domicileCountry')}
                        />
                      </ThemeProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl}>
                      <ThemeProvider theme={theme}>
                        <TextField
                          disabled={docType !== 'OTHER'}
                          required={docType !== 'OTHER'}
                          label="Province"
                          value={docType !== 'OTHER' ? (selectedCitizen && selectedCitizen.domicileProvince ? selectedCitizen.domicileProvince : '') : form.domicileProvince}
                          onChange={this.handleChange('domicileProvince')}
                        />
                      </ThemeProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl}>
                      <ThemeProvider theme={theme}>
                        <TextField
                          disabled={docType !== 'OTHER'}
                          required={docType !== 'OTHER'}
                          label="District"
                          value={docType !== 'OTHER' ? (selectedCitizen && selectedCitizen.domicileDistrict ? selectedCitizen.domicileDistrict : '') : form.domicileDistrict}
                          onChange={this.handleChange('domicileDistrict')}
                        />
                      </ThemeProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl}>
                      <ThemeProvider theme={theme}>
                        <TextField
                          disabled={docType !== 'OTHER'}
                          required={docType !== 'OTHER'}
                          label="Sector"
                          value={docType !== 'OTHER' ? (selectedCitizen && selectedCitizen.domicileSector ? selectedCitizen.domicileSector : '') : form.domicileSector}
                          onChange={this.handleChange('domicileSector')}
                        />
                      </ThemeProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl}>
                      <ThemeProvider theme={theme}>
                        <TextField
                          disabled={docType !== 'OTHER'}
                          required={docType !== 'OTHER'}
                          label="Cell"
                          value={docType !== 'OTHER' ? (selectedCitizen && selectedCitizen.domicileCell ? selectedCitizen.domicileCell : '') : form.domicileCell}
                          onChange={this.handleChange('domicileCell')}
                        />
                      </ThemeProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl}>
                      <ThemeProvider theme={theme}>
                        <TextField
                          disabled={docType !== 'OTHER'}
                          required={docType !== 'OTHER'}
                          label="Village"
                          value={docType !== 'OTHER' ? (selectedCitizen && selectedCitizen.domicileVillage ? selectedCitizen.domicileVillage : '') : form.domicileVillage}
                          onChange={this.handleChange('domicileVillage')}
                        />
                      </ThemeProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth className={classes.formControl}>
                      <ThemeProvider theme={theme}>
                        <TextField
                          disabled={docType !== 'OTHER'}
                          required={docType !== 'OTHER'}
                          label="Vital Status"
                          value={docType !== 'OTHER' ? (selectedCitizen && selectedCitizen.citizenStatus ? (VITAL_STATUS[selectedCitizen.citizenStatus] ? VITAL_STATUS[selectedCitizen.citizenStatus] : selectedCitizen.citizenStatus) : '') : form.citizenStatus}
                          onChange={this.handleChange('citizenStatus')}
                        />
                      </ThemeProvider>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container item xs={12} sm={2} spacing={3}>
                  <div
                    style={{
                      height: 170,
                      width: 170,
                      marginLeft: 40,
                      marginTop: 40,
                      border: '1px dashed black'
                    }}
                  >
                    {citizenPhotoUrl ? (
                      <img
                        style={{ width: '100%', height: '100%' }}
                        src={`${URL.ASSET_URL}${citizenPhotoUrl}`}
                        alt={selectedCitizen && selectedCitizen.surName}
                        onError={(e) => { e.target.src = defaultUserImg; }}
                      />
                    )
                      : (
                        <img
                          style={{ width: '100%', height: '100%' }}
                          src={defaultUserImg}
                          alt={selectedCitizen && selectedCitizen.surName}
                        />
                      )
                    }
                  </div>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={3}>
                <Grid item xs={3}>
                  <div className={classes.autoCompleteContainer}>
                    <InputLabel>
                      <span className={classes.autoCompleteLabel}>Role</span>
                      <span className={classes.required}>*</span>
                    </InputLabel>
                    <FormControl fullWidth className={classes.formControlSelect} error={roleError !== ''}>
                      <ThemeProvider theme={theme}>
                        <ReactSelect
                          menuPosition="fixed"
                          isClearable
                          value={role}
                          name="role"
                          options={rolesListFormatted}
                          onChange={(value, triggeredAction) => this.handleRoleSelect(value, triggeredAction)}
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      </ThemeProvider>
                      <FormHelperText>{roleError}</FormHelperText>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={12} sm={4}>
                  <FormControl
                    fullWidth
                    className={classes.formControlInput}
                    error={phoneNumberError !== ''}
                  >
                    <ThemeProvider theme={theme}>
                      <TextField
                        required
                        className={classes.margin}
                        minlength="10"
                        maxlength="15"
                        label="Telephone Number"
                        value={docType !== 'OTHER' ? (phoneNumber ? phoneNumber : '') : form.phoneNumber}
                        onChange={this.handleChange('phoneNumber')}
                      />
                    </ThemeProvider>
                    <FormHelperText>{phoneNumberError}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth className={classes.formControlInput} error={emailError !== ''}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        required
                        disabled={userId}
                        className={classes.margin}
                        label="Email"
                        value={docType !== 'OTHER' ? (email ? email : '') : form.email}
                        onChange={this.handleChange('email')}
                      />
                    </ThemeProvider>
                    <FormHelperText>{emailError}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth className={classes.formControlInput} error={passwordError !== ''}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        required
                        disabled={userId}
                        className={classes.margin}
                        type="password"
                        label="Password"
                        value={docType !== 'OTHER' ? (password ? password : '') : form.password}
                        onChange={this.handleChange('password')}
                      />
                    </ThemeProvider>
                    <FormHelperText>{passwordError}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
            <div className={classes.btnHolder}>
              <Button
                variant="outlined"
                color="secondary"
                href="/user-list"
                className={classes.button}
              >
                Back to Users
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                className={classes.button}
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
        <SuccessAlert
          message={showAlertMessage}
          open={showAlert}
          onClose={this.handleClose}
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
          open={loading}
        />
      </React.Fragment>
    );
  }
}

CreateUser.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCreateNewUser: PropTypes.func.isRequired,
  handleEditUser: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  handleEditNewUserClear: PropTypes.func.isRequired,
};

CreateUser.defaultProps = {
  loading: false,
  getUserResultData: {}
};

const userReducer = 'userReducer';
const mapStateToProps = state => ({
  loading: state.get(userReducer) && state.get(userReducer).loading ? state.get(userReducer).loading : false,
  userCreated: state.get(userReducer) && state.get(userReducer).userCreated ? state.get(userReducer).userCreated : '',
  userUpdated: state.get(userReducer) && state.get(userReducer).userUpdated ? state.get(userReducer).userUpdated : '',
  message: state.get(userReducer) && state.get(userReducer).message ? state.get(userReducer).message : '',
  getUserResultData: state.get(userReducer) && state.get(userReducer).resultData ? state.get(userReducer).resultData : {}
});

const mapDispatchToProps = dispatch => ({
  handleCreateNewUser: bindActionCreators(createNewUser, dispatch),
  handleEditUser: bindActionCreators(editUser, dispatch),
  handleCreateNewUserClear: bindActionCreators(createNewUserClear, dispatch),
  handleEditNewUserClear: bindActionCreators(editNewUserClear, dispatch),
  handleGetUser: bindActionCreators(getUser, dispatch),
});

const CreateUserMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);

export default withStyles(styles)(CreateUserMapped);
