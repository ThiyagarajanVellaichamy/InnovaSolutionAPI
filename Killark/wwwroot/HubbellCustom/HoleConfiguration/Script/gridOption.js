//Selected Grid in inches
var selectedGridSpacing = 0.5;

//Grid Option
var gridEnabled = false;

function drawGrid(gridSpacing) {
    //Remove exsixting grid
    removeGrid();

    //Draw for all the faces
    draw(gridSpacing, holeViewEnum.COVER);
    draw(gridSpacing, holeViewEnum.TOP);
    draw(gridSpacing, holeViewEnum.BOTTOM);
    draw(gridSpacing, holeViewEnum.LEFT);
    draw(gridSpacing, holeViewEnum.RIGHT);

    gridEnabled = true;
}

function draw(gridSpacing, view) {
    var boundary = getBoundary(view);

    //MaxHeight and MaxWidth for Boundary Condition
    var MaxHeight = boundary.y + boundary.height;
    var MaxWidth = boundary.x + boundary.width;

    //MinHeight and MinWidth for Boundary Condition
    var MinHeight = boundary.y;
    var MinWidth = boundary.x;

    var centre = getCentrePoint(view);

    //Create the line Element
    var svgElement = Snap.select(getQuerySelector(view));

    var lineArray = [];

    var xAxis = centre.x, yAxis = centre.y;

    //Horizontal Lines - Positive Y
    while (yAxis < MaxHeight) {
        if (verifyGridLine(MinWidth, yAxis, MaxWidth, yAxis, boundary)) {
            var lineElement = svgElement.line(MinWidth, yAxis, MaxWidth, yAxis);
            lineElement.attr({
                class: 'gridLine',
                name: 'gridLine',
            });
            lineArray.push(lineElement);
        }

        yAxis = yAxis + gridSpacing;
    }

    yAxis = centre.y;

    //Horizontal Lines - Negative Y
    while (yAxis > MinHeight) {
        if (verifyGridLine(MinWidth, yAxis, MaxWidth, yAxis, boundary)) {
            var lineElement = svgElement.line(MinWidth, yAxis, MaxWidth, yAxis);
            lineElement.attr({
                class: 'gridLine',
                name: 'gridLine',
            });
            lineArray.push(lineElement);
        }

        yAxis = yAxis - gridSpacing;
    }

    //Vertical Lines - Positive X
    while (xAxis < MaxWidth) {
        if (verifyGridLine(xAxis, MinHeight, xAxis, MaxHeight, boundary)) {
            var lineElement = svgElement.line(xAxis, MinHeight, xAxis, MaxHeight);
            lineElement.attr({
                class: 'gridLine',
                name: 'gridLine',
            });
            lineArray.push(lineElement);
        }

        xAxis = xAxis + gridSpacing;
    }

    xAxis = centre.x;

    //Vertical Lines - Negative X
    while (xAxis > MinWidth) {
        if (verifyGridLine(xAxis, MinHeight, xAxis, MaxHeight, boundary)) {
            var lineElement = svgElement.line(xAxis, MinHeight, xAxis, MaxHeight);
            lineElement.attr({
                class: 'gridLine',
                name: 'gridLine',
            });
            lineArray.push(lineElement);
        }

        xAxis = xAxis - gridSpacing;
    }

    var svgGroupElement = svgElement.g();
    svgGroupElement.add(lineArray);
    svgGroupElement.attr({
        name: 'gridGroup',
    });    
}

function verifyGridLine(x1, y1, x2, y2, boundary) {
    //MaxHeight and MaxWidth for Boundary Condition
    var MaxHeight = boundary.y + boundary.height;
    var MaxWidth = boundary.x + boundary.width;
    //MinHeight and MinWidth for Boundary Condition
    var MinHeight = boundary.y;
    var MinWidth = boundary.x;
    if (!(x1 <= MaxWidth && x1 >= MinWidth)) {
        return false;
    }
    if (!(y1 <= MaxHeight && y1 >= MinHeight)) {
        return false;
    }
    if (!(x2 <= MaxWidth && x2 >= MinWidth)) {
        return false;
    }
    if (!(y2 <= MaxHeight && y2 >= MinHeight)) {
        return false;
    }

    return true;
}

function removeGrid() {
    $('g[name="gridGroup"]').each(function () {
        $(this).remove();
    });

    gridEnabled = false;
}

//Returns the value in convert pixel
function getGridSpacing(gridData) {
    if (gridData.includes("1/4")) {
        selectedGridSpacing = 0.25; // .25 inches       
    }
    else if (gridData.includes("1/2")) {
        selectedGridSpacing = 0.5; // .5 inches
    }
    else if (gridData.includes("3/4")) {
        selectedGridSpacing = 0.75; // .75 inches
    }
    else {
        //Do Nothing
    }

    return InchToPixel(selectedGridSpacing);
}

function updateInitialPoint(element) {
    var objectID = $(element).attr('id');

    var configuration = getConfigurationObject(objectID);
    
    if (configuration.type == holeTypeEnum.RECTANGULAR) {
        $('g[id="' + objectID + '"]').children().each(function () {
            if ($(this).attr('name').includes('outer')) {
                lastSuccessPoint.x = $(this)[0].x.baseVal.value;
                lastSuccessPoint.y = $(this)[0].y.baseVal.value;
            }
        });
    }
    else {
        $('g[id="' + objectID + '"]').children().each(function () {
            if ($(this).attr('name').includes('outer')) {
                lastSuccessPoint.x = $(this)[0].cx.baseVal.value;
                lastSuccessPoint.y = $(this)[0].cy.baseVal.value;
            }
        });
    }
}

var lastSuccessPoint = { x: 0, y: 0 };

function gridPoints(cx, cy, objectID) {
    var configuration = getConfigurationObject(objectID);
    var centrePoint = getCentrePoint(configuration.view);
    var gridSpacing = InchToPixel(selectedGridSpacing);

    var gridX = (cx - centrePoint.x) % gridSpacing,
        gridY = (cy - centrePoint.y) % gridSpacing,
        x, y;

    if (gridX >= (gridSpacing / 2)) {
        x = cx + (gridSpacing - gridX);
    }
    else {
        x = cx - gridX;
    }

    if (gridY >= (gridSpacing / 2)) {
        y = cy + (gridSpacing - gridY);
    }
    else {
        y = cy - gridY;
    }

    //if Rectangular Convert the User Points to SAT Points
    if (configuration.type == holeTypeEnum.RECTANGULAR) {
        x = x - (InchToPixel(configuration.sizeConfiguration.outerWidthInch) / 2);
        y = y - (InchToPixel(configuration.sizeConfiguration.outerHeightInch) / 2);
    }

    if (validatePosition(x, y, configuration)) {
        lastSuccessPoint.x = x;
        lastSuccessPoint.y = y;
        return { x: x, y: y };
    }
    else {
        return { x: lastSuccessPoint.x, y: lastSuccessPoint.y };
    }
}