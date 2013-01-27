define(['jquery', 'underscore', 'events', 'property', 'model', 'collection', 'databind'], function ($, _, EventEmitter, Property, Model, Collection, Binding) {

	var Presenter = EventEmitter.extend({
		init: function (data, view) {
			this._super();

			console.log('new Presenter(%o, %o)', data, view);

			this.data = data;

			_.extend(this.data.properties, {
				'friendly': new Property('friendly', { default: 'Today' }),
				'class.abbr': new Property('class.abbr', { default: 'CSE 2431' }),
				'class.name': new Property('class.name', { default: 'Systems II' }),
				'completeVerb': new Property('completeVerb', { default: 'Complete' }),
				'overdue': new Property('overdue', { default: false }),
				'today': new Property('today', { default: true }),
				'tomorrow': new Property('tomorrow', { default: false }),
				'absolute': new Property('absolute', { default: 'Sun Jan 27 2013' }),
				'incomplete': new Property('incomplete', { default: true }),
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