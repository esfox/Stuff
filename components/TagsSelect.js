import CreateableSelect from 'react-select/creatable';
import styled from 'styled-components';

import { getAdaptiveTextColor } from '../helpers/common-helpers';

const ReactSelect = styled(CreateableSelect)`
  .tags-select {

    &__control {
      border-width: 0;
      border-color: transparent;
      box-shadow: none;
      cursor: pointer;

      &--is-focused {
        box-shadow: inset 0px -2px 0 var(--color-primary);
      }
    }

    &__input {

      input:focus {
        box-shadow: none !important;
      }
    }

    &__menu {
      box-shadow: 0 4px 11px hsl(0deg 0% 0% / 10%);
    }

    &__option--is-selected {
      color: var(--color-foreground);
    }

    &__indicator {
      padding: .8rem .5rem;

      &:hover {
        background: var(--color-dim-bg);
      }

      &-separator {
        width: 0;
      }
    }

    &__value-container {
      padding: .5rem .5rem;
    }

    &__multi-value {
      border-radius: .25rem;
      margin: .2rem;

      &__remove {
        border-top-right-radius: .25rem;
        border-bottom-right-radius: .25rem;
      }

      &__label {
        font-size: 1rem;
        padding-left: .5rem;
      }

      &__label,
      &__remove {
        padding-top: .4rem;
        padding-bottom: .4rem;
      }
    }
  }
`;

export function Select({ className, options, isMulti, placeholder, onChange })
{
  return (
    <ReactSelect
      className={`tags-select ${className ? className : ''}`}
      classNamePrefix="tags-select"
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      onChange={onChange ? onChange : null}
      theme={theme =>
      ({
        ...theme,
        borderRadius: 0,
        colors:
        {
          ...theme.colors,
          primary: 'var(--color-primary)',
          primary25: 'var(--color-primary)',
          primary50: 'var(--color-primary-dark)',
          neutral0: 'var(--color-background-light)',
          neutral20: 'var(--color-foreground-dark)',
          neutral40: 'var(--color-foreground-dark)',
          neutral50: 'var(--color-foreground-dark)',
          neutral60: 'var(--color-foreground-dark)',
          neutral80: 'var(--color-foreground)',
        }
      })}
      styles={
        {
          option: (styles, { data, isSelected, isFocused, isDisabled }) =>
          ({
            ...styles,
            backgroundColor: isMulti
              ? (
                isDisabled ? null
                  : isSelected ? data.color
                    : isFocused ? data.color : null
              ) : styles.backgroundColor,
            color: isMulti
              ? (
                isDisabled ? null : isFocused ? getAdaptiveTextColor(data.color) : 'white'
              ) : styles.color,
          }),
          multiValue: (styles, { data }) =>
          ({
            ...styles,
            backgroundColor: data.color || 'var(--color-background)',
          }),
          multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: getAdaptiveTextColor(data.color),
          }),
          multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: getAdaptiveTextColor(data.color),
          }),
        }
      }
    />
  );
}
