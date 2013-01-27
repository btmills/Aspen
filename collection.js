define(['underscore', 'events', 'model'], function (_, EventEmitter, Model) {

	var Collection = EventEmitter.extend({
		init: function (opts, contents) {
			this._super();

			this.length = 0;
			this._arr = [];
			this._ids = {};

			var self = this;
			_.each(contents, function(element) {
				self.add(element);
			});
		},

		add: function (element) {
			if (this._ids.hasOwnProperty(element.id)) return;

			this._ids[element.id] = element;
			this._arr.push(element);
			this.length++;

			this.emit('add change', { length: this.length, element: element });

			return this; // Chaining
		},

		remove: function (element) {
			// Element can be either an id or an element
			var id = (element instanceof Model ? element.id : element);

			if (!this._ids.hasOwnProperty(id)) return;

			var removed = this._ids[id];

			this._arr.splice(this._arr.indexof(removed), 1);
			delete this._ids[id];
			this.length--;

			this.emit('remove change', { length: this.length, element: removed });

			return this; // Chaining
		}

	});

	return Collection;
});
