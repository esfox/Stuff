/* Reference type declaration file. */
/// <reference path="../typings/index.d.ts" />

import { useState } from 'react';
import styled from 'styled-components';

import { getAdaptiveTextColor } from '../helpers/common-helpers';

const Tag = styled.h4`
  background: ${({ backgroundColor }) => backgroundColor};
  color: ${({ backgroundColor }) => getAdaptiveTextColor(backgroundColor)};
`;

/**
 * @typedef ThingProps
 * @property {Thing} data
 */

/** @param {ThingProps} */
export function Thing({ data })
{
  const [allTagsShown, setAllTagsShown] = useState(false);

  const tagsCount = data.tags.length;
  const minimumTagsShown = 3;
  const truncateLength = 10;

  const tooManyTags = tagsCount > minimumTagsShown;
  const displayedTagsCount = !allTagsShown
    ? tooManyTags ? minimumTagsShown : tagsCount === minimumTagsShown ? minimumTagsShown : tagsCount
    : tagsCount;
  const moreCount = tooManyTags ? tagsCount - minimumTagsShown : 0;

  return (
    <div className="pb4">
      <div className="relative bg-light shadow-4 br3">
        <div className="pa3">
          <div className="flex items-center justify-between mb3">
            <h2>{data.title}</h2>
            <small>
              {
                new Date(data.date).toLocaleString(
                  'default',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )
              }
            </small>
          </div>
          <p>{data.content}</p>
        </div>
        <hr className="ma0" />
        <div className="flex items-end">
          <div className="flex flex-auto flex-wrap flex-gap-1 items-center overflow-hidden pa3">
            {
              data.tags.slice(0, displayedTagsCount).map((tag, i) =>
                <Tag
                  key={i}
                  className="br2 pa2 truncate"
                  backgroundColor={tag.color}
                >
                  {
                    !allTagsShown && tooManyTags
                      ? tag.name.length > truncateLength
                        ? tag.name.substring(0, truncateLength) + '…'
                        : tag.name
                      : tag.name
                  }
                </Tag>
              )
            }
            {
              tooManyTags &&
              (
                !allTagsShown
                  ?
                  <div className="flex bg br-pill pointer">
                    <h4
                      className="hover-dim-bg br-pill pa2"
                      onClick={() => setAllTagsShown(true)}
                    >
                      +{moreCount}
                    </h4>
                  </div>
                  :
                  <small
                    className="br-pill underline-hover pointer"
                    onClick={() => setAllTagsShown(false)}
                  >
                    Collapse
                  </small>
              )
            }
          </div>
          <div className="pointer hover-dim-bg br3 pa3">
            <i className="fa fa-ellipsis-v fa-md"></i>
          </div>
        </div>
      </div>
    </div >
  );
}
