import instance from '../core/utils/requests';

export const getBook = (data: any) => {
  let param = '?';
  if (data.page != undefined) {
    param = param + 'page=' + data.page;
  }
  if (data.search != undefined) {
    param = param + '&search=' + data.search;
  }
  if (data.categoryId != undefined) {
    param = param + '&categoryId=' + data.categoryId;
  }
  if (data.sortPrice != undefined) {
    param = param + '&sortPrice=' + data.sortPrice;
  }
  if (data != null) {
    return instance
      .get('/v1/customer/book' + param, data)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  } else {
    return instance
      .get('/v1/customer/book')
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  }
};

export const getBookById = (data: any) => {
  return instance
    .get('/v1/customer/book/' + data.id)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
