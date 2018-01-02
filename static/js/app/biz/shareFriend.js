$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'remark',
        title: '规则名称'
    }, {
        field: 'cvalue',
        title: '比例'
    }];
    buildList({
        columns: columns,
        pageCode: '625915',
        searchParams: {
            type: 'fen_cheng_rule',
            companyCode: OSS.company
        },
        beforeEdit: function(data) {
            window.location.href = "../biz/shareFriend_addedit.html?code=" + data.id;
        }
    });
});