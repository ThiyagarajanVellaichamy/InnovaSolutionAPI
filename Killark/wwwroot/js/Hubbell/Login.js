var _login = new function () {

    this.Init = function () {

        $myApp.controller("LoginController", function ($scope, $http, customService) {
            var request = null;
            $scope.Login = function (e) {

                if (PageValidationV2($('#loginDiv'))) {

                    request = {};
                    request.param = e;


                    CObject.Request('api/v1/account/login', request, function (data) {

                        if (data.Status == _$success) {

                            window.location.href = _APPLocation + 'api/v1/dashboard';
                        }
                        else {
                            app.ShowWarningMessage(data.Message);
                        }
                    });

                    customService.postData('api/v1/account/login', request, function (data) {

                        if (data.Status == _$success) {

                            window.location.href = _APPLocation + 'api/v1/dashboard';
                        }
                        else {
                            app.ShowWarningMessage(data.Message);
                        }
                    });
                }
            };

            $scope.ShowPassword = function(id) {
                var x = document.getElementById(id);
                var pwd = document.querySelector(".pwd_hide");
                if (x.type === "password") {
                    x.type = "text";
                    pwd.classList.remove("fa-eye-slash");
                    pwd.classList.add("fa-eye");
                } else {
                    x.type = "password";
                    pwd.classList.remove("fa-eye");
                    pwd.classList.add("fa-eye-slash");
                }
            }
        });

    }
}