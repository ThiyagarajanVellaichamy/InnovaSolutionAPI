var IncrementPixel = 12; //Increase this for faster results

function constructConfiguration(masterType, holeType) {
    var configuration = null;
    switch (holeType) {       
        case holeTypeEnum.PUSHBUTTON:
        case holeTypeEnum.PILOTLIGHT:
        case holeTypeEnum.SELECTORSWITCH:
        case holeTypeEnum.SPECIALITYOPERATOR:
        case holeTypeEnum.BLANKHOLE:
            configuration = getOperatorConfiguration(masterType, holeType);
            break;
        case holeTypeEnum.RECTANGULAR:
            configuration = getRectangularConfiguration(masterType, holeType);
            break;
        case holeTypeEnum.CIRCULAR:
            configuration = getCircularConfiguration(masterType, holeType);
            break;
        case holeTypeEnum.ANSI:
        case holeTypeEnum.METRIC:
            configuration = getHoleConfiguration(masterType, holeType);
            break;
        default:
            //Do Nothing
            break;
    }
    return configuration;
}

function getOperatorConfiguration(masterType, holeType) {
    //Fetch the values from UI and Controller for configuration construction
    var config = Object.create(configuration);
    config.objectID = createGuid();
    config.view = holeViewEnum.COVER;
    config.masterType = masterType;
    config.type = holeType;
    config.hsize = '3/4-14 NPSM';
    config.catalogNo = getOperatorCatalogNo(masterType, holeType);
    config = getOperatorSelectionValues(config);
    config.displayID = getDisplayID(config.view);
    config.displayNumber = getTotalElementCount();
    config.sizeConfiguration = getCircularSizeInInch(config.hsize, config);

    return getPlotLocation(config);
}

function getHoleConfiguration(masterType, holeType) {
    //Fetch the values from UI and Controller for configuration construction
    var config = Object.create(configuration);
    config.objectID = createGuid();
    config.view = getHoleFace(masterType, holeType);
    config.masterType = holeType;
    config.type = holeType;
    config.subtype = getHoleComponent(masterType, holeType);
    config.hsize = getHoleSize(masterType, holeType);
    config.catalogNo = getOperatorCatalogNo(masterType, holeType);
    config.displayID = getDisplayID(config.view);
    config.displayNumber = getTotalElementCount();
    config.sizeConfiguration = getCircularSizeInInch(config.hsize, config); 

    return getPlotLocation(config);
}

function getRectangularConfiguration(masterType, holeType) {
    //Fetch the values from UI and Controller for configuration construction
    var config = Object.create(configuration);
    config.objectID = createGuid();
    config.view = holeViewEnum.COVER;
    config.masterType = holeMasterTypeEnum.WINDOWOPTION;
    config.type = holeType;
    config.subtype = getOperatorSubType(masterType, holeType);
    config.hsize = config.subtype;
    config.catalogNo = config.subtype;
    config.displayID = getDisplayID(config.view);
    config.displayNumber = getTotalElementCount();
    config.sizeConfiguration = getRectangularSizeInInch(config.hsize);

    return getPlotLocation(config);
}

function getCircularConfiguration(masterType, holeType) {
    //Fetch the values from UI and Controller for configuration construction
    var config = Object.create(configuration);
    config.objectID = createGuid();
    config.view = holeViewEnum.COVER;
    config.masterType = holeMasterTypeEnum.WINDOWOPTION;
    config.type = holeType;
    config.subtype = getOperatorSubType(masterType, holeType);
    config.hsize = config.subtype;
    config.catalogNo = config.subtype;
    config.displayID = getDisplayID(config.view);
    config.displayNumber = getTotalElementCount();
    config.sizeConfiguration = getCircularSizeInInch(config.hsize, config);

    return getPlotLocation(config);
}

function getPlotLocation(configuration) {

    //Check Max Operator/Cutout Count
    if ((configuration.masterType == holeMasterTypeEnum.GZOPERATOR)
        || (configuration.masterType == holeMasterTypeEnum.GOOPERATOR)) {
        if (parseInt(globalEnclosureModel.maxOperatorCount) <= parseInt(coverConfigurationCollection.length)) {
            showPopup('Max Operators Reached!!!');
            return null;
        }
    }
    else if (configuration.masterType == holeMasterTypeEnum.WINDOWOPTION) {
        var windowOptionArray = windowCutoutArray();
        if (configuration.type == holeTypeEnum.RECTANGULAR) {
            if ((parseInt(globalEnclosureModel.maxRectangularCutoutCount) <= parseInt(windowOptionArray.rectangular.length))
                || (parseInt(allowedCutoutCount) <= 0)) {
                showPopup('Max Cutouts Reached!!!');
                return null;
            }
            else {
                //Do nothing
            }
        }
        else if (configuration.type == holeTypeEnum.CIRCULAR) {
            if ((parseInt(globalEnclosureModel.maxCircularCutoutCount) <= parseInt(windowOptionArray.circular.length))
                || (parseInt(allowedCutoutCount) <= 0)) {
                showPopup('Max Cutouts Reached!!!');
                return null;
            }
            else {
                //Do nothing
            }
        }
        else {
            //Do nothing
        }
    }
    else {
        //Do nothing
    }

    var userCoordinates = getUserCoordinates(configuration.masterType, configuration.type);
    if (userCoordinates != null) {

        //Get Centre Point
        var centre = getCentrePoint(configuration.view);
        var x = centre.x + InchToPixel(userCoordinates.x), y = centre.y - InchToPixel(userCoordinates.y);

        if (configuration.type == holeTypeEnum.RECTANGULAR) {
            x = x - (InchToPixel(configuration.sizeConfiguration.outerWidthInch) / 2);
            y = y - (InchToPixel(configuration.sizeConfiguration.outerHeightInch) / 2);
        }

        if (validatePosition(x, y, configuration)) {
            configuration.xPoint = x;
            configuration.yPoint = y;
        }
        else {
            showPopup('Please enter a valid entry!!!');
            configuration = null;
        }
    }
    else {
        //get the points for operators
        var points = null;
        if ((configuration.type != holeTypeEnum.ANSI)
            && (configuration.type != holeTypeEnum.METRIC)) {
            points = plotOperator(configuration);
        }

        if (points != null) {
            configuration.xPoint = points.x;
            configuration.yPoint = points.y;
        }
        else {
            points = validateEveryPixel(configuration);
            if (points != null) {
                configuration.xPoint = points.x;
                configuration.yPoint = points.y;
            }
            else {
                showPopup('No space available to plot the selected element');
                configuration = null;
            }
        }
    }

    if (configuration != null) {
        var pointInInches = getPointInInch(configuration.xPoint, configuration.yPoint, null, configuration.view);
        configuration.xInches = pointInInches.x;
        configuration.yInches = pointInInches.y;
    }

    return configuration;
}

function plotOperator(configuration) {

    if (configuration.type != holeTypeEnum.RECTANGULAR) {
        var buffer = 0.001;

        var bRadiusInPixel = InchToPixel(configuration.sizeConfiguration.boundarySizeInch / 2) + buffer;
        var oRadiusInPixel = InchToPixel(configuration.sizeConfiguration.outerSizeInch / 2) + buffer;
        var radiusDifference = oRadiusInPixel - bRadiusInPixel;
        var boundary = getBoundary(configuration.view);

        var xStartRange = boundary.x + bRadiusInPixel
            + (((boundary.width + (2 * radiusDifference)) % (oRadiusInPixel * 2)) / 2);
        var xEndRange = boundary.x + boundary.width - bRadiusInPixel;
        var yStartRange = boundary.y + bRadiusInPixel
            + (((boundary.height + (2 * radiusDifference)) % (oRadiusInPixel * 2)) / 2);
        var yEndRange = boundary.y + boundary.height - bRadiusInPixel;        

        //Iterate for all the possible places/Pixels in the given placeholder
        for (var i = yStartRange; i <= yEndRange; i = i + oRadiusInPixel) {
            for (var j = xStartRange; j <= xEndRange; j = j + oRadiusInPixel) {
                if (validatePosition(j, i, configuration)) {
                    return { x: j, y: i };
                }
            }
        }
    }

    return null;
}

function validateEveryPixel(configuration) {
    var boundary = getBoundary(configuration.view);
    var xStartRange = boundary.x;
    var xEndRange = boundary.x + boundary.width;
    var yStartRange = boundary.y;
    var yEndRange = boundary.y + boundary.height;    

    //Iterate for all the possible places/Pixels in the given placeholder
    for (var i = yStartRange; i <= yEndRange; i = i + IncrementPixel) {
        for (var j = xStartRange; j <= xEndRange; j = j + IncrementPixel) {
            if (validatePosition(j, i, configuration)) {
                return { x: j, y: i };
            }
        }
    }

    return null;
}

function getCircularSATObject(x, y, r) {
    return C(V(x, y), r);
}

function getRectangularSATObject(x, y, w, h) {    
    return B(V(x, y), w, h);;
}

function showPopup(message) {
    $('#myModal').modal('toggle');
    $('#myModal').modal('show');
    $('#myModal').find('.modal-body').text(message);
}