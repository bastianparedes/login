import React from 'react';

import styles from './styles.module.scss';

interface props {
  children?: React.ReactNode;
}

const FormContainer = ({ children }: props): JSX.Element => {
  return <div className={styles.container}>{children}</div>;
};

export default FormContainer;
