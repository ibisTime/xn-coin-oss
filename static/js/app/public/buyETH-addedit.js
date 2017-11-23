$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: '参数说明',
        field: 'cvalue',
        required: true,
        maxlength: 255
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 255
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '625916',
        editCode: "625910"
    };

    buildDetail(options);
});