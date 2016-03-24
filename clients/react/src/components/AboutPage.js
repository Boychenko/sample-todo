import React, {Component} from 'react';
import Helmet from 'react-helmet';

// Since this component is simple and static, there's no parent container for it.
export default class AboutPage extends Component {
  render() {
    return (
      <div>
        <Helmet title="About us"/>
        <h2>About us</h2>
        <p>
          Sample Todo application.
        </p>
        <p>
          It's more playground and starter kit
        </p>
      </div>
    );
  }
}
