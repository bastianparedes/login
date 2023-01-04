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

    fetch(String(constants.backendDomain) + '/api/deleteUser', {
      body: JSON.stringify({
        password,
        user
      }),
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((json) => {
        if (json.success === true) {
          setUsers((users: Array<{ user: string; password: string }>) =>
            users.filter((info) => info.user !== user)
          );
        } else {
          setError(json.error);
        }
      })
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
        <button type="submit">Delete</button>
      </form>
    </>
  );
};

export default Form;
