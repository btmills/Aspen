define(['events'], function (EventEmitter) {

	var Property = function (name, opts) {

		_.extend(this, new EventEmitter()); // Inherit from EventEmitter. This is probably the wrong way to do this.
		var _emit = this._emit;

		var value = opts.default || null;

		function get() {
			return value;
		}

		function set(newValue) {
			var oldValue = value;
			value = newValue;
			//console.log('Property "%s" set: %o -> %o', name, oldValue, value);
			_emit('change', { oldValue: oldValue, newValue: value });
		}

		/*return {
			get: get,
			off: this.off,
			on: this.on,
			set: set
		}*/
		this.get = get;
		this.set = set;
	}

	return Property;

});