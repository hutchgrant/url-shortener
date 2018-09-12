exports.checkUrl = (url, short) => {
  var regex = short
    ? /^[a-z0-9_-]{8}$/i
    : /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/;
  if (!url || !regex.test(url)) {
    throw new Error('Invalid URL');
  }
};
