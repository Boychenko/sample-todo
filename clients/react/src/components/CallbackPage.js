import React, {PropTypes, Component} from 'react';
import {CallbackComponent} from 'redux-oidc';
import {createTokenManager, createTokenManagerConfig} from '../helpers/oidcHelpers';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';

class CallbackPage extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      authenticationError  : PropTypes.func.isRequired,
      authenticationSuccess: PropTypes.func.isRequired
    }).isRequired
  };

  // this method gets called when the token validation fails
  onTokenValidationError = (error) => {
    this.props.actions.authenticationError(error);
  };

  onSuccess = () => {
    this.props.actions.authenticationSuccess(createTokenManager().profile);
  };

  // pass in custom content to render in the CallbackComponent
  get customContent() {
    return (
      <div>Redirecting...</div>
    );
  }

  render() {
    return (
      <CallbackComponent
        redirectOnSuccess={false}
        config={createTokenManagerConfig()}
        successCallback={this.onSuccess}
        errorCallback={this.onTokenValidationError}
      >
        { this.customContent }
      </CallbackComponent>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CallbackPage);
