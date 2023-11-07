import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { injectIntl, FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import NoEncryptionIcon from '@material-ui/icons/NoEncryption';
import messages from './messages';
import styles from './header-jss';
import history from '../../utils/history';

class UserMenu extends React.Component {
  state = {
    openMenu: null,
    right: false
  };

  handleMenu = menu => () => {
    const { openMenu } = this.state;
    this.setState({
      openMenu: openMenu === menu ? null : menu
    });
  };

  handleClose = () => {
    this.setState({ openMenu: null });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handlePasswordClick = () => {
    history.push('/reset-user-password');
  };

  render() {
    const {
      signOut,
      classes,
      profileData
    } = this.props;
    const { right } = this.state;
    return (
      <div>
        <Button onClick={this.toggleDrawer('right', true)}>
          <Avatar
            alt="avatar"
            src="/images/pp_boy.svg"
          />
          <Typography variant="subtitle2" style={{ fontSize: 13, marginLeft: 7 }} component="h2" className={classes.profileHead}>
            {profileData.surName}
            {' '}
            {profileData.postNames}
          </Typography>
        </Button>
        <Drawer anchor="right" open={right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
            style={{ padding: '10px 15px', height: '100vh' }}
          >
            <List style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                style={{ marginRight: 7 }}
                alt="avatar"
                src="/images/pp_boy.svg"
              />
              <Typography style={{ color: '#000', fontSize: 13 }} variant="subtitle2" component="h2" className={classes.profileHead}>
                {profileData.surName}
                {' '}
                {profileData.postNames}
              </Typography>
            </List>
            <Divider />
            <List style={{ fontSize: 13 }}>
Email:
              {' '}
              {profileData.email}
            </List>
            <Divider />
            <MenuItem onClick={() => this.handlePasswordClick()} style={{ paddingLeft: 0, fontSize: 14 }}>
              <ListItemIcon style={{ minWidth: 34 }}>
                <NoEncryptionIcon />
              </ListItemIcon>
              Change Password
            </MenuItem>
            <Divider />
            <MenuItem onClick={signOut} style={{ paddingLeft: 0, fontSize: 14 }}>
              <ListItemIcon style={{ minWidth: 34 }}>
                <ExitToApp />
              </ListItemIcon>
              <FormattedMessage {...messages.logout} />
            </MenuItem>
          </div>
        </Drawer>
      </div>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  dark: PropTypes.bool,
  profileData: PropTypes.object.isRequired
};

UserMenu.defaultProps = {
  dark: false
};

export default withStyles(styles)(injectIntl(UserMenu));
