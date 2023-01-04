import { basePath } from '../next.config';

const constants = {
  backendDomain: basePath,
  errors: {
    incorrectPassword: 'Introduced password is not correct',
    userAlreadyExists: 'User already exists. Please check the list below',
    userDoesNotExist: 'User does not exist. Please check the list below'
  },
  hashRounds: 10
};

export default constants;
