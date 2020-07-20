function onGOOperatorLoad() {
    //GO Operator Selection event
    $('.goDropDown').on('change', function () {
        goDropDownOnChange(this);
    });

    $('a[href="GOPushbuttonsPop"]').on('click', function () {
        goPushButtonCustomLogic();

        goPushButtonOnChange('GOPushButtonSubType');
    });

    $('a[href="GOPilotLightsPop"]').on('click', function () {
        goPilotLightOnChange('GOPilotLightTypeSubType');
    });

    $('a[href="GOSelectorSwitchesPop"]').on('click', function () {
        goSelectorSwitchOnChange('GOSelectorSwitchSubType');
    });

    $('a[href="GOSpecialityOpeatorsPop"]').on('click', function () {
        goSpecialityOpeatorOnChange('GOSpecialityOpeatorSubType');
    });

    //$('a[href="GOBlankPop"]').on('click', function () {
    //    pushButtonOnChange('GOPushButtonSubType');
    //});   
}

function goDropDownOnChange(e) {
    //Get the selected operator type
    var operatorType = $(e).closest('form').attr('type');

    switch (operatorType) {
        case "GO_PushButtons":
            goPushButtonOnChange($(e).attr('id'));
            break;
        case "GO_PilotLights":
            goPilotLightOnChange($(e).attr('id'));
            break;
        case "GO_SelectorSwitches":
            goSelectorSwitchOnChange($(e).attr('id'));
            break;
        case "GO_SpecialOperators":
            goSpecialityOpeatorOnChange($(e).attr('id'));
            break;
        default:
            //Do Nothing
            break;
    }
}

function goPushButtonOnChange(selectionType) {

    var opeatorType = "GO_PushButtons";

    switch (selectionType) {
        case "GOPushButtonSubType":
            getGOOpeatorSubTypeData(opeatorType, selectionType, onSuccessOperatorSubType);
            break;
        case "GOPushButtonColorOption":
            getGOOpeatorData(opeatorType, 'GOPushButtonSubType', selectionType, onSuccessOperatorData);
            break;
        case "GOPushButtonContactConfiguration":
        case "GOPushButtonRightButtonContactConfiguration":
        case "GOPushButtonNamePlateOptions":
            getReadoutString();
            break;
        case "GOPushButtonAccessoryOptions":
            customSelectionLogic(selectionType, 'GOPushButtonLockoutOptions');
            getReadoutString();
            break;
        case "GOPushButtonLockoutOptions":
            customSelectionLogic(selectionType, 'GOPushButtonAccessoryOptions');
            getReadoutString();
            break;
        default:
            //Do Nothing
            break;
    }

    function customSelectionLogic(currentId, changeId) {
        var selection = $('#' + currentId + ' option:selected').val();
        if (selection != 'None') {
            $('#' + changeId).children('option').each(function () {
                if ($(this).val() != 'None') {
                    $(this).hide();
                }
            });
        }
        else {
            $('#' + changeId).children('option').each(function () {
                $(this).show();
            });
        }
    }

    function onSuccessOperatorSubType(data) {
        updateSelection('GOPushButtonColorOption', data);
        getGOOpeatorData(opeatorType, selectionType, 'GOPushButtonColorOption', onSuccessOperatorData);
    }

    function onSuccessOperatorData(data) {
        //Update Dropdown Options
        updateSelection('GOPushButtonContactConfiguration', data.ContactConfiguration);
        updateSelection('GOPushButtonRightButtonContactConfiguration', data.RightButtonContactConfiguration);
        updateSelection('GOPushButtonNamePlateOptions', data.NamePlateOptions);
        updateSelection('GOPushButtonAccessoryOptions', data.AccessoryOptions);
        updateSelection('GOPushButtonLockoutOptions', data.LockoutOptions);

        //Update Readout String
        getReadoutString();
    }

    function getReadoutString() {
        var readoutObject = Object.create(goReadoutModel);
        readoutObject.EXBType = globalEnclosureModel.catalogNo;
        readoutObject.BoltOption = globalEnclosureModel.selectedBoltOption;

        readoutObject.MainOperatorType = 'Pushbuttons';
        readoutObject.OperatorType = $('#GOPushButtonSubType option:selected').val();
        readoutObject.InsertColor = $('#GOPushButtonColorOption option:selected').val();
        readoutObject.ContactType = $('#GOPushButtonContactConfiguration option:selected').val();
        readoutObject.ContactType_R = $('#GOPushButtonRightButtonContactConfiguration option:selected').val();
        readoutObject.NamePlateOption = $('#GOPushButtonNamePlateOptions option:selected').val();
        readoutObject.AccessoryOption = $('#GOPushButtonAccessoryOptions option:selected').val();
        readoutObject.LockoutOption = $('#GOPushButtonLockoutOptions option:selected').val();

        ajaxPOST('GetGOReadoutString', { JsonObject: JSON.stringify(readoutObject) },
            function (data) {
                $('form[type="' + opeatorType + '"] input[name="goReadoutString"]').val(data.split('|')[0]);
                $('.actvp .pre-image img').attr('src', './../Content/images/GOOPERATOR/' + data.split('|')[1] + '.jpg');
            });
    }
}

function goPilotLightOnChange(selectionType) {

    var opeatorType = "GO_PilotLights";

    switch (selectionType) {
        case "GOPilotLightTypeSubType":
            getGOOpeatorData(opeatorType, selectionType, '', onSuccessOperatorData);
            break;
        case "GOPilotLightColorOption":
        case "GOPilotLightVoltage":
        case "GOPilotLightContactConfiguration":
        case "GOPilotLightNamePlateOptions":
        case "GOPilotLightAccessoryOptions":
            getReadoutString();
            break;
        default:
            //Do Nothing
            break;
    }

    function onSuccessOperatorData(data) {
        updateSelection('GOPilotLightColorOption', data.ColorOption);
        updateSelection('GOPilotLightVoltage', data.PilotLightVoltage);
        updateSelection('GOPilotLightContactConfiguration', data.ContactConfiguration);
        updateSelection('GOPilotLightNamePlateOptions', data.NamePlateOptions);
        updateSelection('GOPilotLightAccessoryOptions', data.AccessoryOptions);

        //Update Readout String
        getReadoutString();
    }

    function getReadoutString() {
        var readoutObject = Object.create(goReadoutModel);
        readoutObject.EXBType = globalEnclosureModel.catalogNo;
        readoutObject.BoltOption = globalEnclosureModel.selectedBoltOption;

        readoutObject.MainOperatorType = 'Pilot Lights';
        readoutObject.OperatorType = $('#GOPilotLightTypeSubType option:selected').val();
        readoutObject.InsertColor = $('#GOPilotLightColorOption option:selected').val();
        readoutObject.ContactType = $('#GOPilotLightContactConfiguration option:selected').val();
        readoutObject.VoltageOption = $('#GOPilotLightVoltage option:selected').val();
        readoutObject.NamePlateOption = $('#GOPilotLightNamePlateOptions option:selected').val();
        readoutObject.AccessoryOption = $('#GOPilotLightAccessoryOptions option:selected').val();

        ajaxPOST('GetGOReadoutString', { JsonObject: JSON.stringify(readoutObject) },
            function (data) {
                $('form[type="' + opeatorType + '"] input[name="goReadoutString"]').val(data.split('|')[0]);
                $('.actvp .pre-image img').attr('src', './../Content/images/GOOPERATOR/' + data.split('|')[1] + '.jpg');
            });
    }
}

function goSelectorSwitchOnChange(selectionType) {

    var opeatorType = "GO_SelectorSwitches";

    switch (selectionType) {
        case "GOSelectorSwitchSubType":
            getGOOpeatorSubTypeData(opeatorType, selectionType, onSuccessOperatorSubType);
            break;
        case "GOSelectorSwitchPosition":
            getGOOpeatorData(opeatorType, 'GOSelectorSwitchSubType', selectionType, onSuccessOperatorData);
            break;
        case "GOSelectorSwitchContactConfiguration":
        case "GOSelectorSwitchNamePlateOptions":
        case "GOSelectorSwitchAccessoryOptions":
        case "GOSelectorSwitchLockoutOptions":
        case "GOSelectorSwitchLockoutType":
            getReadoutString();
            break;
        default:
            //Do Nothing
            break;
    }

    function onSuccessOperatorSubType(data) {
        updateSelection('GOSelectorSwitchPosition', data);
        getGOOpeatorData(opeatorType, selectionType, 'GOSelectorSwitchPosition', onSuccessOperatorData);
    }

    function onSuccessOperatorData(data) {
        updateSelection('GOSelectorSwitchContactConfiguration', data.ContactConfiguration);
        updateSelection('GOSelectorSwitchNamePlateOptions', data.NamePlateOptions);
        updateSelection('GOSelectorSwitchAccessoryOptions', data.AccessoryOptions);
        updateSelection('GOSelectorSwitchLockoutOptions', data.LockoutOptions);
        updateSelection('GOSelectorSwitchLockoutType', data.LockoutType);

        //Update Readout String
        getReadoutString();
    }

    function getReadoutString() {
        updateLockoutOption();

        var readoutObject = Object.create(goReadoutModel);
        readoutObject.EXBType = globalEnclosureModel.catalogNo;
        readoutObject.BoltOption = globalEnclosureModel.selectedBoltOption;

        readoutObject.MainOperatorType = 'Selector Switches';
        readoutObject.OperatorType = $('#GOSelectorSwitchSubType option:selected').val();
        readoutObject.InsertColor = $('#GOSelectorSwitchPosition option:selected').val();
        readoutObject.ContactType = $('#GOSelectorSwitchContactConfiguration option:selected').val();
        readoutObject.NamePlateOption = $('#GOSelectorSwitchNamePlateOptions option:selected').val();
        readoutObject.AccessoryOption = $('#GOSelectorSwitchAccessoryOptions option:selected').val();
        readoutObject.LockoutOption = $('#GOSelectorSwitchLockoutOptions option:selected').val();
        readoutObject.LockoutPosition = $('#GOSelectorSwitchLockoutType option:selected').val();

        ajaxPOST('GetGOReadoutString', { JsonObject: JSON.stringify(readoutObject) },
            function (data) {
                $('form[type="' + opeatorType + '"] input[name="goReadoutString"]').val(data.split('|')[0]);
                $('.actvp .pre-image img').attr('src', './../Content/images/GOOPERATOR/' + data.split('|')[1] + '.jpg');
            });
    }

    function updateLockoutOption() { 
        if (($('#GOSelectorSwitchLockoutOptions option:selected').text() == 'None')
            || ($('#GOSelectorSwitchLockoutType option').length == 0)) {
            $('#GOSelectorSwitchLockoutType').parent().parent().hide();
        } else {
            $('#GOSelectorSwitchLockoutType').parent().parent().show();
        }
    }
}

function goSpecialityOpeatorOnChange(selectionType) {

    var opeatorType = "GO_SpecialOperators";

    switch (selectionType) {
        case "GOSpecialityOpeatorSubType":
            getReadoutString();
            break;
        default:
            //Do Nothing
            break;
    }

    function getReadoutString() {
        var readoutObject = Object.create(goReadoutModel);
        readoutObject.EXBType = globalEnclosureModel.catalogNo;
        readoutObject.BoltOption = globalEnclosureModel.selectedBoltOption;

        readoutObject.MainOperatorType = 'Speciality Operators';
        readoutObject.OperatorType = $('#GOSpecialityOpeatorSubType option:selected').val();

        ajaxPOST('GetGOReadoutString', { JsonObject: JSON.stringify(readoutObject) },
            function (data) {
                $('form[type="' + opeatorType + '"] input[name="goReadoutString"]').val(data.split('|')[0]);
                $('.actvp .pre-image img').attr('src', './../Content/images/GOOPERATOR/' + data.split('|')[1] + '.jpg');
            });
    }
}

function getGOOpeatorSubTypeData(goOpeatorType, selectedType, onSuccess) {
    var selectedValue = $('#' + selectedType + ' option:selected').val();
    ajaxPOST("GetGOOpeatorSubTypeData",
        { GOOpeatorType: goOpeatorType, SelectedType: selectedValue }, onSuccess);
}

function getGOOpeatorData(goOpeatorType, selectedType, selectedSubType, onSuccess) {
    var selectedSubValue = '';

    var selectedValue = $('#' + selectedType + ' option:selected').val();

    if (selectedSubType != undefined && selectedSubType != null && selectedSubType != '') {
        selectedSubValue = $('#' + selectedSubType + ' option:selected').val();
    }

    ajaxPOST("GetGOOpeatorData",
        { GOOpeatorType: goOpeatorType, SelectedType: selectedValue, SelectedSubType: selectedSubValue }, onSuccess);
}

function getGOOperatorSelectionValues(config) {

    config.subtype = "";
    config.insertColor = "";
    config.voltageOption = "";
    config.contactType = "";
    config.contactType_R = "";
    config.namePlateOption = "";
    config.accessoryOption = "";
    config.lockoutOption = "";
    config.lockoutPosition = "";
    config.customText1 = "";
    config.customText2 = "";
    config.customText3 = "";
    config.customText4 = "";

    switch (config.type) {
        case holeTypeEnum.PUSHBUTTON:
            config.subtype = $('#GOPushButtonSubType:visible option:selected').text();
            config.insertColor = $('#GOPushButtonColorOption:visible option:selected').text();
            config.contactType = $('#GOPushButtonContactConfiguration:visible option:selected').text();
            config.contactType_R = $('#GOPushButtonRightButtonContactConfiguration:visible option:selected').text();
            config.accessoryOption = $('#GOPushButtonAccessoryOptions:visible option:selected').text();
            config.lockoutOption = $('#GOPushButtonLockoutOptions:visible option:selected').text();
            config.namePlateOption = $('#GOPushButtonNamePlateOptions:visible option:selected').text();
            break;
        case holeTypeEnum.PILOTLIGHT:
            config.subtype = $('#GOPilotLightTypeSubType:visible option:selected').text();
            config.insertColor = $('#GOPilotLightColorOption:visible option:selected').text();
            config.voltageOption = $('#GOPilotLightVoltage:visible option:selected').text();
            config.contactType = $('#GOPilotLightContactConfiguration:visible option:selected').text();
            config.namePlateOption = $('#GOPilotLightNamePlateOptions:visible option:selected').text();
            config.accessoryOption = $('#GOPilotLightAccessoryOptions:visible option:selected').text();
            break;
        case holeTypeEnum.SELECTORSWITCH:
            config.subtype = $('#GOSelectorSwitchSubType:visible option:selected').text();
            config.insertColor = $('#GOSelectorSwitchPosition:visible option:selected').text();
            config.contactType = $('#GOSelectorSwitchContactConfiguration:visible option:selected').text();
            config.accessoryOption = $('#GOSelectorSwitchAccessoryOptions:visible option:selected').text();
            config.lockoutOption = $('#GOSelectorSwitchLockoutOptions:visible option:selected').text();
            config.lockoutPosition = $('#GOSelectorSwitchLockoutType:visible option:selected').text();
            config.namePlateOption = $('#GOSelectorSwitchNamePlateOptions:visible option:selected').text();
            break;
        case holeTypeEnum.SPECIALITYOPERATOR:
            config.subtype = $('#GOSpecialityOpeatorSubType:visible option:selected').text();
            break;
        case holeTypeEnum.BLANKHOLE:
            if ($('input[name="plugged"]').is(':checked')) {
                config.subtype = "Plugged";
            }
            break;
        default:
            //Do nothing
            break;
    }

    return config;
}

function goPushButtonCustomLogic() {
    if (globalEnclosureModel.lengthDesignator == 'E') {
        $("select[name=GOPushButtonSubType] option").filter(function () {
            return this.text == "Double Maint Pushbutton";
        }).hide();
    }
    else {
        $("select[name=GOPushButtonSubType] option").filter(function () {
            return this.text == "Double Maint Pushbutton";
        }).show();
    }
}