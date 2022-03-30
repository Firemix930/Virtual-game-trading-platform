/*
 * @Author: Lyu Zelin
 * @Date: 2020-11-11 19:15:45
 * @LastEditTime: 2020-11-12 12:04:54
 * @Description: file that implements the user function
 * @FilePath: \VSLibrary\Team Work E\static\js\app\user.js
 */

requirejs.config({
    "baseUrl": "/static/js/lib",
    "paths": {
        "publicTip": "/static/js/app/public-tip"
    }
});

requirejs(["jquery", "weui.min", "publicTip"], function($, weui, publicTip) {

    $(function() {
        var $gallery = $("#gallery"),
            $galleryImg = $("#galleryImg");

        $(".weui-uploader__file").on("click", function() {
            $galleryImg.attr("style", this.getAttribute("style"));
            $gallery.fadeIn(100);
            event.stopPropagation();
        });
        $gallery.on("click", function() {
            $gallery.fadeOut(100);
        });

        $("#headDiv").on("click", function() {
            $("#uploaderInput").click();
        });

        var $name = $("#name");
        var $userId = $("#userId");
        var $email = $("#email");
        var emailRegex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

        $name.blur(function() {
            var name = $name.val();
            if (name.trim() == '') {
                publicTip.showTipForStr("You must input username");
                $("#nameCell").addClass('weui-cell_warn');
            } else {
                $("#nameCell").removeClass('weui-cell_warn');
            }
        });

        $userId.blur(function() {
            var userId = $userId.val();
            if (userId.trim() == '') {
                publicTip.showTipForStr("You must input userid");
                $("#userIdCell").addClass('weui-cell_warn');
                return;
            }
            if (userId.length > 30) {
                publicTip.showTipForStr("userid is less 30");
                $("#userIdCell").addClass('weui-cell_warn');
                return;
            }

            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '/zshop/userapi/checkUserInfo',
                data: { userId: userId }
            }).done(function(r) {
                if (r.countInt > 0) {
                    publicTip.showTipForStr("This userid is occuping");
                    $("#userIdCell").addClass('weui-cell_warn');
                } else {
                    $("#userIdCell").removeClass('weui-cell_warn');
                }
            }).fail(function(jqXHR, textStatus) { // Not 200
                publicTip.showTip(jqXHR.responseJSON);
                $("#userIdCell").addClass('weui-cell_warn');
            });

        });

        $email.blur(function() {
            var email = $email.val();
            if (email.trim() == '') {
                return;
            }
            if (!emailRegex.test(email)) {
                publicTip.showTipForStr("Email is wrong");
                $("#emailCell").addClass('weui-cell_warn');
                return;
            }

            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '/zshop/userapi/checkUserInfo',
                data: { email: email }
            }).done(function(r) {
                if (r.countInt > 0) {
                    publicTip.showTipForStr("This Email is occuping");
                    $("#emailCell").addClass('weui-cell_warn');
                } else {
                    $("#emailCell").removeClass('weui-cell_warn');
                }
            }).fail(function(jqXHR, textStatus) { // Not 200
                publicTip.showTip(jqXHR.responseJSON);
                $("#emailCell").addClass('weui-cell_warn');
            });
        });

        var weuiUploadFun = null;
        $("#confirmBtn").on("click", function() {
            if ($("#confirmBtn").hasClass('weui-btn_loading') ||
                $("#confirmBtn").hasClass('weui-btn_disabled')) {
                return;
            }

            var name = $name.val();
            var userId = $userId.val();
            var email = $email.val();

            if (name.trim() == '') {
                publicTip.showTipForStr("You must input username");
                $("#nameCell").addClass('weui-cell_warn');
                return;
            }

            if (userId.trim() == '') {
                publicTip.showTipForStr("You must input userid");
                $("#userIdCell").addClass('weui-cell_warn');
                return;
            }
            if (userId.length > 30) {
                publicTip.showTipForStr("userid must less than 30");
                $("#userIdCell").addClass('weui-cell_warn');
                return;
            }

            if (email != '' && !emailRegex.test(email)) {
                publicTip.showTipForStr("Email is wrong");
                $("#emailCell").addClass('weui-cell_warn');
                return;
            }

            $("#confirmBtn").addClass('weui-btn_loading');
            $("#confirmLoading").addClass('weui-loading');
            if (weuiUploadFun) {
                weuiUploadFun();
            } else {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/zshop/userapi/uptUserInfo?noImage=true',
                    data: {
                        name: name,
                        userId: userId,
                        email: email
                    }
                }).done(function(r) {
                    window.location.href = '/zshop?actTabbar=my';
                }).fail(function(jqXHR, textStatus) { // Not 200
                    publicTip.showTip(jqXHR.responseJSON);
                    if (jqXHR.responseJSON.code == 'uptUserInfo:repeat_userId') {
                        $("#userIdCell").addClass('weui-cell_warn');
                    } else if (jqXHR.responseJSON.code == 'uptUserInfo:repeat_email') {
                        $("#emailCell").addClass('weui-cell_warn');
                    }
                    $("#confirmBtn").removeClass('weui-btn_loading');
                    $("#confirmLoading").removeClass('weui-loading');
                });
            }
        });

        //var uploadCount = 0;
        weui.uploader('#uploader', {
            url: '/zshop/userapi/uptUserInfo',
            auto: false,
            type: 'file',
            fileVal: 'uploaderInput',
            compress: {
                width: 1600,
                height: 1600,
                quality: .8
            },
            onBeforeQueued: function(files) {
                if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
                    weui.alert('Please upload image');
                    return false;
                }
                if (this.size > 10 * 1024 * 1024) {
                    weui.alert('Image cannot bigger than 10m');
                    return false;
                }
                $("#uploaderFiles").html('');
                $("#confirmBtn").addClass('weui-btn_disabled');

            },
            onQueued: function() {
                $(".weui-uploader__file").unbind();
                $(".weui-uploader__file").on("click", function() {
                    $galleryImg.attr("style", this.getAttribute("style"));
                    $gallery.fadeIn(100);
                    event.stopPropagation();
                });

                weuiUploadFun = this.upload;
                $("#confirmBtn").removeClass('weui-btn_disabled');

            },
            onBeforeSend: function(data, headers) {
                $.extend(data, {
                    name: $("#name").val(),
                    userId: $("#userId").val(),
                    email: $("#email").val()
                });
            },
            onProgress: function(procent) {

            },
            onSuccess: function(ret) {
                window.location.href = '/zshop?actTabbar=my';
            },
            onError: function(err) {
                var responeJsonObj = JSON.parse(this.xhr.responseText);
                publicTip.showTip(responeJsonObj);
                if (responeJsonObj.code == 'uptUserInfo:repeat_userId') {
                    $("#userIdCell").addClass('weui-cell_warn');
                } else if (responeJsonObj.code == 'uptUserInfo:repeat_email') {
                    $("#emailCell").addClass('weui-cell_warn');
                }
                $("#confirmBtn").removeClass('weui-btn_loading');
                $("#confirmLoading").removeClass('weui-loading');
            }
        });

    });

})