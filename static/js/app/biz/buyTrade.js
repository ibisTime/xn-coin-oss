$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号'
    }, {
        title: "买家",
        field: "userId"
    }, {
        title: "溢价",
        field: ""
    }, {
        title: "最低价",
        field: ""
    }, {
        title: "最小量",
        field: ""
    }, {
        title: "最大量",
        field: ""
    }, {
        field: '',
        title: '收款方式',
        type: 'select',
        key: '',
        formatter: Dict.getNameForList(''),
        search: true
    }, {
        field: '',
        title: '高级设置'
    }, {
        field: '',
        title: '广告留言'
    }];
    buildList({
        columns: columns,
        pageCode: '',
        searchParams: {
            // type: 'X',
            companyCode: OSS.company
        },
    });
    //收买
    $('#buyBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "ledger.html?accountCode=" + selRecords[0].accountNumber + "&yk=1";
    });

});