#!/usr/bin/env nodejs

'use strict';

//nodejs dependencies
const fs = require('fs');
const process = require('process');

//external dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mustache = require('mustache');
const https = require('https');

//local dependencies
const options = require('./options');
const shop = require('./models/shop');

const STATIC_DIR = 'statics';
const TEMPLATES_DIR = 'templates';

const CART_COOKIE = 'cartId';

/*************************** Route Handling ****************************/

function setupRoutes(app) {
  app.get('/', rootRedirectHandler(app));
  app.get('/login.html', loginHandler(app));
  app.get('/registration.html', registrationHandler(app));
  app.get('/account.html', accountHandler(app));
}

function rootRedirectHandler(app) {
  return function(req, res) {
    res.redirect('login.html');
  };
}

function accountHandler(app) {
    return function(req,res){
        if (req.cookies['auth'] === undefined){
            res.redirect('login.html');
        }
        else{
            const isDisplay = (typeof req.query.logout === 'undefined');
            if (isDisplay) { //render as normal
                let authTok = req.cookies['auth'];
                let userTok = req.cookies['user'];
                //console.log('authCookies: ' + authTok);
                //console.log('userCookies: ' + userTok);
                
                let data = {}

                app.shop.search(userTok, authTok)
                .then((json) => {
                    if(json !== undefined){
                        data.fname = json.fname; 
                        data.lname = json.lname; 
                    }else{
                        data.fname = 'error'; 
                        data.lname = 'error'; 
                    }
                    //console.log(data);
                    res.send(doMustache(app, 'account', data));
                })
                .catch((err) => console.error(err));
            }else{ // user logged out
                res.clearCookie('auth');
                res.clearCookie('user');
                res.send(doMustache(app, 'login', {}));
            }
        }
    }
}

function loginHandler(app) {
  return function(req, res) {
    if (req.cookies['auth'] !== undefined){
        res.redirect('account.html');
    }
    const isDisplay = (typeof req.query.submit === 'undefined');
    if (isDisplay) { //simply render search page
      res.send(doMustache(app, 'login', {}));
    }
    else {
      const q = req.query.q;
      const p = req.query.p;
      let valid = true;
      let errors = {}
      if (typeof q === 'undefined' || q.trim().length === 0) {
	    errors.qError = 'Please provide an email';
        valid = false;
      } else errors.q = q;
      if (typeof p === 'undefined' || p.trim().length === 0) {
	    errors.pError = 'Please provide a password';
        valid = false;
      }
	  if (!valid) res.send(doMustache(app, 'login', errors));
      if (valid) {
	    //console.log("valid credentials");
        app.shop.login(q,p)
	    .then((json) => { 
            console.log(json);
            if(json.authToken){
                console.log('received:' + json);
                res.cookie('auth', json.authToken, { maxAge: 86400*1000 });
                res.cookie('user', q , { maxAge: 86400*1000 });
                res.redirect('account.html'); 
            }
         })
	    .catch((err) => { 
            console.error(err.response);
            errors.msg = 'Error logging in user, is your username and password correct?';
            res.send(doMustache(app, 'login', errors));
        });
      }
    }
  }
}

function registrationHandler(app) {
  return function(req, res) {
    const isDisplay = (typeof req.query.register === 'undefined');
    if (req.cookies['auth'] !== undefined){
        res.redirect('account.html');
    }
    if (isDisplay) { //simply render search page
      res.send(doMustache(app, 'registration', {}));
    }
    else {
      const q = req.query.q;
      const p = req.query.p;
      const p1 = req.query.p1;
      const n = req.query.n;
      const n1 = req.query.n1;
      let valid = true;
      let errors = {}
      if (typeof n === 'undefined' || n.trim().length === 0) {
	    errors.nError = 'Please provide a name';
        valid = false;
      }else errors.n = n;
      if (typeof n1 === 'undefined' || n1.trim().length === 0) {
	    errors.n1Error = 'Please provide a name';
        valid = false;
      } else errors.n1 = n1;
      if (typeof q === 'undefined' || q.trim().length === 0) {
	    errors.qError = 'Please provide an email';
        valid = false;
      } else errors.email = q;
      if (typeof p === 'undefined' || p.trim().length === 0) {
	    errors.pError = 'Please provide a password';
        valid = false;
      }
      if (typeof p1 === 'undefined' || p1.trim().length === 0) {
	    errors.p1Error = 'Please repeat password';
        valid = false;
      }
      if (p !== p1) {
	    errors.p1Error = 'Passwords do not match';
        valid = false; 
      }
      var patt = new RegExp("^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){1,}).{8,}$");
      if(!patt.test(p)){
	    //console.log(p);
        errors.pError = 'Passwords must be at least 8 char long and have one digit';
        valid = false
      }
	  if (!valid){
        //console.log(errors);
        res.send(doMustache(app, 'registration', errors));
        }
      if (valid) {
	    //console.log("valid credentials");
        app.shop.register(n,n1,q,p)
	    .then((json) => {
            if(json.authToken !== undefined){
                //console.log('received:' + json);
                res.cookie('auth', json.authToken, { maxAge: 86400*1000 });
                res.cookie('user', q , { maxAge: 86400*1000 });
                res.redirect('account.html'); 
            }
        })
	    .catch((err) => {
            console.error(err);
            errors.msg = 'User already exists';
            res.send(doMustache(app, 'registration', errors));
        });
      }
    }
  }
}

/************************ Utility functions ****************************/

function getPort(argv) {
  let port = null;
  if (argv.length !== 4 || !(port = Number(argv[2]))) {
    console.error(`usage: ${argv[1]} PORT URL`);
    process.exit(1);
  }
  return port;
}

function getURL(argv) {
  let url = null;
  if (argv.length !== 4) {
    console.error(`usage: ${argv[1]} PORT URL`);
    process.exit(1);
  }
  return url;
}

function doMustache(app, templateId, view) {
  const templates = { footer: app.templates.footer };
  return mustache.render(app.templates[templateId], view, templates);
}

function errorPage(app, errors, res) {
  if (!Array.isArray(errors)) errors = [ errors ];
  const html = doMustache(app, 'errors', { errors: errors });
  res.send(html);
}
  
/*************************** Initialization ****************************/

function setupTemplates(app) {
  app.templates = {};
  for (let fname of fs.readdirSync(TEMPLATES_DIR)) {
    const m = fname.match(/^([\w\-]+)\.ms$/);
    if (!m) continue;
    try {
      app.templates[m[1]] =
	String(fs.readFileSync(`${TEMPLATES_DIR}/${fname}`));
    }
    catch (e) {
      console.error(`cannot read ${fname}: ${e}`);
      process.exit(1);
    }
  }
}

function setup() {
  process.chdir(__dirname);
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
  const port = options.options.port;
  const sslDir = options.options.sslDir;
  const url = options.options.ws_url;
  const app = express();
  app.use(cookieParser());
  setupTemplates(app);
  app.shop = shop;
  app.shop.setUrl(url);
  app.use(express.static(STATIC_DIR));
  app.use(bodyParser.urlencoded({extended: true}));
  setupRoutes(app);
  let dir = options.sslDir || '.';
  https.createServer({
    key: fs.readFileSync(`${dir}/key.pem`),
    cert: fs.readFileSync(`${dir}/cert.pem`),
  }, app).listen(port, function() {
    console.log(`listening on port ${port}`);
  });
}

setup();
