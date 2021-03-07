import { forwardRef, useState } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  display: grid;
  place-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
	background: ${({ theme }) => theme.mode === 'light' ? '#00000050' : '#00000070'};
  z-index: 1000;

  & > div {
    background: var(--color-background);
    border-radius: 8px;
  }
`;

export function useModal()
{
  const [shown, setShown] = useState(false);
  const show = () => setShown(true);
  const close = () => setShown(false);

  return { shown, show, close };
}

export const Modal = forwardRef(
  /**
   * @typedef {Object} ModalProps
   * @property {string} className
   * @property {boolean} shown
   * @property {function()} onOuterClick
   * @param {ModalProps}
   */
  ({
    className,
    shown,
    onOuterClick,
    children,
  }, ref) =>
    shown
      ? (
        <ModalWrapper onClick={onOuterClick || null}>
          <div
            ref={ref}
            className={className}
            onClick={event => event.stopPropagation()}
          >
            {children}
          </div>
        </ModalWrapper>
      )
      : null
);
