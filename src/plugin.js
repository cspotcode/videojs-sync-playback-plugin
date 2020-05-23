import videojs from 'video.js';
import {version as VERSION} from '../package.json';

const Plugin = videojs.getPlugin('plugin');

// Default options for the plugin.
const defaults = {
  delaySeconds: 30
};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class SyncPlaybackPlugin extends Plugin {

  /**
   * Create a SyncPlaybackPlugin plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    this.options = videojs.mergeOptions(defaults, options);

    this.player.ready(() => {
      (async () => {
      this.player.addClass('vjs-sync-playback-plugin');

      const response = await fetch('http://worldclockapi.com/api/json/utc/now');
      const parsed = await response.json();
      const serverDate = new Date(parsed.currentDateTime);
      const localDate = new Date();
      const localToServerDate = (+serverDate) - (+localDate);
      console.dir({serverDate, localDate, localToServerDate});
      setInterval(() => {
        console.log({currentTime: this.player.currentTime()});
      }, 1000);
      console.dir({serverDate, localDate});
      })()
    });
  }
}

// Define default values for the plugin's `state` object here.
SyncPlaybackPlugin.defaultState = {};

// Include the version number.
SyncPlaybackPlugin.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('syncPlaybackPlugin', SyncPlaybackPlugin);

export default SyncPlaybackPlugin;
