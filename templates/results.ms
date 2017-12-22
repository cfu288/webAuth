<!DOCTYPE html>
<html>
  <head>
    <title>Book Search Results</title>
    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
    <h1>Book Search Results</h1>
    {{^results.length}}
    <span class="error">No matching books</span>
    {{/results.length}}
    {{#results}}
    <p>
      {{#authors}}<span class="author">{{.}}</span>, {{/authors}}
      <span class="title">{{title}},</span>
      <span class="publisher">{{publisher}},</span>
      <span class="year">{{date.year}}.</span>
      <br>
      <form method="POST" action="/shop/add-item">
        <input name="id" type="hidden" value="{{_id}}">
	<input name="details" type="hidden" value="{{_details}}">
        <input type="submit" value="Buy">
      </form>
    </p>
    {{/results}}
    {{>footer}}
  </body>
</html>
