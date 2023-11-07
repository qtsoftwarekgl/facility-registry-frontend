import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm';
import styles from './login-jss';

class Login extends React.Component {
  render() {
    const title = brand.name + ' - Login';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.rootFull}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.containerSide}>
          <Hidden smDown>
            <div className={classes.opening}>
              <div className={classes.openingWrap}>
                <div className={classes.openingLoginPage}>
                  <NavLink to="/login" className={classes.brand}>
                    <div style={{ height: '20rem', width: '321px', marginTop: 24 }} />
                  </NavLink>
                </div>
              </div>
            </div>
          </Hidden>
          <div className={classes.sideFormWrap}>
            <LoginForm onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
