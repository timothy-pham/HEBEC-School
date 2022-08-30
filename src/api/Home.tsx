import instance from '../core/utils/requests';

export const getBanner = () => {
  return instance
    .get('/v1/customer/banner')
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const getImage = (url: any) => {
  return instance
    .get(url)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
