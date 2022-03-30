/*
 * @Author: Lyu Zelin
 * @Date: 2020-11-11 19:15:45
 * @LastEditTime: 2020-11-12 11:58:45
 * @Description: file that implements the settlement function
 * @FilePath: \VSLibrary\Team Work E\static\js\app\settlement.js
 */

requirejs.config({
    "baseUrl": "/static/js/lib",
    "paths": {
        "publicTip": "/static/js/app/public-tip"
    }
});

requirejs(["jquery", "publicTip"], function($, publicTip) {
    $(function() {
        var orderId = $('#orderId').val();

        $("#wePayBtn").click(function() {
            if ($("#wePayBtn").hasClass('weui-btn_loading')) {
                return;
            }
            $("#wePayBtn").addClass('weui-btn_loading');
            $("#payLoading").addClass('weui-loading');

            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '/zshop/userapi/confirmOrder',
                data: { orderId: orderId }
            }).done(function(r) {
                $("#wePayBtn").removeClass('weui-btn_loading');
                $("#payLoading").removeClass('weui-loading');

                var confirmMsg = "Confirm Payment<font color='red'>" + r.totalPrice + "</font>yuan！<div style='margin-top: 8px;'>Ending time：" + r.payEndTime + "</div>";
                publicTip.showConfirm(confirmMsg, function() {
                    payOrder(r.totalPrice);
                });
            }).fail(function(jqXHR, textStatus) { // Not 200
                $("#wePayBtn").removeClass('weui-btn_loading');
                $("#payLoading").removeClass('weui-loading');

                publicTip.showTip(jqXHR.responseJSON);
            });
        });

        function payOrder(totalPrice) {
            publicTip.showLoadingToast(true, "paying");
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '/zshop/userapi/payOrder',
                data: {
                    orderId: orderId,
                    totalPrice: totalPrice
                }
            }).done(function(r) {
                window.location.href = '/zshop/user/paySuccess/' + orderId;
            }).fail(function(jqXHR, textStatus) { // Not 200
                publicTip.showLoadingToast(false);
                publicTip.showTip(jqXHR.responseJSON);
            });
        }
    });

})