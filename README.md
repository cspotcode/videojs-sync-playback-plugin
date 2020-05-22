# videojs-sync-playback-plugin



## Installation

```sh
npm install --save videojs-sync-playback-plugin
```

## Usage

To include videojs-sync-playback-plugin on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-sync-playback-plugin.min.js"></script>
<script>
  var player = videojs('my-video');

  player.syncPlaybackPlugin();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-sync-playback-plugin via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-sync-playback-plugin');

var player = videojs('my-video');

player.syncPlaybackPlugin();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-sync-playback-plugin'], function(videojs) {
  var player = videojs('my-video');

  player.syncPlaybackPlugin();
});
```

## License

MIT. Copyright (c) Andrew Bradley &lt;cspotcode@gmail.com&gt;


[videojs]: http://videojs.com/
