## Simple Authentication Web App 

This is a simple web app which allows a user to register for and log into their account. It currently generates HTML on the server using Mustache templating.

This service relies on an authentication web service which should be already running elsewhere. My implemementation of this auth web service can be found [here](https://github.com/cfu288/AuthWS).

To run the web app:
```
 ./index.js [ -d|--ssl-dir SSL_DIR ] PORT WS_URL
```

* -d | --ssl-dir : Provides the path containing the SSL credential files key.pem and cert.pem. If not specified, uses same directory.
* PORT : Port to run service on
* WE_URL : The url of the authentication web service this app relies on.
