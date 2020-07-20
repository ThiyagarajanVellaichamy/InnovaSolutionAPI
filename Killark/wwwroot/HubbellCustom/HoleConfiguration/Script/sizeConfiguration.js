function circularSizeConfiguration() {
    return {
        sizeInch: 1.060, //Hole Size in inches - Diameter
        boundarySizeInch: 1.500, // Outer Buffer Size for collision with boundries - Diameter
        outerSizeInch: 2.500, // Outer Buffer Size for collision with other elements - Diameter
    }
};

function rectangularSizeConfiguration() {
    return {
        heightInch: 2, //Hole Size in inches - Height
        widthInch: 2, //Hole Size in inches - Width
        boundaryHeightInch: 2, // Outer Buffer Size for collision with boundries - Height
        boundaryWidthInch: 2, // Outer Buffer Size for collision with boundries - Width
        outerHeightInch: 2, // Outer Buffer Size for collision with other elements - Height
        outerWidthInch: 2, // Outer Buffer Size for collision with other elements - Width
    }
};

function getCircularSizeInInch(holeSize, config) {
    var sizeConfig = new circularSizeConfiguration();

    if (holeSize === '3/4 NPSM') { //Cover Operator
        sizeConfig.sizeInch = 1.060;
        sizeConfig.boundarySizeInch = 1.500;
        sizeConfig.outerSizeInch = 2.500;
    }
    else if (holeSize === '3/4-14 NPSM') {
        sizeConfig.sizeInch = 1.060;
        sizeConfig.boundarySizeInch = 1.500;
        sizeConfig.outerSizeInch = 2.500;

        //Special Case 1
        if (config.lockoutOption == 'MUSHROOM LOCKOUT') {
            sizeConfig.outerSizeInch = 3.750;
        }

        //Special Case 2
        if (globalEnclosureModel.dimension == '12x18x8'
            || globalEnclosureModel.dimension == '12x18x6') {
            sizeConfig.boundarySizeInch = 1;
        }
    }
    else if (holeSize === '1/4 NPT') { // Holes with ANSI Sizes
        sizeConfig.sizeInch = 0.540;
        sizeConfig.boundarySizeInch = 0.540;
        sizeConfig.outerSizeInch = 1.060;
    }
    else if (holeSize === '3/8 NPT') {
        sizeConfig.sizeInch = 0.675;
        sizeConfig.boundarySizeInch = 0.675;
        sizeConfig.outerSizeInch = 1.250;
    }
    else if (holeSize === '1/2 NPT') {
        sizeConfig.sizeInch = 0.840;
        sizeConfig.boundarySizeInch = 0.840;
        sizeConfig.outerSizeInch = 1.625;
    }
    else if (holeSize === '3/4 NPT') {
        sizeConfig.sizeInch = 1.060;
        sizeConfig.boundarySizeInch = 1.060;
        sizeConfig.outerSizeInch = 1.880;
    }
    else if (holeSize === '1 NPT') {
        sizeConfig.sizeInch = 1.330;
        sizeConfig.boundarySizeInch = 1.330;
        sizeConfig.outerSizeInch = 2.125;
    }
    else if (holeSize === '1 1/4 NPT') {
        sizeConfig.sizeInch = 1.680;
        sizeConfig.boundarySizeInch = 1.680;
        sizeConfig.outerSizeInch = 2.500;
    }
    else if (holeSize === '1 1/2 NPT') {
        sizeConfig.sizeInch = 1.920;
        sizeConfig.boundarySizeInch = 1.920;
        sizeConfig.outerSizeInch = 2.750;
    }
    else if (holeSize === '2 NPT') {
        sizeConfig.sizeInch = 2.390;
        sizeConfig.boundarySizeInch = 2.390;
        sizeConfig.outerSizeInch = 3.375;
    }
    else if (holeSize === '2 1/2 NPT') {
        sizeConfig.sizeInch = 2.890;
        sizeConfig.boundarySizeInch = 2.890;
        sizeConfig.outerSizeInch = 4.630;
    }
    else if (holeSize === '3 NPT') {
        sizeConfig.sizeInch = 3.520;
        sizeConfig.boundarySizeInch = 3.520;
        sizeConfig.outerSizeInch = 5.500;
    }
    else if (holeSize === '3 1/2 NPT') {
        sizeConfig.sizeInch = 4.020;
        sizeConfig.boundarySizeInch = 4.020;
        sizeConfig.outerSizeInch = 6.375;
    }
    else if (holeSize === '4 NPT') {
        sizeConfig.sizeInch = 4.530;
        sizeConfig.boundarySizeInch = 4.530;
        sizeConfig.outerSizeInch = 6.375;
    }
    else if (holeSize === '5 NPT') {
        sizeConfig.sizeInch = 5.563;
        sizeConfig.boundarySizeInch = 5.563;
        sizeConfig.outerSizeInch = 7.250;
    }
    else if (holeSize === '6 NPT') {
        sizeConfig.sizeInch = 5.563;
        sizeConfig.boundarySizeInch = 5.563;
        sizeConfig.outerSizeInch = 7.250;
    }
    else if (holeSize === 'M16') { // Metric Hole Sizes
        sizeConfig.sizeInch = 0.630;
        sizeConfig.boundarySizeInch = 0.630;
        sizeConfig.outerSizeInch = 1.250;
    }
    else if (holeSize === 'M20') {
        sizeConfig.sizeInch = 0.787;
        sizeConfig.boundarySizeInch = 0.787;
        sizeConfig.outerSizeInch = 1.625;
    }
    else if (holeSize === 'M24') {
        sizeConfig.sizeInch = 0.945;
        sizeConfig.boundarySizeInch = 0.945;
        sizeConfig.outerSizeInch = 1.880;
    }
    else if (holeSize === 'M25') {
        sizeConfig.sizeInch = 0.984;
        sizeConfig.boundarySizeInch = 0.984;
        sizeConfig.outerSizeInch = 1.880;
    }
    else if (holeSize === 'M28') {
        sizeConfig.sizeInch = 1.102;
        sizeConfig.boundarySizeInch = 1.102;
        sizeConfig.outerSizeInch = 2.125;
    }
    else if (holeSize === 'M32') {
        sizeConfig.sizeInch = 1.181;
        sizeConfig.boundarySizeInch = 1.181;
        sizeConfig.outerSizeInch = 2.125;
    }
    else if (holeSize === 'M36') {
        sizeConfig.sizeInch = 1.417;
        sizeConfig.boundarySizeInch = 1.417;
        sizeConfig.outerSizeInch = 2.500;
    }
    else if (holeSize === 'M40') {
        sizeConfig.sizeInch = 1.575;
        sizeConfig.boundarySizeInch = 1.575;
        sizeConfig.outerSizeInch = 2.500;
    }
    else if (holeSize === 'M50') {
        sizeConfig.sizeInch = 1.968;
        sizeConfig.boundarySizeInch = 1.968;
        sizeConfig.outerSizeInch = 3.375;
    }
    else if (holeSize === 'M63') {
        sizeConfig.sizeInch = 2.480;
        sizeConfig.boundarySizeInch = 2.480;
        sizeConfig.outerSizeInch = 4.630;
    }
    else if (holeSize === 'M75') {
        sizeConfig.sizeInch = 2.953;
        sizeConfig.boundarySizeInch = 2.953;
        sizeConfig.outerSizeInch = 5.500;
    }
    else if (holeSize === 'M80') {
        sizeConfig.sizeInch = 3.150;
        sizeConfig.boundarySizeInch = 3.150;
        sizeConfig.outerSizeInch = 5.500;
    }
    else if (holeSize.includes('275')) { // Circular Window Cutouts Sizes GL/GLX series
        sizeConfig.sizeInch = 4.63;
        sizeConfig.boundarySizeInch = 4.63;
        sizeConfig.outerSizeInch = 4.63;
    }
    else if (holeSize.includes('300')) {
        sizeConfig.sizeInch = 5.25;
        sizeConfig.boundarySizeInch = 5.25;
        sizeConfig.outerSizeInch = 5.25;
    }
    else if (holeSize.includes('375')) {
        sizeConfig.sizeInch = 6.25;
        sizeConfig.boundarySizeInch = 6.25;
        sizeConfig.outerSizeInch = 6.25;
    }
    else if (holeSize.includes('537')) {
        sizeConfig.sizeInch = 7.88;
        sizeConfig.boundarySizeInch = 7.88;
        sizeConfig.outerSizeInch = 7.88;
    }
    else if (holeSize.includes('600')) {
        sizeConfig.sizeInch = 8.88;
        sizeConfig.boundarySizeInch = 8.88;
        sizeConfig.outerSizeInch = 8.88;
    }
    else if (holeSize.includes('775')) {
        sizeConfig.sizeInch = 10.25;
        sizeConfig.boundarySizeInch = 10.25;
        sizeConfig.outerSizeInch = 10.25;
    }
    //else if (holeSize === 'M80') { //Commented due to duplicate name
    //    sizeConfig.sizeInch = 3.937;
    //    sizeConfig.boundarySizeInch = 6.375;
    //    sizeConfig.outerSizeInch = 6.375;
    //}
    else {
        sizeConfig = null;
    }

    return sizeConfig;
}

function getRectangularSizeInInch(cutoutSize) {
    var sizeConfig = new rectangularSizeConfiguration();

    if (cutoutSize.includes('R13')) {
        sizeConfig.heightInch = 1;
        sizeConfig.boundaryHeightInch = sizeConfig.outerHeightInch = 4.5;
        sizeConfig.widthInch = 3;
        sizeConfig.boundaryWidthInch = sizeConfig.outerWidthInch = 6.5;
    }
    else if (cutoutSize.includes('R24')) {
        sizeConfig.heightInch = 2;
        sizeConfig.boundaryHeightInch = sizeConfig.outerHeightInch = 5.5;
        sizeConfig.widthInch = 4;
        sizeConfig.boundaryWidthInch = sizeConfig.outerWidthInch = 7.5;
    }
    else if (cutoutSize.includes('R27')) {
        sizeConfig.heightInch = 2;
        sizeConfig.boundaryHeightInch = sizeConfig.outerHeightInch = 5.5;
        sizeConfig.widthInch = 7;
        sizeConfig.boundaryWidthInch = sizeConfig.outerWidthInch = 10.5;
    }
    else if (cutoutSize.includes('R34')) {
        sizeConfig.heightInch = 3.5;
        sizeConfig.boundaryHeightInch = sizeConfig.outerHeightInch = 7;
        sizeConfig.widthInch = 4;
        sizeConfig.boundaryWidthInch = sizeConfig.outerWidthInch = 7.5;
    }
    else if (cutoutSize.includes('R36')) {
        sizeConfig.heightInch = 3;
        sizeConfig.boundaryHeightInch = sizeConfig.outerHeightInch = 6.5;
        sizeConfig.widthInch = 6;
        sizeConfig.boundaryWidthInch = sizeConfig.outerWidthInch = 9.5;
    }
    else if (cutoutSize.includes('R47')) {
        sizeConfig.heightInch = 4;
        sizeConfig.boundaryHeightInch = sizeConfig.outerHeightInch = 7.5;
        sizeConfig.widthInch = 7;
        sizeConfig.boundaryWidthInch = sizeConfig.outerWidthInch = 10.5;
    }
    else if (cutoutSize.includes('R59')) {
        sizeConfig.heightInch = 5;
        sizeConfig.boundaryHeightInch = sizeConfig.outerHeightInch = 8.5;
        sizeConfig.widthInch = 9;
        sizeConfig.boundaryWidthInch = sizeConfig.outerWidthInch = 12.5;
    }
    else if (cutoutSize.includes('R99')) {
        sizeConfig.heightInch = 9;
        sizeConfig.boundaryHeightInch = sizeConfig.outerHeightInch = 12.5;
        sizeConfig.widthInch = 9;
        sizeConfig.boundaryWidthInch = sizeConfig.outerWidthInch = 12.5;
    }
    else {
        sizeConfig = null;
    }

    //Swap Height and Width if the rotated 90*
    if (cutoutSize.includes('90°')) {
        if (sizeConfig != null) {
            [sizeConfig.heightInch, sizeConfig.widthInch] = [sizeConfig.widthInch, sizeConfig.heightInch];
            [sizeConfig.boundaryHeightInch, sizeConfig.boundaryWidthInch] = [sizeConfig.boundaryWidthInch, sizeConfig.boundaryHeightInch];
            [sizeConfig.outerHeightInch, sizeConfig.outerWidthInch] = [sizeConfig.outerWidthInch, sizeConfig.outerHeightInch];
        }
    }

    return sizeConfig;
};