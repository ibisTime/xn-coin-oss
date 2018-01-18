$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'mobile',
        title: '提币通知手机号',
        search: true,
        formatter: function (v, data) {
            return data.dvalue
        }
    }];
    buildList({
        columns: columns,
        pageCode: '625905',
        searchParams: {
            companyCode: OSS.company,
            systemCode: OSS.company,
            parentKey: 'qx_sms_notice'
        }
    });
    $('#deleteBtn').off('click').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var data = {
            id: selRecords[0].id
        }
        confirm('确认删除吗').then(function () {
            reqApi({code: '625901', json: data, sync: true}, true).then(function () {
                sucList();
            })
        })
    })

});