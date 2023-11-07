import React from 'react';
import ResetPassword from 'enl-components/Alerts/ResetPassword';

class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetPassword: true
    };
  }

  handleClose = () => {
    this.setState({
      resetPassword: false
    });
  }

  render() {
    const { resetPassword } = this.state;
    return (
      <div>
        <ResetPassword open={resetPassword} handleClose={() => this.handleClose()} />
      </div>
    );
  }
}

export default UpdatePassword;
