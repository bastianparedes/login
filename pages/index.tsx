import React, { useEffect, useState } from 'react';

import { Loader } from 'bastianparedes/components';
import DeleteAllUsersButton from 'components/DeleteAllUsersButton';

import FormContainer from '../components/FormContainer';
import SelectActionForm from '../components/SelectActionForm';
import UserCard from '../components/UserCard';
import WarningModal from '../components/WarningModal';
import constants from '../config/constants';
import { formKeys, getForm } from '../utils/getForm';

const Index = (): JSX.Element => {
  const [showLoader, setShowLoader] = useState(true);
  const [users, setUsers] = useState<
    Array<{ user: string; hashedPassword: string }>
  >([]);
  const [showWarning, setShowWarning] = useState(false);

  const [formKey, setFormKey] = useState<string>(formKeys[0]);
  const Form = getForm(formKey);

  useEffect(() => {
    if (sessionStorage.getItem('notFirstVisit') !== 'true') {
      sessionStorage.setItem('notFirstVisit', 'true');
      setShowWarning(true);
    }

    const fetchData = async (): Promise<void> => {
      const response = await fetch(
        String(constants.backendDomain) + '/api/getUsers'
      );

      if (!response.ok) return;

      const json = await response.json();
      setUsers(
        json.users.map((user: { user: string; password: string }) => ({
          ...user,
          hashedPassword: user.password
        }))
      );
      setShowLoader(false);
    };
    void fetchData();
  }, []);

  return (
    <>
      {showLoader && <Loader />}
      {showWarning && (
        <WarningModal setModalVisible={setShowWarning}>
          No ingreses contraseñas reales a esta aplicación
        </WarningModal>
      )}
      <DeleteAllUsersButton setUsers={setUsers} />
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          margin: '1rem 1rem 0rem',
          width: 'auto'
        }}
      >
        <SelectActionForm
          formKey={formKey}
          formKeys={formKeys}
          setFormKey={setFormKey}
        />
        <FormContainer>
          <Form setUsers={setUsers} />
        </FormContainer>
      </div>
      <div
        style={{
          display: 'grid',
          gridGap: '1rem',
          gridTemplateColumns: 'max-content',
          margin: '3rem auto',
          width: 'fit-content'
        }}
      >
        {users.length > 0 ? (
          users.map(({ user, hashedPassword }) => (
            <UserCard key={user} password={hashedPassword} user={user} />
          ))
        ) : (
          <div>No hay usuarios guardados</div>
        )}
      </div>
    </>
  );
};

export default Index;
