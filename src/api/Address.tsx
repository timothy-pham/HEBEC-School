import instance from '../core/utils/requests';

export const getCity = () => {
  return instance
    .get('/v1/customer/addressCity?page=1&limit=100')
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const getDistrict = (data: any) => {
  return instance
    .get('/v1/customer/addressDistrict?parentCode=' + data.parentCode, data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const getWard = (data: any) => {
  return instance
    .get('/v1/customer/addressWard?parentCode=' + data.parentCode, data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
