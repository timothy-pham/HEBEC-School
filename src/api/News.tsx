import instance from '../core/utils/requests';

export const getNews = (data: any) => {
  return instance
    .get('/v1/customer/news?page=' + data.page + '&limit=' + data.limit, data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
