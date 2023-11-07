import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import brand from 'enl-api/dummy/brand';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import menuMessages from 'enl-api/ui/menuMessages';
import { connect } from 'react-redux';
import UserMenu from './UserMenu';
import styles from './header-jss';

class Header extends React.Component {
  state = {
    open: false,
    turnDarker: false,
    showTitle: false,
    profileData: {}
  };

  // Initial header style
  flagDarker = false;

  flagTitle = false;

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  static getDerivedStateFromProps(nextProps, preState) {
    const updatedState = {};
    if (nextProps.profileData !== preState.profileData) {
      updatedState.profileData = nextProps.profileData;
    }
    return updatedState;
  }

  handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = (scroll > 30);
    const newFlagTitle = (scroll > 40);
    if (this.flagDarker !== newFlagDarker) {
      this.setState({ turnDarker: newFlagDarker });
      this.flagDarker = newFlagDarker;
    }
    if (this.flagTitle !== newFlagTitle) {
      this.setState({ showTitle: newFlagTitle });
      this.flagTitle = newFlagTitle;
    }
  }

  turnMode = mode => {
    const { changeMode } = this.props;
    if (mode === 'light') {
      changeMode('dark');
    } else {
      changeMode('light');
    }
  };

  render() {
    const {
      classes,
      toggleDrawerOpen,
      margin,
      title,
      signOut,
      dense,
      avatar
    } = this.props;
    const {
      open,
      turnDarker,
      showTitle,
      profileData
    } = this.state;
    return (
      <AppBar
        className={classNames(
          classes.appBar,
          classes.floatingBar,
          margin && classes.appBarShift,
          turnDarker && classes.darker,
        )}
      >
        <Toolbar disableGutters={!open}>
          <div className={classNames(classes.brandWrap, dense && classes.dense)}>
            <span>
              <IconButton
                className={classes.menuButton}
                aria-label="Menu"
                onClick={toggleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            </span>
          </div>
          <Hidden smDown>
            <div className={classes.headerProperties}>
              <Typography
                component="h2"
                className={classNames(
                  classes.headerTitle,
                  showTitle && classes.show,
                )}
              >
                {menuMessages[title] !== undefined ? <FormattedMessage {...menuMessages[title]} /> : title}
              </Typography>
            </div>
          </Hidden>
          <Hidden xsDown>
            <span className={classes.separatorV} />
          </Hidden>
          <div className={classes.userToolbar}>
            <UserMenu signOut={signOut} avatar={avatar} profileData={profileData} />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  margin: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool,
  dense: PropTypes.bool,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  openGuide: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

Header.defaultProps = {
  dense: false,
  isLogin: false
};

const adminAuthReducer = 'adminAuthReducer';
const mapStateToProps = state => ({
  profileData: state.get(adminAuthReducer) && state.get(adminAuthReducer).profileData ? state.get(adminAuthReducer).profileData : {}
});

const HeaderMapped = connect(
  mapStateToProps,
  null
)(Header);

export default withStyles(styles)(injectIntl(HeaderMapped));
