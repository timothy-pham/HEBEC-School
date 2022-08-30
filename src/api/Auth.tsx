import instance from '../core/utils/requests';

export const login = (data: any) => {
  return instance
    .post('/v1/customer/auth/login', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const register = (data: any) => {
  return instance
    .post('/v1/customer/auth/signup', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
