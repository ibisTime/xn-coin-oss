$(function() {
    var code;
    reqApi({
        code: '625917',
        json: {
            key: 'service'
        },
        sync: true
    }).then(function(data) {
        code = data.id;
    });
    var fields = [{
        field: 'remark',
        type: 'hidden',
        value: '联系客服'
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