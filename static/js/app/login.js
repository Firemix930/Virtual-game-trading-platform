/*
 * @Author: Zhang Haoxuan
 * @Date: 2020-11-11 19:15:45
 * @LastEditTime: 2020-11-12 11:40:24
 * @Description: file that implements the login function
 * @FilePath: \VSLibrary\Team Work E\static\js\app\login.js
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
        var $captcha = $("#captcha");

        var openCaptcha = $("#openCaptcha").val();
        var $captchaImg = $("#captchaImg");
        if (openCaptcha == "true") {
            $captchaImg.attr("src", '/zshop/captcha?r=' + Math.random());
            $captchaImg.click(function() {
                $(this).attr("src", '/zshop/captcha?r=' + Math.random());
            });
        }

        var exgMobile = /^1\d{10}$/;
        $mobile.blur(function() {
            var mobile = $(this).val();
            if (mobile.trim() == '') {
                publicTip.showTipForStr("Cell phone number must be filled in");
                $("#mobileCell").addClass('weui-cell_warn');
                return;
            }
            if (!exgMobile.test(mobile)) {
                publicTip.showTipForStr("Incorrect phone number format");
                $("#mobileCell").addClass('weui-cell_warn');
                return;
            }
            $("#mobileCell").removeClass('weui-cell_warn');
        });

        $password.blur(function() {
            var password = $(this).val();
            if (password.trim() == '') {
                publicTip.showTipForStr("Password required");
                $("#passwordCell").addClass('weui-cell_warn');
                return;
            }
            $("#passwordCell").removeClass('weui-cell_warn');
        });

        var exgCaptcha = /^\d{4}$/;
        if (openCaptcha == "true") {
            $captcha.blur(function() {
                var captcha = $(this).val();
                if (captcha.trim() == '') {
                    publicTip.showTipForStr("Captcha required");
                    $("#captchaCell").addClass('weui-cell_warn');
                    return;
                }
                if (!exgCaptcha.test(captcha)) {
                    publicTip.showTipForStr("Captcha is a four-digit number");
                    $("#captchaCell").addClass('weui-cell_warn');
                    return;
                }

                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/zshop/api/checkCaptcha',
                    data: { captcha: captcha }
                }).done(function(r) {
                    $("#captchaCell").removeClass('weui-cell_warn');
                }).fail(function(jqXHR, textStatus) { // Not 200
                    publicTip.showTip(jqXHR.responseJSON);
                    $("#captchaCell").addClass('weui-cell_warn');
                });
            });
        }

        $("#loginBtn").click(function() {
            if ($("#loginBtn").hasClass('weui-btn_loading')) {
                return;
            }

            var mobile = $mobile.val();
            var password = $password.val();
            var captcha = $captcha.val();

            if (mobile.trim() == '') {
                publicTip.showTipForStr("Cell phone number must be fillin");
                $("#mobileCell").addClass('weui-cell_warn');
                return;
            }
            if (!exgMobile.test(mobile)) {
                publicTip.showTipForStr("Incorrect phone number format");
                $("#mobileCell").addClass('weui-cell_warn');
                return;
            }
            if (password.trim() == '') {
                publicTip.showTipForStr("Password required");
                $("#passwordCell").addClass('weui-cell_warn');
                return;
            }
            if (openCaptcha == "true") {
                if (captcha.trim() == '') {
                    publicTip.showTipForStr("Captcha required");
                    $("#captchaCell").addClass('weui-cell_warn');
                    return;
                }
                if (!exgCaptcha.test(captcha)) {
                    publicTip.showTipForStr("Captcha is a four-digit number");
                    $("#captchaCell").addClass('weui-cell_warn');
                    return;
                }
            }

            var userReq = {
                mobile: mobile,
                password: password,
                captcha: captcha
            };

            $("#loginBtn").addClass('weui-btn_loading');
            $("#loginLoading").addClass('weui-loading');
            $.ajax({
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                url: '/zshop/api/signin',
                data: JSON.stringify(userReq)
            }).done(function(r) {
                console.log(JSON.stringify(r));
                var loginSuccUrl = $("#loginSuccUrl").val();
                if (loginSuccUrl == '') loginSuccUrl = '/zshop/'
                window.location.href = loginSuccUrl;
            }).fail(function(jqXHR, textStatus) { // Not 200
                //publicTip.showTip(jqXHR.responseJSON.message);
                //publicTip.showTip(jqXHR.responseText);
                publicTip.showTip(jqXHR.responseJSON);
                $("#loginBtn").removeClass('weui-btn_loading');
                $("#loginLoading").removeClass('weui-loading');

                if (openCaptcha == "true" && jqXHR.responseJSON.code != "login:error_captcha") {
                    $captchaImg.click();
                }
            });

        });

    });

})