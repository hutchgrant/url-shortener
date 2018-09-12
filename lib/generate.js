exports.createShortUrl = size => {
  let a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let rand = 0;
  let short = [];
  for (let n = 0; n < size; n++) {
    rand = Math.floor(Math.random() * 62);
    short.push(a.substr(rand, 1));
  }
  return short.join('');
};
