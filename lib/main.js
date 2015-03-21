exports.main = function () {
  var pageMod = require('sdk/page-mod');
  var notifications = require('sdk/notifications');

  pageMod.PageMod({
    include: '*.grooveshark.com',
    contentScriptFile: './content-script.js',
    contentScriptWhen: 'end',
    onAttach: function (worker) {
      worker.port.on('ready', function() {
        notifications.notify({
          text: 'Panceta Music is ready'
        });

        var { setInterval, clearInterval } = require('sdk/timers');
        var request = require('sdk/request');

        // TODO worker.tab is available here
        // TODO set interval on page load and clear it on unload.

        var regionId = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';

        setInterval(function() {
          request.Request({
            url: 'http://music-guido.rhcloud.com/' + regionId + '/playlist',
            onComplete: function (response) {
              if (response.json.next) {
                worker.port.emit('play', response.json.next[0]);
              }
            }
          }).get();
        }, 1000);
      });
    }
  });
};
