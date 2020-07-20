//Alignment Option
var alignmentOptionEnum = Object.freeze({
    VERTICAL: "Vertical", HORIZONTAL: "Horizontal",
});

//Selected Alignment Option
var alignmentOption = null;

//Selected Primary Operator
var primaryOperator = null;

//Drag region elements
var coverDragRegion = null;
var topDragRegion = null;
var bottomDragRegion = null;
var leftDragRegion = null;
var rightDragRegion = null;

//Selected Elements
var selectedElements = [];

function startAlignment() {
    //Make selection array empty
    selectedElements = [];

    //Reset values
    alignmentOption = null;
    primaryOperator = null;

    //Reset drag regions
    coverDragRegion = null;
    topDragRegion = null;
    bottomDragRegion = null;
    leftDragRegion = null;
    rightDragRegion = null;

    //Assign Primary Operator
    $('circle[name="outerCircle"]').each(function () {
        $(this).click(function () {            
            //Remove all the other selection
            $('circle[name="outerCircle"]').each(function () {
                $(this).removeClass('primaryOperator');
            });
            primaryOperator = $(this);
            $(this).addClass('primaryOperator');

            $('span[name="primaryOperatorDisplay"]').html('Selected Primary Hole/Operator: '
                + getConfigurationObject($(this).parent().attr('id')).displayID);
        });
    });
}

function dragSelect() {
    var mouseX, mouseY;

    //#region Cover
    //Create the buffer Element
    var svgCoverElement = Snap.select(getQuerySelector(holeViewEnum.COVER));
    var coverBoundary = getBoundary(holeViewEnum.COVER);
    //make an object in the background on which to attach drag events
    coverDragRegion = svgCoverElement.rect(coverBoundary.x, coverBoundary.y, coverBoundary.width, coverBoundary.height);
    coverDragRegion.attr({
        fill: "transparent",
        id: "coverDragRegion",
        name: "coverDrag"
    });

    $(coverDragRegion.node).mousemove(function (event) {
        var offset = $(this).offset();
        mouseX = event.pageX - offset.left;
        mouseY = event.pageY - offset.top;
    });
    //#endregion

    //#region Top
    //Create the buffer Element
    var svgTopElement = Snap.select(getQuerySelector(holeViewEnum.TOP));
    var topBoundary = getBoundary(holeViewEnum.TOP);
    //make an object in the background on which to attach drag events
    topDragRegion = svgTopElement.rect(topBoundary.x, topBoundary.y, topBoundary.width, topBoundary.height);
    topDragRegion.attr({
        fill: "transparent",
        id: "topDragRegion",
        name: "topDrag"
    });

    $(topDragRegion.node).mousemove(function (event) {
        var offset = $(this).offset();
        mouseX = event.pageX - offset.left;
        mouseY = event.pageY - offset.top;
    });
    //#endregion

    //#region Bottom
    //Create the buffer Element
    var svgBottomElement = Snap.select(getQuerySelector(holeViewEnum.BOTTOM));
    var bottomBoundary = getBoundary(holeViewEnum.BOTTOM);
    //make an object in the background on which to attach drag events
    bottomDragRegion = svgBottomElement.rect(bottomBoundary.x, bottomBoundary.y, bottomBoundary.width, bottomBoundary.height);
    bottomDragRegion.attr({
        fill: "transparent",
        id: "bottomDragRegion",
        name: "bottomDrag"
    });

    $(bottomDragRegion.node).mousemove(function (event) {
        var offset = $(this).offset();
        mouseX = event.pageX - offset.left;
        mouseY = event.pageY - offset.top;
    });
    //#endregion

    //#region Left
    //Create the buffer Element
    var svgLeftElement = Snap.select(getQuerySelector(holeViewEnum.LEFT));
    var leftBoundary = getBoundary(holeViewEnum.LEFT);
    //make an object in the background on which to attach drag events
    leftDragRegion = svgLeftElement.rect(leftBoundary.x, leftBoundary.y, leftBoundary.width, leftBoundary.height);
    leftDragRegion.attr({
        fill: "transparent",
        id: "leftDragRegion",
        name: "leftDrag"
    });

    $(leftDragRegion.node).mousemove(function (event) {
        var offset = $(this).offset();
        mouseX = event.pageX - offset.left;
        mouseY = event.pageY - offset.top;
    });
    //#endregion

    //#region Right
    //Create the buffer Element
    var svgRightElement = Snap.select(getQuerySelector(holeViewEnum.RIGHT));
    var rightBoundary = getBoundary(holeViewEnum.RIGHT);
    //make an object in the background on which to attach drag events
    rightDragRegion = svgRightElement.rect(rightBoundary.x, rightBoundary.y, rightBoundary.width, rightBoundary.height);
    rightDragRegion.attr({
        fill: "transparent",
        id: "rightDragRegion",
        name: "rightDrag"
    });

    $(rightDragRegion.node).mousemove(function (event) {
        var offset = $(this).offset();
        mouseX = event.pageX - offset.left;
        mouseY = event.pageY - offset.top;
    });
    //#endregion

    var selectionBox;

    //DRAG FUNCTIONS
    //when mouse goes down over background, start drawing selection box
    function dragstart(x, y, event) {
        //Toggle zpd
        if (SnapObject != null) {
            SnapObject.zpd('toggle');
        }

        if (event.path[0].getAttribute('name').includes('cover')) {
            var foundx = coverBoundary.x + (($(event.path[0]).width() * mouseX)
                / $(event.path[0])[0].getBoundingClientRect().width);
            var foundy = coverBoundary.y + (($(event.path[0]).height() * mouseY)
                / $(event.path[0])[0].getBoundingClientRect().height);
            selectionBox = svgCoverElement.rect(foundx, foundy, 0, 0).attr("stroke", "#9999FF");
        }
        else if (event.path[0].getAttribute('name').includes('top')) {
            var foundx = topBoundary.x + (($(event.path[0]).width() * mouseX)
                / $(event.path[0])[0].getBoundingClientRect().width);
            var foundy = topBoundary.y + (($(event.path[0]).height() * mouseY)
                / $(event.path[0])[0].getBoundingClientRect().height);
            selectionBox = svgTopElement.rect(foundx, foundy, 0, 0).attr("stroke", "#9999FF");
        }
        else if (event.path[0].getAttribute('name').includes('bottom')) {
            var foundx = bottomBoundary.x + (($(event.path[0]).width() * mouseX)
                / $(event.path[0])[0].getBoundingClientRect().width);
            var foundy = bottomBoundary.y + (($(event.path[0]).height() * mouseY)
                / $(event.path[0])[0].getBoundingClientRect().height);
            selectionBox = svgBottomElement.rect(foundx, foundy, 0, 0).attr("stroke", "#9999FF");
        }
        else if (event.path[0].getAttribute('name').includes('left')) {
            var foundx = leftBoundary.x + (($(event.path[0]).width() * mouseX)
                / $(event.path[0])[0].getBoundingClientRect().width);
            var foundy = leftBoundary.y + (($(event.path[0]).height() * mouseY)
                / $(event.path[0])[0].getBoundingClientRect().height);
            selectionBox = svgLeftElement.rect(foundx, foundy, 0, 0).attr("stroke", "#9999FF");
        }
        else if (event.path[0].getAttribute('name').includes('right')) {
            var foundx = rightBoundary.x + (($(event.path[0]).width() * mouseX)
                / $(event.path[0])[0].getBoundingClientRect().width);
            var foundy = rightBoundary.y + (($(event.path[0]).height() * mouseY)
                / $(event.path[0])[0].getBoundingClientRect().height);
            selectionBox = svgRightElement.rect(foundx, foundy, 0, 0).attr("stroke", "#9999FF");
        }
        else {
            selectionBox = null;
        }
    }

    //when mouse moves during drag, adjust box. If to left or above original point, 
    //you have to translate the whole box and invert the dx or dy values 
    //since.rect() doesn't take negative width or height
    function dragmove(dx, dy, x, y, event) {
        var xoffset = 0,
            yoffset = 0;

        if (dx < 0) {
            xoffset = dx;
            dx = -1 * dx;
        }

        if (dy < 0) {
            yoffset = dy;
            dy = -1 * dy;
        }

        selectionBox.transform("T" + xoffset + "," + yoffset);
        selectionBox.attr("width", dx);
        selectionBox.attr("height", dy);
        selectionBox.attr("fill", "none");

        //get the bounds of the selections
        var dragRegionbounds = selectionBox.getBBox();       

        $('circle[name="outerCircle"]').each(function () {
            if ($(this).attr('id') != $(primaryOperator).attr('id')) {
                var circle = {
                    x: parseFloat($(this).attr('cx')),
                    y: parseFloat($(this).attr('cy')),
                    radius: parseFloat($(this).attr('r')),
                }

                if (verifyCircleRectIntersection(circle, dragRegionbounds)) {
                    $(this).addClass('alignmentSelected');
                }
                else {
                    $(this).removeClass('alignmentSelected');
                }
            }
            else {
                //Do nothing
            }
        });
    }

    function dragend(event) {
        //Toggle zpd
        if (SnapObject != null) {
            SnapObject.zpd('toggle');
        }

        $('.alignmentSelected').each(function () {
            selectedElements.push($(this));
        });

        selectionBox.remove();

        resetColor();

        align();
    }

    coverDragRegion.drag(dragmove, dragstart, dragend);
    topDragRegion.drag(dragmove, dragstart, dragend);
    bottomDragRegion.drag(dragmove, dragstart, dragend);
    leftDragRegion.drag(dragmove, dragstart, dragend);
    rightDragRegion.drag(dragmove, dragstart, dragend);
}

function resetColor() {
    $('circle[name="outerCircle"]').each(function () {
        $(this).removeClass('alignmentSelected');
    });
}

function startSelection(option) {
    if (primaryOperator == null) {
        displayMessage('Please select a primary operator');
        return;
    }

    alignmentOption = option;

    displayMessage('Please drag and select the alignment operators');

    //Remove the click event for the outercircle
    $('circle[name="outerCircle"]').each(function () {
        $(this).unbind('click');
    });

    //toggle alignment buttons
    if (option == alignmentOptionEnum.HORIZONTAL) {
        $("button[name='alignmentVertical']").removeClass('btnSelected');
        $("button[name='alignmentHorizontal']").addClass('btnSelected');
    }
    else if (option == alignmentOptionEnum.VERTICAL) {
        $("button[name='alignmentHorizontal']").removeClass('btnSelected');
        $("button[name='alignmentVertical']").addClass('btnSelected');
    }
    else {   
        //Do Nothing
    }

    dragSelect();
}

function endAlignment() {
    //clear the previous alignment values
    clearAlignment();

    //clear the display message
    displayMessage('');
}

function restartAlignment() {
    //for restarting
    clearAlignment();

    startAlignment();
}

function clearAlignment() {
    if (coverDragRegion != null) {
        $(coverDragRegion.node).unbind('mousemove');
        coverDragRegion.undrag();
        $(coverDragRegion.node).remove();
    }

    if (topDragRegion != null) {
        $(topDragRegion.node).unbind('mousemove');
        topDragRegion.undrag();
        $(topDragRegion.node).remove();
    }

    if (bottomDragRegion != null) {
        $(bottomDragRegion.node).unbind('mousemove');
        bottomDragRegion.undrag();
        $(bottomDragRegion.node).remove();
    }

    if (leftDragRegion != null) {
        $(leftDragRegion.node).unbind('mousemove');
        leftDragRegion.undrag();
        $(leftDragRegion.node).remove();
    }

    if (rightDragRegion != null) {
        $(rightDragRegion.node).unbind('mousemove');
        rightDragRegion.undrag();
        $(rightDragRegion.node).remove();
    }

    $('rect[name="coverDrag"]').remove();
    $('rect[name="topDrag"]').remove();
    $('rect[name="bottomDrag"]').remove();
    $('rect[name="leftDrag"]').remove();
    $('rect[name="rightDrag"]').remove();

    selectedElements = [];

    resetColor();

    //Remove the click event for the outercircle
    $('circle[name="outerCircle"]').each(function () {
        $(this).unbind('click');
    });

    //Remove the displayed primary operator
    $('span[name="primaryOperatorDisplay"]').html('Selected Primary Hole/Operator: ');

    //Remvoe the primary operator selection
    $('circle[name="outerCircle"]').each(function () {
        $(this).removeClass('primaryOperator');
    });

    //reset alignment buttons
    $("button[name='alignmentVertical']").removeClass('btnSelected');
    $("button[name='alignmentHorizontal']").removeClass('btnSelected');
}

function align() {
    if (selectedElements.length != 0) {
        displayMessage('Alignment Output:</br>');
        switch (alignmentOption) {
            case alignmentOptionEnum.VERTICAL:
                //Same X values as primary
                selectedElements.forEach(function (element) {
                    var config = getConfigurationObject($(element).attr('id'));
                    var x = $(primaryOperator)[0].cx.baseVal.value;
                    var y = $(element)[0].cy.baseVal.value;
                    if (validatePosition(x, y, config)) {
                        moveElement(x, y, $(element).parent().attr('id'));

                        updateCoordinates($(element).parent().attr('id'));
                    }
                    else {
                        appendMessage('Failed to align element : '
                            + getConfigurationObject($(element).parent().attr('id')).displayID);
                    }
                });
                break;
            case alignmentOptionEnum.HORIZONTAL:
                //Same Y values as primary
                selectedElements.forEach(function (element) {
                    var config = getConfigurationObject($(element).attr('id'));
                    var x = $(element)[0].cx.baseVal.value;
                    var y = $(primaryOperator)[0].cy.baseVal.value;
                    if (validatePosition(x, y, config)) {
                        moveElement(x, y, $(element).parent().attr('id'));

                        updateCoordinates($(element).parent().attr('id'));
                    }
                    else {
                        appendMessage('Failed to align element : '
                            + getConfigurationObject($(element).parent().attr('id')).displayID);
                    }
                });
                break;
            default:
                //Do Nothing
                break;
        }
    }
    else {
        displayMessage('No Operator Selected for Alignment');
    }

    //Again start alignment until user turns off alignment mode
    restartAlignment();
}

function displayMessage(message) {
    $('p[name=showMessage]').html(message);
}

function appendMessage(message) {
    $('p[name=showMessage]').append(message + '</br>');
}