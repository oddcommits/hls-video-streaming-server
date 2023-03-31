const app = require('express')();
const cors = require('cors');
const fs = require('fs');
const hls = require('hls-server');

app.use(cors());
const server = app.listen(5000);

new hls(server, {
  provider: {
    exists: function (req, cb) {
      const ext = req.url.split('.').pop();

      if (ext !== 'm3u8' && ext !== 'ts') {
        return cb(null, true);
      }

      fs.access(__dirname + req.url, fs.constants.F_OK, function(err) {
        if (err) {
          console.log('File not exist');
          return cb(null, false);
        }
        cb(null, true);
      })
    },
    getManifestStream: function (req, cb) {
      const stream = fs.createReadStream(__dirname + req.url);
      cb(null, stream);
    },
    getSegmentStream: function (req, cb) {
      const stream = fs.createReadStream(__dirname + req.url);
      cb(null, stream);
    }
  }
});
