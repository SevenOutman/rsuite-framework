import React from 'react';
import { Helmet } from 'react-helmet';
import { app_name } from '../App/functions';
import { config } from '../Config/functions';

const DefaultLayout = require('./layouts/default');
let _layouts = {
  default: DefaultLayout,
  error: DefaultLayout,
};

export function registerLayouts(layouts) {
  Object.assign(_layouts, layouts);
}

function layout(layoutName) {
  const Layout = _layouts[layoutName];
  if (!Layout) {
    console.error('Cannot find layout ' + layoutName)
    return DefaultLayout;
  }
  return Layout;
}

const View = {
  layout,
  title,
};

export default View;


const defaultTemplate = () => config('view.titleTemplate').replace('{APP_NAME}', app_name());

function title(content, template = defaultTemplate()) {
  return (
    <Helmet
      titleTemplate={template}
      defaultTitle={app_name()}
    >
      <title>{content}</title>
    </Helmet>
  )
}