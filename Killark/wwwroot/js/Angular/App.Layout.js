$(document).ready(function () {
    alertify.defaults.glossary.title = "Killark";
    alertify.defaults.transition = "zoom";
    alertify.defaults.theme.ok = "btn btn-primary";
    alertify.defaults.theme.cancel = "btn btn-danger";
    alertify.defaults.theme.input = "form-control";
});
var app = new function () {
    this._activateAjaxTime = null;
    this.InitAjaxLoading = function (data) {
        $('#page-preloader').show();
    }

    this.HideAjaxLoding = function () {
        $('#page-preloader').hide();
    }

    this.Alert = function (messeage, callbackmethod) {
        if (callbackmethod == undefined) { alertify.alert(messeage); }
        else { alertify.alert(messeage, callbackmethod); }

    }

    this.Confirm = function (message, callbackmethod, IsCancelFocus, OkText, CancelText) {
        var defaultFocus = 'ok';
        if (IsCancelFocus) { defaultFocus = 'cancel'; }
        if (OkText == undefined) { OkText = alertify.defaults.glossary.ok; }
        if (CancelText == undefined) { CancelText = alertify.defaults.glossary.cancel; }

        alertify.confirm(message, callbackmethod)
            .set(
                'labels', { ok: OkText, cancel: CancelText }
            )
            .set('defaultFocus', defaultFocus);
    }

    this.Prompt = function (promptMsg, defaultVaue, callbackmethod) {
        alertify.prompt("Message", defaultVaue, function (e, str) {
            callbackmethod(e, str);
        });
    }

    this.ShowMessage = function (message, hideOnUserClick, callbackmethod) {
        
        var persistanceTime = 3;
        if (hideOnUserClick) { persistanceTime = 0; }
        message = "<span class='alert-message-i'></span>" + message;
        alertify.message(message, persistanceTime, callbackmethod);
    }

    this.ShowSuccessMessage = function (message, hideOnUserClick, callbackmethod) {

        var persistanceTime = 3;
        if (hideOnUserClick) { persistanceTime = 0; }
        message = "<span class='alert-success-i'></span>" + message;
        alertify.success(message, persistanceTime, callbackmethod);
    }

    this.ShowErrorMessage = function (message, hideOnUserClick, callbackmethod) {
        var persistanceTime = 3;
        if (hideOnUserClick) { persistanceTime = 0; }
        message = "<span class='alert-error-i'></span>" + message;
        alertify.error(message, persistanceTime, callbackmethod);
    }

    this.ShowWarningMessage = function (message, hideOnUserClick, callbackmethod) {
        var persistanceTime = 3;
        if (hideOnUserClick) { persistanceTime = 0; }
        message = "<span class='alert-warning-i'></span>" + message;
        alertify.warning(message, persistanceTime, callbackmethod);
    }

    this.ApplicationError = function (errorHtmlOrMessage) {
        // Extend existing 'alert' dialog
        if (!alertify.errorAlert) {
            //define a new errorAlert base on alert
            alertify.dialog('errorAlert', function factory() {
                return {
                    build: function () {
                        var errorHeader = '<span class="fa fa-times-circle fa-2x" '
                        + 'style="color: #e10000;font-size: 20px;margin-right: 5px;position: relative;top: -3px;vertical-align: middle;">'
                            + '</span>'
                            + alertify.defaults.glossary.title;
                        this.setHeader(errorHeader);
                    }
                };
            }, true, 'alert');
        }
        //launch it.
        // since this was transient, we can launch another instance at the same time.
        alertify
            .errorAlert(errorHtmlOrMessage);
    }



    this.ShowWarningMessageAlert = function (errorHtmlOrMessage, callbackmethod, title) {
        // Extend existing 'alert' dialog
        if (!alertify.warningAlert) {
            //define a new errorAlert base on alert
            alertify.dialog('warningAlert', function factory() {
                return {
                    build: function () {
                        var _heading = alertify.defaults.glossary.title;
                        if (title != undefined && title != '') {
                            _heading = title;
                        }
                        var errorHeader = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle al-warning"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
                            + _heading;
                        this.setHeader(errorHeader);
                    }
                };
            }, true, 'alert');
        }
        //launch it.
        // since this was transient, we can launch another instance at the same time.
        if (callbackmethod == undefined) { alertify.warningAlert(errorHtmlOrMessage); }
        else { alertify.warningAlert(errorHtmlOrMessage, callbackmethod); }
    }

    this.ShowSuccessMessageAlert = function (errorHtmlOrMessage, callbackmethod, title) {
        // Extend existing 'alert' dialog
        if (!alertify.successAlert) {
            //define a new errorAlert base on alert
            alertify.dialog('successAlert', function factory() {
                return {
                    build: function () {
                        var _heading = alertify.defaults.glossary.title;
                        if (title != undefined && title != '') {
                            _heading = title;
                        }
                        var errorHeader = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check al-success"><polyline points="20 6 9 17 4 12"></polyline></svg>'
                            + _heading;
                        this.setHeader(errorHeader);
                    }
                };
            }, true, 'alert');
        }
        //launch it.
        // since this was transient, we can launch another instance at the same time.
        if (callbackmethod == undefined) { alertify.successAlert(errorHtmlOrMessage); }
        else { alertify.successAlert(errorHtmlOrMessage, callbackmethod); }
    }

    this.ShowErrorMessageAlert = function (errorHtmlOrMessage, callbackmethod, title) {
        // Extend existing 'alert' dialog
        if (!alertify.errorAlert) {
            //define a new errorAlert base on alert
            alertify.dialog('errorAlert', function factory() {
                return {
                    build: function () {
                        var _heading = alertify.defaults.glossary.title;
                        if (title != undefined && title !='') {
                            _heading = title;
                        }
                        var errorHeader = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle al-error"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
                            + _heading;
                        this.setHeader(errorHeader);
                    }
                };
            }, true, 'alert');
        }
        //launch it.
        // since this was transient, we can launch another instance at the same time.
        if (callbackmethod == undefined) { alertify.errorAlert(errorHtmlOrMessage); }
        else { alertify.errorAlert(errorHtmlOrMessage, callbackmethod); }
    }
}

