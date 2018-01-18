$(function() {
    var columns = [ {
        title: '手机号',
        field: 'dvalue',
        required: true
    }];

    buildDetail({
        fields: columns,
        addCode: '625900',
        beforeSubmit:function (data) {
            data.parentKey = 'qx_sms_notice';
            data.dkey = data.dvalue;
            data.type = 1;
            return data;
        }
    });
});