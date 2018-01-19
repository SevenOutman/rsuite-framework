import React, { Component } from 'react';

class ErrorNotFound extends Component {

  static layout = 'error';

  render() {
    return (
      <div className="page-content">
        404
      </div>
    )
  }
}

module.exports = ErrorNotFound;
