requirejs.config({
    "baseUrl": "/static/js/lib",
    "paths": {
        "publicTip": "/static/js/app/public-tip"
    }
});

requirejs(["jquery", "publicTip"], function($, publicTip) {
    $(function() {
        var orderId = $('#orderId').val();

        $("#cancelOrderBtn").click(function() {
            if ($("#cancelOrderBtn").hasClass('weui-btn_loading')) {
                return;
            }

            publicTip.showConfirm("Confirm to cancel the order?", function() {
                $("#cancelOrderBtn").addClass('weui-btn_loading');
                $("#cancelOrderLoading").addClass('weui-loading');

                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/zshop/userapi/paySuccCancelOrder',
                    data: { orderId: orderId }
                }).done(function(r) {
                    $("#cancelOrderBtn").removeClass('weui-btn_loading');
                    $("#cancelOrderLoading").removeClass('weui-loading');

                    publicTip.showAlert('The amount will be refunded to your account', null, function() {
                        window.location.href = '/zshop/';
                    });
                }).fail(function(jqXHR, textStatus) { // Not 200
                    $("#cancelOrderBtn").removeClass('weui-btn_loading');
                    $("#cancelOrderLoading").removeClass('weui-loading');

                    publicTip.showTip(jqXHR.responseJSON);
                });
            });
        });

    });

})