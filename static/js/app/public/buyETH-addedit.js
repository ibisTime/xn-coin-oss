$(function() {
    var code = getQueryString('code');

    var fields = [ {
        field: 'remark',
        title: '参数名称',
        maxlength: 255
    },{
        title: '参数说明',
        field: 'cvalue',
        required: true,
        maxlength: 255,
        type: 'textarea',
        normalArea: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '625916',
        editCode: "625910"
    };

    buildDetail(options);
});