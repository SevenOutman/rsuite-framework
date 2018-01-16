import React, { Component } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import Auth from '../Auth';
import NotFound from '../pages/404';

import locales from '../locales';
import { title } from '../view';
addLocaleData([...zh, ...en]);

class App extends Component {
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
            viewUser.role === judge) {
            authorized = true;
            break;
          }
        }
      } else if (deny) {
        authorized = true;
        for (let i = 0; i < deny.length; i += 1) {
          let judge = deny[i];
          if ((typeof judge === 'function' && judge(viewUser)) ||
            viewUser.role === judge) {
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

  render() {
    const { locale, children } = this.props;
    return (
      <IntlProvider
        locale={locale}
        messages={locales[locale]}
      >
        <div className="page">
          {title(this.viewTitle())}
          {this.isRouteAuthorized() ? children : <NotFound />}
        </div>
      </IntlProvider>
    );
  }
}

export default App;
