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
import LoadingAlert from 'enl-components/Alerts/LoadingAlert';
import Typography from '@material-ui/core/Typography';
import Type from 'enl-styles/Typography.scss';
import Divider from '@material-ui/core/Divider';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import EnhancedTable from '../Pages/Table/EnhancedTable';
import styles from './user-list-jss';
import UserViewModal from './AuditViewModal';
import { fetchAuditList } from './AuditListActions';
import {
  PAGE, LIMIT
} from '../../lib/constants';
import API from '../../config/axiosConfig';
import * as URL from '../../lib/apiUrls';
import { userProfile } from '../Login/authActions';
import moment from 'moment';
import {DATE_TIME_FORMAT, DATE_FORMAT} from '../../lib/constants'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import _ from 'lodash';

const headCells = [
  {
    id: 'createdAt', numeric: false, show: true, label: 'Created Date-Time', isDate: true
  },
  {
    id: 'userName', numeric: false, show: true, label: 'User Name'
  },
  {
    id: 'entity', numeric: false, show: true, label: 'Entity'
  },
  {
    id: 'path', numeric: false, show: true, label: 'Path'
  },
  {
    id: 'action', numeric: false, show: true, label: 'Action'
  },
  {
    id: 'facilityCode', numeric: false, show: true, label: 'Facility Code'
  },
  {
    id: 'actions', numeric: false, show: true, isAction: true, label: 'Actions', actionType: 'view'
  }
];

const theme = createMuiTheme({
  palette: {
    primary: lightBlue
  },
  spacing: 1
});

class AuditList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertMessage: '',
      page: PAGE,
      limit: LIMIT,
      showUserViewModal: false,
      showActionModal: false,
      actionData: null,
      userName: '',
      entity: '',
      ip: '',
      action: '',
      fromDate:null,
      toDate:null,
      facilityCode:'',
      toolTipOpen: false,
    };
    this.handleAction = this.handleAction.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { handleFetchAuditList } = this.props;
    const { page, limit } = this.state;
    handleFetchAuditList({ page, limit });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const updatedState = {};
    const {
      handleFetchAuditList,
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
      handleFetchAuditList(params);
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
    if (action === 'view') {
      this.setState({
        showUserViewModal: true,
        actionData: rowData
      });
    }
  }

  exportCsv = async (headers) => {
    let params = {};
    const {
      userName,
      entity,
      ip,
      action,
      fromDate,
      toDate,
      facilityCode
    } = this.state;
    if (userName || entity || ip || action || fromDate || toDate || facilityCode) {
      params = {
        userName,
        entity,
        action,
        ip,
        fromDate,
        toDate,
        facilityCode
      };
    }
    params.skipPagination = true;
    const res = await API.get(URL.AUDIT_LOGS, { data: {}, params })
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
          if(key === 'createdAt'){
            formatData.push(moment(row[key]).format(DATE_TIME_FORMAT));
          } else {
            formatData.push(row[key]);
          }
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
    hiddenElement.download = `audit-logs-${+new Date()}.csv`;
    hiddenElement.click();
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handlePageChange = (newPage) => {
    const { handleFetchAuditList } = this.props;
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
    handleFetchAuditList(params);
    this.setState({
      page: newPage
    });
  }

  handleSearch = () => {
    const { handleFetchAuditList } = this.props;
    const {
      userName,
      entity,
      ip,
      action,
      fromDate,
      toDate,
      facilityCode
    } = this.state;
    if (userName || entity || ip || action || fromDate || toDate || facilityCode) {
      this.setState({
        page: PAGE,
        limit: LIMIT
      });
      const params = {
        page: PAGE,
        limit: LIMIT,
        userName,
        entity,
        action,
        ip,
        fromDate,
        toDate,
        facilityCode
      };
      handleFetchAuditList(params);
    } else {
      this.setState({ toolTipOpen: true });
    }
  }

  handleTooltipClose = () => {
    this.setState({ toolTipOpen: false });
  };

  handleClearFilters = () => {
    this.setState({
      userName: '',
      entity: '',
      ip: '',
      action: '',
      fromDate: null,
      toDate: null,
      facilityCode: ''
    });
    const { handleFetchAuditList } = this.props;
    const { page, limit } = this.state;
    handleFetchAuditList({ page, limit });
  }

  handleDateChange = (name, date) => {
    const stateCopy = _.cloneDeep(this.state);
    const dateCopy = new Date(date);
    if(name === 'fromDate'){
      dateCopy.setDate(dateCopy.getDate() + 1);
      stateCopy.fromDate= date;
      stateCopy.toDate= dateCopy;
      this.setState(stateCopy);
    }
    if(name === 'toDate'){
      stateCopy.toDate= date;
      this.setState(stateCopy);
    }
    
  }
  render() {
    const {
      classes, auditList, count, loading, profileData
    } = this.props;
    const title = brand.name;
    const description = brand.desc;
    const {
      page,
      showUserViewModal,
      actionData,
      userName,
      entity,
      action,      
      fromDate,
      toDate,
      facilityCode,
      toolTipOpen,
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
            <span>Audit Log List</span>           
          </Typography>
          <Divider style={{ width: '100%' }} />
          <Grid container spacing={1}>
            <Grid container item xs={12} sm={9}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} style={{ paddingRight: 8, paddingLeft: 8 }}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        className={classes.margin}
                        label="User Name"
                        value={userName}
                        onChange={this.handleChange('userName')}
                      />
                    </ThemeProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} style={{ paddingRight: 8, paddingLeft: 8 }}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        className={classes.margin}
                        label="Entity"
                        value={entity}
                        onChange={this.handleChange('entity')}
                      />
                    </ThemeProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} style={{ paddingRight: 8, paddingLeft: 8 }}>
                    <InputLabel>Action</InputLabel>
                      <ThemeProvider theme={theme}>
                        <Select
                          value={action}
                          onChange={this.handleChange('action')}
                          inputProps={{
                            name: 'action'
                          }}
                        >
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="LOGIN">LOGIN</MenuItem>
                          <MenuItem value="GET">GET</MenuItem>
                          <MenuItem value="ADD">ADD</MenuItem>
                          <MenuItem value="UPDATE">UPDATE</MenuItem>
                          <MenuItem value="DELETE">DELETE</MenuItem>
                        </Select>
                      </ThemeProvider>
                  </FormControl>
                </Grid>
              </Grid>              
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                <FormControl className={classes.formControl} style={{ paddingRight: 8, paddingLeft: 8 }}>                    
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                      <ThemeProvider theme={theme}>
                        <DatePicker
                          label="From Date"
                          format={DATE_FORMAT}
                          value={fromDate ? fromDate : null}
                          onChange={(date) => this.handleDateChange('fromDate', date)}
                          animateYearScrolling={false}
                          // maxDate={fromDate || new Date()}
                          autoOk
                        />
                      </ThemeProvider>
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <FormControl className={classes.formControl} style={{ paddingRight: 8, paddingLeft: 8 }}>                    
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                      <ThemeProvider theme={theme}>
                        <DatePicker
                          label="To Date"
                          format={DATE_FORMAT}
                          value={toDate ? toDate :null}
                          onChange={(date) => this.handleDateChange('toDate', date)}
                          animateYearScrolling={false}
                          // maxDate={toDate || new Date()}
                          autoOk
                        />
                      </ThemeProvider>
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <FormControl className={classes.formControl} style={{ paddingRight: 8, paddingLeft: 8 }}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        className={classes.margin}
                        label="Facility Code"
                        value={facilityCode}
                        onChange={this.handleChange('facilityCode')}
                      />
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
            tableTitle="AuditLog"
            page={page}
            headCells={headCells}
            rows={auditList}
            totalData={count || 0}
            onPageChange={(newPage) => this.handlePageChange(newPage)}
            onActionClicked={(action, rowData) => this.handleAction(action, rowData)}
            // download={(headers) => this.exportCsv(headers)}
            profileData={profileData}
          />
        </div>
        <UserViewModal
          open={showUserViewModal}
          onClose={() => {
            this.setState({
              showUserViewModal: false
            });
          }}
          auditData={actionData}
        />                      
        <LoadingAlert
          open={ loading }
        />
      </div>
    );
  }
}

AuditList.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFetchAuditList: PropTypes.func.isRequired,
  auditList: PropTypes.array,
  count: PropTypes.number,
  loading: PropTypes.bool,
};

AuditList.defaultProps = {
  auditList: [],
  count: 0,
  loading: false,
};

const auditListReducer = 'auditListReducer';
const adminAuthReducer = 'adminAuthReducer';
const mapStateToProps = state => ({
  loading: state.get(auditListReducer) && state.get(auditListReducer).loading ? state.get(auditListReducer).loading : false,
  auditList: state.get(auditListReducer) && state.get(auditListReducer).auditList ? state.get(auditListReducer).auditList : [],
  count: state.get(auditListReducer) && state.get(auditListReducer).count ? state.get(auditListReducer).count : 0,
  profileData: state.get(adminAuthReducer) && state.get(adminAuthReducer).profileData ? state.get(adminAuthReducer).profileData : null
});

const mapDispatchToProps = dispatch => ({
  handleFetchAuditList: bindActionCreators(fetchAuditList, dispatch),
  handleUserProfile: bindActionCreators(userProfile, dispatch)
});

const AuditListMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditList);

export default withStyles(styles)(AuditListMapped);
