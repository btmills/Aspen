define(['model'], function (Model) {

	var ClassModel = Model.extend({
		init: function (vals) {
			this._super({
				schema: {
					'id': { idProperty: true },
					'name': { default: '' },
					'abbr': { default: '' }
				}
			}, vals);
		}
	});

	return ClassModel;

});