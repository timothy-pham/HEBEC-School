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

export const getOrder = () => {
  return instance
    .get('/v1/customer/order')
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const cancelOrder = (data: any) => {
  return instance
    .post('/v1/customer/order/' + data.orderId + '/cancel', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
