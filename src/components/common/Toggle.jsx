import React from 'react';
import { css } from '@emotion/react';
import { MARKERS } from '../../theme';
import { Flex } from './Flex';

const styles = {
  container: css`
    input:checked + label span:last-child {
      background: ${MARKERS.green} !important;
    }

    input:checked + label span:last-child::before {
      transform: translateX(24px);
    }
  `,
  input: css`
    position: absolute;
    left: -9999999px;
  `,
  text: css`
    margin-right: 0.75rem;
  `,
  label: css`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  toggle: css`
    position: relative;
    width: 50px;
    height: 26px;
    border-radius: 15px;
    box-shadow: inset 0 0 5px rgb(0 0 0 / 40%);
    background: rgb(240, 240, 240);
    transition: all 0.3s;

    &::before,
    &::after {
      content: '';
      position: absolute;
    }

    &::before {
      left: 1px;
      top: 1px;
      width: 24px;
      height: 24px;
      background: white;
      border-radius: 50%;
      z-index: 1;
      transition: all 0.3s;
    }
  `,
};

const Toggle = ({ id, onChange, label, labelStyles, checked }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <Flex css={styles.container}>
      <input
        className={labelStyles}
        css={styles.input}
        onChange={handleChange}
        checked={checked}
        type="checkbox"
        id={id}
      />
      <label css={styles.label} htmlFor={id}>
        <span css={[styles.text, labelStyles]}>{label}</span>
        <span css={styles.toggle} />
      </label>
    </Flex>
  );
};

export { Toggle };
