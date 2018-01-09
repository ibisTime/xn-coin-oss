$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'remark',
        title: '规则名称'
    }, {
        field: 'ckey',
        title: '参数',
        search: true
    }, {
        field: 'cvalue',
        title: '数值'
    }];
    buildList({
        columns: columns,
        pageCode: '625915',
        searchParams: {
            type: 'coin_price_x',
            companyCode: OSS.company,
			updater: ''
        },
        beforeEdit: function(r) {
            location.href = 'quotationXRule_addedit.html?code=' + r.id + "&t=" + r.type;
        }
    });
});