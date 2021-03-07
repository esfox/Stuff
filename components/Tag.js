/* Reference type declaration file. */
/// <reference path="../typings/index.d.ts" />

import styled from 'styled-components';

import { getAdaptiveTextColor } from '../helpers/common-helpers';

const TagBackground = styled.div`
  background: ${({ backgroundColor }) => backgroundColor};
  color: ${({ backgroundColor }) => getAdaptiveTextColor(backgroundColor)};
  transition: box-shadow .2s;

  &:hover {
    box-shadow: 0 0 12px 2px rgba(0, 0, 0, .4);
  }

  strong {
    line-height: 1;
  }
`;

/**
 * @typedef TagProps
 * @property {Tag} tag
 */

/** @param {TagProps} */
export function Tag({ tag })
{
  return (
    <TagBackground
      className="flex items-center pointer br-pill shadow-4 ph3 ma2"
      backgroundColor={tag.color}
    >
      <strong className="flex-auto f4">{tag.name}</strong>
      {/* <i className="fas fa-thumbtack fa-lg ml4"></i> */}
      <i className="fas fa-pen fa-lg hover-dim-bg pv3 ph2 ml3"></i>
      <i className="fas fa-trash-alt fa-lg hover-dim-bg pv3 ph2"></i>
    </TagBackground>
  );
}
