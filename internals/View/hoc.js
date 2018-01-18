import React, { Component } from 'react';

export function pageHOC(Comp, connect) {

  const PageComp = connect ? connect(Comp) : Comp;

  return class Page extends Component {

    static displayName = `Page(${Comp.displayName || Comp.name})`;
    static layout = Comp.layout;

    render() {
      return (
        <PageComp {...this.props} />
      );
    }
  }
}
