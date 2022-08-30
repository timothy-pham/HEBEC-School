import instance from '../core/utils/requests';

export const getCategoryHighlight = () => {
  return instance
    .get('/v1/customer/category/highlight')
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const getCategory = () => {
  return instance
    .get('/v1/customer/category')
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
