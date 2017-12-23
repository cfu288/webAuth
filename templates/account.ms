<!DOCTYPE html>
<head>
  <title>Account</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <div class="tit">
    <h1 class="title">Account</h1>
    </div>
    <div class="main">
        <p>
            First Name: {{fname}} 
        </p><p>    
            Last Name: {{lname}}
        </p>
        <form method="GET" action="/account.html">
            <input name="logout" type="submit" value="Logout" class="controlButton">
        </form>
    </div>
</body>
</html>
