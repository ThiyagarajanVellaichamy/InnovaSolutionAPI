/* No of holes and x,y points inputbox onkeypress event */
var specialKeys = new Array();
specialKeys.push(8); //Backspace

function IsNumeric(e) {
    var keyCode = e.which ? e.which : e.keyCode
    var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
    return ret;
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode != 45 && charCode > 31 // Allow Minus and decimal points.
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

$(".cover-type").click(function () {
    $(".box1-menu ul ul li a").removeClass("active");
    $(".box1-menu ul ul li a").removeClass("arrow-active");
});