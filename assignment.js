define(['jpf'], function (JPF) {

	var AssignmentModel = JPF.Model.define({
		schema: {
			'id': { idProperty: true },
			'name': { default: 'New assignment' },
			'due': {},
			'complete': { default: false },
			'classid': {}
		}
	});

	return AssignmentModel;

});