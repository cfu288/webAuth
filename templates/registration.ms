<!DOCTYPE html>
<html>
  <head>
    <title>Registration</title>
    <link rel="stylesheet" href="/css/styles.css">
  </head>
  <body>
    <div class="tit">
    <h1 class="title">Registration</h1>
    </div>
    <div class="main">
        <p class="error">{{msg}}</p>
        <form method="GET" action="/registration.html">
          
          <label>
            <span class="label">First name</span>
            <input name="n" class="control" value="{{n}}" ><br>
            {{#nError}}<span class="error">{{nError}}<br></span>{{/nError}}
          </label>
          
          <label>
            <span class="label">Last name</span>
            <input name="n1" class="control" value="{{n1}}"><br>
            {{#n1Error}}<span class="error">{{n1Error}}<br></span>{{/n1Error}}
          </label>
          
          <label>
            <span class="label">Email</span>
            <input type="email" name="q" class="control" value="{{email}}"><br>
            {{#qError}}<span class="error">{{qError}}<br></span>{{/qError}}
          </label>
          
          <label>
            <span class="label">Password</span>
            <input type="password" name="p" class="control" value="{{p}}"><br>
            {{#pError}}<span class="error">{{pError}}<br></span>{{/pError}}
          </label>
       
          <label>
            <span class="label">Repeat password</span>
            <input type="password" name="p1" class="control" value="{{p1}}"><br>
            {{#p1Error}}<span class="error">{{p1Error}}<br></span>{{/p1Error}}
          </label>
          <input name="register" type="submit" value="Register" class="controlButton">
        
        </form>

    </div>
    <p><a href="/login.html">Login</a></p>
  </body>
</html>
