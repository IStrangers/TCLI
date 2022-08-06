var downloadUrl = require('download')

module.exports = download

function download (url, dest, opts, fn) {
    var downloadOptions = {
      extract: true,
      strip: 1,
      mode: '666',
      ...opts,
      headers: {
        accept: 'application/zip',
        ...(opts.headers || {})
      }
    }
    downloadUrl(url, dest, downloadOptions)
    .then(function (data) {
        fn()
    })
    .catch(function (err) {
        fn(err)
    })
}