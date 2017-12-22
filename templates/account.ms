<!DOCTYPE html>
<head>
  <title>Account</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>

    <h1>Account</h1>
    <p>
        First Name: {{fname}} 
    </p><p>    
        Last Name: {{lname}}
    </p>
    <form method="GET" action="/account.html">
    <input name="logout" type="submit" value="Logout" class="control">
    </form>
</body>
</html>
