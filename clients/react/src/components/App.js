import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element
  };

  render() {
    return (
      <div>
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
            <LinkContainer to="/About">
              <NavItem eventKey={2}>Items</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}
