var Firebase = require('firebase');
let database = new Firebase('https://mobilebusinesscard.firebaseio.com/');

var api = {
  getProfile(fullname, cb, error) {
    return new Promise((resolve, reject) => {
      database.once('value', resolve, reject);
    })
    .then((data) => {
      let user = data.val().filter(item => {
        return -1 !== item.name.indexOf(fullname);
      });

      if (1 !== user.length) {
        throw new Error(0 === user.length ? 'No user found' : 'More than one user found');
      }

      return user[0];
    });
  }
};

module.exports = api;
