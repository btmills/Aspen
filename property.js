define(['events'], function (EventEmitter) {

	var Property = EventEmitter.extend({

		init: function (name, opts) {
			this._super();

			this._value = opts.hasOwnProperty('default') ? opts.default : null;
		},

		get: function () {
			return this._value;
		},

		set: function (newValue) {
			var oldValue = this._value;
			this._value = newValue;
			this.emit('change', { oldValue: oldValue, newValue: this._value });
		}

	});

	return Property;

});