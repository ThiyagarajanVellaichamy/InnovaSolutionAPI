//Global Enclosure Model
var globalEnclosureModel;

//View Enum Model
var holeViewEnum = Object.freeze({
    COVER: "COVER", TOP: "TOP",
    BOTTOM: "BOTTOM", LEFT: "LEFT", RIGHT: "RIGHT"
});

//Hole Type Enum Model
var holeMasterTypeEnum = Object.freeze({
    GOOPERATOR: "GO Operator", GZOPERATOR: "GZ Operator", WINDOWOPTION: "Window Option",
    ANSI: "ANSI", METRIC: "Metric",
});

//Hole Type Enum Model
var holeTypeEnum = Object.freeze({
    PUSHBUTTON: "Push Buttons", PILOTLIGHT: "Pilot Light", SELECTORSWITCH: "Selector Switches",
    SPECIALITYOPERATOR: "Speciality Operator", BLANKHOLE: "Blank Hole", RECTANGULAR: "Rectangular",
    CIRCULAR: "Circular", ANSI: "ANSI", METRIC: "Metric",
});

//Enclosure Selection Model
var enclosureSelectionModel = {
    enclosureType: '',
    dimension: '',
    catalogNo: '',
    internalDimension: '',
    externalDimension: '',
    maxOperatorCount: '',
    maxRectangularCutoutCount: '',
    maxCircularCutoutCount: '',
    maxSize: '',
    weightLBS: '',
    internalGroundingKit: '',
    externalGroundingKit: '',
    boltOption: '',
    hingeOption: '',
    backPanelNumber: '',
    lengthDesignator: '',
    selectedHingeOption: '',
    selectedHingeOrientation: '',
    selectedBackPanel: '',
    selectedInternalGroundingKit: '',
    selectedExternalGroundingKit: '',    
    selectedBoltOption: '',
    selectedFinishType: '',
    summaryData: ''
};

//Configuration Model
var configuration = {
    //Display variables
    displayID: "C1",
    displayNumber: 1,
    view: holeViewEnum.COVER,
    masterType: holeTypeEnum.GZOPERATOR,
    type: holeTypeEnum.BLANKHOLE,
    subtype: "",
    hsize: '3/4-14 NPSM', // Size for display and user selection
    catalogNo: "",
    insertColor: "",
    voltageOption: "",
    contactType: "",
    contactType_R: "",
    namePlateOption: "",
    accessoryOption: "",
    lockoutOption: "",
    lockoutPosition: "",
    customText1: "",
    customText2: "",
    customText3: "",
    customText4: "",
    xPoint: 0, // X Coordinate in SVG - Point
    yPoint: 0, // Y Coordinate in SVG - Point
    //Calculation Variables
    objectID: null, // GUID
    xInches: 0, // X Value in inches
    yInches: 0, // Y Value in Inches
    groupElement: null, // SVG Group Element Object
    sizeConfiguration: null //Complete set of values required for configuration
};

//GO Readout String Model
var goReadoutModel = {
    EXBType: '',
    MainOperatorType: '',
    OperatorType: '',
    InsertColor: '',
    VoltageOption: '',
    ContactType: '',
    ContactType_R: '',
    NamePlateOption: '',
    AccessoryOption: '',
    LockoutOption: '',
    LockoutPosition: '',
    ResistanceOption: '',
    BoltOption: ''
};

//GZ Readout String Model
var gzReadoutModel = {
    EXBType: '',
    MainOperatorType: '',
    OperatorType: '',
    InsertColor: '',
    VoltageOption: '',
    ContactType: '',
    NamePlateOption: '',
    AccessoryOption: '',
    LockoutOption: '',
    LockoutPosition: '',
    ResistanceOption: '',
};

