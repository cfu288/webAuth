## Simple Authentication Web App 

This is a simple web app which allows a user to register for a new account and log into their account to access personal data. It currently generates HTML on the server using Mustache templating.

This service relies on an authentication web service which should be already running elsewhere. My implemementation of this auth web service can be found [here](https://github.com/cfu288/AuthWS).

To run the web app:
```
 ./index.js [ -d|--ssl-dir SSL_DIR ] PORT WS_URL
```

* -d | --ssl-dir : Provides the path containing the SSL credential files key.pem and cert.pem. If not specified, uses same directory.
* PORT : Port to run service on
* WS_URL : The url of the authentication web service this app relies on.

NOTE: Backend service currently automatically times out auth tokens after set time without telling client. Can cause the account page to return error. Timeout on client needs to be implemented.
