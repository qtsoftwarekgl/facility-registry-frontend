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
import FormHelperText from '@material-ui/core/FormHelperText';
import _ from 'lodash';
import SuccessAlert from 'enl-components/Alerts/SuccessAlert';
import ErrorAlert from 'enl-components/Alerts/ErrorAlert';
import LoadingAlert from 'enl-components/Alerts/LoadingAlert';
import ConfirmationAlert from 'enl-components/Alerts/ConfirmationAlert';
import {
  SERVICE_TYPE_ERROR
} from './constants';
import { createService, updateService, clearStore } from './serviceActions';
import { getErrorMessage } from '../../../utils/helpers';
const styles = () => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 900,
      minWidth: 900
    },
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
    status: 'ACTIVE',
  },
  error: {
    name: '',
    status: ''
  },
  id: '',
  created: false,
  showScuccessModel: false,
  showErrorModel: false,
  showConfirmModel: false,
  alertMessage: '',
  confirmAlertMessage: '',
  serviceCreatedStatus: '',
  serviceUpdateStatus: '',
  showLoadingModel: false,
  hasUpdateHappened: false
};

class ServiceCreateModel extends Component {
  constructor(props) {
    super(props);
    this.state = _.cloneDeep(initialState);
  }

  componentDidMount() {
    this.setState(initialState);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { handleServiceClearStore } = nextProps;
    const updatedState = {};
    if (nextProps.serviceCreatedStatus === 'ok' && nextProps.serviceCreatedStatus !== prevState.serviceCreatedStatus && !formSubmit) {
      formSubmit = true;
      updatedState.showScuccessModel = true;
      updatedState.showLoadingModel = false;
      updatedState.serviceCreatedStatus = nextProps.serviceCreatedStatus;
      updatedState.alertMessage = 'New Service created successfully.';
    }

    if (nextProps.serviceUpdateStatus === 'ok' && nextProps.serviceUpdateStatus !== prevState.serviceUpdateStatus && !formSubmit) {
      formSubmit = true;
      updatedState.showScuccessModel = true;
      updatedState.showLoadingModel = false;
      updatedState.serviceUpdateStatus = nextProps.serviceUpdateStatus;
      updatedState.alertMessage = 'Service updated successfully.';
    }

    if (nextProps.serviceCreatedStatus === 'error') {
      formSubmit = true;
      updatedState.showErrorModel = true;
      updatedState.showLoadingModel = false;
      updatedState.serviceCreatedStatus = nextProps.serviceCreatedStatus;
      updatedState.alertMessage = getErrorMessage(nextProps.errorMessage);
      handleServiceClearStore();
    }

    if (nextProps.serviceUpdateStatus === 'error') {
      formSubmit = true;
      updatedState.showErrorModel = true;
      updatedState.showLoadingModel = false;
      updatedState.serviceUpdateStatus = nextProps.serviceUpdateStatus;
      updatedState.alertMessage = getErrorMessage(nextProps.errorMessage);
      handleServiceClearStore();
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
        status: data.status
      };
      updatedState.id = nextProps.editData._id;
    }
    return updatedState;
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
    if ( name === 'name') {
      stateCopy.form[name] = value;
      stateCopy.error[name] = '';
      this.setState(stateCopy);
    }
  }

  handleChangeDropdown = (selected, actionType, name) => {
    const stateCopy = _.cloneDeep(this.state);
    const { action } = actionType;
    if (action) {
      stateCopy.hasUpdateHappened = true;
      this.setState(stateCopy);
    }
  }

  handleValidation = () => {
    let validation = true;
    const stateCopy = _.cloneDeep(this.state);
    const { form } = stateCopy;

    if (!form.name || form.name === '') {
      stateCopy.error.name = SERVICE_TYPE_ERROR;
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
    const serviceData = _.cloneDeep(this.state);
    const { form } = serviceData;
    this.setState({ showConfirmModel: false, showLoadingModel: true });
    const { id } = this.state;
    const { handleCreateService, handleUpdateService } = this.props;
    if (id) {
      handleUpdateService(id, form);
    } else {
      handleCreateService(form);
    }
  }

  handleSubmit = () => {
    const { id } = this.state;
    if (this.handleValidation()) {
      if (id) {
        this.setState({ showConfirmModel: true, confirmAlertMessage: 'Do you want to update this record' });
      } else {
        this.setState({ showConfirmModel: true, confirmAlertMessage: 'Do you want to add new Service' });
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
    const { classes, open } = this.props;
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
      hasUpdateHappened
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
              {id ? 'Edit Services' : 'Create Services'}
            </DialogTitle>
            <form>
              <Grid container direction="row" spacing={6} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={6} sm={6}>
                  <FormControl error={error.name} className={classes.formControl} fullWidth>
                    <ThemeProvider theme={theme}>
                      <TextField
                        id="filled-basic"
                        label="Service Name"
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

ServiceCreateModel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  handleUpdateService: PropTypes.func.isRequired,
  handleCreateService: PropTypes.func.isRequired,
};

ServiceCreateModel.defaultProps = {
};

const serviceReducer = 'serviceReducer';

const mapStateToProps = state => ({
  serviceCreatedStatus: state.get(serviceReducer) && state.get(serviceReducer).serviceCreatedStatus ? state.get(serviceReducer).serviceCreatedStatus : '',
  serviceUpdateStatus: state.get(serviceReducer) && state.get(serviceReducer).serviceUpdateStatus ? state.get(serviceReducer).serviceUpdateStatus : '',
  errorMessage: state.get(serviceReducer) && state.get(serviceReducer).errorMessage ? state.get(serviceReducer).errorMessage : ''
});

const mapDispatchToProps = dispatch => ({
  handleCreateService: bindActionCreators(createService, dispatch),
  handleUpdateService: bindActionCreators(updateService, dispatch),
  handleServiceClearStore: bindActionCreators(clearStore, dispatch)
});

const ServiceCreateModelMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceCreateModel);

export default withStyles(styles)(ServiceCreateModelMapped);
