const React = require('react');
const Styles = require('./src/components/GlobalStyle');

const GlobalStyle = Styles.default;
const OGP = Styles.OGP;

exports.wrapRootElement = ({ element }) => (
  <React.Fragment>
    <GlobalStyle />
    <OGP />
    {element}
  </React.Fragment>
);
