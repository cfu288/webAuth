<!DOCTYPE html>
<html>
  <head>
    <title>Login</title>
    <link rel="stylesheet" href="/css/styles.css">
  </head>
  <body>
    <div class="tit">
    <h1 class="title">Login</h1>
    </div>
    <div class="main">
    <p class="error">{{msg}}</p>
    <form method="GET" action="/login.html">
      
      <label>
        <span class="label">Email</span>
        <input type="email" name="q" class="control" value="{{q}}"><br>
        {{#qError}}<span class="error">{{qError}}<br></span>{{/qError}}
      </label>
      
      <label>
        <span class="label">Password</span>
        <input type="password" name="p" class="control" value=""><br>
        {{#pError}}<span class="error">{{pError}}<br></span>{{/pError}}
      </label>
    
    <input name="submit" type="submit" value="Login" class="controlButton">
    </form>
    </div>
    {{>footer}}
  </body>
</html>
