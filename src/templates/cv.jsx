import React from 'react';
import { graphql } from 'gatsby';
import { cx, css } from '@emotion/css';
import { animated, useSpring } from 'react-spring';
import { useGithubData } from '../hooks/useGithubData';
import { GlobalStyles, OGP } from '../components/GlobalStyle';
import { ButtonBack, ButtonDownload } from '../components/common/buttons';
import { Subheading } from '../components/project/Header';
import { Navbar } from '../components/common/Navbar';
import { PageWrapper } from '../components/common/PageWrapper';
import { SocialButtons } from '../components/common/SocialButtons';
import { useAnchorTracker } from '../hooks/useAnchorTracker';
import { DownloadFooter } from '../components/cv/DownloadFooter';
import { Flex } from '../components/common/Flex';
import { MARKERS } from '../theme';
import { LazyImage } from '../components/common/LazyImage';
import { BurgerMenu } from '../components/common/BurgerMenu';
import { CVSection } from '../components/cv/CVSection';
import { revealRight, revealTop } from '../animations';
import { CookieConsentContextProvider } from '../context/CookieConsentContextProvider';

const styles = {
  cvSectionBlock: css`
    margin-top: 3rem;
    &:first-of-type {
      margin-top: 0rem;
    }
  `,
  stickySubheading: css`
    @media (max-width: 750px) {
      position: static;
      margin-top: 0rem;
    }
  `,
  profileInfo: css`
    flex-grow: 1;
    position: relative;

    @media (max-width: 750px) {
      margin-top: 2rem;
    }
  `,
  inlinedNavbarPart: css`
    @media (max-width: 750px) {
      justify-content: space-between;
      width: 90%;
    }
  `,
  grid: css`
    display: grid;
    grid-template-columns: calc(50% - 1.5rem) auto;
    grid-template-rows: repeat(auto-fill, minmax(2rem, 1fr));
    grid-gap: 3rem 4rem;
    padding-bottom: 6rem;
    margin-top: 2rem;

    @media (max-width: 750px) {
      display: flex;
      flex-direction: column;
      gap: 0px;
    }
  `,
  profileGrid: css`
    grid-template-columns: 350px auto;
    padding-bottom: 3rem;

    @media (max-width: 1050px) {
      grid-template-columns: 300px auto;
    }

    @media (max-width: 850px) {
      grid-template-columns: 250px auto;
    }
  `,
  profilePicture: css`
    border-radius: 10px;
    max-width: 350px;
    position: relative;

    @media (max-width: 1050px) {
      width: 300px;
    }

    @media (max-width: 850px) {
      width: 250px;
    }

    @media (max-width: 750px) {
      align-self: center;
    }
  `,
  profilePageContents: css`
    overflow: hidden;
  `,
};

const CVPage = ({ data }) => {
  const post = data.markdownRemark;
  const activeAnchor = useAnchorTracker(['#intro-section']);
  const { data: githubProfile } = useGithubData();

  const profileSectionAnimation = useSpring(revealRight({}));
  const profilePictureAnimation = useSpring(revealTop({ delay: 200 }));

  return (
    <>
      <GlobalStyles />
      <CookieConsentContextProvider>
        <OGP
          title="Daniyil Vasylenko - CV"
          description="Daniyil Vasylenko - CV"
        />
        <PageWrapper>
          <Navbar margined gap="1rem">
            <ButtonBack
              withColorfulBackground={activeAnchor === '#intro-section'}
              background={MARKERS.blue}
              href="/"
              value="Main page"
            />
          </Navbar>
          <BurgerMenu />
          <div className={styles.profilePageContents}>
            <div className={cx(styles.grid, styles.profileGrid)}>
              <LazyImage
                className={styles.profilePicture}
                style={profilePictureAnimation}
                Component={animated.img}
                alt="avatar"
                loading="lazy"
                src={githubProfile.avatar_url || '/#'}
              />
              <animated.div
                className={styles.profileInfo}
                style={profileSectionAnimation}
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  flexGrow="1"
                >
                  <Subheading
                    className={styles.stickySubheading}
                    marker={MARKERS.green}
                  >
                    {post.frontmatter.title}
                  </Subheading>
                  <small>
                    Updated:&nbsp;
                    {post.frontmatter.updatedAt.toUpperCase()}
                  </small>
                </Flex>
                <p>
                  Curious and creative. I always try to come up with something
                  special and original.
                </p>
                <p>
                  Primarily I focus on Node.js, React, Graphql and modern
                  Javascript ecosystem.
                </p>
                <br />
                <SocialButtons onlyImportant />
                <br />
                <Flex>
                  <ButtonDownload
                    href="https://drive.google.com/uc?export=download&id=1Uy-HSmkHS4XuLAE18oPqdKiVj9bELqtX"
                    value="Download as .pdf"
                  />
                </Flex>
              </animated.div>
            </div>
            <div className={styles.grid} id="intro-section">
              <CVSection id="experience" span={2}>
                <Subheading
                  className={styles.stickySubheading}
                  marker={MARKERS.blue}
                >
                  Experience
                </Subheading>
                <div className={styles.cvSectionBlock}>
                  <h3>Full Stack Software Engineer</h3>
                  <p>
                    <strong>Company</strong>: Contentful
                  </p>
                  <p>
                    <strong>Duration:</strong> Dec 2018 - now
                  </p>
                  <p>
                    Full stack development and support of the Headless CMS by
                    Contentful
                  </p>
                  <h4>Summary:</h4>
                  <Flex direction="column" gap="0.5rem">
                    <li>Maintenance and improvements of the UI kit</li>
                    <li>
                      Full stack contribution to the web app and related
                      services
                    </li>
                    <li>
                      Support for the public APIs for CMS content management
                    </li>
                    <li>Part of the customer tech support</li>
                  </Flex>
                </div>
                <div className={styles.cvSectionBlock}>
                  <h3>Full Stack Developer</h3>
                  <p>
                    <strong>Company</strong>: Dial-Once
                  </p>
                  <p>
                    <strong>Duration:</strong> Dec 2016 - Dec 2019
                  </p>
                  <p>
                    Full stack development and support of the omnichannel
                    communication platform, consisting of multiple front-end
                    products with a micro-service architecture behind it.
                  </p>
                  <h4>Summary:</h4>
                  <Flex direction="column" gap="0.5rem">
                    <li>
                      Designing and developing the company's most on-demand
                      product
                    </li>
                    <li>
                      Implemented the tools, that allowed designers concentrate
                      on styling without interacting with the code base.
                    </li>
                    <li>
                      Reduced code base complexity by creating simple
                      abstractions and inroducing new standards and best
                      practices into the workflow.
                    </li>
                    <li>Mentored company's interns</li>
                    <li>
                      Held workshops and pair programming sessions to ease
                      integration in cross-functional projects
                    </li>
                  </Flex>
                </div>
                <div className={styles.cvSectionBlock}>
                  <h3>Node.js Developer</h3>
                  <p>
                    <strong>Company</strong>: FASTEE Technologies
                  </p>
                  <p>
                    <strong>Duration:</strong> Aug - Dec 2016
                  </p>
                  <p>Implemented bots for the generic chat bot platform.</p>
                  <h4>Summary:</h4>
                  <Flex direction="column" gap="0.5rem">
                    <li>
                      Created chat bots on multiple chat bot APIs - Slack,
                      Asana, Skype, Messenger
                    </li>
                    <li>
                      Created a routing system of message exchange between
                      different communication platforms
                    </li>
                  </Flex>
                </div>
              </CVSection>
              <CVSection id="skills">
                <Subheading
                  className={styles.stickySubheading}
                  marker={MARKERS.red}
                >
                  Skills
                </Subheading>
                <p>
                  <strong>Back-end</strong>
                  <span>: Node.js, Express, RabbitMQ</span>
                </p>
                <p>
                  <strong>Front-end</strong>
                  <span>: Javascript, HTML, CSS, React, Redux, Overmind</span>
                </p>
                <p>
                  <strong>Databases</strong>
                  <span>: Mongodb, Redis, MySQL</span>
                </p>
                <p>
                  <strong>Build tools</strong>
                  <span>: Webpack</span>
                </p>
                <p>
                  <strong>Testing</strong>: testing-library, Jest, Chai, Sinon,
                  Nyc, Karma, Enzyme
                </p>
                <p>
                  <strong>Devops</strong>
                  <span>: Docker</span>
                </p>
                <p>
                  <strong>CI/CD</strong>
                  <span>: CircleCI, Travis, SonarQube, Netlify, Heroku</span>
                </p>
                <p>
                  <strong>VCS</strong>
                  <span>: Git</span>
                </p>
                <p justifyContent="flex-start">
                  <strong>Misc</strong>
                  <span>
                    : Electron, Lerna, Gatsby, Basics of Elm, Basics of UX
                    Design
                  </span>
                </p>
              </CVSection>
              <CVSection id="education">
                <Subheading
                  className={styles.stickySubheading}
                  marker={MARKERS.yellow}
                >
                  Education
                </Subheading>
                <div className={styles.cvSectionBlock}>
                  <h3>Specialist Degree</h3>
                  <p>
                    <strong>Duration</strong>
                    <span>: 2016 - 2018</span>
                  </p>
                  <p>
                    <strong>Faculty</strong>
                    <span>: Informatics and Computer Systems</span>
                  </p>
                  <p>
                    The National Technical University of Ukraine "Igor Sikorsky
                    Kyiv Polytechnic Institute" (NTUU "KPI")
                  </p>
                  <Flex>
                    <li>
                      Theory of Automation and Control of Computer Systems
                    </li>
                  </Flex>
                </div>
                <div className={styles.cvSectionBlock}>
                  <h3>Bachelor Degree</h3>
                  <p>
                    <strong>Duration</strong>
                    <span>: 2012 - 2016</span>
                  </p>
                  <p>
                    <strong>Faculty</strong>
                    <span>: Informatics and Computer Systems</span>
                  </p>
                  <p>
                    The National Technical University of Ukraine "Igor Sikorsky
                    Kyiv Polytechnic Institute" (NTUU "KPI")
                  </p>
                  <Flex direction="column" gap="0.5rem">
                    <li>Principles of Information Technology</li>
                    <li>Principles of Computer Graphics</li>
                    <li>
                      Object Oriented Programming in C# language and Patterns of
                      Design
                    </li>
                    <li>
                      Principles of Communication and Data Transfer and
                      Persistence
                    </li>
                  </Flex>
                </div>
              </CVSection>
              <CVSection id="courses">
                <Subheading
                  className={styles.stickySubheading}
                  marker={MARKERS.green}
                >
                  Courses
                </Subheading>
                <h3>Java Enterprise Edition</h3>
                <p>
                  <strong>Provider</strong>
                  <span>: Bionic University</span>
                </p>
                <p>
                  <strong>Duration</strong>
                  <span>: August - November 2014</span>
                </p>
                <Flex direction="column" gap="0.5rem">
                  <li>EJB - Stateful, Stateless beans</li>
                  <li>Introduction to Spring Framework</li>
                  <li>Jersey, Jackson</li>
                  <li>JPA</li>
                </Flex>
              </CVSection>
              <CVSection id="language skills">
                <Subheading
                  className={styles.stickySubheading}
                  marker={MARKERS.purple}
                >
                  Language Skills
                </Subheading>
                <Flex direction="column" gap="0.5rem">
                  <li>English - C1 (7.5 - IELTS, Aug 2019)</li>
                  <li>German - B1</li>
                </Flex>
              </CVSection>
            </div>
          </div>
        </PageWrapper>
        {activeAnchor === '#intro-section' ? (
          <DownloadFooter>
            <Flex className={styles.inlinedNavbarPart}>
              <SocialButtons size={30} onlyImportant />
              <ButtonDownload
                href="https://drive.google.com/uc?export=download&id=1Uy-HSmkHS4XuLAE18oPqdKiVj9bELqtX"
                value="Download"
              />
            </Flex>
          </DownloadFooter>
        ) : null}
      </CookieConsentContextProvider>
    </>
  );
};

export default CVPage;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        email
        updatedAt
      }
    }
  }
`;
