/*
 * @Author: Wang Jiabo
 * @Date: 2020-11-11 19:15:45
 * @LastEditTime: 2020-11-12 12:06:06
 * @Description: file that implements the reset password function
 * @FilePath: \VSLibrary\Team Work E\static\js\app\upt-pass.js
 */

requirejs.config({
    "baseUrl": "/static/js/lib",
    "paths": {
        "publicTip": "/static/js/app/public-tip"
    }
});

requirejs(["jquery", "publicTip"], function($, publicTip) {
    $(function() {
        var $password = $("#password");
        var $passwordConfirm = $("#passwordConfirm");
        var $oldPassword = $("#oldPassword");

        $password.blur(function() {
            var password = $(this).val();
            if (password.trim() == '') {
                publicTip.showTipForStr("You must input new password");
                $("#passwordCell").addClass('weui-cell_warn');
                return;
            }
            var passwordConfirm = $passwordConfirm.val();
            if (passwordConfirm != '' && passwordConfirm != password) {
                publicTip.showTipForStr("Confirm PSD is different from New password");
                $("#passwordCell").addClass('weui-cell_warn');
                return;
            }
            $("#passwordCell").removeClass('weui-cell_warn');
        });

        $passwordConfirm.blur(function() {
            var password = $password.val();
            if (password.trim() == '') {
                publicTip.showTipForStr("Please input new password first");
                $("#passwordCell").addClass('weui-cell_warn');
                return;
            }
            var passwordConfirm = $(this).val();
            if (passwordConfirm.trim() == '') {
                publicTip.showTipForStr("You must input confirm password");
                $("#passwordConfirmCell").addClass('weui-cell_warn');
                return;
            }
            if (passwordConfirm != password) {
                publicTip.showTipForStr("Confirm PSD is different from New password");
                $("#passwordConfirmCell").addClass('weui-cell_warn');
                return;
            }
            $("#passwordConfirmCell").removeClass('weui-cell_warn');
        });

        $oldPassword.blur(function() {
            var oldPassword = $(this).val();
            if (oldPassword.trim() == '') {
                publicTip.showTipForStr("You must input Original password");
                $("#oldPasswordCell").addClass('weui-cell_warn');
                return;
            }

            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '/zshop/userapi/checkPassword',
                data: { oldPassword: oldPassword }
            }).done(function(r) {
                $("#oldPasswordCell").removeClass('weui-cell_warn');
            }).fail(function(jqXHR, textStatus) { // Not 200
                publicTip.showTip(jqXHR.responseJSON);
                $("#oldPasswordCell").addClass('weui-cell_warn');
            });
        });

        $("#confirmBtn").click(function() {
            if ($("#confirmBtn").hasClass('weui-btn_loading')) {
                return;
            }

            var oldPassword = $oldPassword.val();
            var password = $password.val();
            var passwordConfirm = $passwordConfirm.val();

            if (oldPassword.trim() == '') {
                publicTip.showTipForStr("You must input Original password");
                $("#oldPasswordCell").addClass('weui-cell_warn');
                return;
            }
            if (password.trim() == '') {
                publicTip.showTipForStr("You must input new password");
                $("#passwordCell").addClass('weui-cell_warn');
                return;
            }
            if (passwordConfirm.trim() == '') {
                publicTip.showTipForStr("You must input confirm password");
                $("#passwordConfirmCell").addClass('weui-cell_warn');
                return;
            }
            if (password != passwordConfirm) {
                publicTip.showTipForStr("New PSD should be different from confirm PSD");
                $("#passwordCell").addClass('weui-cell_warn');
                $("#passwordConfirmCell").addClass('weui-cell_warn');
                return;
            }

            var userReq = {
                oldPassword: oldPassword,
                password: password,
                passwordConfirm: passwordConfirm
            };

            $("#confirmBtn").addClass('weui-btn_loading');
            $("#confirmLoading").addClass('weui-loading');
            $.ajax({
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                url: '/zshop/userapi/uptPass',
                data: JSON.stringify(userReq)
            }).done(function(r) {
                publicTip.showConfirm('Change success!Login？', function() {
                    window.location.href = "/zshop/login";
                });
                $("#confirmBtn").removeClass('weui-btn_loading');
                $("#confirmLoading").removeClass('weui-loading');
            }).fail(function(jqXHR, textStatus) { // Not 200
                publicTip.showTip(jqXHR.responseJSON);
                if (jqXHR.responseJSON.code == 'index:error_password') {
                    $("#oldPasswordCell").addClass('weui-cell_warn');
                }
                $("#confirmBtn").removeClass('weui-btn_loading');
                $("#confirmLoading").removeClass('weui-loading');
            });

        });

    });

})