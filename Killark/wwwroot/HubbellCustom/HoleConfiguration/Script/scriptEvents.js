$(document).ready(function () {
    //Plot Button events
    $('a[type=plot]').click(function () {
        var count = $(this).parent().parent().find('.noOfHole_1').val();
        var masterType = holeMasterTypeEnum.GOOPERATOR;
        var holeType = holeTypeEnum.BLANKHOLE;
        if (count) {
            //Master Type
            switch ($(this).parent().parent().attr('type')) {
                case 'GO_PushButtons':
                case 'GO_PilotLights':
                case 'GO_SelectorSwitches':
                case 'GO_SpecialOperators':
                case 'GO_Blank':
                    masterType = holeMasterTypeEnum.GOOPERATOR;
                    break;
                case 'GZ_PushButtons':
                case 'GZ_PilotLights':
                case 'GZ_SelectorSwitches':
                case 'GZ_SpecialityOperators':
                    masterType = holeMasterTypeEnum.GZOPERATOR;
                    break;
                case 'RectangularWindowOption':
                case 'CircularWindowOption':
                    masterType = holeMasterTypeEnum.WINDOWOPTION;
                    break;
                case 'ANSI':
                    masterType = holeMasterTypeEnum.ANSI;
                    break;
                case 'Metric':
                    masterType = holeMasterTypeEnum.METRIC;
                    break;
                default:
                    //Do Nothing
                    return;
            }

            //Operator Type
            switch ($(this).attr('name')) {
                case 'pushButton':
                    holeType = holeTypeEnum.PUSHBUTTON;
                    break;
                case 'pilotLight':
                    holeType = holeTypeEnum.PILOTLIGHT;
                    break;
                case 'selectorSwitches':
                    holeType = holeTypeEnum.SELECTORSWITCH;
                    break;
                case 'specialityOperator':
                    holeType = holeTypeEnum.SPECIALITYOPERATOR;
                    break;
                case 'blankOperator':
                    holeType = holeTypeEnum.BLANKHOLE;
                    break;
                case 'rectangular':
                    holeType = holeTypeEnum.RECTANGULAR;
                    break;
                case 'circular':
                    holeType = holeTypeEnum.CIRCULAR;
                    break;
                case 'ansiHole':
                    holeType = holeTypeEnum.ANSI;
                    break;
                case 'metricHole':
                    holeType = holeTypeEnum.METRIC;
                    break;
                default:
                    //Do Nothing
                    return;
            }

            plot(count, masterType, holeType);
        }
        else {
            showPopup('Please enter a valid entry!!!');
        }
    });

    //Reset button Event
    $("button[name='resetBtn']").click(function () {
        loadSVG(loadedFilename, true);
    });

    //Grid Check box change event
    $('input[name="gridOption"]').change(function () {
        if ($(this).is(':checked')) {
            var spacing = $('select[name="gridSpacing"] option:selected').val();
            drawGrid(getGridSpacing(spacing));
        } else {
            removeGrid();
        }
    });

    //Grid Spacing Selection dropdown change event
    $('select[name="gridSpacing"]').change(function () {
        var spacing = $(this).children("option:selected").val();
        if ($('input[name="gridOption"]').is(':checked')) {
            drawGrid(getGridSpacing(spacing));
        }
    });

    $(".alignment_opt_label").next().css({ "opacity": "0.2", "pointer-events": "none" });

    //Alignment Option checkbox change event
    $('input[name="alignmentOption"]').change(function () {
        if ($(this).is(':checked')) {
            displayMessage('Please select a Primary Operator for Alignment');
            $(".alignment_opt_label").next().css({ "opacity": "1", "pointer-events": "initial" });
            startAlignment();
        } else {
            endAlignment();
            $(".alignment_opt_label").next().css({ "opacity": "0.2", "pointer-events": "none" });
        }
    });

    //Alignment Vertical button click
    $("button[name='alignmentVertical']").click(function () {
        if ($('input[name="alignmentOption"]').is(':checked')) {
            startSelection(alignmentOptionEnum.VERTICAL);
        } else {
            //Do nothing
        }
    });

    //Alignment Horizontal button click
    $("button[name='alignmentHorizontal']").click(function () {
        if ($('input[name="alignmentOption"]').is(':checked')) {
            startSelection(alignmentOptionEnum.HORIZONTAL);
        } else {
            //Do nothing
        }
    });
});

var selectedConfiguration = null;

var selectedElement = null;

var tempInput;

function createClickEvent(element) {
    $(element.node).on('mousedown', function () {
        selectedConfiguration = getConfigurationObject($(this).attr('id'));
        selectedElement = $(this);
        updateSelectElement($(this).attr('id'));
        if (gridEnabled) {
            updateInitialPoint($(this));
        }
    });
}

function deleteRow(obj) {
    var objectID = $(obj).parent().parent().parent().parent().attr('objID');
    removeHoles(objectID);

    //Remove from configugration page and result page
    //$(obj).parent().parent().parent().parent().remove();

    $('tr[objID=' + objectID + ']').remove();
}

function addHoleData(configuration) {
    $('#xyTable tbody').append('<tr objID="' + configuration.objectID
        + '"><td><div class="row box3Row"><div class="col-xs-2 box3RowIndexCol">'
        + configuration.displayID + '</div><div class="col-xs-5 box3RowCellCol"><div class="box3RowCellCatlog">'
        + configuration.hsize + '</div><div class="box3RowCellXCoord"> X : '
        + '<input class="xyInput" type="number" name="xValue" step="0.01"'
        + 'onkeyup="updateElement(this)" onblur="endEdit(this)" onfocus="beginEdit(this)" value="">'
        + '</div></div><div class="col-xs-5 box3RowCellCol"><div class="box3RowCellAcc">'
        + configuration.catalogNo + '</div><div class="box3RowCellYCoord"> Y : '
        + '<input class="xyInput" type="number" name="yValue" step="0.01"'
        + 'onkeyup="updateElement(this)" onblur="endEdit(this)" onfocus="beginEdit(this)" value="">'
        + '</div></div><div class="col-xs-1 box3RowCellDelete"><button type="button" class="btn tb-del" onclick="deleteRow(this)">'
        + '<img class="tb-del-wht" src="./../Content/images/delete-wht.svg" title="Delete" alt="Delete"></button></div></div>'
        + '</td></tr>');

    $('#summaryTable tbody').append('<tr objID="' + configuration.objectID
        + '"><td>' + configuration.displayNumber
        + '</td><td>' + configuration.view
        + '</td><td>' + configuration.displayID
        + '</td><td>' + configuration.type
        + '</td><td>' + configuration.subtype
        + '</td><td>' + configuration.hsize
        + '</td><td>' + configuration.catalogNo
        + '</td><td><input class="xyInputResult" name="xValue" value="" readonly>'
        + '</td><td><input class="xyInputResult" name="yValue" value="" readonly>'
        + '</td></tr>');   

    updateCoordinates(configuration.objectID);

    updateSelectElement(configuration.objectID);
}

function assignValues(point, objectID) {
    var configuration = getConfigurationObject(objectID);

    //For SAT.js object
    configuration.groupElement.dataElement.pos.x = parseFloat(point.x);
    configuration.groupElement.dataElement.pos.y = parseFloat(point.y);

    if (configuration.type == holeTypeEnum.RECTANGULAR) {
        //For Hole/Operator Recreation for database
        configuration.xPoint = parseFloat(point.x)
            + (InchToPixel(configuration.sizeConfiguration.outerWidthInch) / 2);
        configuration.yPoint = parseFloat(point.y)
            + (InchToPixel(configuration.sizeConfiguration.outerHeightInch) / 2);
    }
    else {
        configuration.xPoint = point.x; configuration.yPoint = point.y;
    }

    var pointInInches = getPointInInch(configuration.xPoint, configuration.yPoint, objectID);

    //For Render
    configuration.xInches = pointInInches.x;
    configuration.yInches = pointInInches.y;

    //Update Result Table
    $('tr[objID="' + objectID + '"] input[class="xyInputResult"][name="xValue"]').val(pointInInches.x);
    $('tr[objID="' + objectID + '"] input[class="xyInputResult"][name="yValue"]').val(pointInInches.y);
    //updateCoordinates(objectID);
}

function updateCoordinates(objectID) {
    var x, y;
    var configuration = getConfigurationObject(objectID);

    if (configuration.type == holeTypeEnum.RECTANGULAR) {
        $('g[id="' + objectID + '"]').children().each(function () {
            if ($(this).attr('name').includes('outer')) {
                x = $(this)[0].x.baseVal.value;
                y = $(this)[0].y.baseVal.value;
            }
        });

        configuration.xPoint = x + (InchToPixel(configuration.sizeConfiguration.outerWidthInch) / 2);
        configuration.yPoint = y + (InchToPixel(configuration.sizeConfiguration.outerHeightInch) / 2);
    }
    else {
        $('g[id="' + objectID + '"]').children().each(function () {
            if ($(this).attr('name').includes('outer')) {
                x = $(this)[0].cx.baseVal.value;
                y = $(this)[0].cy.baseVal.value;
            }
        });

        configuration.xPoint = x; configuration.yPoint = y;
    }

    var pointInInches = getPointInInch(configuration.xPoint, configuration.yPoint, objectID);

    configuration.xInches = pointInInches.x;
    configuration.yInches = pointInInches.y;

    $('tr[objID="' + objectID + '"] input[name="xValue"]').val(pointInInches.x);
    $('tr[objID="' + objectID + '"] input[name="yValue"]').val(pointInInches.y);
}

function beginEdit(element) {
    tempInput = $(element).val();
}

function endEdit(element) {
    var objectID = $(element).parent().parent().parent().parent().parent().attr('objID');
    var config = getConfigurationObject(objectID);
    if ($(element).hasClass('xyInputFailed')) {
        if ($(element).attr('name') == 'xValue') {
            var point = getPointInPixel(tempInput, null, objectID);
            if (config.type == holeTypeEnum.RECTANGULAR) {
                point.x = point.x - (InchToPixel(config.sizeConfiguration.outerWidthInch) / 2);
            }
            moveElement(point.x, null, objectID);
        }
        else if ($(element).attr('name') == 'yValue') {
            var point = getPointInPixel(null, tempInput, objectID);
            if (config.type == holeTypeEnum.RECTANGULAR) {
                point.y = point.y - (InchToPixel(config.sizeConfiguration.outerHeightInch) / 2);
            }
            moveElement(null, point.y, objectID);            
        }
        else {
            //Do nothing
        }
        $(element).val(tempInput);
        $(element).removeClass('xyInputFailed');
    }
}

function updateElement(element) {
    var objectID = $(element).parent().parent().parent().parent().parent().attr('objID');
    var config = getConfigurationObject(objectID);
    var point = { x: NaN, y: NaN };

    //Get Points from user field
    if ($(element).attr('name') == 'xValue') {
        point = getPointInPixel($(element).val(),
            $('tr[objID="' + objectID + '"] input[name="yValue"]').val(), objectID);
    }
    else if ($(element).attr('name') == 'yValue') {
        point = getPointInPixel($('tr[objID="' + objectID + '"] input[name="xValue"]').val(),
            $(element).val(), objectID);
    }
    else {
        //Do nothing
    }

    //if Rectangular Convert the User Points to SAT Points
    if (config.type == holeTypeEnum.RECTANGULAR) {
        point.x = point.x - (InchToPixel(config.sizeConfiguration.outerWidthInch) / 2);
        point.y = point.y - (InchToPixel(config.sizeConfiguration.outerHeightInch) / 2);
    }

    if (!($(element).val() == "") && validatePosition(point.x, point.y, config)) {
        moveElement(point.x, point.y, objectID);
        $(element).removeClass('xyInputFailed');
    }
    else {
        $(element).addClass('xyInputFailed');
    }
}

function moveElement(x, y, objectID) {
    var config = getConfigurationObject(objectID);
    $('g[id*=' + config.view + ']:visible g[id="' + objectID + '"]')
        .children().each(function () {
            if ($(this)[0].tagName == "circle") {
                if (x != null) {
                    $(this).attr('cx', x);
                }
                if (y != null) {
                    $(this).attr('cy', y);
                }
                assignValues({ x: $(this).attr('cx'), y: $(this).attr('cy') }, objectID);
            }
            else if ($(this)[0].tagName == "text" || $(this)[0].tagName == "rect") {
                if (config.type == holeTypeEnum.RECTANGULAR) {
                    if ($(this).attr('name').includes('text')) {
                        if (x != null) {
                            $(this).attr('x', x
                                + (InchToPixel(config.sizeConfiguration.outerWidthInch) / 2));
                        }
                        if (y != null) {
                            $(this).attr('y', y
                                + (InchToPixel(config.sizeConfiguration.outerHeightInch) / 2));
                        }
                    }
                    else if ($(this).attr('name').includes('inner')) {
                        if (x != null) {
                            $(this).attr('x', x
                                + (InchToPixel(config.sizeConfiguration.outerWidthInch) / 2)
                                - (InchToPixel(config.sizeConfiguration.widthInch) / 2));
                        }
                        if (y != null) {
                            $(this).attr('y', y
                                + (InchToPixel(config.sizeConfiguration.outerHeightInch) / 2)
                                - (InchToPixel(config.sizeConfiguration.heightInch) / 2));
                        }
                    }
                    else {
                        if (x != null) {
                            $(this).attr('x', x);
                        }
                        if (y != null) {
                            $(this).attr('y', y);
                        }

                        assignValues({ x: $(this).attr('x'), y: $(this).attr('y') }, objectID);
                    }
                }
                else {
                    if (x != null) {
                        $(this).attr('x', x);
                    }
                    if (y != null) {
                        $(this).attr('y', y);
                    }
                }
            }
            else {
                //Do Nothing
            }
        });    
}

function updateSelectElement(objectID) {
    //$('#xyTable tbody tr').each(function () {
    //    $(this).removeClass('actrow');
    //});

    $('tr[objID="' + objectID + '"]').addClass('actrow');
}

function clear() {
    //Remove all the table data
    $('#xyTable > tbody').empty();

    //Remove all the table data in result page
    $('#summaryTable > tbody').empty();

    //Revert Grid Option
    $('input[name="gridOption"]').prop('checked', false);
    $('input[name="gridOption"]').trigger('change');
}