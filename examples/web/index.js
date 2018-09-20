import React, { Component } from 'react';
import _ from 'lodash';
import { render } from 'react-dom';
import jsInfo from '../../src';

const { document } = window;

class App extends Component {
  info = jsInfo.info;

  renderRow(data) {
    return _.map(data, (item, key) => (
      <tr key={_.now() + key}>
        <td>{key}</td>
        <td style={{ fontWeight: item ? 'bold' : null, fontStyle: 'italic' }}>
          {item.toString()}
        </td>
      </tr>
    ));
  }

  renderData(data) {
    if (_.isBoolean(data)) {
      return (
        <div style={{ fontWeight: data ? 'bold' : null, fontStyle: 'italic' }}>
          {data.toString()}
        </div>
      );
    }
    return (
      <table>
        <tbody>{this.renderRow(data)}</tbody>
      </table>
    );
  }

  renderInfo() {
    return _.map(this.info, (data, key) => {
      return (
        <div key={_.now() + key}>
          <h3>{key}</h3>
          {this.renderData(data)}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>JS Info</h1>
        {this.renderInfo()}
        {window.navigator.userAgent}
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
