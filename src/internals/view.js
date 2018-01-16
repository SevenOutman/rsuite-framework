import React from 'react';
import { Helmet } from 'react-helmet';
import { app_name } from './app';

const defaultTemplate = () => `%s - ${app_name()}`;

export function title(content, template = defaultTemplate()) {
  return (
    <Helmet
      titleTemplate={template}
    >
      <title>{content}</title>
    </Helmet>
  )
}