import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import BackSpaceIcon from '@material-ui/icons/Backspace';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Sync from '@material-ui/icons/Sync';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DownloadForOfflineIcon from '@material-ui/icons/CloudDownloadOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Switch from '@material-ui/core/Switch';
import BallotIcon from '@material-ui/icons/Ballot';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import moment from 'moment';
import {
  Menu, MenuItem, FormControlLabel, CircularProgress
} from '@material-ui/core';
import { EmptyData } from 'enl-components';
import { getRoleName } from '../../../utils/helpers';
import { SLICE_CHARACTER } from '../../../lib/constants';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, multiselect
  } = props;

  return (
    <TableHead>
      <TableRow>
        {/* {multiselect ? (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
        ) : null} */}
        {headCells && headCells.filter((item) => item.show).map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : headCell.id === 'actions' || headCell.id === 'status' ? 'center' : 'left'}
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontSize: 14 }}
            onClick={() => onRequestSort(headCell.id)}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
  multiselect: PropTypes.bool.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  rootTable: {
    width: '100%',
    marginTop: theme.spacing(1),
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    '& .MuiTableCell-root': {
      padding: '0 7px'
    },
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    }
  },
  paper: {
    marginBottom: theme.spacing(2),
    overflowX: 'auto'
  },
  toolbar: {
    minHeight: 25,
    textAlign: 'right',
    padding: 5,
    position: 'absolute',
    right: 10
  },
  ballorIcon: {
    color: '#ec407a',
    cursor: 'pointer'
  },
  table: {
    minWidth: 750,
    overflowX: 'auto'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  pageSpan: {
    padding: 3
  },
  actionContainer: {
    textAlign: 'center'
  },
  approveIcon: {
    color: 'green',
    cursor: 'pointer'
  },
  rejectIcon: {
    color: 'red',
    cursor: 'pointer'
  },
  viewIcon: {
    color: 'green',
    cursor: 'pointer'
  },
  editIcon: {
    color: 'blue',
    cursor: 'pointer'
  },
  deleteIcon: {
    color: '#bd4747',
    cursor: 'pointer'
  },
  yellowLabel: {
    minWidth: 90,
    backgroundColor: '#ffff00',
    color: '#000000',
  },
  redLabel: {
    minWidth: 90,
    backgroundColor: '#ff6347',
  },
  greenLabel: {
    minWidth: 90,
    backgroundColor: '#228b22',
  },
  reloadIcon: {
    color: 'orange',
    cursor: 'pointer'
  },
  activeChip: {
    minWidth: 90,
    backgroundColor: '#2e8e0f'
  },
  inactiveChip: {
    minWidth: 90,
    backgroundColor: '#8c8989'
  },
  deletedChip: {
    minWidth: 90,
    backgroundColor: '#b92b2b'
  },
  customPagination: {
    padding: 10,
    textAlign: 'right'
  },
  prevButton: {
    paddingRight: 14,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 5,
    fontSize: 10
  },
  nextButton: {
    paddingRight: 5,
    paddingLeft: 14,
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 10
  },
  downButton: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 5,
    fontSize: 10,
  },
  progress: {
    margin: theme.spacing(2),
  },
  customTooltip: {
    maxWidth: 500,
    fontSize: '0.75rem'
  }
}));

function useForceUpdate() {
  const [, setValue] = React.useState(0);
  return () => setValue(value => value + 1);
}

export default function EnhancedTable(props) {
  const {
    page,
    headCells,
    rows,
    loading,
    totalData,
    onPageChange,
    onActionClicked,
    handleStatusChange,
    onDeleteRows,
    download,
    upload,
    tableTitle,
    multiselect,
    deleted,
    downloadDataCsv,
    profileData,
    hideToolbar
  } = props;

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [headers, setHeaders] = React.useState([]);

  const forceUpdate = useForceUpdate();

  React.useEffect(() => {
    setHeaders(headCells);
  }, [headCells]);

  const handleHeaderCheck = (item) => {
    const tempHeaders = headers;
    const index = headers.findIndex((header) => header.id === item.id);
    tempHeaders[index].show = !item.show;
    setHeaders(tempHeaders);
    forceUpdate();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    if (deleted === 'ok') {
      setSelected([]);
    }
  }, [deleted]);

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (newPage) => {
    onPageChange(newPage);
  };

  const renderActions = (type, rowData) => {
    if (type === 'approve_reject') {
      return (
        <div className={classes.actionContainer}>
          <Tooltip title="Approve">
            <CheckBoxIcon
              onClick={() => onActionClicked('approve', rowData)}
              className={classes.approveIcon}
            />
          </Tooltip>
          <Tooltip title="Reject">
            <CancelIcon
              onClick={() => onActionClicked('reject', rowData)}
              className={classes.rejectIcon}
            />
          </Tooltip>
        </div>
      );
    } if (type === 'view_approve_reject') {
      return (
        <div className={classes.actionContainer}>
          <Tooltip title="View">
            <VisibilityIcon
              onClick={() => onActionClicked('view', rowData)}
              className={classes.viewIcon}
            />
          </Tooltip>
          {rowData.status === 'PENDING' ? (
            <Tooltip title="Approve">
              <CheckBoxIcon
                onClick={() => onActionClicked('approve', rowData)}
                className={classes.approveIcon}
              />
            </Tooltip>
          ) : null}
          {rowData.status === 'PENDING' ? (
            <Tooltip title="Reject">
              <CancelIcon
                onClick={() => onActionClicked('reject', rowData)}
                className={classes.rejectIcon}
              />
            </Tooltip>
          ) : null}
        </div>
      );
    }
    if (type === 'approve_reload') {
      return (
        <div className={classes.actionContainer} style={{ textAlign: 'left' }}>
          <Tooltip title="View">
            <VisibilityIcon
              onClick={() => onActionClicked('view', rowData)}
              className={classes.viewIcon}
            />
          </Tooltip>
          {rowData.status === 'ACTIVE' ? (
            <Tooltip title="Action">
              <RotateLeftIcon
                onClick={() => onActionClicked('reload', rowData)}
                className={classes.reloadIcon}
              />
            </Tooltip>
          ) : null}
        </div>
      );
    } if (type === 'edit_delete') {
      return (
        <div className={classes.actionContainer}>
          {rowData && rowData.status !== 'DELETED' && rowData.status !== 'DEPRECIATED' && (
            <>
              <Tooltip title="Edit">
                <EditIcon onClick={() => onActionClicked('edit', rowData)} className={classes.editIcon} />
              </Tooltip>
              <Tooltip title="Delete">
                <DeleteIcon onClick={() => onActionClicked('delete', rowData)} className={classes.deleteIcon} />
              </Tooltip>
            </>
          )
          }
          {rowData && rowData.status === 'DEPRECIATED' && (
            <>
              <Tooltip title="Delete">
                <DeleteIcon onClick={() => onActionClicked('delete', rowData)} className={classes.deleteIcon} />
              </Tooltip>
            </>
          )
          }
        </div>
      );
    } if (type === 'edit_view_delete') {
      if (profileData && profileData.role === 'VIEWER') {
        return (
          <div className={classes.actionContainer}>
            {rowData && rowData.status !== 'DELETED' && (
              <>
                <Tooltip title="View">
                  <VisibilityIcon
                    onClick={() => onActionClicked('view', rowData)}
                    className={classes.viewIcon}
                  />
                </Tooltip>
              </>
            )
            }
          </div>
        );
      } else {
        return (
          <div className={classes.actionContainer}>
            {rowData && rowData.status !== 'DELETED' && (
              <>
                <Tooltip title="View">
                  <VisibilityIcon
                    onClick={() => onActionClicked('view', rowData)}
                    className={classes.viewIcon}
                  />
                </Tooltip>
                <Tooltip title="Edit">
                  <EditIcon onClick={() => onActionClicked('edit', rowData)} className={classes.editIcon} />
                </Tooltip>
                {/* <Tooltip title="Delete">
                  <DeleteIcon onClick={() => onActionClicked('delete', rowData)} className={classes.deleteIcon} />
                </Tooltip> */}
              </>
            )
            }
          </div>
        );
      }
    } if (type === 'view') {
      return (
        <div className={classes.actionContainer}>
          <Tooltip title="View">
            <VisibilityIcon
              onClick={() => onActionClicked('view', rowData)}
              className={classes.viewIcon}
            />
          </Tooltip>
        </div>
      );
    } if(type === 'edit_delete_view'){
      if (profileData && profileData.role === 'VIEWER') {
        return (
          <div className={classes.actionContainer}>
            {rowData && rowData.status !== 'DELETED' && (
              <>
                <Tooltip title="View">
                  <VisibilityIcon
                    onClick={() => onActionClicked('view', rowData)}
                    className={classes.viewIcon}
                  />
                </Tooltip>
              </>
            )
            }
          </div>
        );
      } else {
        return (
          <div className={classes.actionContainer}>
            {rowData && rowData.status !== 'DELETED' && (
              <>
                <Tooltip title="View">
                  <VisibilityIcon
                    onClick={() => onActionClicked('view', rowData)}  className={classes.viewIcon} />
                </Tooltip>
                <Tooltip title="Edit">
                  <EditIcon onClick={() => onActionClicked('edit', rowData)} className={classes.editIcon} />
                </Tooltip>
                <Tooltip title="Delete">
                  <DeleteIcon onClick={() => onActionClicked('delete', rowData)} className={classes.deleteIcon} />
                </Tooltip>
              </>
            )
            }
          </div>
        );
      }
    }
    if (type === 'npr_log') {
      return (
        <div className={classes.actionContainer}>
          <Tooltip title="Copy">
            <FileCopyIcon onClick={() => onActionClicked('copy', rowData)} />
          </Tooltip>
          <Tooltip title="Edit">
            <EditIcon onClick={() => onActionClicked('edit', rowData)} className={classes.editIcon} />
          </Tooltip>
          <Tooltip title="Resubmit">
            <RotateLeftIcon
              onClick={() => onActionClicked('resubmit', rowData)}
              className={classes.reloadIcon}
            />
          </Tooltip>
        </div>
      );
    }
    if (type === 'irembo_log') {
      return (
        <div className={classes.actionContainer}>
          <Tooltip title="Copy">
            <FileCopyIcon onClick={() => onActionClicked('copy', rowData)} />
          </Tooltip>
        </div>
      );
    }
    return (
      <div className={classes.actionContainer}>
        {rowData && rowData.status !== 'DELETED' && (
          <>
            <VisibilityIcon onClick={() => onActionClicked('view', rowData)} className={classes.viewIcon} />
            <EditIcon onClick={() => onActionClicked('edit', rowData)} className={classes.editIcon} />
            <DeleteIcon onClick={() => onActionClicked('delete', rowData)} className={classes.deleteIcon} />
          </>
        )}
      </div>
    );
  };

  const renderStatus = (row, header) => {
    if (header.statusType === 'switch') {
      if (row.status !== 'DELETED' && row.status !== 'DEPRECIATED') {
        return (
          <div align="center">
            <Switch
              checked={row.status === 'ACTIVE'}
              onChange={(evt) => handleStatusChange(row, evt.target.checked)}
              color="secondary"
              disabled={profileData && profileData.role === 'VIEWER'}
            />
          </div>
        );
      }
      if (row.status === 'DEPRECIATED') {
        return <div align="center"><Chip label="Depreciated" color="primary" size="small" icon={<BackSpaceIcon />} className={classes.deletedChip} /></div>;
      }
      return <div align="center"><Chip label="Deleted" color="primary" size="small" icon={<DeleteIcon />} className={classes.deletedChip} /></div>;
    }
    const status = (row.status).toLowerCase();
    switch (status) {
      case 'active':
        return <div align="center"><Chip label="Active" color="primary" size="small" icon={<CheckIcon />} className={classes.activeChip} /></div>;
      case 'inactive':
        return <div align="center"><Chip label="Inactive" color="primary" size="small" icon={<ClearIcon />} className={classes.inactiveChip} /></div>;
      case 'deleted':
        return <div align="center"><Chip label="Deleted" color="primary" size="small" icon={<DeleteIcon />} className={classes.deletedChip} /></div>;
      case 'depreciated':
        return <div align="center"><Chip label="Depreciated" color="primary" size="small" icon={<BackSpaceIcon />} className={classes.deletedChip} /></div>;
      case 'incomplete':
        return <div align="center"><Chip label="Incomplete" color="primary" size="small" icon={<ErrorOutlineIcon />} className={classes.deletedChip} /></div>;
      case 'pending':
        return <div align="center"><Chip label="Pending" color="primary" size="small" icon={<SyncProblemIcon />} className={classes.yellowLabel} /></div>;
      case 'approved':
        return <div align="center"><Chip label="Approved" color="primary" size="small" icon={<CheckIcon />} className={classes.greenLabel} /></div>;
      case 'rejected':
        return <div align="center"><Chip label="Rejected" color="primary" size="small" icon={<CancelPresentationIcon />} className={classes.redLabel} /></div>;
      case 'completed':
        return <div align="center"><Chip label="Completed" color="primary" size="small" icon={<CheckCircleOutlineIcon />} className={classes.greenLabel} /></div>;
      case 'success':
        return <div align="center"><Chip label="Success" color="primary" size="small" icon={<CheckCircleOutlineIcon />} className={classes.greenLabel} /></div>;
      case 'fail':
        return <div align="center"><Chip label="Failed" color="primary" size="small" icon={<CancelPresentationIcon />} className={classes.redLabel} /></div>;
      case 'in_progress':
        return <div align="center"><Chip label="In Progress" color="primary" size="small" icon={<Sync />} className={classes.yellowLabel} /></div>;
      default:
        return <div align="center"><Chip label="Unknown" color="danger" /></div>;
    }
  };

  const renderCellContent = (header, row) => {
    if (header.id === 'actions') {
      return renderActions(header.actionType, row);
    } if (header.id === 'status') {
      return renderStatus(row, header);
    } if (header.id === 'role') {
      return getRoleName(row[header.id]);
    } if (header.isDate) {
      if (!row[header.id]) {
        return 'N/A';
      }
      const date = moment(row[header.id]);
      if (header.id === 'facilityOpeningDate' || header.id === 'facilityClosingDate') {
        return date.isValid() ? date.format('DD/MM/YYYY') : 'N/A';
      } else {
        return date.isValid() ? date.format('DD/MM/YYYY hh:mm a') : 'Invalid Date';
      }
    } if (header.isWorkLogDate) {
      if (!row[header.id]) {
        return 'Till now';
      }
      const date = moment(row[header.id]);
      return date.isValid() ? date.format('DD/MM/YYYY hh:mm:ss') : 'Invalid Date';
    }
    if (row[header.id] && row[header.id].length > SLICE_CHARACTER) {
      return (
        <>
          <Tooltip classes={{ tooltip: classes.customTooltip }} title={row[header.id]} aria-label="add">
            <Typography variant="body2">
              {row[header.id].substring(0, SLICE_CHARACTER) + '...' || 'N/A'}
            </Typography>
          </Tooltip>
        </>
      );
    }

    if (header.isCommunity) {
      if (row.facilityType === 'COMMUNITY' && (row.role === 'CR' || row.role === 'NOTIFIER')) {
        return `${row.facilityType} (${row.facilityArea})`;
      }
      return row.facilityType ? row.facilityType : 'N/A';
    }
    return (
      <>
        <Typography variant="body2">
          {row[header.id] || 'N/A'}
        </Typography>
      </>
    );
  };

  const handleRowClick = (event, row) => {
    const name = event.target.tagName;
    if (name !== 'svg' && name !== 'path' && name !== 'DIV' && name !== 'INPUT') {
      onActionClicked('view', row);
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <div className={classes.rootTable}>
          {!hideToolbar && tableTitle === "Facility Registry" && (profileData && profileData.role !=='VIEWER') ? (
            <div className={classes.toolbar}>
              {rows.length ? (
                <>
                  <Tooltip title="Download CSV">
                    <DownloadForOfflineIcon
                      style={{
                        cursor: 'pointer',
                        color: '#800000',
                        margin: '0 10px',
                        fontSize: 25
                      }}
                      onClick={() => downloadDataCsv(headers)}
                    />
                  </Tooltip>

                  <Tooltip title="Download Template">
                    <CloudDownloadIcon
                      style={{
                        cursor: 'pointer',
                        color: '#03a9f4',
                        margin: '0 10px',
                        fontSize: 25
                      }}
                      onClick={() => download(headers)}
                    />
                  </Tooltip>

                  <Tooltip title="Upload xlsx">
                    <CloudUploadIcon
                      style={{
                        cursor: 'pointer',
                        color: '#FF69B4',
                        margin: '0 10px',
                        fontSize: 25
                      }}
                      onClick={() => upload()}
                    />
                  </Tooltip>
                </>
              ) : null}
            </div>
          ) : null}
          {!hideToolbar && tableTitle === "Facility Registry" && (profileData && profileData.role ==='VIEWER')  ? (
            <div className={classes.toolbar}>
              {rows.length ? (
                <Tooltip title="Download CSV">
                  <DownloadForOfflineIcon
                    style={{
                      cursor: 'pointer',
                      color: '#800000',
                      margin: '0 10px',
                      fontSize: 25
                    }}
                    onClick={() => downloadDataCsv(headers)}
                  />
                </Tooltip>
              ) : null}             
            </div>
          ) : null}
          <Table
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
            style={{ marginTop: 30, marginLeft: 10 }}
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headers}
              multiselect={multiselect}
            />
            <TableBody>
              {!loading && stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      onClick={(event) => handleRowClick(event, row)}
                    >
                      {/* {multiselect ? (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, row._id)}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                      ) : null} */}
                      {headCells && headCells.filter(item => item.show).map(header => ([
                        <TableCell component="th" id={labelId} scope="row" style={{ fontSize: 14, padding: 5 }}>
                          {renderCellContent(header, row)}
                        </TableCell>
                      ]))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {loading ? <div align="center"><CircularProgress className={classes.progress} /></div> : null}
          {!loading && rows.length < 1 ? <EmptyData /> : null}
        </div>
        <div className={classes.customPagination}>
          <Typography variant="caption" gutterBottom align="center">
            {page === 1 ? <span className={classes.pageSpan}>1</span> : <span className={classes.pageSpan}>{(page - 1) * 20}</span>}
            <span className={classes.pageSpan}>-</span>
            <span className={classes.pageSpan}>{((page - 1) * 20) + rows.length}</span>
            <span className={classes.pageSpan}>of</span>
            <span className={classes.pageSpan}>{totalData}</span>
          </Typography>
          <Button
            disabled={page === 1}
            onClick={() => handleChangePage(page - 1)}
            size="small"
            className={classes.prevButton}
            variant="contained"
            color="primary"
          >
            <NavigateBeforeIcon />
            <span>Prev</span>
          </Button>
          <Button
            disabled={page > Math.floor(totalData / 20)}
            onClick={() => handleChangePage(page + 1)}
            size="small"
            className={classes.nextButton}
            variant="contained"
            color="primary"
          >
            <span>Next</span>
            <NavigateNextIcon />
          </Button>
        </div>
      </Paper>
    </React.Fragment>
  );
}

EnhancedTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  totalData: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onActionClicked: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  onDeleteRows: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  multiselect: PropTypes.bool,
  download: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  deleted: PropTypes.string,
  downloadDataCsv: PropTypes.func.isRequired,
  profileData: PropTypes.func.isRequired,
  hideToolbar: PropTypes.bool
};

EnhancedTable.defaultProps = {
  multiselect: false,
  deleted: '',
  hideToolbar: false
};
