define(['jquery', 'underscore', 'oo', 'property', 'events'], function ($, _, Class, Property, EventEmitter) {

	var Binding = function (src, tgt, opts) {

		if (!(src instanceof Property || src instanceof $ || src instanceof Endpoint)
		    || !(tgt instanceof Property || tgt instanceof $ || tgt instanceof Endpoint)) {
		    console.error('Cannot bind %o and %o due to type mismatch.', src, tgt);
			throw 'Must bind to an instance of Property or jQuery.';
		}
		if ((src instanceof $ && src.length > 1)
		    || (tgt instanceof $ && tgt.length > 1))
			throw 'Cannot bind to multiple sources or targets. Create multiple Bindings.';

		this.src = src;
		this.tgt = tgt;
		this.opts = _.extend({
			twoWay: true
		}, opts);

		update(src, tgt);

		src.on('change', function (event) {
			update(src, tgt);
		});

		if (this.opts.twoWay) {
			tgt.on('change', function (event) {
				update(tgt, src);
			});
		}

		function update (from, to) {
			to.set(from.get());
		}

	};

	var Endpoint = EventEmitter.extend({
		init: function (el) {
			this._super();

			if (!el instanceof $)
				throw 'Endpoint element must be a jQuery object.';
			this.el = el;
		}
	});

	var ClassEndpoint = Endpoint.extend({
		init: function (el, classname) {
			this._super(el);
			this.classname = classname;
		},
		get: function () {
			return this.el.hasClass(this.classname);
		},
		set: function (value) {
			if (value) this.el.addClass(this.classname);
			else this.el.removeClass(this.classname);
		}
	});

	/*function ClassEndpoint(el, classname) {

		if (!el instanceof $)
			throw 'ClassEndpoint element must be a jQuery object.';

		_.extend(this, new EventEmitter());
		var emit = this._emit;

		this.el = el;
		this.classname = classname;

		this.get = function () {
			return this.el.hasClass(this.classname);
		}

		this.set = function (value) {
			if (value) this.el.addClass(this.classname);
			else this.el.removeClass(this.classname);
		}

	}
	ClassEndpoint.prototype = new Endpoint();*/

	var ValEndpoint = Endpoint.extend({
		init: function (el) {
			this._super(el);

			var self = this;
			this.el.on('change keyup blur', function () {
				self.emit('change keyup blur', {});
			});
		},
		get: function () {
			return this.el.val();
		},
		set: function (value) {
			var oldValue = this.el.val();
			if (oldValue == value) return;

			this.el.val(value);
		}
	});

	/*function ValEndpoint(el) {

		if (!el instanceof $)
			throw 'TextEndpoint element must be a jQuery object.';

		_.extend(this, new EventEmitter());
		var emit = this._emit;

		this.el = el;

		this.el.on('change keyup blur', function () {
			emit('change keyup blur', {});
		});

		this.get = function () {
			return this.el.val();
		}

		this.set = function (value) {
			var oldValue = this.el.val();
			if(oldValue == value) return;

			this.el.val(value);
			//emit('change', { oldValue: oldValue, newValue: value });
		}

	}
	ValEndpoint.prototype = new Endpoint();*/

	var TextEndpoint = Endpoint.extend({
		init: function (el) {
			this._super(el);
		},
		get: function () {
			return this.el.text();
		},
		set: function (value) {
			var oldValue = this.el.text();
			if (oldValue == value) return;

			this.el.text(value);
		}
	});

	/*function TextEndpoint(el) {

		if (!el instanceof $)
			throw 'TextEndpoint element must be a jQuery object.';

		_.extend(this, new EventEmitter());
		var emit = this._emit;

		this.el = el;

		this.get = function () {
			return this.el.text();
		}

		this.set = function (value) {
			var oldValue = this.el.text();
			if(oldValue == value) return;

			this.el.text(value);
			emit('change', { oldValue: oldValue, newValue: value });
		}

	}
	TextEndpoint.prototype = new Endpoint();*/

	Binding.parse = function (model, el) {
		//console.log('Parsing binding expression of %o with %o as context.', el, model);

		if (! el instanceof $)
			throw 'Element must be a jQuery object.';

		var binding = el.data('bind');
		if (!binding) return;

		var bindings = [];

		for (key in binding) {
			if (!binding.hasOwnProperty(key)) continue;

			if (!model.properties.hasOwnProperty(binding[key])) {
				console.error('Binding source %o has no property %o. (From binding expression %o.)', model.properties, binding[key], binding);
				throw 'Binding source has no property "' + binding[key] + '".';
			}

			switch (key) {

			case 'text':
				bindings.push(new this(model.properties[binding[key]], new TextEndpoint(el)));
				break;

			case 'val':
			case 'value':
				bindings.push(new this(model.properties[binding[key]], new ValEndpoint(el)));
				break;

			default:
				var classname = /\.(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/.exec(key);
				if (classname && classname.length) {
					bindings.push(new this(model.properties[binding[key]], new ClassEndpoint(el, classname[1])));
				} else {
					console.log('No databinding endpoint type exists for key "%s" in %o', key, binding);
				}
				break;
			}
		}

		return bindings;
	}

	return Binding;

});