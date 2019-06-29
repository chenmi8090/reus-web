import service from './request';

export function doPost(param, url) {
  console.log(URL)
  return service({
    url: url,
    method: 'post',
    data: param
  }).catch(function (error) {
    console.log(error);
  })

}
