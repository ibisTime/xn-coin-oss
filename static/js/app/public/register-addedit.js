$(function() {
    var code;
    reqApi({
        code: '625917',
        json: {
            key: 'reg_protocol'
        },
        sync: true
    }).then(function(data) {
        code = data.id;
    });
    var fields = [{
        field: 'remark',
        type: 'hidden',
        value: '注册协议'
    }, {
        title: '内容',
        field: 'cvalue',
        type: 'textarea',
        required: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '625916',
        buttons: [{
            title: '保存',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['id'] = data['code'];
                    reqApi({
                        code: '625910',
                        json: data
                    }).done(function(data) {
                        toastr.success('操作成功');
                    });
                }
            }
        }]
    });
});