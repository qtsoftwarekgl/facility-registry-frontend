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
import Button from '@material-ui/core/Button';
import LoadingAlert from 'enl-components/Alerts/LoadingAlert';
import Typography from '@material-ui/core/Typography';
import Type from 'enl-styles/Typography.scss';
import Divider from '@material-ui/core/Divider';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import EnhancedTable from '../Pages/Table/EnhancedTable';
import styles from './facilitytc-list-jss';
import DeleteModal from './DeleteModal';
import { fetchFacilitytcList } from './FacilitytcActions';
import {
  PAGE, LIMIT
} from '../../lib/constants';
import API from '../../config/axiosConfig';
import * as URL from "../../lib/apiUrls"
import { userProfile } from '../Login/authActions';
import _ from 'lodash';
import { Alert, AlertTitle } from '@material-ui/lab';
import { InputLabel } from '@material-ui/core';
import SelectDropdown from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const headCells = [
  {
    id: 'createdAt', numeric: false, show: true, label: 'Created Date-Time', isDate: true
  },
  {
    id: 'updatedAt', numeric: false, show: true, label: 'Uppdated Date-Time', isDate: true
  },
  {
    id: 'type', numeric: false, show: true, label: 'Type'
  },
  {
    id: 'name', numeric: false, show: true, label: 'Name'
  },
  {
    id: 'status', numeric: false, show: true, label: 'Status'
  },
  {
    id: 'actions', numeric: false, show: true, isAction: true, label: 'Actions', actionType: "edit"
  }
];

const theme = createMuiTheme({
  palette: {
    primary: lightBlue
  },
  spacing: 1
});

class FacilityTC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertMessage: '',
      page: PAGE,
      limit: LIMIT,
      showDeleteModal: false,
      showActionModal: false,
      actionData: null,
      facilityTCData: [],
      userName: '',
      actionToPerfom: 'add',
      deleteModal: false,
      showAlert: true,
      alertType: "",
      alertMessage: "",
      name: '',
      optionType: "FACILITY_CATEGORY",
      id: "",
      entity: '',
      ip: '',
      action: '',
      fromDate: null,
      toDate: null,
      facilityCode: '',
      toolTipOpen: false,
    };
    this.handleAction = this.handleAction.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { handleFetchFacilitytc } = this.props;
    const { page, limit } = this.state;
    handleFetchFacilitytc({ page, limit });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const updatedState = {};
    const {
      handleFetchFacilitytc,
      profileData,
      handleUserProfile
    } = nextProps;
    const {
      page, limit
    } = prevState;
    let callUserList = false;

    if (callUserList) {
      const {
        userName,
        entity,
        action,
        ip,
        fromDate,
        toDate,
        facilityCode
      } = prevState;
      const params = {
        page,
        limit,
        userName,
        entity,
        ip,
        action,
        fromDate,
        toDate,
        facilityCode
      };
      handleFetchFacilitytc(params);
    }
    if (!profileData) {
      handleUserProfile();
    } else {
      updatedState.profileData = profileData;
      if (profileData.role === 'VIEWER') {
        headCells[10].show = false; // Status
        headCells[11].actionType = 'view'; // Actions
      }
    }
    return updatedState;
  }

  handleAction = (action, rowData) => {
    if (action === 'view') {
      this.setState({
        name: "",
        actionToPerfom: "add",
        showAlert: true,
        alertType: "warning",
        alertMessage: "There is no more Information to Expand. Everything Displayed in the Table"
      })

      setTimeout(() => {
        this.setState({
          name: "",
          actionToPerfom: "add",
          showAlert: false,
          alertType: "",
          alertMessage: ""
        })
      }, 3000)
    }

    if (action === "edit") {
      this.setState({
        actionData: rowData,
        name: rowData.name,
        optionType: rowData.type,
        id: rowData._id,
        actionToPerfom: "update",
      })
    }

    if (action === "delete") {
      this.setState({
        actionData: rowData,
        name: rowData.name,
        optionType: rowData.type,
        id: rowData._id,
        actionToPerfom: "delete",
        showDeleteModal: true,
        actionData: rowData
      });
    }
  }



  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handlePageChange = (newPage) => {
    const { handleFetchFacilitytc } = this.props;
    const {
      limit,
      userName,
      entity,
      ip,
      action,
      fromDate,
      toDate,
      facilityCode
    } = this.state;
    const params = {
      page: newPage,
      limit,
      userName,
      entity,
      action,
      ip,
      fromDate,
      toDate,
      facilityCode
    };
    handleFetchFacilitytc(params);
    this.setState({
      page: newPage
    });
  }

  handleTooltipClose = () => {
    this.setState({ toolTipOpen: false });
  };


  render() {
    const { classes, facilitytcList, count, loading, profileData } = this.props;
    const title = brand.name;
    const description = brand.desc;
    const {
      page,
      showDeleteModal,
      actionData,
      name,
      actionToPerfom,
      showAlert,
      alertType,
      id,
      alertMessage,
      optionType,
      toolTipOpen,
    } = this.state;


    const showAlertCtl = ({ type, message }) => {
      this.setState({
        showAlert: true,
        alertType: type,
        alertMessage: message
      })

      setTimeout(() => {
        this.setState({
          showAlert: false,
          alertType: "",
          alertMessage: ""
        })
      }, 5000)
    }


    const handleCtlBtn = () => {
      if (!name || name === "") {
        return showAlertCtl({ type: "error", message: "name required" })
      }

      const timeStamp = new Date().toISOString()

      if (actionToPerfom === "add") {
        API.post(URL.FACILITY_TC, {
          name,
          status: "ACTIVE",
          type: optionType
        })
          .then((response) => {
            if (response.data) {
              this.setState({
                name: "",
                actionToPerfom: "add"
              })
              return showAlertCtl({ type: "success", message: `Facility ${response.data.type === "FACILITY_CATEGORY" ? "category" : "type"} called ${response.data.name} saved successfull !!` })
            } else {
              return showAlertCtl({ type: "error", message: "Something went wrong! Please contact system support team." })
            }

          })
          .catch((_) => {
            return showAlertCtl({ type: "error", message: "Something went wrong! Please contact system support team." })
          })
      }

      if (actionToPerfom === "update") {
        API.put(`${URL.FACILITY_TC}/${id}`, {
          name,
          status: "ACTIVE",
          type: optionType
        })
          .then((response) => {
            if (response.data) {
              this.setState({
                name: "",
                actionToPerfom: "add"
              })
              return showAlertCtl({ type: "success", message: `Facility ${response.data.type === "FACILITY_CATEGORY" ? "category" : "type"} called ${response.data.name} updated successfull !!` })
            } else {
              return showAlertCtl({ type: "error", message: "Something went wrong! Please contact system support team." })
            }

          })
          .catch((_) => {
            return showAlertCtl({ type: "error", message: "Something went wrong! Please contact system support team." })
          })
      }

      if (actionToPerfom === "delete") {
        API.put(`${URL.FACILITY_TC}/${id}`, {
          name,
          status: "DELETED",
          type: optionType
        })
          .then((response) => {
            if (response.data) {
              this.setState({
                name: "",
                actionToPerfom: "add"
              })
              return showAlertCtl({ type: "success", message: `Facility ${response.data.type === "FACILITY_CATEGORY" ? "category" : "type"} called ${response.data.name} deleted successfully!` })
            } else {
              return showAlertCtl({ type: "error", message: "Something went wrong! Please contact system support team. 1" })
            }

          })
          .catch((_) => {
            return showAlertCtl({ type: "error", message: "Something went wrong! Please contact system support team. 2" })
          })
      }
    }

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
            <span>Facility Type</span>
          </Typography>
          <Divider style={{ width: '100%' }} />
          <Grid container spacing={1}>
            <Grid container item xs={12} sm={9}>
              <Grid container spacing={1} style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} style={{ paddingRight: 8, paddingLeft: 8 }}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        className={classes.margin}
                        label="Name"
                        value={name}
                        onChange={this.handleChange('name')}
                      />
                    </ThemeProvider>
                  </FormControl>
                </Grid>


                <Grid item xs={4} sm={4}>
                  <FormControl className={classes.formControl}>
                    <ThemeProvider theme={theme}>
                      <InputLabel>
                        option
                        <span style={{ color: '#db3131' }}>*</span>
                      </InputLabel>

                      <SelectDropdown
                        value={optionType}
                        onChange={this.handleChange('optionType')}
                        inputProps={{
                          name: 'category'
                        }}
                        required
                      >
                        <MenuItem value={"FACILITY_CATEGORY"}>{"FACILITY_CATEGORY"}</MenuItem>
                        <MenuItem value={"FACILITY_TYPE"}>{"FACILITY_TYPE"}</MenuItem>
                      </SelectDropdown>
                    </ThemeProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={4}  >
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
                        onClick={() => handleCtlBtn()}
                        style={{ width: 100 }}
                        variant="contained"
                        color="primary"
                        className={classes.buttonSearch}
                        size="small"
                      >
                        {actionToPerfom === "add" ? actionToPerfom : actionToPerfom === "delete" ? "delete" : "update"}
                      </Button>
                    </Tooltip>
                  </ClickAwayListener>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </PapperBlock>

        {
          showAlert && (
            <Alert severity={alertType} style={{ marginBottom: 20 }}>
              <AlertTitle>{alertType}</AlertTitle>
              {alertMessage}
            </Alert>
          )
        }
        <div>
          <EnhancedTable
            multiselect
            loading={loading}
            tableTitle="AuditLog"
            page={page}
            headCells={headCells}
            rows={facilitytcList}
            totalData={count || 0}
            onPageChange={(newPage) => this.handlePageChange(newPage)}
            onActionClicked={(action, rowData) => this.handleAction(action, rowData)}
            // download={(headers) => this.exportCsv(headers)}
            profileData={profileData}
          />
        </div>
        <DeleteModal
          open={showDeleteModal}
          handleCtlBtn={()=> handleCtlBtn()}
          onClose={() => {
            this.setState({
              showDeleteModal: false,
            });
          }}
          auditData={actionData}
        />
        <LoadingAlert
          open={loading}
        />
      </div>
    );
  }
}

FacilityTC.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFetchFacilitytc: PropTypes.func.isRequired,
  facilitytcList: PropTypes.array,
  count: PropTypes.number,
  loading: PropTypes.bool,
};

FacilityTC.defaultProps = {
  facilitytcList: [],
  count: 0,
  loading: false,
};

const facilitytcReducer = 'facilitytcReducer';
const adminAuthReducer = 'adminAuthReducer';
const mapStateToProps = state => ({
  loading: state.get(facilitytcReducer) && state.get(facilitytcReducer).loading ? state.get(facilitytcReducer).loading : false,
  facilitytcList: state.get(facilitytcReducer) && state.get(facilitytcReducer).facilitytcList ? state.get(facilitytcReducer).facilitytcList : [],
  count: state.get(facilitytcReducer) && state.get(facilitytcReducer).count ? state.get(facilitytcReducer).count : 0,
  profileData: state.get(adminAuthReducer) && state.get(adminAuthReducer).profileData ? state.get(adminAuthReducer).profileData : null
});

const mapDispatchToProps = dispatch => ({
  handleFetchFacilitytc: bindActionCreators(fetchFacilitytcList, dispatch),
  handleUserProfile: bindActionCreators(userProfile, dispatch)
});

const FacilityListMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilityTC);

export default withStyles(styles)(FacilityListMapped);
