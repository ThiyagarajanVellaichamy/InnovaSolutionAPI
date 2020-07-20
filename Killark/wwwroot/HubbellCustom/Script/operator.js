function onOperatorLoad() {    
    //GO Operator
    onGOOperatorLoad();

    //GZ Operator
    onGZOperatorLoad();
}

function updateSelection(selectedType, data) {
    selectedType = '#' + selectedType;
    if (data == null || data[0] == 'N/A' || data[0] == '') {
        $(selectedType).children('option').each(function () { $(this).remove(); });
        $(selectedType).parent().parent().hide();
        return;
    }
    else {
        $(selectedType).parent().parent().show();
        $(selectedType).find('option').remove().end();
        var options = '';
        if (data.length != 0) {
            for (var items = 0; items < data.length; items++) {
                options += '<option value="' + data[items] + '">' + data[items] + '</option>';
            }
        }
        $(selectedType).append(options);
    }
}

function getOperatorSubType(masterType, holeType) {
    var element = getElement(masterType, holeType);
    var subType = $(element).find('select[uid="subType"] option:selected').text();
    return subType;
}

//Catalog Number
function getOperatorCatalogNo(masterType, holeType) {
    var element = getElement(masterType, holeType);
    var catalogNo = $(element).find('input[name*=ReadoutString]').val();
    return catalogNo;
}

function getUserCoordinates(masterType, holeType) {
    var element = getElement(masterType, holeType);
    var x, y;
    var holes = element.find('.noOfHole_1').val();
    if (holes == 1) {
        if (element.find(".pfrm-xy-frm input[type=checkbox]")
            .is(':checked')) {
            x = element.find('.pfrm-xval').find('input[type=number]').val();
            y = element.find('.pfrm-yval').find('input[type=number]').val();
            if (isNaN(x) || isNaN(y)) {
                return null;
            }
            else {
                return { x: x, y: y };
            }
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}

function getHoleFace(masterType, holeType) {
    var element = getElement(masterType, holeType);
    var faceType = $(element).find('select[uid="faceType"] option:selected').text();
    var view = null;
    if (faceType.includes("Top")) {
        view = holeViewEnum.TOP;
    }
    else if (faceType.includes("Bottom")) {
        view = holeViewEnum.BOTTOM;
    }
    else if (faceType.includes("Left")) {
        view = holeViewEnum.LEFT;
    }
    else if (faceType.includes("Right")) {
        view = holeViewEnum.RIGHT;
    }
    else {
        //Do Nothing
    }
    return view;
}

function getHoleSize(masterType, holeType) {
    var element = getElement(masterType, holeType);
    var holeSize = $(element).find('select[uid="holeSize"] option:selected').text();
    return holeSize;
}

function getHoleComponent(masterType, holeType) {
    var element = getElement(masterType, holeType);
    var holeComponent = $(element).find('select[uid="holeComponent"] option:selected').text();
    return holeComponent;
}

function getElement(masterType, holeType) {
    var element = null;
    switch (holeType) {
        case holeTypeEnum.PUSHBUTTON:
            switch (masterType) {
                case holeMasterTypeEnum.GOOPERATOR:
                    element = $("form[type='GO_PushButtons']");
                    break;
                case holeMasterTypeEnum.GZOPERATOR:
                    element = $("form[type='GZ_PushButtons']");
                    break;
                default:
                    //Do Nothing
                    return;
            }
            break;
        case holeTypeEnum.PILOTLIGHT:
            switch (masterType) {
                case holeMasterTypeEnum.GOOPERATOR:
                    element = $("form[type='GO_PilotLights']");
                    break;
                case holeMasterTypeEnum.GZOPERATOR:
                    element = $("form[type='GZ_PilotLights']");
                    break;
                default:
                    //Do Nothing
                    return;
            }
            break;
        case holeTypeEnum.SELECTORSWITCH:
            switch (masterType) {
                case holeMasterTypeEnum.GOOPERATOR:
                    element = $("form[type='GO_SelectorSwitches']");
                    break;
                case holeMasterTypeEnum.GZOPERATOR:
                    element = $("form[type='GZ_SelectorSwitches']");
                    break;
                default:
                    //Do Nothing
                    return;
            }
            break;
        case holeTypeEnum.SPECIALITYOPERATOR:
            switch (masterType) {
                case holeMasterTypeEnum.GOOPERATOR:
                    element = $("form[type='GO_SpecialOperators']");
                    break;
                case holeMasterTypeEnum.GZOPERATOR:
                    element = $("form[type='GZ_SpecialOperators']");
                    break;
                default:
                    //Do Nothing
                    return;
            }
            break;
        case holeTypeEnum.BLANKHOLE:
            element = $("form[type='GO_Blank']");
            break;
        case holeTypeEnum.RECTANGULAR:
            element = $("a[name='rectangular']").parent().parent();
            break;
        case holeTypeEnum.CIRCULAR:
            element = $("a[name='circular']").parent().parent();
            break;
        case holeTypeEnum.ANSI:
            element = $("a[name='ansiHole']").parent().parent();
            break;
        case holeTypeEnum.METRIC:
            element = $("a[name='metricHole']").parent().parent();
            break;
        default:
            //Do nothing
            break;
    }
    return element;
}

function getOperatorSelectionValues(config) {
    switch (config.masterType) {
        case holeMasterTypeEnum.GOOPERATOR:
            return getGOOperatorSelectionValues(config);
        case holeMasterTypeEnum.GZOPERATOR:
            return getGZOperatorSelectionValues(config);
        default:
            //Do Nothing
            break;
    }
}