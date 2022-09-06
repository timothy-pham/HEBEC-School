import instance from '../core/utils/requests';

export const getNotifications = () => {
  return instance
    .get('/v1/customer/notificationCustomer')
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const seenNotification = (data: any) => {
  return instance
    .post(
      '/v1/customer/notificationCustomer/' +
        data.notificationCustomerId +
        '/seen',
    )
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
