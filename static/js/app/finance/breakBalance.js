$(function() {
    var accountNumberCNY;
    var accountNumberJF;
    var accountNumberTG;
    reqApi({
        code: '802500',
        json: {
            "start": 1,
            "limit": 10,
            "type": "P"
        },
        sync: true
    }).done(function(data) {
        var data = data.list;
        $("#amount-CNY").text(moneyFormat(data[1].amount));
        accountNumberCNY = data[1].accountNumber;
        $("#amount-TG").text(moneyFormat(data[0].amount));
        accountNumberTG = data[0].accountNumber;
    });

    $("#CNYls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCNY + "&kind=CNY";
    });
    $("#accoutGrantBtn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberTG + "&kind=TG";
    });
    // $("#accouBtn").click(function() {
    //     window.location.href = 'account_enchashment.html?accountNumber=' + accountNumberTG;
    // });

});