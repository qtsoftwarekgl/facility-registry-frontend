import React from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import brand from 'enl-api/dummy/brand';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styles from 'enl-components/Forms/user-jss';
import { Link } from 'react-router-dom';
import messages from './messages';

class ComingSoon extends React.Component {
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const title = brand.name + ' - Coming Soon';
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
        <div className={classes.container}>
          <div className={classes.fullFormWrap}>
            <Paper
              className={
                classNames(
                  classes.fullWrap,
                  classes.centerV
                )
              }
            >
              <Typography variant="h2" className={classes.titleColor} gutterBottom>
                <FormattedMessage {...messages.title} />
              </Typography>
              <Typography variant="h6" className={classes.subtitleBig} gutterBottom align="center">
                <FormattedMessage {...messages.subtitle} />
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                component={Link}
                to="/user-list"
              >
                <FormattedMessage {...messages.buttonWithRedirect} />
              </Button>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

ComingSoon.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default withStyles(styles)(injectIntl(ComingSoon));
