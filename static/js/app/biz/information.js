$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: '',
        title: '标题',
    }, {
        title: "封面",
        field: ""
    }, {
        title: "作者",
        field: ""
    }, {
        title: "状态",
        field: ""
    }, {
        title: "备注",
        field: ""
    }];
    buildList({
        columns: columns,
        pageCode: '',
        searchParams: {
            // type: 'X',
            companyCode: OSS.company
        },
    });
});