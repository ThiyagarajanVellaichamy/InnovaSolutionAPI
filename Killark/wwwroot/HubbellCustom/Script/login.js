$(document).ready(function () {

    document.onkeydown = function () {
        if (window.event.keyCode == '13') {
            $('#frmLogin').submit();
        }
    }

    $('#lnkLogin').click(function () {
        $('#frmLogin').submit();
    });

    $('#frmLogin').on('submit', function (event) {
        if (!$("#frmLogin").valid()) {
            $("#showError").empty();
            $('#EmailId').css({ "border-color": "red" });
            $('#Password').css({ "border-color": "red" });
            $("#showError").append("<span class=\"col-lg-12\" style=\"color:white;text-align:center;\">Invalid Username/Password</span>");
        }
    });
    
    $('#btnResetPwd').click(function () {
        var emailId = $('#EmailId').val();
        if ($.trim(emailId).length == 0) {
            showPopup('Please enter valid email address');
        }
        else {
            if (validateEmail(emailId)) {
                ajaxPOST("PasswordReset", { email: emailId },
                    onSuccess, null);
                function onSuccess(data) {
                    if (data == true) {
                        showPopup('Reset link has been sent to the email address.', onClose);                        
                    }
                    else {
                        showPopup('User does not exist, Please try again !!!');
                    }
                }
            }
            else {
                showPopup('Please enter valid email address');
            }
        }
    });

    $('#btnPasswordReset').click(function () {
        var NewPassword = $('#NewPassword').val();
        var ConfirmPassword = $('#ConfirmPassword').val();
        if (NewPassword == ConfirmPassword) {
            ajaxPOST("UpdatePassword", { Tokenval: tokenval, Password: NewPassword },
                onSuccess, null);
            function onSuccess(data) {
                if (data == true) {
                    showPopup('Your password has been reset successfully!!!', onClose);
                }
                else {
                    showPopup('New password is similar to Old Password. Please change the password');
                }
            }
        }
        else {
            showPopup('password mismatch please try again');
        }
    });

    function onClose() {
        window.location.href = "./../Account/Login";
    }
});

var vars = [], hash;
var tokenval = "";
var q = document.URL.split('?')[1];
if (q != undefined) {
    q = q.split('&');
    for (var i = 0; i < q.length; i++) {
        hash = q[i].split('=');
        tokenval = hash[1]
    }
}

function validateEmail(emailId) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(emailId)) {
        return true;
    }
    else {
        return false;
    }
}

function showPopup(message, onClose) {
    $('#myModal').modal('toggle');
    $('#myModal').modal('show');
    $('#myModal').find('.modal-body').text(message);

    if (onClose != undefined && onClose != null) {
        $('#myModal').on('hide.bs.modal', function () {
            onClose();
        })
    }
}