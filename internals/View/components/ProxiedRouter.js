import React, { Component } from 'react';
import { Router as ReactRouter } from 'react-router';
import { routes as routesType } from 'react-router/lib/InternalPropTypes';
import _cloneDeep from 'lodash/cloneDeep';
import _nth from 'lodash/nth';
import _isEqual from 'lodash/isEqual';

const injectRedirect = (route) => {
  if (!route) {
    return;
  }

  if (!route.component) {

  } else if (!route.indexRoute && route.component.redirect) {
    if (route.childRoutes) {
      route.indexRoute = {
        onEnter: ({ routes, location: { pathname } }, replace) => {
          if (_isEqual(route, _nth(routes, -2))) {
            return replace(pathname.replace(/\/?$/, `/${route.component.redirect}`));
          }
        },
      };
    } else {
      const oldOnEnter = route.onEnter;
      route.onEnter = ({ routes, location: { pathname } }, replace) => {
        if (_isEqual(route, _nth(routes, -1))) {
          return replace(pathname.replace(/\/?$/, `/${route.component.redirect}`));
        }
      };
    }
  }

  if (route.indexRoute) {
    injectRedirect(route.indexRoute);
  }
  if (route.childRoutes) {
    route.childRoutes.forEach(injectRedirect);
  }
};

class ProxiedRouter extends Component {
  static propTypes = {
    routes: routesType,
  };

  getProcessedRoutes() {
    if (!this.props.routes) {
      return this.props.routes;
    }

    const routes = _cloneDeep(this.props.routes);
    injectRedirect(routes);

    return routes;
  }

  render() {
    const { routes, ...props } = this.props;
    return (
      <ReactRouter
        {...props}
        routes={this.getProcessedRoutes()}
      />
    );
  }
}

export default ProxiedRouter;
