define(['model'], function (Model) {

	var AssignmentModel = Model.extend({
		init: function (vals) {
			this._super({
				schema: {
					'id': { idProperty: true },
					'name': { default: 'New assignment' },
					'due': {},
					'complete': { default: false },
					'classid': {}
				}
			}, vals);
		}
	});

	return AssignmentModel;

});