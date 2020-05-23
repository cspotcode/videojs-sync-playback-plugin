/*! @name videojs-sync-playback-plugin @version 0.0.0 @license MIT */
import videojs from 'video.js';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var version = "0.0.0";

var Plugin = videojs.getPlugin('plugin'); // Default options for the plugin.

var defaults = {
  delaySeconds: 30
};
/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */

var SyncPlaybackPlugin =
/*#__PURE__*/
function (_Plugin) {
  _inheritsLoose(SyncPlaybackPlugin, _Plugin);

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
  function SyncPlaybackPlugin(player, options) {
    var _this;

    // the parent class will add player under this.player
    _this = _Plugin.call(this, player) || this;
    _this.options = videojs.mergeOptions(defaults, options);

    _this.player.ready(function () {
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var response, parsed, serverDate, localDate, localToServerDate;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.player.addClass('vjs-sync-playback-plugin');

                _context.next = 3;
                return fetch('http://worldclockapi.com/api/json/utc/now');

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                parsed = _context.sent;
                serverDate = new Date(parsed.currentDateTime);
                localDate = new Date();
                localToServerDate = +serverDate - +localDate;
                console.dir({
                  serverDate: serverDate,
                  localDate: localDate,
                  localToServerDate: localToServerDate
                });
                setInterval(function () {
                  console.log({
                    currentTime: _this.player.currentTime()
                  });
                }, 1000);
                console.dir({
                  serverDate: serverDate,
                  localDate: localDate
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    });

    return _this;
  }

  return SyncPlaybackPlugin;
}(Plugin); // Define default values for the plugin's `state` object here.


SyncPlaybackPlugin.defaultState = {}; // Include the version number.

SyncPlaybackPlugin.VERSION = version; // Register the plugin with video.js.

videojs.registerPlugin('syncPlaybackPlugin', SyncPlaybackPlugin);

export default SyncPlaybackPlugin;
