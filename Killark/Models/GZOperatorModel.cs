using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Killark.Models
{
    public class GZPushButtons
    {
        public List<string> OperatorSubType { get; set; }

        public GZPushButtonsType PushButtonType { get; set; }
    }

    public class GZPushButtonsType
    {       
        public List<string> InsertColor { get; set; }

        public List<string> ContactConfiguration { get; set; }

        public List<string> SpecifyLEDVoltage { get; set; }

        public List<string> AccessoryOptions { get; set; }

        public List<string> LockoutOptions { get; set; }

        public List<string> NamePlateOptions { get; set; }
    }

    public  class GZPilotLights
    {
        public GZPilotLightsType PilotLightType { get; set; }
    }

    public class GZPilotLightsType
    {
        public List<string> SpecifyLensColor { get; set; }

        public List<string> SpecifyLEDVoltage { get; set; }

        public List<string> AccessoryOptions { get; set; }

        public List<string> LockoutOptions { get; set; }

        public List<string> NamePlateOptions { get; set; }
    }

    public class GZSelectorSwitches
    {
        public List<string> OperatorSubType { get; set; }

        public GZSelectorSwitchesType SelectorSwitchType { get; set; }
    }

    public class GZSelectorSwitchesType
    {
        public List<string> SpecifySwitchType { get; set; }

        public GZSelectorSwitchesSubType SelectorSwitchSubType { get; set; }
    }

    public class GZSelectorSwitchesSubType
    {       
        public List<string> ContactConfiguration { get; set; }

        public List<string> AccessoryOptions { get; set; }

        public List<string> LockoutOptions { get; set; }

        public List<string> LockoutPosition { get; set; }

        public List<string> NamePlateOptions { get; set; }
    }

    public class GZSpecialityOpeators
    {
        public List<string> OperatorSubType { get; set; }

        public GZSpecialityOpeatorsType SpecialityOpeatorType { get; set; }
    }

    public class GZSpecialityOpeatorsType
    {        
        public List<string> SpecifyResistanceSubType { get; set; }

        public List<string> AccessoryOptions { get; set; }

        public List<string> LockoutOptions { get; set; }

        public List<string> NamePlateOptions { get; set; }
    }

    public class GZReadoutModel
    {
        public string EXBType { get; set; } = string.Empty;

        public string MainOperatorType { get; set; } = string.Empty;

        public string OperatorType { get; set; } = string.Empty;

        public string InsertColor { get; set; } = string.Empty;

        public string VoltageOption { get; set; } = string.Empty;

        public string ContactType { get; set; } = string.Empty;

        public string NamePlateOption { get; set; } = string.Empty;

        public string AccessoryOption { get; set; } = string.Empty;

        public string LockoutOption { get; set; } = string.Empty;

        public string ResistanceOption { get; set; } = string.Empty;
    }
}