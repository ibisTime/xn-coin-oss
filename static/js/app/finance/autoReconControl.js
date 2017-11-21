$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号',
        search: true
    }, {
        field: 'realName',
        title: '充币人',
        search: true
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        key: 'coin',
        formatter: Dict.getNameForList("coin"),
        search: true
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
        search: true
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        key: 'biz_type',
        formatter: Dict.getNameForList('biz_type'),
        search: true
    }, {
        field: 'transAmountString',
        title: '变动金额',
        formatter: moneyFormat
    }, {
        field: 'preAmountString',
        title: '变动前金额',
        formatter: moneyFormat
    }, {
        field: 'postAmountString',
        title: '变动后金额',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        formatter: Dict.getNameForList('jour_status'),
        search: true
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }, {
        field1: 'dateStart',
        title1: '创建时间',
        type: 'date',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
        visible: false
    }, {
        field: 'workDate',
        title: '拟对账日期',
        type: 'date',
        search: true,
    }];
    buildList({
        columns: columns,
        pageCode: '802520',
        beforeDetail: function(data) {
            location.href = "autoReconControl_addedit.html?v=1&code=" + data.code + "&accountNumber=" + data.accountNumber;
        },
        beforeEdit: function(r) {
            if (r.status != '1') {
                toastr.info('该记录不是待对账状态');
                return false;
            }
            window.location.href = "./autoReconControl_addedit.html?code=" + r.code + "&accountNumber=" + r.accountNumber;
            // return true;
        },
        searchParams: {
            channelType: 'out',
            companyCode: OSS.company
        },
        beforeSearch: function(data) {
            if (data.workDate) {
                data.workDate = data.workDate.replace(/-/g, "");;
                return data;
            } else {
                return data;
            }
        }
    });

});