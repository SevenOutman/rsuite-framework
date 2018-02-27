import React, { Component as ReactComponent } from 'react';
import { connectAdvanced } from 'react-redux';

export function pageHOC(Comp, connect) {

  const PageComp = connect ? connect(Comp) : Comp;

  return class Page extends ReactComponent {

    static displayName = `Page(${Comp.displayName || Comp.name})`;
    static layout = Comp.layout;
    static layoutProps = Comp.layoutProps;

    render() {
      return (
        <PageComp {...this.props} />
      );
    }
  }
}

export function componentHOC(Comp) {
  return connectAdvanced(() => ({ framework }, props) => ({
    ...props,
    framework,
  }), {
    getDisplayName: name => `Component(${name})`,
    withRef: true,
  })(Comp);
}