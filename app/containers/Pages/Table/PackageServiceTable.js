import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from 'enl-components/Tables/tableStyle-jss';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from 'lodash';


function PackageServiceTable(props) {
  const { data, classes } = props;
  let services_view_list = [];
  function formatServiceList(data) {
    data && data.packages.map(
      (o) => {
        if (o.services && o.services.length) {
          o.services.map(
            (s) => {
              s.categoryId = o.categoryId ? o.categoryId : 'N/A';
              s.packageName = o.name ? o.name : o.label ? o.label : 'N/A';
            }
          );
        }
      }
    );
    const selected_package_services = _.uniq(_.flatten(data && data.packages && data.packages.map(item => item.services)));
    return selected_package_services
  }

  if (data.packages && data && data.packages.length) {
    services_view_list = formatServiceList(data)
  }

  return (
    <Fragment>

      <Accordion style={{ width: "auto" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography className={classes.title} variant="h6">Total service offered: {data.additionalServices ? (services_view_list.length + data.additionalServices.length) : services_view_list.length}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table className={classes.stripped}>
            <TableHead>
              <TableRow>
                <TableCell>Package</TableCell>
                <TableCell>Service</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services_view_list && services_view_list.map(e =>
                <TableRow>
                  <TableCell>{e.packageName}</TableCell>
                  <TableCell>{e.name}</TableCell>
                </TableRow>
              )}
              <TableHead>
                <TableRow>
                  <TableCell>Additional services</TableCell>
                </TableRow>
              </TableHead>
              {data && data.additionalServices ? (data.additionalServices.map(o =>
                <TableRow>
                  <TableCell>{o.name ? o.name : o.label ? o.label : 'N/A'}</TableCell>
                </TableRow>
              )) : null}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}

PackageServiceTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PackageServiceTable);
