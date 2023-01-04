import AddUserForm from '../components/forms/AddUserForm';
import DeletePasswordForm from '../components/forms/DeletePasswordForm';
import UpdatePasswordForm from '../components/forms/UpdatePasswordForm';

const formKeys = ['AddUserForm', 'DeleteUserForm', 'UpdatePasswordForm'];

const getForm = (formKey: string): any => {
  if (formKey === 'AddUserForm') {
    return AddUserForm;
  } else if (formKey === 'DeleteUserForm') {
    return DeletePasswordForm;
  } else if (formKey === 'UpdatePasswordForm') {
    return UpdatePasswordForm;
  }

  return null;
};

const getLabel = (formKey: string): string => {
  if (formKey === 'AddUserForm') {
    return 'Create user';
  } else if (formKey === 'DeleteUserForm') {
    return 'Delete password';
  } else if (formKey === 'UpdatePasswordForm') {
    return 'Update password';
  }

  return '';
};

export { formKeys, getForm, getLabel };
