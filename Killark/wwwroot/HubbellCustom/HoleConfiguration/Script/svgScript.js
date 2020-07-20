// Alias a few things in SAT.js to make the code shorter
var V = function (x, y) { return new SAT.Vector(x, y); };
var P = function (pos, points) { return new SAT.Polygon(pos, points); };
var C = function (pos, r) { return new SAT.Circle(pos, r); };
var B = function (pos, w, h) { return new SAT.Box(pos, w, h); };

//Global Snap Object
var SnapObject = null;

//Define PPI
var PixelPerInch = 5; //This may vary with the SVG file

//Initial SVG Path without filename
var SVGFileLocation = "./../Content/HubbellCustom/HoleConfiguration/DesignFiles/";

//Loaded Filename
var loadedFilename = "";

//Master Hole Data as Array
var coverConfigurationCollection = []; // Array of Configuration Model for COVER
var topConfigurationCollection = []; // Array of Configuration Model for Top Face
var bottomConfigurationCollection = []; // Array of Configuration Model for Bottom Face
var leftConfigurationCollection = []; // Array of Configuration Model for Left Face
var rightConfigurationCollection = []; // Array of Configuration Model for Right Face

//Load the Initial SVG File from the given filename
//SVG File Selection is done based on the dimension selection
function loadSVG(filename, force = false) {
    try {
        //Only load if the file name is new
        if ((filename != loadedFilename) || (force == true)) {
            //Start Loader
            startLoader(true);

            //Reset the whole screen
            resetSVG();

            //Destroy zpd for old object, if available
            if (SnapObject != null) {
                SnapObject.zpd('destroy');
                SnapObject = null;
            }
            //Clear the SVG Container
            $('#SVGContainer').empty();
            //Create a new Snap Object for new SVG
            SnapObject = Snap('#SVGContainer');
            //Load the SVG File
            Snap.load(SVGFileLocation + selectedProductType + "/" + filename, function (data) {
                //Load the SVG data to the Parent SVG Container
                SnapObject.append(data);
                //Enable zpd for PanZoom
                SnapObject.zpd({ zoomThreshold: [1, 10] });
                //Set initial Zoom
                //SnapObject.zoomTo(4, 0);

                //setTimeout(function () {
                //    SnapObject.panTo(0, 0);

                //}, 1000);

                //Configure PPI Value for the loaded SVG
                calculatePPI();

                //Enable Grid Option by default
                $('input[name="gridOption"]').trigger('click');

                //Finish Loader
                stopLoader(true);
            });

            loadedFilename = filename;
        }
    }
    catch (err) {
        //Loading SVG Error
        //Finish Loader
        stopLoader(true);
    }
    finally{
        //
    }
}

function resetSVG() {
    coverConfigurationCollection = [];
    topConfigurationCollection = [];
    bottomConfigurationCollection = [];
    leftConfigurationCollection = [];
    rightConfigurationCollection = [];
    clear();
}

function createDragEvent(element) {
    var startX;
    var startY;
    var stopAnimation = false;
    var config;

    var snapEvents = {
        dragStart: function dragStart(x, y, evt) {
            //Toggle zpd
            if (SnapObject != null) {
                SnapObject.zpd('toggle');
            }

            config = getConfigurationObject($(element.node).attr('id'));

            if (config.type == holeTypeEnum.RECTANGULAR) {
                element.children().forEach(function (el) {
                    if ($(el.node).attr('name').includes('outer')) {
                        startX = parseInt($(el.node).attr("x"));
                        startY = parseInt($(el.node).attr("y"));
                    }
                });
            }
            else {
                element.children().forEach(function (el) {
                    if ($(el.node).attr('name').includes('outer')) {
                        startX = parseInt($(el.node).attr("cx"));
                        startY = parseInt($(el.node).attr("cy"));
                    }
                });
            }

            stopAnimation = false;

            if (!gridEnabled) { //Simulation for non grid
                //Start Simulation
                function doSimulation() {
                    simulateRules();
                    if (!stopAnimation) {
                        window.requestAnimationFrame(doSimulation)
                    }
                };
                window.requestAnimationFrame(doSimulation);
            }
        },
        dragMove: function dragMove(dx, dy, x, y, evt) {
            //Return if there is no change
            if ((dx == 0) && (dy == 0)) { return; }

            if (gridEnabled) { // Do not use simulation for grid
                var x, y;
                if (config.type == holeTypeEnum.RECTANGULAR) {
                    x = startX + (InchToPixel(config.sizeConfiguration.outerWidthInch) / 2) + dx;
                    y = startY + (InchToPixel(config.sizeConfiguration.outerHeightInch) / 2) + dy;
                }
                else {
                    x = startX + dx; y = startY + dy;
                }
                var point = gridPoints(x, y, config.objectID);
                config.groupElement.dataElement.pos.x = point.x;
                config.groupElement.dataElement.pos.y = point.y;
                updateDisplayElement(element);
            }
            else { // Use Simulation for non grid
                config.groupElement.dataElement.pos.x = startX + dx;
                config.groupElement.dataElement.pos.y = startY + dy;
            }
        },
        dragEnd: function dragEnd(evt) {
            //Toggle zpd
            if (SnapObject != null) {
                SnapObject.zpd('toggle');
            }

            stopAnimation = true;

            setTimeout(function () {
                if (finalCollisionCheck()) {
                    config.groupElement.dataElement.pos.x = startX;
                    config.groupElement.dataElement.pos.y = startY;
                    updateDisplayElement(element);
                }
            }, 10);

            assignValues({
                x: config.groupElement.dataElement.pos.x,
                y: config.groupElement.dataElement.pos.y
            }, $(element.node).attr('id'));
        }
    };

    element.drag(snapEvents.dragMove, snapEvents.dragStart, snapEvents.dragEnd);
}

function updateDisplayElement(element) {
    var objectID = $(element.node).attr('id');
    var config = getConfigurationObject(objectID);
    var point = { x: config.groupElement.dataElement.pos.x, y: config.groupElement.dataElement.pos.y };
    element.children().forEach(function (el) {
        point = { x: config.groupElement.dataElement.pos.x, y: config.groupElement.dataElement.pos.y };
        if (el.type == "circle") {
            Snap(el).attr({
                cx: point.x,
                cy: point.y
            });
        }
        else if (el.type == "text" || el.type == "rect") {
            if (config.type == holeTypeEnum.RECTANGULAR) {                
                if ($(el.node).attr('name').includes('text')) {
                    point.x = point.x
                        + (InchToPixel(config.sizeConfiguration.outerWidthInch) / 2);
                    point.y = point.y
                        + (InchToPixel(config.sizeConfiguration.outerHeightInch) / 2);
                }
                else if ($(el.node).attr('name').includes('inner')) {
                    point.x = point.x
                        + (InchToPixel(config.sizeConfiguration.outerWidthInch) / 2)
                        - (InchToPixel(config.sizeConfiguration.widthInch) / 2);
                    point.y = point.y
                        + (InchToPixel(config.sizeConfiguration.outerHeightInch) / 2)
                        - (InchToPixel(config.sizeConfiguration.heightInch) / 2);
                }
            }
            Snap(el).attr({
                x: point.x,
                y: point.y
            });
        }
        else {
            //Do nothing
        }
    });

    //Update summary panel
    updateCoordinates(objectID);
}

function createSVGElement(configuration) {
    var element = null;
    switch (configuration.type) {

        case holeTypeEnum.PUSHBUTTON:
        case holeTypeEnum.PILOTLIGHT:
        case holeTypeEnum.SELECTORSWITCH:
        case holeTypeEnum.SPECIALITYOPERATOR:
        case holeTypeEnum.CIRCULAR:
        case holeTypeEnum.BLANKHOLE:
        case holeTypeEnum.ANSI:
        case holeTypeEnum.METRIC:
            element = createCircularElement(configuration);
            break;
        case holeTypeEnum.RECTANGULAR:
            element = createRectangularElement(configuration);
            break;
        default:
            //Do Nothing
            break;
    }

    return element;
}

function createCircularElement(configuration) {
    //Create the buffer Element
    var svgElement = Snap.select(getQuerySelector(configuration.view));

    //Create the Inner Element
    var innerElement = svgElement.circle(configuration.xPoint,
        configuration.yPoint, InchToPixel(configuration.sizeConfiguration.sizeInch / 2));
    innerElement.attr({
        class: 'innerCircle',
        id: 'I_' + configuration.objectID,
        name: 'innerCircle',
    });

    //Create the Outer buffer Element
    var outerElement = svgElement.circle(configuration.xPoint,
        configuration.yPoint, InchToPixel(configuration.sizeConfiguration.outerSizeInch / 2));
    outerElement.attr({
        class: 'outerCircle',
        id: 'O_' + configuration.objectID,
        name: 'outerCircle',
    });

    //Create the Outer buffer Element
    var textElement = svgElement.text(configuration.xPoint, configuration.yPoint,
        configuration.displayID);
    textElement.attr({
        class: 'textElement',
        'text-anchor': 'middle',
        'alignment-baseline': "central",
        id: 'T_' + configuration.objectID,
        name: 'textElement',
    });

    //Display Element
    var svgGroupElement = svgElement.g(innerElement, outerElement, textElement);
    svgGroupElement.attr({
        class: 'groupElement',
        id: configuration.objectID,
        name: configuration.view + 'Group',
        style: 'z-index:1001;',
    });

    //SAT Data Element
    var satDataElement = C(V(configuration.xPoint, configuration.yPoint),
        InchToPixel(configuration.sizeConfiguration.outerSizeInch / 2));

    var svgObject = {
        displayElement: svgGroupElement,
        dataElement: satDataElement
    };

    //Add Click Event
    createClickEvent(svgObject.displayElement);

    //Add drag event
    createDragEvent(svgObject.displayElement);

    return svgObject;
}

function createRectangularElement(configuration) {
    //Create the buffer Element
    var svgElement = Snap.select(getQuerySelector(configuration.view));

    //Create the inner Rectangular Element
    var innerElement = svgElement.rect(configuration.xPoint
        + (InchToPixel(configuration.sizeConfiguration.outerWidthInch) / 2) 
        - (InchToPixel(configuration.sizeConfiguration.widthInch) / 2),
        configuration.yPoint + (InchToPixel(configuration.sizeConfiguration.outerHeightInch) / 2)
        - (InchToPixel(configuration.sizeConfiguration.heightInch) / 2),
        InchToPixel(configuration.sizeConfiguration.widthInch),
        InchToPixel(configuration.sizeConfiguration.heightInch));
    innerElement.attr({
        class: 'innerRect',
        id: 'I_' + configuration.objectID,
        name: 'innerRect',
    });

    //Create the Outer Rectangular Element
    var outerElement = svgElement.rect(configuration.xPoint, configuration.yPoint,
        InchToPixel(configuration.sizeConfiguration.outerWidthInch),
        InchToPixel(configuration.sizeConfiguration.outerHeightInch));
    outerElement.attr({
        class: 'outerRect',
        id: 'O_' + configuration.objectID,
        name: 'outerRect',
    });

    //Create the Text Element
    var textElement = svgElement.text(configuration.xPoint 
        + (InchToPixel(configuration.sizeConfiguration.outerWidthInch) / 2),
        configuration.yPoint + (InchToPixel(configuration.sizeConfiguration.outerHeightInch) / 2),
        configuration.displayID);
    textElement.attr({
        class: 'textElement',
        'text-anchor': 'middle',
        'alignment-baseline': "central",
        id: 'T_' + configuration.objectID,
        name: 'textElement',
    });

    //Display Element
    var svgGroupElement = svgElement.g(innerElement, outerElement, textElement);
    svgGroupElement.attr({
        class: 'groupElement',
        id: configuration.objectID,
        name: configuration.view + 'Group',
        style: 'z-index:1001;',
    });

    //SAT Data Element
    var satDataElement = B(V(configuration.xPoint, configuration.yPoint),
        InchToPixel(configuration.sizeConfiguration.outerWidthInch),
        InchToPixel(configuration.sizeConfiguration.outerHeightInch)).toPolygon();

    var svgObject = {
        displayElement: svgGroupElement,
        dataElement: satDataElement
    };

    //Add Click Event
    createClickEvent(svgObject.displayElement);

    //Add drag event
    createDragEvent(svgObject.displayElement);

    return svgObject;
}

function addHoles(configuration) {
    switch (configuration.view) {
        case holeViewEnum.COVER:
            coverConfigurationCollection.push(configuration);
            break;
        case holeViewEnum.TOP:
            topConfigurationCollection.push(configuration);
            break;
        case holeViewEnum.BOTTOM:
            bottomConfigurationCollection.push(configuration);
            break;
        case holeViewEnum.LEFT:
            leftConfigurationCollection.push(configuration);
            break;
        case holeViewEnum.RIGHT:
            rightConfigurationCollection.push(configuration);
            break;
        default:
            //Do Nothing
            break;
    }
    //Add hole info to summary table
    addHoleData(configuration);
}

function removeHoles(objectID) {
    var configuration = getConfigurationObject(objectID);
    var holeConfigurationCollection = [];
    switch (configuration.view) {
        case holeViewEnum.COVER:
            holeConfigurationCollection = coverConfigurationCollection;
            break;
        case holeViewEnum.TOP:
            holeConfigurationCollection = topConfigurationCollection;
            break;
        case holeViewEnum.BOTTOM:
            holeConfigurationCollection = bottomConfigurationCollection
            break;
        case holeViewEnum.LEFT:
            holeConfigurationCollection = leftConfigurationCollection;
            break;
        case holeViewEnum.RIGHT:
            holeConfigurationCollection = rightConfigurationCollection;
            break;
        default:
            //Do Nothing
            break;
    }

    for (var i = holeConfigurationCollection.length - 1; i >= 0; i--) {
        if (holeConfigurationCollection[i].objectID === objectID) {
            //Remove from svg design
            $('g[id="' + objectID + '"]').remove();
            //Remove from object container
            holeConfigurationCollection.splice(i, 1);
        }
    }
}

function plot(numberOfHoles, masterType, holeType) {
    //Start Loader
    startLoader(true);

    var plotView = null;
    for (var hole = 0; hole < numberOfHoles; hole++) {
        //Construct configuration object for element creation
        var configuration = constructConfiguration(masterType, holeType);

        if (configuration != null) {
            //Create SVG Element, if validation is success
            var svgElement = createSVGElement(configuration);

            configuration.groupElement = svgElement;

            //Add holes to the master
            addHoles(configuration);

            //for Pan View
            plotView = configuration.view;
        }
        else {
            break;
            //Invalid Configuration - Operator not plotted
        }
    }

    if (plotView != null) {
        panView(plotView);
    }

    //Stop Loader
    stopLoader(true);
}

//#region Fetch Values from UI
//Get CSS query selector string for the configuration given
function getQuerySelector(view) {
    var querySelector;
    querySelector = "g#" + $('g[id*=' + view + ']:visible').find('g')[0].id;
    return querySelector;
}
//#endregion

//#region Support Methods
//Convert From Pixel to Inches
function InchToPixel(Inch) {
    return (PixelPerInch * Inch);
}

//Convert From Pixel to Inches
function PixelToInch(Pixel) {
    return (Pixel / PixelPerInch);
}

//Calculate the PPI with the Cover boundary
function calculatePPI() {
    try {
        var coverWidthInPixel = $('g[id*=COVER]:visible').find('rect')[0].width.baseVal.value;
        PixelPerInch = (coverWidthInPixel / parseInchData(holeViewEnum.COVER).width).toFixed(3);
    }
    catch (err) {
        //Invalid SVG File
        console.log(err);
    }
}

function getCentrePoint(view) {
    var rectElement = $('g[id*=' + view + ']:visible').find('rect')[0];
    var splitArray = $('g[id*=' + view + ']:visible')[0].id
        .replace('L_x5F_' + view + '_x5F_', '').split('X');
    var x, y;
    switch (view) {
        case holeViewEnum.COVER:
            x = rectElement.x.baseVal.value + (rectElement.width.baseVal.value / 2);
            y = rectElement.y.baseVal.value + (rectElement.height.baseVal.value / 2);
            break;
        case holeViewEnum.TOP:
            x = rectElement.x.baseVal.value + (rectElement.width.baseVal.value / 2);
            y = rectElement.y.baseVal.value - InchToPixel(splitArray[2]);
            break;
        case holeViewEnum.BOTTOM:
            x = rectElement.x.baseVal.value + (rectElement.width.baseVal.value / 2);
            y = rectElement.y.baseVal.value + rectElement.height.baseVal.value + InchToPixel(splitArray[2]);
            break;
        case holeViewEnum.LEFT:
            x = rectElement.x.baseVal.value - InchToPixel(splitArray[2]);
            y = rectElement.y.baseVal.value + (rectElement.height.baseVal.value / 2);
            break;
        case holeViewEnum.RIGHT:
            x = rectElement.x.baseVal.value + rectElement.width.baseVal.value + InchToPixel(splitArray[2]);
            y = rectElement.y.baseVal.value + (rectElement.height.baseVal.value / 2);
            break;
        default:
            //Do Nothing
            break;
    }

    return { x: x, y: y };
}

function getConfigurationObject(objectID) {
    var configuration = null;
    var configurationArray = [coverConfigurationCollection, topConfigurationCollection,
        bottomConfigurationCollection, leftConfigurationCollection, rightConfigurationCollection];
    var holeConfigurationCollection = [];
    for (var configArray = configurationArray.length - 1; configArray >= 0; configArray--) {
        holeConfigurationCollection = configurationArray[configArray];
        for (var i = holeConfigurationCollection.length - 1; i >= 0; i--) {
            if (objectID.includes(holeConfigurationCollection[i].objectID)) {
                configuration = holeConfigurationCollection[i];
                break;
            }
        }
        if (configuration != null) {
            break;
        }
    }

    return configuration;
}

function getDisplayID(view) {
    var id = null;
    switch (view) {
        case holeViewEnum.COVER:
            id = getID('C', coverConfigurationCollection);
            break;
        case holeViewEnum.TOP:
            id = getID('T', topConfigurationCollection);
            break;
        case holeViewEnum.BOTTOM:
            id = getID('B', bottomConfigurationCollection);
            break;
        case holeViewEnum.LEFT:
            id = getID('L', leftConfigurationCollection);
            break;
        case holeViewEnum.RIGHT:
            id = getID('R', rightConfigurationCollection);
            break;
        default:
            //Do Nothing
            break;
    }

    return id;

    function getID(letter, collection) {
        var totalCount = parseInt(collection.length) + 1;
        var displayID = letter + totalCount;
        while (checkAvailable(displayID, collection)) {
            displayID = letter + parseInt(collection.length + 1);
        }
        return displayID;
    }

    function checkAvailable(displayID, configuration) {
        for (var i = configuration.length - 1; i >= 0; i--) {
            if (configuration[i].displayID === displayID) {
                return true;
            }
        }
        return false;
    }
}

function getTotalElementCount() {
    var totalLenght = coverConfigurationCollection.length + topConfigurationCollection.length +
        bottomConfigurationCollection.length + leftConfigurationCollection.length + rightConfigurationCollection.length;
    return totalLenght + 1; // To start from 1
}

function getPointInInch(xValue, yValue, objectID, view = null) {
    //get centre point of the view
    var centre;
    if (view != null) {
        centre = getCentrePoint(view);
    }
    else {
        centre = getCentrePoint(getConfigurationObject(objectID).view);
    }
    var x = xValue, y = yValue;
    if (x != null) {
        x = Math.round((PixelToInch(x - centre.x).toFixed(3)) * 1000) / 1000;
    }
    if (y != null) {
        y = Math.round((PixelToInch(centre.y - y).toFixed(3)) * 1000) / 1000
    }
    return {
        x: x,
        y: y
    }
}

function getPointInPixel(xValue, yValue, objectID) {
    //get centre point of the view
    var centre = getCentrePoint(getConfigurationObject(objectID).view);
    var x = xValue, y = yValue;
    if (x != null) {
        x = Math.round((centre.x + InchToPixel(x)).toFixed(3) * 1000) / 1000;
    }
    if (y != null) {
        y = Math.round((centre.y - InchToPixel(y)).toFixed(3) * 1000) / 1000
    }
    return {
        x: x,
        y: y
    }
}

function parseInchData(view) {
    var splitArray = $('g[id*=' + view + ']:visible')[0].id
        .replace('L_x5F_' + view + '_x5F_', '').split('X');
    return { width: splitArray[0], height: splitArray[1] };
}

//Create a unique GUID for each hole elements
function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
//#endregion

//#region PAN ZOOM Methods
function panView(view) {
    SnapObject.zoomTo(1, 0, null, function () {
        SnapObject.panTo(0, 0, 0, null, function () {
            switch (view) {
                case holeViewEnum.COVER:
                    SnapObject.zoomTo(3, 0, null, function () { SnapObject.panTo('-330', '-100'); });
                    break;
                case holeViewEnum.TOP:
                    SnapObject.zoomTo(3, 0, null, function () { SnapObject.panTo('-330', '+400'); });
                    break
                case holeViewEnum.BOTTOM:
                    SnapObject.zoomTo(3, 0, null, function () { SnapObject.panTo('-330', '-500'); });
                    break
                case holeViewEnum.LEFT:
                    SnapObject.zoomTo(3, 0, null, function () { SnapObject.panTo('+100'); });
                    break
                case holeViewEnum.RIGHT:
                    SnapObject.zoomTo(3, 0, null, function () { SnapObject.panTo('-800'); });
                    break
                default:
                    //Do Nothing
                    break;
            }
        });
    });
}
//#endregion