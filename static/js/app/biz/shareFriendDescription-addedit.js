$(function() {

    var code = getQueryString('code');
    var fields = [{
        title: '规则名称',
        field: 'remark',
        readonly: true,
        maxlength: 250
    }, {
        title: '说明',
        field: 'cvalue',
        required: true,
        type: 'textarea',
        normalArea: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '660916',
        editCode: '660911',
        beforeSubmit: function(data) {
            data.remark = $('#remark').html();
            return data;
        }
    });

});