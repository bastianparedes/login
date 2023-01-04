import React from 'react';

import styles from './styles.module.scss';

interface props {
  user: string;
  password: string;
}

const UserCard = ({ user, password }: props): JSX.Element => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.fieldTitleUser}>User: </span>
        <span className={styles.fieldContentUser}>{user}</span>
        <span className={styles.fieldTitlePassword}>Password: </span>
        <span className={styles.fieldContentPassword}>{password}</span>
      </div>
    </>
  );
};

export default UserCard;
