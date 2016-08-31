'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringTimer = function () {
  function StringTimer(init) {
    _classCallCheck(this, StringTimer);

    Object.assign(this, {
      log: [new Date()], // running log of timestamps
      stamps: {}, // lookup table of manually-named timestamps
      at: null, // internal position for comparison
      formatter: this.format, // defaults to internal formatter, but may override with any external library
      logLimit: 1000 // trim log to this many entries
    }, init);
  }

  _createClass(StringTimer, [{
    key: 'format',
    value: function format(duration) {
      var unit = 'ms';

      if (duration > 1000) {
        unit = 'sec';
        duration = duration / 1000;

        if (duration > 60) {
          unit = 'min';
          duration = duration / 60;

          if (duration > 60) {
            unit = 'hour';
            duration = duration / 60;
          }
        }
      }

      return '' + duration + unit;
    }
  }, {
    key: 'elapsed',
    value: function elapsed(key) {
      var distance = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      return new Date() - (this.at || [].concat(_toConsumableArray(this.log)).slice(-distance)[0]);
    }
  }, {
    key: 'from',
    value: function from(key) {
      this.at = this.stamps[key];
      return this;
    }
  }, {
    key: 'set',
    value: function set(key) {
      var date = arguments.length <= 1 || arguments[1] === undefined ? new Date() : arguments[1];

      if (key) {
        this.stamps[key] = date;
      }

      // sets at cursor to one position back
      var _log$slice = this.log.slice(-1);

      var _log$slice2 = _slicedToArray(_log$slice, 1);

      this.at = _log$slice2[0];
      this.log = [].concat(_toConsumableArray(this.log), [date]).slice(-this.logLimit); // append new date to log and take last [logLimit]
      this.total = this.formatter(new Date() - this.log[0]);
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var elapsed = this.elapsed();
      this.set();

      // resets at cursor to current last entry

      var _log$slice3 = this.log.slice(-1);

      var _log$slice4 = _slicedToArray(_log$slice3, 1);

      this.at = _log$slice4[0];
      return this.formatter(elapsed);
    }
  }]);

  return StringTimer;
}();

exports.default = StringTimer;