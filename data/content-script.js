(function() {
  setTimeout(function() {
    self.port.emit('ready');
  }, 10000); // wait for angular to finish loading grooveshark

  self.port.on('play', function(id) {
    var script = document.createElement('script');
    script.text = 'window.Grooveshark.addSongsByID(["' + id + '"], true)';

    var element = document.getElementsByTagName('script')[0];
    element.parentNode.insertBefore(script, element);
  });
})();
