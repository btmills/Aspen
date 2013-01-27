define(['jquery', 'underscore', 'events', 'property'], function ($, Underscore, EventEmitter, Property) {

	var Model = EventEmitter.extend({

		init: function (opts, vals) {
			this._super();

			this.properties = {};

			for (prop in opts.schema) {
				if (!opts.schema.hasOwnProperty(prop)) continue;

				this.properties[prop] = new Property(opts.schema[prop]);
			}

			this.set(vals);
		},

		get: function (prop) {
			if (this.properties.hasOwnProperty(prop))
				return this.properties[prop].get();
			else
				return undefined;
		},

		set: function (vals) {
			for (val in vals) {
				if (!vals.hasOwnProperty(val)) continue;

				if (this.properties.hasOwnProperty(val))
					this.properties[val].set(vals[val]);
			}
		}

	});

	return Model;

});