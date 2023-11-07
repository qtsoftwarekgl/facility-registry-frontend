import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dashboard from '../Templates/Dashboard';
import {
  BlankPage,
  Error,
  NotFound,
  Form,
  Table,
  Parent,
  CreateUser,
  EditUser,
  UserList,
  AuditLogs,
  FacilityTC,
  ComingSoon,
  HealthFacilities,
  ResetPasswordNewLogin,
  Services,
  Packages
} from '../pageListAsync';
import { userProfile } from '../Login/authActions';
import { isPasswordResetRequired } from '../../utils/helpers';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfileData: null
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { profileData, handleUserProfile } = nextProps;
    const updatedState = {};
    if (!profileData) {
      handleUserProfile();
    } else {
      updatedState.userProfileData = profileData;
    }
    return updatedState;
  }

  render() {
    const { changeMode, history } = this.props;
    const { userProfileData } = this.state;
    const IS_ADMIN = userProfileData && userProfileData.role === 'ADMIN';
    const IS_VIEWER = userProfileData && userProfileData.role === 'VIEWER';
    return (
      <Dashboard history={history} changeMode={changeMode} userProfileData={userProfileData}>
        {userProfileData && isPasswordResetRequired(userProfileData)
        ? (
          <Switch>
          <Route component={ResetPasswordNewLogin} />
          </Switch>
        )
      : (
        <Switch>
          <Route exact path="/" component={BlankPage} />
          <Route path="/form" component={Form} />
          <Route path="/table" component={Table} />
          <Route path="/page-list" component={Parent} />
          {IS_ADMIN ? <Route path="/create-user" component={CreateUser} /> : null}
          {IS_ADMIN ? <Route path="/edit-user/:id" component={EditUser} /> : null}
          {(IS_ADMIN || IS_VIEWER) ?  <Route path="/user-list" component={UserList} /> : null}
          {(IS_ADMIN || IS_VIEWER) ? <Route path="/facility-registry" component={HealthFacilities} /> : null}
          {IS_ADMIN ? <Route path="/audit_logs" component={AuditLogs} /> : null}
          {IS_ADMIN ? <Route path="/facilitytc" component={FacilityTC} /> : null}
          {IS_ADMIN ? <Route path="/settings/services" component={Services} /> : null}
          {IS_ADMIN ? <Route path="/settings/packages" component={Packages} /> : null}
          <Route path="/reset-user-password" component={ResetPasswordNewLogin} />
          <Route path="/pages/not-found" component={NotFound} />
          <Route path="/pages/error" component={Error} />
          <Route component={ComingSoon} />
        </Switch>
        )}
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const adminAuthReducer = 'adminAuthReducer';
const mapStateToProps = state => ({
  profileData: state.get(adminAuthReducer) && state.get(adminAuthReducer).profileData ? state.get(adminAuthReducer).profileData : null
});

const mapDispatchToProps = dispatch => ({
  handleUserProfile: bindActionCreators(userProfile, dispatch),
});

const ApplicationMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);

export default ApplicationMapped;
