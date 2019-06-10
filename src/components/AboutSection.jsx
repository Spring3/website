import React from 'react';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';
import LinkedinBoxIcon from 'mdi-react/LinkedinBoxIcon';
import TwitterIcon from 'mdi-react/TwitterIcon';
import EmailOutlineIcon from 'mdi-react/EmailOutlineIcon';

export default ({ children }) => (
  <section>
    {children}
    <GithubCircleIcon />
    <LinkedinBoxIcon />
    <TwitterIcon />
    <EmailOutlineIcon />
  </section>
)
