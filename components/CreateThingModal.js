import { useEffect, useRef, useState } from 'react';
import autosize from 'autosize';
import styled from 'styled-components';

import { breakpoints } from '../styles/breakpoints';
import { Modal } from './Modal';
import { Select } from './TagsSelect';

const ModalContainer = styled(Modal)`
  width: 30rem;
  padding: 2rem;
  padding-bottom: 1.5rem;

  .close {
    width: 2.75rem;
    height: 2.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    user-select: none;
  }

  textarea {
    resize: none;
    max-height: 20rem;
  }

  @media ${breakpoints.mobile} {
    width: 25rem;
  }
`;

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

export function CreateThingModal({ shown, tags, onCreateThing, onClose })
{
  /** @type {{ current: HTMLInputElement }} */
  const title = useRef();

  /** @type {{ current: HTMLTextAreaElement }} */
  const content = useRef();

  const [selectedTags, setSelectedTags] = useState([]);

  const tagOptions = tags.map(tag =>
  ({
    ...tag,
    label: tag.name,
    value: tag.name,
  }));

  const onChange = tags => setSelectedTags(tags);
  const onSave = () => onCreateThing({
    title: title.current.value,
    content: content.current.value,
    tags: selectedTags.map(({ name, color }) => ({ name, color }))
  });

  useEffect(() =>
  {
    if(shown)
      autosize(content.current);
  }, [shown]);

  return (
    <ModalContainer shown={shown} onOuterClick={onClose} className="relative grid">
      <button className="close clear absolute top-0 right-0 pa0" onClick={onClose}>
        <i className="fa fa-times f4"></i>
      </button>
      <h1>Create thing</h1>
      <input ref={title} className="mt3" placeholder="Title" />
      <textarea ref={content} className="mt3" placeholder="Content" />
      <Select
        className="mt3"
        placeholder="Select Tags"
        options={tagOptions}
        isMulti
        onChange={onChange}
      />
      <div className="tr mt2">
        <button className="mt3 ph4 f3" onClick={onSave}>
          <i className="fa fa-save fa-sm mr2"></i>Save
        </button>
      </div>
    </ModalContainer>
  );
}
