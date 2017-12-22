'use strict';

const axios = require('axios');

function Shop(url) {
  this.baseUrl = '';
}

Shop.prototype.setUrl = function(u){
    this.baseUrl = u;
}

//All action functions return promises.
Shop.prototype.register = function(fname,lname,email,pass){
  return axios.put(`${this.baseUrl}/users/${email}?pw=${pass}`, {"fname":fname,"lname":lname})
    .then((response) => response.data)
    .catch((err) => console.log(err.response));
}

Shop.prototype.search = function(user, authToken) {
  let header = { 
    headers: {
        'Authorization': 'Bearer ' + authToken
    }
  };
  console.log('HEADER:' + header)
  return axios.get(`${this.baseUrl}/users/${user}`, header)
    .then((response) => response.data)
    .catch((err) => console.log(err.response));
}

Shop.prototype.login = function(username, password){
    let pass = { 'pw': password};
    return axios.put(`${this.baseUrl}/users/${username}/auth`,pass)
    .then((response) => response.data)
    .catch((err) => console.log(err.response));
}


module.exports = new Shop();
