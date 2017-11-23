$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '参数说明',
        field: 'cvalue'
    }, {
        title: '备注',
        field: 'remark',
    }];
    buildList({
        columns: columns,
        pageCode: '625915',
        searchParams: {
            companyCode: OSS.company,
            type: "sell_ads_hint"
        },
        beforeEdit: function(data) {
            window.location.href = "./buyETH_addedit.html?code=" + data.id;
        }
    });


});