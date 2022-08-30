import instance from '../core/utils/requests';

export const getProfile = () => {
  return instance
    .get('/v1/customer/auth/profile')
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const updatePassword = (data: any) => {
  return instance
    .post('/v1/customer/auth/password/update', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
