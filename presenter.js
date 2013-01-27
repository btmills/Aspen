define(['jquery', 'underscore', 'events', 'property', 'model', 'collection', 'databind'], function ($, _, EventEmitter, Property, Model, Collection, Binding) {

	var Presenter = EventEmitter.extend({
		init: function (opts, data, view) {
			this._super();

			console.log('new Presenter(%o, %o)', data, view);

			this.data = data;

			_.extend(this.data.properties, {
				'friendly': new Property({ default: 'Today', fn: function (x) { return x + x; } }),
				'class.abbr': new Property({ default: 'CSE 2431' }),
				'class.name': new Property({ default: 'Systems II' }),
				'completeVerb': new Property({ default: 'Complete' }),
				'overdue': new Property({ default: false }),
				'today': new Property({ default: true }),
				'tomorrow': new Property({ default: false }),
				'absolute': new Property({ default: 'Sun Jan 27 2013' }),
				'incomplete': new Property({ default: true }),
			});
			this.view = view;
			this.bindings = [];

			var self = this;
			_.each(self.view.find('*').andSelf(), function (el) {
				_.each(Binding.parse(self.data, $(el)), function (binding) {
					self.bindings.push(binding);
				});
			});
		}
	});

	return Presenter;

});