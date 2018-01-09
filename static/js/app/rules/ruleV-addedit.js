$(function() {

    var code = getQueryString('code');
	var type = getQueryString('t');
	
    var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	},{
		title: '名称',
		field: 'remark',
        readonly: true,
		maxlength: 250
	},{
        title: '数值',
        field: 'cvalue',
        required: true,
        maxlength: 255,
        number: true,
		min: '0'
	}];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '625916',
        editCode: '625910',
        beforeSubmit: function(data) {
            data.remark = $('#remark').html();
			data.type = type;
            return data;
        }
    });

});
