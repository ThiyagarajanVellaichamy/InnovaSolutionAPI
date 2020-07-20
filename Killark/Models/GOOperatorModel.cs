using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Killark.Models
{
    public class GOPushButtons
    {
        public List<string> OperatorSubType { get; set; }

        public GOPushButtonsColorType PushButtonColorType { get; set; }

        public class GOPushButtonsColorType
        {
            public List<string> ColorOption { get; set; }

            public GOPushButtonsType PushButtonType { get; set; }
        }

        public class GOPushButtonsType
        {
            public List<string> ContactConfiguration { get; set; }

            public List<string> RightButtonContactConfiguration { get; set; }

            public List<string> NamePlateOptions { get; set; }

            public List<string> AccessoryOptions { get; set; }

            public List<string> LockoutOptions { get; set; }
        }
    }

    public  class GOPilotLights
    {
        public List<string> OperatorSubType { get; set; }

        public GZPilotLightsType PilotLightType { get; set; }

        public class GOPilotLightsType
        {
            public List<string> ColorOption { get; set; }

            public List<string> PilotLightVoltage { get; set; }

            public List<string> ContactConfiguration { get; set; }

            public List<string> NamePlateOptions { get; set; }

            public List<string> AccessoryOptions { get; set; }
        }
    }

    public class GOSelectorSwitches
    {
        public List<string> OperatorSubType { get; set; }

        public GOSelectorSwitchPositionType SelectorSwitchPositionType { get; set; }

        public class GOSelectorSwitchPositionType
        {
            public List<string> SwitchPositionType { get; set; }

            public GOSelectorSwitchesType SelectorSwitchType { get; set; }
        }

        public class GOSelectorSwitchesType
        {
            public List<string> ContactConfiguration { get; set; }

            public List<string> NamePlateOptions { get; set; }

            public List<string> AccessoryOptions { get; set; }

            public List<string> LockoutOptions { get; set; }

            public List<string> LockoutType { get; set; }
        }
    }

    public class GOSpecialityOpeators
    {
        public List<string> OperatorSubType { get; set; }
    }

    public class GOReadoutModel
    {
        public string EXBType { get; set; } = string.Empty;

        public string MainOperatorType { get; set; } = string.Empty;

        public string OperatorType { get; set; } = string.Empty;

        public string InsertColor { get; set; } = string.Empty;

        public string VoltageOption { get; set; } = string.Empty;

        public string ContactType { get; set; } = string.Empty;

        public string ContactType_R { get; set; } = string.Empty;

        public string NamePlateOption { get; set; } = string.Empty;

        public string AccessoryOption { get; set; } = string.Empty;

        public string LockoutOption { get; set; } = string.Empty;

        public string LockoutPosition { get; set; } = string.Empty;

        public string ResistanceOption { get; set; } = string.Empty;

        public string BoltOption { get; set; } = string.Empty;
    }
}