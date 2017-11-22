$(function() {
    var view = !!getQueryString('v');
    var userId = getQueryString('userId') || '';


    var fields = [{
        field: 'accountNumber',
        title: '用户账户',
        required: true,
        type: 'select',
        pageCode: userId ? '802503' : '802500',
        keyCode1: '625907',
        dict: [
            ['currency', 'coin'],
            ['type', 'account_type']
        ],
        params: {
            userId: userId
        },
        keyName: 'accountNumber',
        valueName: '{{realName.DATA}} - {{currencyName.DATA}} - {{typeName.DATA}}',
        searchName: 'realName',
        help: '支持户名查询'
    }, {
        title: "充值数量",
        field: 'amount',
        required: true,
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'payCardInfo',
        title: '打币渠道',
        required: true,
        maxlength: 255
    }, {
        field: 'payCardNo',
        title: '打币地址',
        required: true,
        maxlength: 255
    }, {
        field: 'applyNote',
        title: '充值说明',
        maxlength: 255
    }];

    var options = {
        fields: fields,
        addCode: '802700',
        view: view,
        beforeSubmit: function(data) {
            // data.amount = data.amount * 10e18;
            // data.applyUser = getUserId();
            // data.bizType = "11";
            return data;
        }
    };

    buildDetail(options);

})