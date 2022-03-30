/*
 * @Author: Zhang Haoxuan
 * @Date: 2020-11-11 19:15:45
 * @LastEditTime: 2020-11-12 11:50:45
 * @Description: file that implements the register function
 * @FilePath: \VSLibrary\Team Work E\static\js\app\register.js
 */

requirejs.config({
    "baseUrl": "/static/js/lib",
    "paths": {
        "publicTip": "/static/js/app/public-tip",
        "zepto": "zepto.min"
    }
});

requirejs(["jquery", "publicTip"], function($, publicTip) {
    $(function() {
        var $mobile = $("#mobile");
        var $password = $("#password");
        var $passwordConfirm = $("#passwordConfirm");

        $password.blur(function() {
            var password = $(this).val();
            if (password.trim() == '') {
                publicTip.showTipForStr("Password must be entered!");
                $("#passwordCell").addClass('weui-cell_warn');
                return;
            }
            var passwordConfirm = $passwordConfirm.val();
            if (passwordConfirm != '' && passwordConfirm != password) {
                publicTip.showTipForStr("Different password");
                $("#passwordCell").addClass('weui-cell_warn');
                return;
            }
            $("#passwordCell").removeClass('weui-cell_warn');
        });

        $passwordConfirm.blur(function() {
            var password = $password.val();
            if (password.trim() == '') {
                publicTip.showTipForStr("Please enter password");
                $("#passwordCell").addClass('weui-cell_warn');
                return;
            }
            var passwordConfirm = $(this).val();
            if (passwordConfirm.trim() == '') {
                publicTip.showTipForStr("Confirm password must be entered");
                $("#passwordConfirmCell").addClass('weui-cell_warn');
                return;
            }
            if (passwordConfirm != password) {
                publicTip.showTipForStr("Different password");
                $("#passwordConfirmCell").addClass('weui-cell_warn');
                return;
            }
            $("#passwordConfirmCell").removeClass('weui-cell_warn');
        });

        $mobile.blur(function() {
            var mobile = $(this).val();
            if (mobile.trim() == '') {
                publicTip.showTipForStr("Input phone number!");
                $("#mobileCell").addClass('weui-cell_warn');
                return;
            }
            if (!/^1\d{10}$/.test(mobile)) {
                publicTip.showTipForStr("Wrong phone number");
                $("#mobileCell").addClass('weui-cell_warn');
                return;
            }

            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '/zshop/api/countUserMobile',
                data: { mobile: mobile }
            }).done(function(r) {
                if (r.countInt > 0) {
                    publicTip.showTipForStr("Occupied phone");
                    $("#mobileCell").addClass('weui-cell_warn');
                } else {
                    $("#mobileCell").removeClass('weui-cell_warn');
                }
            }).fail(function(jqXHR, textStatus) { // Not 200
                publicTip.showTip(jqXHR.responseJSON);
                $("#mobileCell").addClass('weui-cell_warn');
            });
        });

        $("#confirmBtn").click(function() {
            if ($("#confirmBtn").hasClass('weui-btn_loading')) {
                return;
            }

            var mobile = $mobile.val();
            var password = $password.val();
            var passwordConfirm = $passwordConfirm.val();

            if (mobile.trim() == '') {
                publicTip.showTipForStr("Input phone number");
                $("#mobileCell").addClass('weui-cell_warn');
                return;
            }
            if (!/^1\d{10}$/.test(mobile)) {
                publicTip.showTipForStr("Wrong phone number");
                $("#mobileCell").addClass('weui-cell_warn');
                return;
            }
            if (password.trim() == '') {
                publicTip.showTipForStr("Input password");
                $("#passwordCell").addClass('weui-cell_warn');
                return;
            }
            if (passwordConfirm.trim() == '') {
                publicTip.showTipForStr("Input confirm password");
                $("#passwordConfirmCell").addClass('weui-cell_warn');
                return;
            }
            if (password != passwordConfirm) {
                publicTip.showTipForStr("Different password");
                $("#passwordCell").addClass('weui-cell_warn');
                $("#passwordConfirmCell").addClass('weui-cell_warn');
                return;
            }

            var userReq = {
                mobile: mobile,
                password: password,
                passwordConfirm: passwordConfirm
            };

            $("#confirmBtn").addClass('weui-btn_loading');
            $("#confirmLoading").addClass('weui-loading');
            $.ajax({
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                url: '/zshop/api/regist',
                data: JSON.stringify(userReq)
            }).done(function(r) {
                window.location.href = '/zshop?actTabbar=my';
            }).fail(function(jqXHR, textStatus) { // Not 200
                publicTip.showTip(jqXHR.responseJSON);
                if (jqXHR.responseJSON.code == 'regist:repeat_mobile') {
                    $("#mobileCell").addClass('weui-cell_warn');
                }
                $("#confirmBtn").removeClass('weui-btn_loading');
                $("#confirmLoading").removeClass('weui-loading');
            });

        });

    });

})