function ajaxPOST(url, data, onSuccess, onError) {
    if (data === null || data === undefined)
        data = "{}";

    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (data) {
            if (onSuccess !== null && onSuccess !== undefined) {
                onSuccess(data);
            }
        },
        error: function (err) {
            if (err.status === 302) {
                if (err.getResponseHeader("REDIRECT") !== '') {
                    window.location.href = err.getResponseHeader("REDIRECT");
                }
            }
            else {
                if (onError != undefined && onError != null) {
                    onError(err);
                }
            }
        },
        complete: function (e) {
            //onComplete
        }
    });
}

function ajaxGET() {
    //To do
}