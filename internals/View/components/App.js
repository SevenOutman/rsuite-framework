import React, { Component } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import Auth from '../../Auth';
import NotAuthorized from '../pages/404';

import { title } from '../../View/functions';
import { componentHOC as component } from '../hoc';
import { config } from '../../Config/functions';
import { app } from '../../App/functions';
import View from '../../View';

addLocaleData([...zh, ...en]);

class App extends Component {
  constructor(props) {
    super(props);

    app().register('router', props.router);
  }

  isRouteAuthorized() {
    const { routes } = this.props;
    const viewUser = Auth.user();
    let authorized = true;
    for (let j = 0; authorized && j < routes.length; j++) {
      const { component } = routes[j];
      if (!component) {
        continue;
      }
      const { allow, deny } = component;
      if (allow) {
        authorized = false;
        for (let i = 0; i < allow.length; i += 1) {
          let judge = allow[i];
          if ((typeof judge === 'function' && judge(viewUser)) ||
            (viewUser && viewUser.role === judge)) {
            authorized = true;
            break;
          }
        }
      } else if (deny) {
        authorized = true;
        for (let i = 0; i < deny.length; i += 1) {
          let judge = deny[i];
          if ((typeof judge === 'function' && judge(viewUser)) ||
            (viewUser && viewUser.role === judge)) {
            authorized = false;
            break;
          }
        }
      }
    }
    return authorized;
  }

  viewTitle() {
    const { routes } = this.props;
    let viewTitle = '';
    for (let j = 0; j < routes.length; j++) {
      const { component } = routes[j];
      if (!component) {
        continue;
      }
      if (component.title) {
        viewTitle = component.title;
      }
    }
    return viewTitle;
  }

  viewLayout() {
    const { routes } = this.props;
    let viewLayout;
    let layoutProps;
    for (let j = 0; j < routes.length; j++) {
      const { component } = routes[j];
      if (!component) {
        continue;
      }
      if (component.layout || component.layoutProps) {
        viewLayout = component.layout;
        layoutProps = component.layoutProps;
      }
    }

    return {
      layout: viewLayout || config('view.defaultLayout'),
      props: layoutProps || {},
    };
  }

  renderPage() {
    if (this.isRouteAuthorized()) {
      const { layout, props } = this.viewLayout();
      const Layout = View.layout(layout);
      const Page = this.props.children;
      return (
        <Layout {...props}>
          {Page}
        </Layout>
      );
    }
    const Layout = View.layout(NotAuthorized.layout);

    return (
      <Layout {...(NotAuthorized.layoutProps || {})}>
        <NotAuthorized />
      </Layout>
    );
  }

  render() {
    const { children } = this.props;
    return (
      <IntlProvider
        locale={config('app.locale')}
        messages={app('intl').messages()}
      >
        <div className="page">
          {title(this.viewTitle())}
          {this.renderPage()}
        </div>
      </IntlProvider>
    );
  }
}

module.exports = component(App);
