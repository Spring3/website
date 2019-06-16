const React = require('react');
const GlobalStyle = require('./src/components/GlobalStyle').default;

exports.wrapRootElement = ({ element }) => (
  <React.Fragment>
    <GlobalStyle />
    {element}
  </React.Fragment>
);
