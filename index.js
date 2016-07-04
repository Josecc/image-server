let express = require('express');
let fs = require('fs');

let app = express();
let images = __dirname;

app.use('/images/:im_name', (req, res, next) => {
  let extensions = ['.png', '.jpg'];
  extensions.map((extension, index) => {
    fs.exists( images + '/images/' + req.params.im_name + extension, (exists) => {
      if(exists) {
        req.url += extension;
        next();
      } else if (index + 1 == extensions.length && !res.headerSent) {
        next();
      }
    });
  });
});

app.use(express.static(images));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
