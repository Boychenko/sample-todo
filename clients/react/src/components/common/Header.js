import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';

const Header = (prop) => {
  const {auth} = prop;
  let logoutElement = '';
  if (auth.isAuthenticated) {
    logoutElement = (
      <Nav className={'navbar-right'}>
        <NavItem>{`Hello, ${auth.profile.name}`}</NavItem>
        <NavItem onClick={prop.actions.logout}>Logout</NavItem>
      </Nav>
    );
  }
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Todo sample</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <IndexLinkContainer to="/">
          <NavItem eventKey={1}>Home</NavItem>
        </IndexLinkContainer>
        <LinkContainer to="/Items">
          <NavItem eventKey={2}>Items</NavItem>
        </LinkContainer>
      </Nav>
      {logoutElement}
    </Navbar>
  );
};

Header.PropTypes = {
  auth   : PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    profile        : PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  actions: PropTypes.shape({
    logout: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
