import React, { Fragment } from 'react';

import Menu from './Menu';
import Content from './Content';

export default ({ children }) => (
  <Fragment>
    <Menu />
    <Content>
      {children}
    </Content>
  </Fragment>
)
