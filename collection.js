define(['underscore', 'events', 'model'], function (_, EventEmitter, Model) {

	var Collection = (function () {

		var define = function (opts) {

			function Collection(contents) {

				_.extend(this, new EventEmitter()); // Inherit from EventEmitter. This is probably the wrong way to do this.

				this.length = 0;
				this.arr = [];
				this.ids = {};
			}

			Collection.prototype.add = function (element) {
				if (this.ids.hasOwnProperty(element.id)) return;

				this.ids[element.id] = element;
				this.arr.push(element);
				this.length++;

				this.emit('change add', { length: this.length, element: element });

				return this;
			};

			Collection.prototype.remove = function (element) {
				if (!this.ids.hasOwnProperty(element.id)) return;

				delete this.ids[element.id];
				this.arr.splice(this.arr.indexOf(element), 1);
				this.length--;

				this.emit('change remove', { length: this.length, element: element });

				return this;
			};

			return Collection;
		}

		return {
			define: define
		};

	})();

	return Collection;
});
