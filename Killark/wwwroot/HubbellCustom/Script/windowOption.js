//Selected Dimension
var selectedDimension = "";

//Selected Product Type
var selectedProductType = "";

//Current Selected Cutout Max allowed count
var allowedCutoutCount = 0;

$(document).ready(function () {

    $('a[href="rectPop"]').on('click', function () {
        if (validateWindowSelection(holeTypeEnum.RECTANGULAR)) {
            windowOptionOnChange(holeTypeEnum.RECTANGULAR);
        }
    });

    $('a[href="circularPop"]').on('click', function () {
        if (validateWindowSelection(holeTypeEnum.CIRCULAR)) {
            windowOptionOnChange(holeTypeEnum.CIRCULAR);
        }
    });
});

function validateWindowSelection(windowType) {
    //Check for difference in window option
    if (windowType == holeTypeEnum.RECTANGULAR) {
        for (var i = coverConfigurationCollection.length - 1; i >= 0; i--) {
            if (coverConfigurationCollection[i].type === holeTypeEnum.CIRCULAR) {
                showPopup('Different types of window cutout placements are not allowed!!!');
                return false;
            }
        }
    }
    else if (windowType == holeTypeEnum.CIRCULAR) {
        for (var i = coverConfigurationCollection.length - 1; i >= 0; i--) {
            if (coverConfigurationCollection[i].type === holeTypeEnum.RECTANGULAR) {
                showPopup('Different types of window cutout placements are not allowed!!!');
                return false;
            }
        }
    }
    else {
        //Do Nothing
    }

    return true;
}

function Initialize(dimension, productType) {
    selectedDimension = dimension;
    selectedProductType = productType;

    windowOption();
}

/*
  Based on dimension Rectangular and Circular Dropdown list changes
 */
function windowOption() {
    $("li.b1_second_menu").hide();
    if (selectedProductType == 'EXBLTP') {
        $("#circlePop").addClass("disabled-menu");
        $("#rectangularPop").addClass("disabled-menu");
    }
    else {
        populateWindowOption(holeTypeEnum.RECTANGULAR);
        populateWindowOption(holeTypeEnum.CIRCULAR);
    }
}

function populateWindowOption(windowType) {
    var htmlTag = '', popupTag = '';
    if (windowType == holeTypeEnum.RECTANGULAR) {
        htmlTag = '#SelectedRectangularWindowOption';
        popupTag = '#rectangularPop';
    }
    else {
        htmlTag = '#SelectedCircularWindowOption';
        popupTag = '#circlePop';
    }

    ajaxPOST("GetWindowsOption", { dimension: selectedDimension, WindowType: windowType },
        onSuccess, null);

    function onSuccess(data) {
        $(htmlTag).find('option').remove().end();
        var options;
        if (data != '') {
            var displayData = data.WindowOption;
            if (displayData != undefined && displayData.length != 0) {
                $(popupTag).removeClass("disabled-menu");
                for (var items = 0; items < displayData.length; items++) {
                    options += '<option value="' + displayData[items] + '">' + displayData[items] + '</option>';
                }

                globalEnclosureModel.maxRectangularCutoutCount = data.MaxNoOfRectangularWindow;

                globalEnclosureModel.maxCircularCutoutCount = data.MaxNoOfCircularWindow;

                $("li.b1_second_menu").show();
            }
            else {
                $(popupTag).addClass("disabled-menu");
            }

            $(htmlTag).append(options);

            windowOptionOnChange(windowType);
        }
    }
}

function windowOptionOnChange(windowType) {
    var windowOptionArray = windowCutoutArray();

    ajaxPOST("GetWindowOptionCount", {
        dimension: selectedDimension, selectedOption: getOperatorSubType(holeMasterTypeEnum.WINDOWOPTION, windowType),
        arrayRectangular: windowOptionArray.rectangular, arrayCircular: windowOptionArray.circular
    },
        onSuccess, null);

    function onSuccess(data) {
        allowedCutoutCount = data;

        if (windowType == holeTypeEnum.RECTANGULAR && allowedCutoutCount > 0) {
            loadCutoutImage();
        }
    }
}

function windowCutoutArray() {
    var arrayRectangular = [];
    var arrayCircular = [];
    for (var i = 0; i < coverConfigurationCollection.length; i++) {
        if (coverConfigurationCollection[i].type == holeTypeEnum.RECTANGULAR) {
            arrayRectangular.push(coverConfigurationCollection[i].subtype);
        }
        else if (coverConfigurationCollection[i].type == holeTypeEnum.CIRCULAR) {
            arrayCircular.push(coverConfigurationCollection[i].subtype);
        }
    }

    return { rectangular: arrayRectangular, circular: arrayCircular };
}

//Window option preview img update
function loadCutoutImage() {
    var rectTypeData = $('#SelectedRectangularWindowOption option:selected').val();
    $('#rectangularReadout').val(rectTypeData);
    var rectData = rectTypeData.replace("°", "");
    $('#rectPop .pre-image img').attr('src', './../Content/images/Window/' + rectData + '.jpg');
}