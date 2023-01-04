import React, { useState } from 'react';

import { Loader } from 'bastianparedes/components';

import styles from './styles.module.scss';
import constants from '../../config/constants';

interface props {
  setUsers: any;
}

const DeleteAllUsersButton = ({ setUsers }: props): JSX.Element => {
  const [showLoader, setShowLoader] = useState(false);

  const handleOnClick = (): void => {
    setShowLoader(true);

    void fetch(String(constants.backendDomain) + '/api/deleteAllUsers', {
      method: 'DELETE'
    }).then(() => {
      setUsers([]);
      setShowLoader(false);
    });
  };

  return (
    <>
      {showLoader && <Loader />}
      <div className={styles.container}>
        <button className={styles.button} onClick={handleOnClick}>
          Delete all users
        </button>
      </div>
    </>
  );
};

export default DeleteAllUsersButton;
