import React from 'react';
import { FormattedMessage } from 'react-intl';
import { app } from '../App/functions';

export function localize(id) {
  return <FormattedMessage id={id} />;
  // return app('intl').messages()[id] || id /* if none, fallback */;
}

