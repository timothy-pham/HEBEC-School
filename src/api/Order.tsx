import instance from '../core/utils/requests';

export const postOrder = (data: any) => {
  return instance
    .post('/v1/customer/order', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
