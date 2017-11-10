$(function() {

    var userId = getQueryString('userId');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'mobile',
        title: '手机号',
        required: true,
        readonly: view
    }, {
        title: "昵称",
        field: "nickname",
        readonly: view
    }, {
        field: 'idKind',
        title: '证件类型',
        type: 'select',
        readonly: view,
        data: { '1': '身份证' }
    }, {
        field: 'idNo',
        title: '证件号',
        readonly: view,
        maxlength: 30
    }, {
        field: 'realName',
        title: '真实姓名',
        readonly: view,
        maxlength: 10
    }, {
        field: 'userReferee',
        title: '推荐人',
        formatter: function(v, data) {
            if (data.refereeUser) {
                return data.refereeUser.mobile;
            } else {
                return "-"
            }
        },
        required: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "user_status",
        formatter: Dict.getNameForList("user_status"),
    }, {
        field: 'remark',
        title: '备注',
        readonly: view,
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: {
            userId: userId
        },
        detailCode: '805121',
        view: view
    });

});