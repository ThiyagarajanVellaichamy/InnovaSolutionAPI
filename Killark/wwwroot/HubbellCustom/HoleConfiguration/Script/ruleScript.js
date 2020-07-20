function getBoundary(view) {
    var element = $('g[id*=' + view + ']:visible').find('rect')[0];
    return {
        x: element.x.baseVal.value,
        y: element.y.baseVal.value,
        height: element.height.baseVal.value,
        width: element.width.baseVal.value
    }
}

function simulateRules() {
    if (selectedConfiguration == null) {
        return;
    }

    var collectionArray = getCollectionByView(selectedConfiguration.view);
    var response = new SAT.Response();
    var loopCount = 1;
    var aData = selectedConfiguration.groupElement.dataElement;
    for (var i = 0; i < loopCount; i++) {
        for (var aCount = 0; aCount < collectionArray.length; aCount++) {
            var b = collectionArray[aCount];
            if (selectedConfiguration.objectID != b.objectID) {
                response.clear();
                var collided;
                var bData = b.groupElement.dataElement;
                var result = getCollisionResult(aData, bData);
                collided = result.collided;
                response = result.response;
                if (collided) {
                    var magnitude = response.overlap.toFixed(4);
                    if (magnitude < 1) {
                        magnitude = 1;
                    }
                    selectedConfiguration.groupElement.dataElement.pos
                        .sub(response.overlapN.scale(magnitude, magnitude));
                }
            }

            getBoundaryPoints(); //Update boundary points

            //Update Display
            updateDisplayElement(selectedConfiguration.groupElement.displayElement);
        }
    }

    function getBoundaryPoints() {
        var xInput = selectedConfiguration.groupElement.dataElement.pos.x;
        var yInput = selectedConfiguration.groupElement.dataElement.pos.y;
        var x = 0, y = 0;

        var MaxHeight, MaxWidth, MinHeight, MinWidth;

        if (selectedConfiguration.type == holeTypeEnum.RECTANGULAR) {
            var boundaryHeightBuffer = selectedConfiguration.sizeConfiguration.boundaryHeightInch;
            var boundaryWidthBuffer = selectedConfiguration.sizeConfiguration.boundaryWidthInch;
            var boundary = getBoundary(selectedConfiguration.view);
            var MaxHeight = boundary.y + boundary.height - InchToPixel(boundaryHeightBuffer);
            var MaxWidth = boundary.x + boundary.width - InchToPixel(boundaryWidthBuffer);
            var MinHeight = boundary.y;
            var MinWidth = boundary.x;
        }
        else {
            var boundaryBuffer = selectedConfiguration.sizeConfiguration.boundarySizeInch / 2;
            var boundary = getBoundary(selectedConfiguration.view);
            var MaxHeight = boundary.y + boundary.height - InchToPixel(boundaryBuffer);
            var MaxWidth = boundary.x + boundary.width - InchToPixel(boundaryBuffer);
            var MinHeight = boundary.y + InchToPixel(boundaryBuffer);
            var MinWidth = boundary.x + InchToPixel(boundaryBuffer);
        }


        x = (xInput > MaxWidth) ? MaxWidth : xInput;
        x = (x < MinWidth) ? MinWidth : x;
        y = (yInput > MaxHeight) ? MaxHeight : yInput;
        y = (y < MinHeight) ? MinHeight : y;

        selectedConfiguration.groupElement.dataElement.pos.x = x;
        selectedConfiguration.groupElement.dataElement.pos.y = y;
    }
}

function getCollisionResult(aData, bData) {
    var collided = false;
    var response = new SAT.Response();
    if (aData instanceof SAT.Circle) {
        if (bData instanceof SAT.Circle) {
            collided = SAT.testCircleCircle(aData, bData, response);
        } else {
            collided = SAT.testCirclePolygon(aData, bData, response);
        }
    } else {
        if (bData instanceof SAT.Circle) {
            collided = SAT.testPolygonCircle(aData, bData, response);
        } else {
            collided = SAT.testPolygonPolygon(aData, bData, response);
        }
    }

    return {
        collided: collided,
        response: response
    }
}

function getCollectionByView(view) {
    switch (view) {
        case holeViewEnum.COVER:
            return coverConfigurationCollection;
        case holeViewEnum.TOP:
            return topConfigurationCollection;
        case holeViewEnum.BOTTOM:
            return bottomConfigurationCollection;
        case holeViewEnum.LEFT:
            return leftConfigurationCollection;
        case holeViewEnum.RIGHT:
            return rightConfigurationCollection;
        default:
            //Do Nothing
            break;
    }
}

function finalCollisionCheck() {
    var collectionArray = getCollectionByView(selectedConfiguration.view);
    var a = selectedConfiguration;
    for (var bCount = 0; bCount < collectionArray.length; bCount++) {
        var b = collectionArray[bCount];
        if (a.objectID == b.objectID) {
            continue;
        }
        var aData = a.groupElement.dataElement;
        var bData = b.groupElement.dataElement;
        if (getCollisionResult(aData, bData).collided) {
            return true;
        }
    }
    return false;
}