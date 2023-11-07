import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/styles";
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { FormControl, FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { uploadFile, uploadFileClear } from '../../App/CommonRedux/upload/actions';
import SuccessAlert from 'enl-components/Alerts/SuccessAlert';
import UploadErrorAlert from '../../../components/Alerts/UploadErrorAlert';
import LoadingAlert from 'enl-components/Alerts/LoadingAlert';
import xlsx from 'xlsx';
import { REGEX } from '../../../lib/constants';

const fileInput = React.createRef();

const styles = () => ({
  root: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: 900,
      minWidth: 900,
    },
  },
  titleRoot: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    marginLeft: 10,
  },
  label_head: {
    fontWeight: "bold",
    fontSize: "1.125rem",
    borderBottom: "1px dashed #C0C0C0",
  },
  activeChip: {
    minWidth: 90,
    backgroundColor: "#2e8e0f",
  },
  inactiveChip: {
    minWidth: 90,
    backgroundColor: "#8c8989",
  },
  deletedChip: {
    minWidth: 90,
    backgroundColor: "#b92b2b",
  },
  table: {
    minWidth: 500,
    marginTop: 15,
  },
})
let formSubmit = false;

class UploadModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      uploadedFilePath: '',
      uploadedFileError: '',
      showLoadingModel: false,
      loadingMessage: '',
      showErrorAlert: false,
      errorAlertMessage: '',
      errorAlertData: [],
      UploadedFileName: '',
      showScuccessModel: false,
      formData: null,
      showErrorContent: ""
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const updatedState = {};
    const {
      handleUploadFileClear,
      fileUploaded,
      message,
      fileUploadErrorData,
      fileUploadErrorMessage
    } = nextProps;

    if (fileUploaded === 'ok') {
      formSubmit = true;
      updatedState.showLoadingModel = false
      updatedState.showScuccessModel = true;
      updatedState.alertMessage = message;
      updatedState.uploadedFileError = '';
      updatedState.UploadedFileName = ''

      handleUploadFileClear();
    }
    if (fileUploaded === 'error') {
      formSubmit = true;
      updatedState.showErrorModel = true
      updatedState.errorAlertMessage = fileUploadErrorMessage
      updatedState.errorAlertData = fileUploadErrorData
      updatedState.showLoadingModel = false
      handleUploadFileClear();
    }
    return updatedState;
  }

  handleAlertClose = () => {
    const { onClose } = this.props;
    formSubmit = false;
    this.setState(
      { showScuccessModel: false },
      onClose(),
    )
  }

  handleFormClose = () => {
    const { onClose } = this.props;
    formSubmit = false
    this.setState(
      { uploadedFileError: '', UploadedFileName: '' },
      onClose(),
    );
  }

  handleUpload = () => {
    const { handleUploadFile } = this.props;
    const { dataToSave } = this.state;
    this.setState({
      showLoadingModel: true,
    })
    handleUploadFile(dataToSave);
  }

  handleFileUpload = (event) => {
    const { files } = event.target;
    const format = /(\.XLSX)$/i;
    if (files) {
      const fileName = files[0].name;
      this.setState({
        UploadedFileName: fileName
      })
      if (format.exec(fileName)) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        console.log("event.target.files[0]--", event.target.files[0])
        this.setState({
          formData: formData
        })
      } else {
        event.target.value = ''; // eslint-disable-line
        this.setState({
          // showErrorAlert: true,
          uploadedFileError: 'Please select a valid file. Only xlsx are allowed.',
        });
      }
    } else {
      this.setState({
        // showErrorAlert: true,
        uploadedFileError: 'Please select a valid file.',
      });
    }
  }

  readUploadFile = (e) => {
    e.preventDefault();
    const { files } = event.target;
    const format = /(\.XLSX)$/i;
    if (files) {
      const fileName = files[0].name;
      this.setState({
        UploadedFileName: fileName,
        showLoadingModel: true,
        loadingMessage: "Please Wait! Data is Validating..."
      })
    } else {
      this.setState({
        // showErrorAlert: true,
        uploadedFileError: 'Please select a valid file.',
      });
    }
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = xlsx.utils.sheet_to_json(worksheet, {raw:false,dateNF:'yyyy-mm-dd'});
        const dataToSave = [];
        const validData = [];
        const invalidData = [];
        const resultData = {
          totalRecords: excelData.length,
          validData: [],
          invalidData: [],
        };
        if (excelData.length) {
          this.setState({
            showLoadingModel: false,
          })
          excelData.forEach((row, index) => {
            let data = { rowData: {}, errorFields: [] };
            if ((!row.name || !REGEX.STRING.test(row.name))) {
              data.errorFields.push({ field: 'name', error: 'Please enter valid name!' });
            }
            if ((!row.latitude || !REGEX.NUMBER.test(row.latitude))) {
              data.errorFields.push({ field: 'latitude', error: 'Please enter valid latitude!' });
            }
            if ((!row.longitude || !REGEX.NUMBER.test(row.longitude))) {
              data.errorFields.push({ field: 'longitude', error: 'Please enter valid longitude!' });
            }
            if ((!row.category || !REGEX.STRING.test(row.category))) {
              data.errorFields.push({ field: 'category', error: 'Please enter valid category!' });
            }
            if ((!row.type || !REGEX.STRING.test(row.type))) {
              data.errorFields.push({ field: 'type', error: 'Please enter valid type!' });
            }
            if ((!row.province || !REGEX.STRING.test(row.province))) {
              data.errorFields.push({ field: 'province', error: 'Please enter valid province!' });
            }
            if ((!row.district || !REGEX.STRING.test(row.district))) {
              data.errorFields.push({ field: 'district', error: 'Please enter valid district!' });
            }
            if ((!row.sector || !REGEX.STRING.test(row.sector))) {
              data.errorFields.push({ field: 'sector', error: 'Please enter valid sector!' });
            }
            if ((!row.cell || !REGEX.STRING.test(row.cell))) {
              data.errorFields.push({ field: 'cell', error: 'Please enter valid cell!' });
            }
            if ((!row.village || !REGEX.STRING.test(row.village))) {
              data.errorFields.push({ field: 'village', error: 'Please enter valid village!' });
            }
            if ((!row.facilityOpeningDate || !REGEX.DATE.test(row.facilityOpeningDate))) {
              data.errorFields.push({ field: 'facilityOpeningDate', error: 'Please enter valid facility opening date(YYYY-MM-DD)' });
            }
            // if ((!row.facilityClosingDate || !REGEX.DATE.test(row.facilityClosingDate))) {
            //   data.errorFields.push({ field: 'facilityClosingDate', error: 'Please enter valid facilityClosingDate!' });
            // }
            if ((!row.email || !REGEX.EMAIL.test(row.email))) {
              data.errorFields.push({ field: 'email', error: 'Please enter valid email!' });
            }
            if ((!row.status || !REGEX.STRING.test(row.status))) {
              data.errorFields.push({ field: 'status', error: 'Please enter valid status!' });
            }

            data.rowData.index = index + 2
            data.rowData.name = row.name;
            if (data.errorFields.length) {
              invalidData.push(data);
            } else {
              validData.push(data);
              dataToSave.push(row)
            }
          });

          resultData.validData = validData;
          resultData.invalidData = invalidData;
          this.setState({
            resultData: resultData,
            dataToSave: dataToSave
          })
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  render() {
    const { open, classes } = this.props;
    const { uploadedFileError, UploadedFileName, showScuccessModel, alertMessage, resultData, showErrorContent, dataToSave, showLoadingModel, errorAlertMessage, errorAlertData, showErrorModel, loadingMessage } = this.state;
    return (
      <React.Fragment>
        <div>
          <Dialog
            open={open}
            onClose={this.handleFormClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            className={classes.root}
          >
            <DialogContent>
              <Grid item xs={6}>
                <div style={{ paddingTop: 25, float: "left" }}>
                  <FormControl
                    className={classes.formControlInput}
                    fullWidth
                    error={uploadedFileError !== ""}
                  >
                    <ThemeProvider>
                      <input
                        style={{ display: "none" }}
                        ref={fileInput}
                        type="file"
                        onChange={this.readUploadFile}
                      />
                      {UploadedFileName}
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          fileInput.current.click();
                        }}
                      >
                        <PictureAsPdfIcon />
                        <span
                          style={{
                            paddingLeft: 10,
                            textTransform: "capitalize",
                          }}
                        >
                          Upload Document
                        </span>
                      </Button>
                    </ThemeProvider>

                    {UploadedFileName && !showLoadingModel ?
                      (<ThemeProvider>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} style={{ "margin-top": "5px" }}>
                            <span style={{ color: "blue" }}>Total Records Count: {resultData && resultData.totalRecords ? resultData.totalRecords : 0}</span>
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <span style={{ color: "green" }}>Valid Records Count: {resultData && resultData.validData.length ? resultData.validData.length : 0}</span>
                            <button style={{ "font-size": "11px", "font-weight": 600, "margin-left": "5px" }} onClick={() => { this.setState({ showErrorContent: (showErrorContent == "success" ? "" : "success") }); }}>{showErrorContent == "success" ? "Close" : "Show Details"}</button>
                            {showErrorContent == "success" ?
                              (
                                <div style={{ "margin-top": "5px", "max-height": "330px", "overflow": "scroll" }}>
                                  {
                                    resultData && resultData.validData.map((item) => (
                                      <div style={{ "border": "1px solid green", "margin-bottom": "5px", "padding": "8px" }}>
                                        <p style={{ "margin": "0px", "font-size": "13px", "font-weight": "600" }}>Facility Name: {item.rowData.name}</p>
                                      </div>
                                    ))
                                  }
                                </div>
                              ) : null
                            }
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <span style={{ color: "red" }}>In-Valid Records Count: {resultData && resultData.invalidData.length ? resultData.invalidData.length : 0}</span>
                            <button style={{ "font-size": "11px", "font-weight": 600, "margin-left": "5px" }} onClick={() => { this.setState({ showErrorContent: (showErrorContent == "error" ? "" : "error") }); }}>{showErrorContent == "error" ? "Close" : "Show Details"}</button>
                            {showErrorContent == "error" ?
                              (
                                <div style={{ "margin-top": "5px", "max-height": "330px", "overflow": "scroll" }}>
                                  {
                                    resultData && resultData.invalidData.map((item) => (
                                      <div style={{ "border": "1px solid red", "margin-bottom": "5px", "padding": "5px" }}>
                                        <p style={{ "margin": "0px", "font-size": "13px", "font-weight": "600" }}>Facility Name: {item.rowData.name}</p>
                                        <p style={{ "margin": "0px", "font-size": "13px", "font-weight": "600" }}>Row Number: {item.rowData.index}</p>
                                        <p style={{ "margin": "0px", "font-size": "13px" }}>
                                          {
                                            item && item.errorFields.map((error) => (
                                              <p style={{ "margin": "0px", "font-size": "13px" }}><span>Field: {error.field}</span><span style={{ "padding-left": "20px" }}>Error: {error.error}</span></p>
                                            ))
                                          }
                                        </p>
                                      </div>
                                    ))
                                  }
                                </div>
                              ) : null
                            }
                          </Grid>
                        </Grid>

                      </ThemeProvider>)
                      : null}

                    <FormHelperText>{uploadedFileError}</FormHelperText>
                  </FormControl>
                </div>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleUpload} color="primary" variant="outlined" disabled={dataToSave && dataToSave.length == 0}>
                Upload
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
          <LoadingAlert
            open={showLoadingModel}
            message={loadingMessage ? loadingMessage : ''}
          />
          <UploadErrorAlert
            message={errorAlertMessage}
            data={errorAlertData}
            open={showErrorModel}
            onClose={() => {
              this.setState({
                showErrorModel: false,
                errorAlertData: [],
                errorAlertMessage: ''
              });
            }}
          />
        </div>
      </React.Fragment>
    );

  }

};

UploadModel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleUploadFile: PropTypes.func.isRequired,
  loading: false,
  classes: PropTypes.object.isRequired,
};

const uploadFileReducer = 'uploadFileReducer';


const mapStateToProps = state => ({
  fileUploaded: state.get(uploadFileReducer) && state.get(uploadFileReducer).fileUploaded ? state.get(uploadFileReducer).fileUploaded : '',
  message: state.get(uploadFileReducer) && state.get(uploadFileReducer).message ? state.get(uploadFileReducer).message : '',
  filePath: state.get(uploadFileReducer) && state.get(uploadFileReducer).filePath ? state.get(uploadFileReducer).filePath : '',
  fileUploadErrorMessage: state.get(uploadFileReducer) && state.get(uploadFileReducer).fileUploadErrorMessage ? state.get(uploadFileReducer).fileUploadErrorMessage : '',
  fileUploadErrorData: state.get(uploadFileReducer) && state.get(uploadFileReducer).fileUploadErrorData ? state.get(uploadFileReducer).fileUploadErrorData : '',
});

const mapDispatchToProps = dispatch => ({
  handleUploadFile: bindActionCreators(uploadFile, dispatch),
  handleUploadFileClear: bindActionCreators(uploadFileClear, dispatch),
});

const UploadMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadModel);


export default withStyles(styles)(UploadMapped);
