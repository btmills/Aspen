define(['jpf'], function (JPF) {

	var ClassModel = JPF.Model.define({
		schema: {
			'id': { idProperty: true },
			'name': { default: '' },
			'abbr': { default: '' }
		}
	});

	return ClassModel;

});