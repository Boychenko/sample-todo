import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CreateButton = (prop) => {
  return (
    <div className="btn-toolbar">
      <Link className="btn btn-primary" to={prop.link}>
        <span className="glyphicon glyphicon-plus"/> {prop.text}
      </Link>
    </div>
  );
};

CreateButton.PropTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default CreateButton;
