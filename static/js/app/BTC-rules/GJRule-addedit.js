$(function() {

    var code = getQueryString('code');
    var fields = [{
        title: '规则名称',
        field: 'remark',
        readonly: true,
        maxlength: 250
    }, {
        title: '数值',
        field: 'cvalue',
        required: true,
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '625916',
        editCode: '625910',
        beforeSubmit: function(data) {
            data.remark = $('#remark').html();
            return data;
        }
    });

});