import React, { useState } from 'react';

import { Loader } from 'bastianparedes/components';

import constants from '../../../config/constants';
import WarningModal from '../../WarningModal';

interface typeElements extends HTMLFormControlsCollection {
  user: { value: string };
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

    fetch(String(constants.backendDomain) + '/api/createUser', {
      body: JSON.stringify({
        password,
        user
      }),
      method: 'POST'
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
            const newUser = { hashedPassword, user };
            setUsers((users: Array<{ user: string; hashedPassword: string }>) =>
              [...users, newUser].sort((user1, user2) => {
                return user1.user < user2.user ? -1 : 1;
              })
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
        <input name="password" placeholder="Password" type="password" />
        <button type="submit">Crear</button>
      </form>
    </>
  );
};

export default Form;
