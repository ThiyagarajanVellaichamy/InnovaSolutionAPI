function validatePosition(x, y, configuration) {

    var satObject = null;

    if (configuration.type == holeTypeEnum.RECTANGULAR) {
        satObject = getRectangularSATObject(x, y,
            InchToPixel(configuration.sizeConfiguration.outerWidthInch),
            InchToPixel(configuration.sizeConfiguration.outerHeightInch)).toPolygon();

    }
    else {
        satObject = getCircularSATObject(x, y,
            InchToPixel(configuration.sizeConfiguration.outerSizeInch / 2));
    }

    return validate(satObject, configuration);
}

function validateConfiguration(configuration) {
    return validate(configuration.groupElement.dataElement, configuration);
}

function validate(satObject, configuration) {
    var result = true; //Final Result

    //Validate Collision

    var collectionArray = getCollectionByView(configuration.view);
    var a = satObject;
    for (var bCount = 0; bCount < collectionArray.length; bCount++) {
        var b = collectionArray[bCount];
        if (configuration.objectID == b.objectID) {
            continue;
        }
        var aData = a;
        var bData = b.groupElement.dataElement;
        var result = getCollisionResult(aData, bData);
        if (result.collided) {
            var magnitude = result.response.overlap.toFixed(3);
            if (magnitude > 0) {
                result = false;
                break;
            }
        }
    }

    //Validate Boundary Condition
    if (result) {
        var xInput = parseInt(satObject.pos.x);
        var yInput = parseInt(satObject.pos.y);
        var MaxHeight, MaxWidth, MinHeight, MinWidth;
        var boundary = getBoundary(configuration.view);

        if (configuration.type == holeTypeEnum.RECTANGULAR) {
            MaxHeight = parseInt(boundary.y + boundary.height
                - InchToPixel(configuration.sizeConfiguration.boundaryHeightInch));
            MaxWidth = parseInt(boundary.x + boundary.width
                - InchToPixel(configuration.sizeConfiguration.boundaryWidthInch));
            MinHeight = parseInt(boundary.y);
            MinWidth = parseInt(boundary.x);
        }
        else {
            var boundaryBuffer = configuration.sizeConfiguration.boundarySizeInch / 2;

            MaxHeight = parseInt(boundary.y + boundary.height - InchToPixel(boundaryBuffer));
            MaxWidth = parseInt(boundary.x + boundary.width - InchToPixel(boundaryBuffer));
            MinHeight = parseInt(boundary.y + InchToPixel(boundaryBuffer));
            MinWidth = parseInt(boundary.x + InchToPixel(boundaryBuffer));
        }

        if ((xInput > MaxWidth) || (xInput < MinWidth)
            || (yInput > MaxHeight) || (yInput < MinHeight)) {
            result = false;
        }
    }

    return result;
}

function verifyCircleRectIntersection(circle, rectangle) {
    // limits value to the range min..max
    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val))
    }

    // Find the closest point to the circle within the rectangle
    // Assumes axis alignment! ie rect must not be rotated
    var closestX = clamp(circle.x, rectangle.x, rectangle.x + rectangle.width);
    var closestY = clamp(circle.y, rectangle.y, rectangle.y + rectangle.height);

    // Calculate the distance between the circle's center and this closest point
    var distanceX = circle.x - closestX;
    var distanceY = circle.y - closestY;

    // If the distance is less than the circle's radius, an intersection occurs
    var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
    return distanceSquared < (circle.radius * circle.radius);
}
