import React, { Component } from 'react';
import { gatsby, useStaticQuery } from 'gatsby';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';
import LinkedinBoxIcon from 'mdi-react/LinkedinBoxIcon';
import TwitterIcon from 'mdi-react/TwitterIcon';
import EmailOutlineIcon from 'mdi-react/EmailOutlineIcon';

import Section from '../../components/Section';

class AboutPage extends Component {
  render() {
    return (
      <Section>
        <GithubCircleIcon />
        <LinkedinBoxIcon />
        <TwitterIcon />
        <EmailOutlineIcon />
      </Section>
    );
  }
}

export default AboutPage; 
