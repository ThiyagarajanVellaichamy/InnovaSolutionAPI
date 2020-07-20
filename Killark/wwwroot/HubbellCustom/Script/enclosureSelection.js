$(document).ready(function () {  

    globalEnclosureModel = Object.create(enclosureSelectionModel);

    //Disable Mounting Pan by default
    $('input[name="mountingPanel"][value="No"]').parent().trigger('click');

    //Sort by checkbox event
    $('input[name="sortBy"]').change(function () {
        if ($(this).is(':checked')) {
            //Enable Operators dropdown
            $('#operatorsCount').prop('disabled', false);             
            $('#operatorsCount').removeClass('disabled-grey');       
            $('#operatorsCount').css({ 'background-color': '#199C66', 'color': '#fff' });

            operatorsCountOnChange();
        } else {
            //Enable Operators dropdown
            $('#operatorsCount').prop('disabled', true);
            $('#operatorsCount').addClass('disabled-grey');
            $('#operatorsCount').removeAttr('style');

            enclosureTypeOnChange();            
        }
    });

    $('input[type=radio][name=internalGroundingKit]').change(function () {
        globalEnclosureModel.selectedInternalGroundingKit = this.value;
        if (this.value == 'Yes') {
            $('.internal-grounding-value').show();
        }
        else if (this.value == 'No') {            
            $('.internal-grounding-value').hide();
        }
    });

    $('input[type=radio][name=externalGroundingKit]').change(function () {
        globalEnclosureModel.selectedExternalGroundingKit = this.value;
        if (this.value == 'Yes') {
            $('.external-grounding-value').show();
            globalEnclosureModel.selectedBackPanel = 'Yes';
        }
        else if (this.value == 'No') {
            $('.external-grounding-value').hide();
            globalEnclosureModel.selectedBackPanel = 'No';
        }
    });

    $('input[type=radio][name=mountingPanel]').change(function () {
        if (this.value == 'Yes') {
            $('.emounting-value').show();
            globalEnclosureModel.selectedBackPanel = 'Yes';
        }
        else if (this.value == 'No') {
            $('.emounting-value').hide();
            globalEnclosureModel.selectedBackPanel = 'No';
        }
    });

    $('input[type=radio][name=hingeOption]').change(function () {
        if (this.value == 'Yes') {
            $('#hingeOrientation').parent().removeClass('disabled-ctrl');
            globalEnclosureModel.selectedHingeOption = "Yes";
        }
        else if (this.value == 'No') {
            $('#hingeOrientation').parent().addClass('disabled-ctrl');
            globalEnclosureModel.selectedHingeOption = "No";
        }

        loadEnclosureImage();
    });

    enclosureTypeOnChange();

    operatorCountUpdate();

});

function loadSVGContent() {
    Initialize($("#enclosureDimension option:selected").attr('id'), $("#enclosureType").val());

    var selectedHinge = $("#hingeOrientation option:selected").text();
    var hingeOption = '';
    if (selectedHinge == "Top" || selectedHinge == "Bottom") {
        hingeOption = '-90'
    }

    loadSVG($("#enclosureType").val()
        + $("#enclosureDimension option:selected").attr('id').replace(/x/g, '') + hingeOption + '.svg'); 
}

//Enclosure image change if hing option selected
function loadEnclosureImage() {
    var catalog = $('#enclosureDimension option:selected').text().replace(' N34', '');
    var enclosureType = $('#enclosureType option:selected').val();
    if ($('input[name="hingeOption"][value="Yes"]').parent().hasClass('active')) {       
        var hingDirection = $('#hingeOrientation option:selected').text().toUpperCase();
        $('.enclosureImagePos .img_section img').attr('src', './../Content/images/' +
            enclosureType + '/' + catalog + '-' + hingDirection + ' SIDE' + '.jpg');
    }
    else {  
        $('.enclosureImagePos .img_section img').attr('src', './../Content/images/' + enclosureType + '/NOHINGE/' + catalog + '.jpg');
    }

    //Update on result page
    var EnclosureUpdatedImg = $('.enclosureImage').attr("src");
    $('.enclosureImage.enclosureImage_result_img').attr("src", EnclosureUpdatedImg);
}

function enclosureDimensionOnChange() { 

    ajaxPOST("GetEnclosureDimensionData", { catalogNumber: $('#enclosureDimension option:selected').text() },
        onSuccess, null);

    function onSuccess(data) {
        //Store values for global scope
        //To do
        globalEnclosureModel.enclosureType = data.EnclosureType;
        globalEnclosureModel.dimension = data.Dimension;
        globalEnclosureModel.catalogNo = data.CatalogNumber;
        globalEnclosureModel.internalDimension = data.InternalDimension;
        globalEnclosureModel.externalDimension = data.ExternalDimension;
        globalEnclosureModel.maxOperatorCount = data.OperatorsCount;
        globalEnclosureModel.maxSize = data.MaxSize;
        globalEnclosureModel.weightLBS = data.WeightLBS;
        globalEnclosureModel.internalGroundingKit = data.InternalGroundingKit;
        globalEnclosureModel.externalGroundingKit = data.ExternalGroundingKit;
        globalEnclosureModel.boltOption = data.BoltOption;
        globalEnclosureModel.hingeOption = data.HingeOption;
        globalEnclosureModel.backPanelNumber = data.MountingPanNumber;
        globalEnclosureModel.lengthDesignator = data.LengthDesignator;

        //Hinge Option
        if (globalEnclosureModel.hingeOption == 'Yes') {
            $('input[name="hingeOption"][value="No"]').parent().parent().addClass('disabled-ctrl');
            $('input[name="hingeOption"][value="Yes"]').parent().trigger('click');
        }
        else {
            $('input[name="hingeOption"][value="No"]').parent().parent().removeClass('disabled-ctrl');
            $('input[name="hingeOption"][value="No"]').parent().trigger('click');
        }

        $("#iDimension").val(globalEnclosureModel.internalDimension);
        $("#eDimension").val(globalEnclosureModel.externalDimension);
        $("#maxSize").val(globalEnclosureModel.maxSize);
        $("#weightLBS").val(globalEnclosureModel.weightLBS);
        if (!$('input[name="sortBy"]').is(':checked')) {
            $('#operatorsCount').val(globalEnclosureModel.maxOperatorCount);
        }
        $('.internal_value').html(globalEnclosureModel.internalGroundingKit);
        $('.exrenal_value').html(globalEnclosureModel.externalGroundingKit);
        $('.mount_value').html(globalEnclosureModel.backPanelNumber);
        if ($('input[name="mountingPanel"][value="Yes"]').parent().hasClass('active')) {
            globalEnclosureModel.selectedBackPanel = "Yes";
        }
        else {
            globalEnclosureModel.selectedBackPanel = "No";
        }

        hingeOrientationOnChange();
        certificationTypeOnChange();
        boltOptionOnChange();
        finishTypeOnChange();
    }
}

function enclosureTypeOnChange() {
    eTpyeChange();
    var htmlTag = "#enclosureDimension";

    ajaxPOST("GetEnclosureDimension", { enclosureType: $('#enclosureType option:selected').val() },
        onSuccess, null);

    function onSuccess(data) {
        $(htmlTag).find('option').remove().end();
        var options;
        if (data.length != 0) {
            for (var items = 0; items < data.length; items++) {
                options += '<option id="' + data[items].Dimension + '">'
                    + data[items].CatalogNumber + '</option>';
            }
        }
        $(htmlTag).append(options);

        enclosureDimensionOnChange();
    }
}

function operatorsCountOnChange() {    
    var count = $('#operatorsCount option:selected').text();
    var htmlTag = "#enclosureDimension";

    ajaxPOST("GetDimensionFromOperatos", { operatorsCount: count, enclosureType: $('#enclosureType option:selected').val() },
        onSuccess, null);

    function onSuccess(data) {
        $(htmlTag).find('option').remove().end();
        var options;
        if (data.length != 0) {
            for (var items = 0; items < data.length; items++) {
                options += '<option id="' + data[items].Dimension + '">'
                    + data[items].CatalogNumber + '</option>';
            }
        }

        $(htmlTag).append(options);

        enclosureDimensionOnChange();
    }
}

function hingeOrientationOnChange() {
    globalEnclosureModel.selectedHingeOrientation = $('#hingeOrientation option:selected').text();
    loadEnclosureImage();
}

function certificationTypeOnChange() {
    var selectedCertType = $('#certificatetype option:selected').text();
    $('#bolttype').find('option').remove().end();
    var options = '';
    if (selectedCertType == 'NEC') {  
        if (globalEnclosureModel.boltOption.includes('N4TL')) {
            options = '<option>N4TL = (NEC-UL/CSA Type 4) with Tri-lead Stainless Steel External Hardware</option>';
        }
        else {
            //Do Nothing
        }

        if (globalEnclosureModel.boltOption.includes('N4x')) {
            options = '<option>N4x = (NEC-UL/CSA Type 4X) with Stainless Steel External Hardware</option>' + options;
        }
        else {
            //Do Nothing
        }

        options = '<option>N4 = (NEC-UL/CSA Type 4) with Steel External Hardware</option>' + options; 

        //Enable No Option
        $('input[name="internalGroundingKit"][value="No"]').parent().parent().removeClass('disabled-ctrl');
        $('input[name="externalGroundingKit"][value="No"]').parent().parent().removeClass('disabled-ctrl');

        //Make No as default selection
        $('input[name="internalGroundingKit"][value="No"]').parent().trigger('click');
        $('input[name="externalGroundingKit"][value="No"]').parent().trigger('click');

    }
    else if (selectedCertType == 'NEC/ATEX/IECEx') {
        options = '<option>N4CEN = (IEC&NEC – ATEX/UL/CSA Type 4X) with Steel External Hardware</option>';

        //Make Yes as default selection
        $('input[name="internalGroundingKit"][value="Yes"]').parent().trigger('click');
        $('input[name="externalGroundingKit"][value="Yes"]').parent().trigger('click');

        //Disable No option
        $('input[name="internalGroundingKit"][value="No"]').parent().parent().addClass('disabled-ctrl');
        $('input[name="externalGroundingKit"][value="No"]').parent().parent().addClass('disabled-ctrl');
    }
    else {
        //Do Nothing
    }
    $('#bolttype').append(options);

    boltOptionOnChange();
}

function boltOptionOnChange() {
    globalEnclosureModel.selectedBoltOption = $('#bolttype option:selected').text();
}

function finishTypeOnChange() {
    globalEnclosureModel.selectedFinishType = $('#finishdropdown option:selected').text();
}


function eTpyeChange() {
    var eType = $('#enclosureType').val();
    if (eType == 'EXBLTC' || eType == 'EXB') {
        $('.showMessage').addClass('d-none');
    }
    else {
        $('.showMessage').removeClass('d-none');
    }
}

//opreator count update
function operatorCountUpdate() {
    var i;
    for (i = 5; i <= 91; i++) {
        $('#operatorsCount').append($('<option>',
            {
                value: i,
                text: i
            }));
    }
}



