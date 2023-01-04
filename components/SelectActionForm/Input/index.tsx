import React from 'react';

import styles from './styles.module.scss';
import { getLabel } from '../../../utils/getForm';

interface InputProps {
  checked: boolean;
  formKey: string;
  name: string;
  onChange: any;
}

const Input = ({
  checked,
  formKey,
  name,
  onChange
}: InputProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <input
        checked={checked}
        id={formKey}
        name={name}
        onChange={onChange}
        type="radio"
        value={formKey}
      />
      <label htmlFor={formKey}>{getLabel(formKey)}</label>
    </div>
  );
};

export default Input;
