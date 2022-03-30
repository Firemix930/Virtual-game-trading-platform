/*
 * @Author: Lu Xiaohan
 * @Date: 2020-11-11 19:15:45
 * @LastEditTime: 2020-11-12 11:54:35
 * @Description: file that implements the order details page function
 * @FilePath: \VSLibrary\Team Work E\static\js\app\order-detail.js
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

                var confirmMsg = "Confirm the payment<font color='red'>" + r.totalPrice + "</font>元！<div style='margin-top: 8px;'>截止时间：" + r.payEndTime + "</div>";
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
            publicTip.showLoadingToast(true, "In the payment");
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

        $("#reminderBtn").click(function() {
            if ($("#reminderBtn").hasClass('weui-btn_loading')) {
                return;
            }
            $("#reminderBtn").addClass('weui-btn_loading');
            $("#reminderLoading").addClass('weui-loading');

            publicTip.showToast("Already remind");

            $("#reminderBtn").removeClass('weui-btn_loading');
            $("#reminderLoading").removeClass('weui-loading');
        });

        $("#confirmBtn").click(function() {
            if ($("#confirmBtn").hasClass('weui-btn_loading')) {
                return;
            }

            publicTip.showConfirm("Please confirm whether the goods have arrived", function() {
                $("#confirmBtn").addClass('weui-btn_loading');
                $("#confirmLoading").addClass('weui-loading');

                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/zshop/userapi/confirmReceipt',
                    data: { orderId: orderId }
                }).done(function(r) {
                    window.location.reload();
                }).fail(function(jqXHR, textStatus) { // Not 200
                    $("#confirmBtn").removeClass('weui-btn_loading');
                    $("#confirmLoading").removeClass('weui-loading');

                    publicTip.showTip(jqXHR.responseJSON);
                });
            });
        });

        $("#delBtn").click(function() {
            if ($("#delBtn").hasClass('weui-btn_loading')) {
                return;
            }

            publicTip.showConfirm("Confirm deletion of order?", function() {
                $("#delBtn").addClass('weui-btn_loading');
                $("#delLoading").addClass('weui-loading');

                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/zshop/userapi/delOrder',
                    data: { orderId: orderId }
                }).done(function(r) {
                    window.location.href = '/zshop/';
                }).fail(function(jqXHR, textStatus) { // Not 200
                    $("#delBtn").removeClass('weui-btn_loading');
                    $("#delLoading").removeClass('weui-loading');

                    publicTip.showTip(jqXHR.responseJSON);
                });
            });
        });

        $("#cancelBtn").click(function() {
            if ($("#cancelBtn").hasClass('weui-btn_loading')) {
                return;
            }

            publicTip.showConfirm("Confirm to cancel the order?", function() {
                $("#cancelBtn").addClass('weui-btn_loading');
                $("#cancelLoading").addClass('weui-loading');

                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/zshop/userapi/cancelOrder',
                    data: { orderId: orderId }
                }).done(function(r) {
                    window.location.href = '/zshop/';
                }).fail(function(jqXHR, textStatus) { // Not 200
                    $("#cancelBtn").removeClass('weui-btn_loading');
                    $("#cancelLoading").removeClass('weui-loading');

                    publicTip.showTip(jqXHR.responseJSON);
                });
            });
        });

    });

})