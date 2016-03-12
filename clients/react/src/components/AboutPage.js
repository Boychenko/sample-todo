import React, {Component} from 'react';

// Since this component is simple and static, there's no parent container for it.
export default class AboutPage extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
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
