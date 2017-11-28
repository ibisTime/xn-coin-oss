$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'remark',
        title: '名称'
    }, {
        field: 'cvalue',
        title: '说明'
    }];
    buildList({
        columns: columns,
        pageCode: '625915',
        searchParams: {
            ckey: 'activity_rule',
            companyCode: OSS.company
        },
        beforeEdit: function(data) {
            window.location.href = "../biz/shareFriendDescription_addedit.html?code=" + data.id;
        }
    });
});