import React, { useEffect, useState } from 'react';

import DeleteAllUsersButton from 'components/DeleteAllUsersButton';

import FormContainer from '../components/FormContainer';
import SelectActionForm from '../components/SelectActionForm';
import UserCard from '../components/UserCard';
import WarningModal from '../components/WarningModal';
import { prisma } from '../lib/prisma';
import { formKeys, getForm } from '../utils/getForm';

interface props {
  initialUsers: Array<{ user: string; hashedPassword: string }>;
}

const Index = ({ initialUsers }: props): JSX.Element => {
  const [users, setUsers] =
    useState<Array<{ user: string; hashedPassword: string }>>(initialUsers);
  const [showWarning, setShowWarning] = useState(false);

  const [formKey, setFormKey] = useState<string>(formKeys[0]);
  const Form = getForm(formKey);

  useEffect(() => {
    if (sessionStorage.getItem('notFirstVisit') !== 'true') {
      sessionStorage.setItem('notFirstVisit', 'true');
      setShowWarning(true);
    }
  }, []);

  return (
    <>
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

const getServerSideProps = async (): Promise<{ props: props }> => {
  const initialUsers = await prisma.fakeUser.findMany();

  return {
    props: {
      initialUsers: initialUsers.map(
        (user: { user: string; password: string }) => ({
          hashedPassword: user.password,
          user: user.user
        })
      )
    }
  };
};

export { getServerSideProps };
export default Index;
