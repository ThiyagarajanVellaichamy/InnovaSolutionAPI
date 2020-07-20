using Killark.Models;
using System.Collections.Generic;

namespace Killark.ViewModel
{
    public class HoleConfigurationViewModel
    {
        public ConfigurationViewModel ConfigurationModel { get; set; }
    }

    public class ConfigurationViewModel
    {
        public CoverViewModel CoverViewModel { get; set; }
    }

    public class CoverViewModel
    {
        public GZViewModel GZViewModel { get; set; }

        public GOViewModel GOViewModel { get; set; }

        public WindowViewModel WindowViewModel { get; set; }
    }

    public class WindowViewModel
    {
        public List<WindowOptionType> WindowOption { get; set; }

        public int SelectedCircularWindowOption { get; set; }

        public int SelectedRectangularWindowOption { get; set; }
    }

    public class GZViewModel
    {
        public GZPushButtons PushButtons { get; set; }

        public GZPilotLights PilotLights { get; set; }

        public GZSelectorSwitches SelectorSwitches { get; set; }

        public GZSpecialityOpeators SpecialityOpeators { get; set; }
    }

    public class GOViewModel
    {
        public GOPushButtons PushButtons { get; set; }

        public GOPilotLights PilotLights { get; set; }

        public GOSelectorSwitches SelectorSwitches { get; set; }

        public GOSpecialityOpeators SpecialityOpeators { get; set; }
    }
}