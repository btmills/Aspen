define(['events'], function (EventEmitter) {

	/*var Property = function (name, opts) {

		_.extend(this, new EventEmitter()); // Inherit from EventEmitter. This is probably the wrong way to do this.
		var _emit = this._emit;

		var value = opts.default || null;

		function get() {
			return value;
		}

		function set(newValue) {
			var oldValue = value;
			value = newValue;
			_emit('change', { oldValue: oldValue, newValue: value });
		}

		this.get = get;
		this.set = set;
	}*/

	var Property = EventEmitter.extend({
		init: function (name, opts) {
			this._super();

			this._value = opts.default || null;
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