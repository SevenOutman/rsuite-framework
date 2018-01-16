import React from 'react';
import { Helmet } from 'react-helmet';
import { app_name } from './App';
import { config } from './Config';

const defaultTemplate = () => config('view.titleTemplate').replace('{APP_NAME}', app_name());

export function title(content, template = defaultTemplate()) {
  return (
    <Helmet
      titleTemplate={template}
      defaultTitle={app_name()}
    >
      <title>{content}</title>
    </Helmet>
  )
}