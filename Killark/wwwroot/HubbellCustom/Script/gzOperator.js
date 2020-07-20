function onGZOperatorLoad() {
    //GZ Operator Selection event
    $('.gzDropDown').on('change', function () {
        gzDropDownOnChange(this);
    });

    $('a[href="GZPushbuttonsPop"]').on('click', function () {
        gzPushButtonOnChange('GZPushButtonSubType');
    });

    $('a[href="GZPilotLightsPop"]').on('click', function () {
        gzPilotLightOnChange('GZPilotLightSpecifyLensColor');
    });

    $('a[href="GZSelectorSwitchesPop"]').on('click', function () {
        gzSelectorSwitchOnChange('GZSelectorSwitchSubType');
    });

    $('a[href="GZSpecialityOpeatorsPop"]').on('click', function () {
        gzSpecialityOpeatorOnChange('GZSpecialityOpeatorSubType');
    }); 
}

function gzDropDownOnChange(e) {
    //Get the selected operator type
    var operatorType = $(e).closest('form').attr('type');

    switch (operatorType) {
        case "GZ_PushButtons":
            gzPushButtonOnChange($(e).attr('id'));
            break;
        case "GZ_PilotLights":
            gzPilotLightOnChange($(e).attr('id'));
            break;
        case "GZ_SelectorSwitches":
            gzSelectorSwitchOnChange($(e).attr('id'));
            break;
        case "GZ_SpecialOperators":
            gzSpecialityOpeatorOnChange($(e).attr('id'));
            break;
        default:
            //Do Nothing
            break;
    }
}

function gzPushButtonOnChange(selectionType) {

    var opeatorType = "GZ_PushButtons";

    switch (selectionType) {
        case "GZPushButtonSubType":
            getGZOpeatorData(opeatorType, selectionType, '', onSuccessOperatorData);
            break;
        case "GZPushButtonInsertColor":
        case "GZPushButtonContactConfiguration":
        case "GZPushButtonSpecifyLEDVoltage":
        case "GZPushButtonAccessoryOptions":
        case "GZPushButtonLockoutOptions":
        case "GZPushButtonNamePlateOptions":
            //Update Readout String
            getReadoutString();

            //Load Preview Image
            gzLoadPreivewImage();

            //Load Custom Text Box for Nameplate option
            gzLoadCustomText();
            break;
        default:
            //Do Nothing
            break;
    }

    function onSuccessOperatorData(data) {
        //Update Dropdown Options
        updateSelection('GZPushButtonInsertColor', data.InsertColor);
        updateSelection('GZPushButtonContactConfiguration', data.ContactConfiguration);
        updateSelection('GZPushButtonSpecifyLEDVoltage', data.SpecifyLEDVoltage);
        updateSelection('GZPushButtonAccessoryOptions', data.AccessoryOptions);
        updateSelection('GZPushButtonLockoutOptions', data.LockoutOptions);
        updateSelection('GZPushButtonNamePlateOptions', data.NamePlateOptions);

        //Update Readout String
        getReadoutString();

        //Load Preview Image
        gzLoadPreivewImage();

        //Load Custom Text Box for Nameplate option
        gzLoadCustomText();
    }

    function getReadoutString() {
        var readoutObject = Object.create(gzReadoutModel);
        readoutObject.EXBType = globalEnclosureModel.catalogNo;

        readoutObject.MainOperatorType = 'Pushbuttons';
        readoutObject.OperatorType = $('#GZPushButtonSubType option:selected').val();
        readoutObject.InsertColor = $('#GZPushButtonInsertColor option:selected').val();
        readoutObject.ContactType = $('#GZPushButtonContactConfiguration option:selected').val();
        readoutObject.VoltageOption = $('#GZPushButtonSpecifyLEDVoltage option:selected').val();
        readoutObject.AccessoryOption = $('#GZPushButtonAccessoryOptions option:selected').val();
        readoutObject.LockoutOption = $('#GZPushButtonLockoutOptions option:selected').val();
        readoutObject.NamePlateOption = $('#GZPushButtonNamePlateOptions option:selected').val();

        ajaxPOST('GetGZReadoutString', { JsonObject: JSON.stringify(readoutObject) },
            function (data) { $('form[type="' + opeatorType + '"] input[name="gzReadoutString"]').val(data); });
    }
}

function gzPilotLightOnChange(selectionType) {

    var opeatorType = "GZ_PilotLights";

    switch (selectionType) {
        case "GZPilotLightSpecifyLensColor":
        case "GZPilotLightSpecifyLEDVoltage":
        case "GZPilotLightAccessoryOptions":
        case "GZPilotLightLockoutOptions":
        case "GZPilotLightNamePlateOptions":
            //Update Readout String
            getReadoutString();

            //Load Preview Image
            gzLoadPreivewImage();

            //Load Custom Text Box for Nameplate option
            gzLoadCustomText();
            break;
        default:
            //Do Nothing
            break;
    }

    function getReadoutString() {
        var readoutObject = Object.create(gzReadoutModel);
        readoutObject.EXBType = globalEnclosureModel.catalogNo;

        readoutObject.MainOperatorType = 'Pilot Lights';
        readoutObject.InsertColor = $('#GZPilotLightSpecifyLensColor option:selected').val();
        readoutObject.VoltageOption = $('#GZPilotLightSpecifyLEDVoltage option:selected').val();
        readoutObject.AccessoryOption = $('#GZPilotLightAccessoryOptions option:selected').val();
        readoutObject.LockoutOption = $('#GZPilotLightLockoutOptions option:selected').val();
        readoutObject.NamePlateOption = $('#GZPilotLightNamePlateOptions option:selected').val();

        ajaxPOST('GetGZReadoutString', { JsonObject: JSON.stringify(readoutObject) },
            function (data) { $('form[type="' + opeatorType + '"] input[name="gzReadoutString"]').val(data); });
    }
}

function gzSelectorSwitchOnChange(selectionType) {

    var opeatorType = "GZ_SelectorSwitches";

    switch (selectionType) {
        case "GZSelectorSwitchSubType":
            getGZOpeatorSubTypeData(opeatorType, selectionType, onSuccessOperatorSubType);
            break;
        case "GZSelectorSwitchSpecifySwitchType":
            getGZOpeatorData(opeatorType, selectionType, '', onSuccessOperatorData);
            break;
        case "GZSelectorSwitchContactConfiguration":
        case "GZSelectorSwitchAccessoryOptions":
        case "GZSelectorSwitchLockoutOptions":
        case "GZSelectorSwitchLockoutPosition":
        case "GZSelectorSwitchNamePlateOptions":
            //Update Lockout Option
            updateLockoutOption();

            //Update Readout String
            getReadoutString();

            //Load Preview Image
            gzLoadPreivewImage();

            //Load Custom Text Box for Nameplate option
            gzLoadCustomText();
            break;
        default:
            //Do Nothing
            break;
    }

    function onSuccessOperatorSubType(data) {
        updateSelection('GZSelectorSwitchSpecifySwitchType', data);
        getGZOpeatorData(opeatorType, 'GZSelectorSwitchSpecifySwitchType', '', onSuccessOperatorData);
    }

    function onSuccessOperatorData(data) {
        updateSelection('GZSelectorSwitchContactConfiguration', data.ContactConfiguration);
        updateSelection('GZSelectorSwitchAccessoryOptions', data.AccessoryOptions);
        updateSelection('GZSelectorSwitchLockoutOptions', data.LockoutOptions);
        updateSelection('GZSelectorSwitchLockoutPosition', data.LockoutPosition);
        updateSelection('GZSelectorSwitchNamePlateOptions', data.NamePlateOptions);

        //Update Lockout Option
        updateLockoutOption();

        //Update Readout String
        getReadoutString();

        //Load Preview Image
        gzLoadPreivewImage();

        //Load Custom Text Box for Nameplate option
        gzLoadCustomText();
    }

    function getReadoutString() {
        var readoutObject = Object.create(gzReadoutModel);
        readoutObject.EXBType = globalEnclosureModel.catalogNo;

        readoutObject.MainOperatorType = 'Selector Switches';
        readoutObject.OperatorType = $('#GZSelectorSwitchSubType option:selected').val();
        readoutObject.InsertColor = $('#GZSelectorSwitchSpecifySwitchType option:selected').val();
        readoutObject.ContactType = $('#GZSelectorSwitchContactConfiguration option:selected').val();
        readoutObject.AccessoryOption = $('#GZSelectorSwitchAccessoryOptions option:selected').val();
        readoutObject.LockoutOption = $('#GZSelectorSwitchLockoutOptions option:selected').val();
        readoutObject.NamePlateOption = $('#GZSelectorSwitchNamePlateOptions option:selected').val();

        ajaxPOST('GetGZReadoutString', { JsonObject: JSON.stringify(readoutObject) },
            function (data) { $('form[type="' + opeatorType + '"] input[name="gzReadoutString"]').val(data); });
    }

    function updateLockoutOption() {
        if (($('#GZSelectorSwitchLockoutOptions option:selected').text() == 'NONE')
            || ($('#GZSelectorSwitchLockoutPosition option').length == 0)) {
            $('#GZSelectorSwitchLockoutPosition').parent().parent().hide();
        } else {
            $('#GZSelectorSwitchLockoutPosition').parent().parent().show();
        }
    }
}

function gzSpecialityOpeatorOnChange(selectionType) {

    var opeatorType = "GZ_SpecialOperators";

    switch (selectionType) {
        case "GZSpecialityOpeatorSubType":
            getGZOpeatorData(opeatorType, selectionType, '', onSuccessOperatorData);
            break;
        case "GZSpecialityOperatorSpecifyResistanceSubType":
        case "GZSpecialityOperatorAccessoryOptions":
        case "GZSpecialityOperatorLockoutOptions":
        case "GZSpecialityOperatorNamePlateOptions":
            //Update Readout String
            getReadoutString();

            //Load Preview Image
            gzLoadPreivewImage();

            //Load Custom Text Box for Nameplate option
            gzLoadCustomText();
            break;
        default:
            //Do Nothing
            break;
    }

    function onSuccessOperatorData(data) {
        //Update Dropdown Options
        updateSelection('GZSpecialityOperatorSpecifyResistanceSubType', data.SpecifyResistanceSubType);
        updateSelection('GZSpecialityOperatorAccessoryOptions', data.AccessoryOptions);
        updateSelection('GZSpecialityOperatorLockoutOptions', data.LockoutOptions);
        updateSelection('GZSpecialityOperatorNamePlateOptions', data.NamePlateOptions);

        //Update Readout String
        getReadoutString();

        //Load Preview Image
        gzLoadPreivewImage();

        //Load Custom Text Box for Nameplate option
        gzLoadCustomText();
    }

    function getReadoutString() {
        var readoutObject = Object.create(gzReadoutModel);
        readoutObject.EXBType = globalEnclosureModel.catalogNo;

        readoutObject.MainOperatorType = 'Speciality Operators';
        readoutObject.OperatorType = $('#GZSpecialityOpeatorSubType option:selected').val();
        readoutObject.ResistanceOption = $('#GZSpecialityOperatorSpecifyResistanceSubType option:selected').val();
        readoutObject.AccessoryOption = $('#GZSpecialityOperatorAccessoryOptions option:selected').val();
        readoutObject.LockoutOption = $('#GZSpecialityOperatorLockoutOptions option:selected').val();
        readoutObject.NamePlateOption = $('#GZSpecialityOperatorNamePlateOptions option:selected').val();

        ajaxPOST('GetGZReadoutString', { JsonObject: JSON.stringify(readoutObject) },
            function (data) { $('form[type="' + opeatorType + '"] input[name="gzReadoutString"]').val(data); });
    }
}

function getGZOpeatorSubTypeData(gzOpeatorType, selectedType, onSuccess) {
    var selectedValue = $('#' + selectedType + ' option:selected').val();
    ajaxPOST("GetGZOpeatorSubTypeData",
        { GZOpeatorType: gzOpeatorType, SelectedType: selectedValue }, onSuccess);
}

function getGZOpeatorData(gzOpeatorType, selectedType, selectedSubType, onSuccess) {
    var selectedSubValue = '';

    var selectedValue = $('#' + selectedType + ' option:selected').val();

    if (selectedSubType != undefined && selectedSubType != null && selectedSubType != '') {
        selectedSubValue = $('#' + selectedSubType + ' option:selected').val();
    }

    ajaxPOST("GetGZOpeatorData",
        { GZOpeatorType: gzOpeatorType, SelectedType: selectedValue, SelectedSubType: selectedSubValue }, onSuccess);
}

//Preivew image update for GZ Operator
function gzLoadPreivewImage() {
    //SubType
    var gzPopupType = $(".actvp [uid=subType]").closest('.actvp').attr('id');

    //SubType value
    var gzPopupSubTypeValue = $(".actvp [uid=subType]").val().replace("/", "_");

    if (gzPopupType == "GZPilotLightsPop") {
        $('.actvp .pre-image img').attr('src', './../Content/images/GZOPERATOR/Pilot Lights_' + gzPopupSubTypeValue + '.jpg');
    }
    else if (gzPopupType == "GZPushbuttonsPop") {
        var gzPopupInsertColor = $(".actvp #GZPushButtonInsertColor").val().replace("/", "_");
        if (gzPopupSubTypeValue == "Maintained Key Release") {
            $('.actvp .pre-image img').attr('src', './../Content/images/GZOPERATOR/Pushbuttons_'
                + gzPopupSubTypeValue + '.jpg');
        }
        else {
            $('.actvp .pre-image img').attr('src', './../Content/images/GZOPERATOR/Pushbuttons_'
                + gzPopupSubTypeValue + '_' + gzPopupInsertColor + '.jpg');
        }
    }
    else if (gzPopupType == "GZSelectorSwitchesPop") {
        var switchTypeValue = $('.actvp #GZSelectorSwitchSpecifySwitchType').val().replace("/", "_");
        $('.actvp .pre-image img').attr('src', './../Content/images/GZOPERATOR/Selector Switches_'
            + gzPopupSubTypeValue + '_' + switchTypeValue + '.jpg');
    }
    else if (gzPopupType == "GZSpecialityOpeatorsPop") {
        $('.actvp .pre-image img').attr('src', './../Content/images/GZOPERATOR/Speciality Operators_'
            + gzPopupSubTypeValue + '.jpg');
    }
    else {
        //Do Nothing
    }
}

//Custom Textbox update
function gzLoadCustomText() {
    var selectedOption = $('.actvp .custom-text-identifier select').val();
    if (selectedOption == 'CUSTOM') {
        $('.actvp .customUpdate_1').removeClass('d-none');
        $('.actvp .customUpdate_1').addClass('d-block');
    }
    else if (selectedOption == 'CUSTOM1   CUSTOM2') {
        $('.actvp .customUpdate_1,.actvp .customUpdate_2').removeClass('d-none');
        $('.actvp .customUpdate_1,.actvp .customUpdate_2').addClass('d-block');
    }
    else if (selectedOption == 'CUSTOM1  CUSTOM2  CUSTOM3') {
        $('.actvp .customUpdate_1,.actvp .customUpdate_2,.actvp .customUpdate_3').removeClass('d-none');
        $('.actvp .customUpdate_1,.actvp .customUpdate_2,.actvp .customUpdate_3').addClass('d-block');
    }
    else if (selectedOption == 'CUSTOM1 CUSTOM2 CUSTOM3 CUSTOM4') {
        $('.actvp .customUpdate_1,.actvp .customUpdate_2,.actvp .customUpdate_3,.actvp .customUpdate_4').removeClass('d-none');
        $('.actvp .customUpdate_1,.actvp .customUpdate_2,.actvp .customUpdate_3,.actvp .customUpdate_4').addClass('d-block');
    }
    else if (selectedOption == 'NONE') {
        $('.actvp .customUpdate_1,.actvp .customUpdate_2,.actvp .customUpdate_3,.actvp .customUpdate_4').addClass('d-none');
    }
    else {
        $('.actvp .customUpdate_1,.actvp .customUpdate_2,.actvp .customUpdate_3,.actvp .customUpdate_4').addClass('d-none');
    }
}


function getGZOperatorSelectionValues(config) {

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
            config.subtype = $('#GZPushButtonSubType:visible option:selected').text();
            config.insertColor = $('#GZPushButtonInsertColor:visible option:selected').text();
            config.contactType = $('#GZPushButtonContactConfiguration:visible option:selected').text();
            config.voltageOption = $('#GZPushButtonSpecifyLEDVoltage:visible option:selected').text();
            config.accessoryOption = $('#GZPushButtonAccessoryOptions:visible option:selected').text();
            config.lockoutOption = $('#GZPushButtonLockoutOptions:visible option:selected').text();
            config.namePlateOption = $('#GZPushButtonNamePlateOptions:visible option:selected').text();
            config.customText1 = $('#GZPushButtonCustomText1:visible').val() == null ? '' : $('#GZPushButtonCustomText1:visible').val();
            config.customText2 = $('#GZPushButtonCustomText2:visible').val() == null ? '' : $('#GZPushButtonCustomText2:visible').val();
            config.customText3 = $('#GZPushButtonCustomText3:visible').val() == null ? '' : $('#GZPushButtonCustomText3:visible').val();
            config.customText4 = $('#GZPushButtonCustomText4:visible').val() == null ? '' : $('#GZPushButtonCustomText4:visible').val();
            break;
        case holeTypeEnum.PILOTLIGHT:
            config.subtype = $('#GZPilotLightSpecifyLensColor:visible option:selected').text();
            config.insertColor = $('#GZPilotLightSpecifyLensColor:visible option:selected').text();
            config.voltageOption = $('#GZPilotLightSpecifyLEDVoltage:visible option:selected').text();
            config.accessoryOption = $('#GZPilotLightAccessoryOptions:visible option:selected').text();
            config.lockoutOption = $('#GZPilotLightLockoutOptions:visible option:selected').text();
            config.namePlateOption = $('#GZPilotLightNamePlateOptions:visible option:selected').text();
            config.customText1 = $('#GZPilotLightCustomText1:visible').val() == null ? '' : $('#GZPilotLightCustomText1:visible').val();
            config.customText2 = $('#GZPilotLightCustomText2:visible').val() == null ? '' : $('#GZPilotLightCustomText2:visible').val();
            config.customText3 = $('#GZPilotLightCustomText3:visible').val() == null ? '' : $('#GZPilotLightCustomText3:visible').val();
            config.customText4 = $('#GZPilotLightCustomText4:visible').val() == null ? '' : $('#GZPilotLightCustomText4:visible').val();
            break;
        case holeTypeEnum.SELECTORSWITCH:
            config.subtype = $('#GZSelectorSwitchSubType:visible option:selected').text();
            config.insertColor = $('#GZSelectorSwitchSpecifySwitchType:visible option:selected').text();
            config.contactType = $('#GZSelectorSwitchContactConfiguration:visible option:selected').text();
            config.accessoryOption = $('#GZSelectorSwitchAccessoryOptions:visible option:selected').text();
            config.lockoutOption = $('#GZSelectorSwitchLockoutOptions:visible option:selected').text();
            config.lockoutPosition = $('#GZSelectorSwitchLockoutPosition:visible option:selected').text();
            config.namePlateOption = $('#GZSelectorSwitchNamePlateOptions:visible option:selected').text();
            config.customText1 = $('#GZSelectorSwitchCustomText1:visible').val() == null ? '' : $('#GZSelectorSwitchCustomText1:visible').val();
            config.customText2 = $('#GZSelectorSwitchCustomText2:visible').val() == null ? '' : $('#GZSelectorSwitchCustomText2:visible').val();
            config.customText3 = $('#GZSelectorSwitchCustomText3:visible').val() == null ? '' : $('#GZSelectorSwitchCustomText3:visible').val();
            config.customText4 = $('#GZSelectorSwitchCustomText4:visible').val() == null ? '' : $('#GZSelectorSwitchCustomText4:visible').val();
            break;
        case holeTypeEnum.SPECIALITYOPERATOR:
            config.subtype = $('#GZSpecialityOpeatorSubType:visible option:selected').text();
            config.ResistanceOption = $('#GZSpecialityOperatorSpecifyResistanceSubType:visible option:selected').text();
            config.AccessoryOption = $('#GZSpecialityOperatorAccessoryOptions:visible option:selected').text();
            config.LockoutOption = $('#GZSpecialityOperatorLockoutOptions:visible option:selected').text();
            config.NamePlateOption = $('#GZSpecialityOperatorNamePlateOptions:visible option:selected').text();
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