let express = require('express');
let fs = require('fs');

let app = express();
let images = __dirname;

app.use('/images/:im_name', (req, res, next) => {
  let extensions = ['.png', '.jpg'];                //- Add more extensions to support more files
  let state = { found: false, checks: 0 };          //- Makes sure to return not found when all extensions
                                                    //  checked and dile not found.
  for(let i = 0; i < extensions.length; i++){
    fs.exists( images + '/images/' + req.params.im_name + extensions[i], (exists) => {
      state.checks++;

      if(exists) {
        req.url += extensions[i];
        state.found = true;
        next();
      } else if( state.checks == extensions.length && !state.found) {
        next();
      }
    });
  }
});

app.use(express.static(images));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
