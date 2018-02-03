$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'address',
        title: '地址'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "启用",
            "2": "弃用"
        },
        // key: 'account_status',
        // formatter: Dict.getNameForList('account_status'),
        search: true
    }, {
        title: '使用时间起',
        field: 'availableDatetimeStart',
        type: "date",
        formatter: function(v, data) {
            var date = new Date(v);
            var str = date.format('yyyy-MM-dd');
            return str;
        },
        search: true
    }, {
        title: '使用时间止',
        field: 'availableDatetimeEnd',
        type: "date",
        formatter: function(v, data) {
            var date = new Date(v);
            var str = date.format('yyyy-MM-dd');
            return str;
        },
        search: true,
    }, {
        title: "导入日期",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: "使用次数",
        field: "useCount"
    }, {
        field: 'useAmountString',
        title: '归集总额',
        formatter: moneyFormatSC
    }];
    buildList({
        columns: columns,
        pageCode: '625205',
        searchParams: {
            type: 'W',
            companyCode: OSS.company
        },
        getImportData: function(list) {
            reqApi({
                code: "625201",
                json: { wAddressList: list }
            }).then(function() {
                sucList();
            })

        }
    });

    $('#deleBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 2) {
            toastr.warning("已经是无效地址，无需重复弃用");
            return;
        }
        confirm("确认弃用？").then(function() {
            reqApi({
                code: '625202',
                json: { "code": selRecords[0].code }
            }).then(function() {
            	sucList();
            });
        }, function() {});
    });

});