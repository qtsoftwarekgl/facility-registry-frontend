import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';
import MainMenu from './MainMenu';
import styles from './sidebar-jss';

class SidebarContent extends React.Component {
  render() {
    const {
      classes,
      drawerPaper,
      toggleDrawerOpen,
      loadTransition,
      leftSidebar,
      dataMenu
    } = this.props;
    return (
      <div className={classNames(classes.drawerInner, !drawerPaper ? classes.drawerPaperClose : '')}>
        <div
          id="sidebar"
          className={
            classNames(
              classes.menuContainer,
              leftSidebar && classes.rounded,
              classes.withProfile
            )
          }
        >
          <MainMenu
            loadTransition={loadTransition}
            dataMenu={dataMenu}
            toggleDrawerOpen={toggleDrawerOpen}
          />
        </div>
      </div>
    );
  }
}

SidebarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  toggleDrawerOpen: PropTypes.func,
  loadTransition: PropTypes.func,
  leftSidebar: PropTypes.bool.isRequired,
  dataMenu: PropTypes.array.isRequired
};

SidebarContent.defaultProps = {
  toggleDrawerOpen: () => {},
  toggleDrawerClose: () => {},
  loadTransition: () => {}
};

export default withStyles(styles)(injectIntl(SidebarContent));
