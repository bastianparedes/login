import React, { useState } from 'react';

import { Loader } from 'bastianparedes/components';

import constants from '../../../config/constants';
import WarningModal from '../../WarningModal';

interface typeElements extends HTMLFormControlsCollection {
  user: { value: string };
  newPassword: { value: string };
  password: { value: string };
}

interface typeTarget {
  elements: typeElements;
}

const Form = ({ setUsers }: any): JSX.Element => {
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState<string | boolean>(false);

  const onSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setShowLoader(true);

    const target = event.target as typeof event.target & typeTarget;
    const elements = target.elements;
    const user = elements.user.value;
    const password = elements.password.value;
    const newPassword = elements.newPassword.value;

    fetch(String(constants.backendDomain) + '/api/updatePassword', {
      body: JSON.stringify({
        newPassword,
        oldPassword: password,
        user
      }),
      method: 'PUT'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(
        (json: { error: string; hashedPassword: string; success: boolean }) => {
          const { hashedPassword, success } = json;

          if (success) {
            setUsers(
              (users: Array<{ user: string; hashedPassword: string }>) => {
                const userToUpdate = users.find(
                  (userInList) => userInList.user === user
                );
                if (userToUpdate !== undefined)
                  userToUpdate.hashedPassword = hashedPassword;
                return [...users];
              }
            );
          } else {
            setError(json.error);
          }
        }
      )
      .catch(() => {})
      .finally(() => {
        setShowLoader(false);
      });
  };

  return (
    <>
      {showLoader && <Loader />}
      {error !== false && (
        <WarningModal setModalVisible={setError}>{error}</WarningModal>
      )}
      <form data-testid="contact-form" onSubmit={onSubmit}>
        <input name="user" placeholder="User" type="text" />
        <input name="password" placeholder="Old Password" type="password" />
        <input name="newPassword" placeholder="New Password" type="password" />
        <button type="submit">Update Password</button>
      </form>
    </>
  );
};

export default Form;
