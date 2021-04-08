import React, { memo } from 'react';
import { css, cx } from '@emotion/css';

const styles = {
  header: css`
    font-size: 3rem;

    @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px) {
      font-size: 2.2rem;
    }

    @media (max-width: 750px) {
      font-size: 2rem !important;
    }
  `,
  subheader: css`
    font-size: 2.2rem;

    @media (orientation: landscape) and (min-width: 750px) and (max-width: 900px) {
      font-size: 2rem;
    }

    @media (max-width: 750px) {
      font-size: 1.8rem !important;
    }
  `,
};

const Header = memo(({ children, className }) => {
  return (
    <h1 className={cx(styles.header, className)} css={styles.header}>
      {children}
    </h1>
  );
});

Header.displayName = 'Header';

const SubHeader = memo(({ children, className }) => {
  return (
    <h2 className={cx(styles.subheader, className)} css={styles.subheader}>
      {children}
    </h2>
  );
});

SubHeader.displayName = 'SubHeader';

export { Header, SubHeader };
