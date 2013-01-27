define(['underscore', 'oo'], function (_, Class) {

	var EventEmitter = Class.extend({

		init: function () {
			this._callbacks = {};
		},

		emit: function (events, args) {
			var self = this;
			_.each(events.split(' '), function (event) {
				_.each(self._callbacks[event], function(callback) {
					if (callback) callback(event, args);
				});
			});
		},

		on: function (events, callback) {
			var self = this;
			_.each(events.split(' '), function (event) {
				if (!self._callbacks.hasOwnProperty(event))
					self._callbacks[event] = [];

				self._callbacks[event].push(callback);
			});
		},

		off: function (events, callback) {
			var self = this;
			_.each(events.split(' '), function (event) {
				if (!self._callbacks.hasOwnProperty(event)) return;

				var index = self._callbacks[event].indexOf(callback);

				if (index < 0) return;

				self._callbacks[event].splice(index, 1);
			});
		}

	});

	return EventEmitter;

});