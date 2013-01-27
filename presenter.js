define(['jquery', 'underscore', 'events', 'property', 'model', 'collection', 'databind'], function ($, _, EventEmitter, Property, Model, Collection, Binding) {

	var Presenter = (function () {

		var define = function (opts) {

			function Presenter (data, view) {

				_.extend(this, new EventEmitter()); // Inherit from EventEmitter. This is probably the wrong way to do this.

				/*if (!data instanceof Model && !data instanceof Collection)
					throw "Presenter data must be a Model or a Collection."
				if (!view instanceof $)
					throw "Presenter view must be a jQuery object."*/
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

			return Presenter;

		};

		return {
			define: define
		};

	})();

	return Presenter;

});