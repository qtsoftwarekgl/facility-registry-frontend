import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import {
  Header,
  Sidebar
} from 'enl-components';
import dataMenu from 'enl-api/ui/menu';
import { injectIntl } from 'react-intl';
import styles from '../appStyles-jss';

class LeftSidebarLayout extends React.Component {
  render() {
    const {
      classes,
      children,
      toggleDrawer,
      sidebarOpen,
      loadTransition,
      pageLoaded,
      mode,
      history,
      changeMode,
      place,
      handleOpenGuide,
      signOut,
      userAttr,
      isLogin
    } = this.props;
    return (
      <Fragment>
        <Header
          toggleDrawerOpen={toggleDrawer}
          margin={sidebarOpen}
          changeMode={changeMode}
          mode={mode}
          title={place}
          history={history}
          openGuide={handleOpenGuide}
          signOut={signOut}
          isLogin={isLogin}
          avatar={userAttr.avatar}
        />
        <Sidebar
          open={sidebarOpen}
          toggleDrawerOpen={toggleDrawer}
          loadTransition={loadTransition}
          dataMenu={dataMenu}
          userAttr={userAttr}
          leftSidebar
        />
        <main className={classNames(classes.content, !sidebarOpen ? classes.contentPaddingLeft : '')} id="mainContent">
          <section className={classNames(classes.mainWrap, classes.sidebarLayout)}>
            { !pageLoaded && (<img src="/images/spinner.gif" alt="spinner" className={classes.circularProgress} />) }
            <Fade
              in={pageLoaded}
              mountOnEnter
              unmountOnExit
              {...(pageLoaded ? { timeout: 700 } : {})}
            >
              <div className={!pageLoaded ? classes.hideApp : ''}>
                {/* Application content will load here */}
                { children }
              </div>
            </Fade>
          </section>
        </main>
      </Fragment>
    );
  }
}

LeftSidebarLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  titleException: PropTypes.array.isRequired,
  handleOpenGuide: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  isLogin: PropTypes.bool,
  userAttr: PropTypes.object.isRequired,
};

LeftSidebarLayout.defaultProps = {
  isLogin: false
};

export default (withStyles(styles)(injectIntl(LeftSidebarLayout)));
