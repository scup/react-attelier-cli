
const template = (`
  <!DOCTYPE html >
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
  </head>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
  </html>
`);

exports.index = function(req, res) {
  res.send(template);
};
