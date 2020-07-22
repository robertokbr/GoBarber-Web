import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'info' | 'success' | 'error';
  hasDescription: boolean;
}

const toustTypeVariations = {
  info: css`
    background: #ff9000;
  `,
  success: css`
    background: #8ac926;
  `,
  error: css`
    background: #c53030;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;

  display: flex;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  color: #fff;

  ${props => toustTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0px 0px;
  }
  div {
    flex: 1;
  }

  p {
    margin-top: 4px;
    font-size: 14px;
    opacity: 0.8;
    line-height: 28px;
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;
      svg {
        margin-top: 0;
      }
    `}
  & + div {
    margin-top: 8px;
  }
`;
