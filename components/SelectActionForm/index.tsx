import React from 'react';

import Input from './Input';
import styles from './styles.module.scss';

interface props {
  formKey: string;
  formKeys?: string[];
  setFormKey: (arg0: string) => void;
}

const SelectActionForm = ({
  formKey,
  formKeys = [],
  setFormKey
}: props): JSX.Element => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormKey(event.target.value);
  };

  return (
    <form className={styles.container}>
      <p>Please select your action:</p>
      {formKeys.map((formKeyInList) => (
        <Input
          checked={formKeyInList === formKey}
          formKey={formKeyInList}
          key={formKeyInList}
          name="selectedFormKey"
          onChange={handleOnChange}
        />
      ))}
    </form>
  );
};

export default SelectActionForm;
