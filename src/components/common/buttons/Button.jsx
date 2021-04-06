import styled from 'styled-components';
import { styles } from '../Reference';

const Button = styled.button`
  ${styles}

  text-decoration: none;
  padding: 0.25rem 0.5rem;
  background: transparent;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:active {
    filter: brightness(0.9);
    box-shadow: none;
  }
`;

export { Button };
