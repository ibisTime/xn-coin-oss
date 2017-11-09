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
            "1": "弃用"
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
        title: "启用日期",
        field: "",
        formatter: dateTimeFormat
    }, {
        title: "使用次数",
        field: ""
    }, {
        field: ' ',
        title: '归集总额',
        formatter: moneyFormat
    }, {
        field: 'remark',
        title: '备注',
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
        confirm("确认弃用？").then(function() {
            reqApi({
                code: '625203',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function() {});




    });

});