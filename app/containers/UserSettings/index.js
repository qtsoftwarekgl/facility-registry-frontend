/**
 *
 * UserSettings
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserSettings from './selectors';
import reducer from './reducer';
import saga from './saga';
import CreateUser from './CreateUser';
import UserList from './UserList';

/* eslint-disable react/prefer-stateless-function */
export class UserSettings extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/app/create-user" exact component={CreateUser} />
          <Route path="/app/user-list" exact component={UserList} />
        </Switch>
      </div>
    );
  }
}

UserSettings.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  userSettings: makeSelectUserSettings()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'userSettings', reducer });
const withSaga = injectSaga({ key: 'userSettings', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(UserSettings);
