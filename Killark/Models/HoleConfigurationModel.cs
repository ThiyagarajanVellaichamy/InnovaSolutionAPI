using System.Collections.Generic;

namespace Killark.Models
{
    public class ComponentOption
    {
        public string Component { get; set; }

        public string SupportedFace { get; set; }

        public string SupportedSize { get; set; }
    }

    public class WindowOptionType
    {
        public string Type { get; set; }

        public string MaxNoOfRectangularWindow { get; set; }

        public string MaxNoOfCircularWindow { get; set; }

        public List<string> WindowOption { get; set; }
    }

    public class GeneralInput
    {
        public string SO { get; set; }

        public string EXB_BOX_SERIES_TYPE { get; set; }

        public string EXB_BOX_ASSEMBLY_TYPE { get; set; }

        public string BACK_PANEL { get; set; }

        public string MOUNTING_FEET { get; set; }

        public string MOUNTING_FEET_ORIENTATION { get; set; }

        public string HINGE { get; set; }

        public string ENCLOSURE_TYPE { get; set; }

        public string HINGE_ORIENTATION { get; set; }

        public string FINISH_TYPE { get; set; }

        public string EXTERNAL_GROUNDING_KIT { get; set; }

        public string INTERNAL_GROUNDING_KIT { get; set; }

        public string SPECIFY_PAINT { get; set; }

        public string CERTIFICATION_TYPE { get; set; }

        public string BOLT_MATERIAL_AND_HOLE_TYPE { get; set; }

        public string CUSTOMER_NAME { get; set; }

        public string COMPANY_NAME { get; set; }

        public string DESIGNER { get; set; }

        public string CHECKED_BY { get; set; }

        public string SALES_NUMBER { get; set; }

        public string QUOTE_NUMBER { get; set; }

        public string LINE_NUMBER { get; set; }

        public string DATE { get; set; }

        public string REVISION { get; set; }

        public string CUSTOMER_APPROVAL { get; set; }

        public string BOX_MODIFICATION { get; set; }

        public string COVER_MODIFICATION { get; set; }

        public string PAN_MODIFICATION { get; set; }

        public string DATE_TIME { get; set; }

        public string ENGINEER { get; set; }

        public string VAULT_CHECKIN { get; set; }

        public byte[] SUMMARY_DATA { get; set; }
    }

    public class OperatorInput
    {
        public string SO { get; set; }

        public string BOX_ASSY_TYPE { get; set; }

        public string HOLE_LOCATION { get; set; }

        public string DIST_X { get; set; }

        public string DIST_Y { get; set; }

        public string CATALOG_NUMBER { get; set; }

        public string THREAD_TYPE { get; set; }

        public string MAIN_OPERATOR_TYPE { get; set; }

        public string OPERATOR_TYPE { get; set; }

        public string INSERT_COLOR { get; set; }

        public string CONTACT_CONIG { get; set; }

        public string LED_VOLTAGE { get; set; }

        public string ACCESSORY_OPTION { get; set; }

        public string LOCKOUT_OPTION { get; set; }

        public string LOCKOUT_POSITION { get; set; }

        public string LEGEND_PLATE_TEXT { get; set; }

        public string CUSTOM_TEXT1 { get; set; }

        public string CUSTOM_TEXT2 { get; set; }

        public string CUSTOM_TEXT3 { get; set; }

        public string CUSTOM_TEXT4 { get; set; }

        public string CHECK_STATUS { get; set; }

        public string DATE_TIME { get; set; }

        public string ENGINEER { get; set; }
    }

    public class WindowOptionInput
    {
        public string SO { get; set; }

        public string BOX_ASSY_TYPE { get; set; }

        public string CUTOUT_SHAPE { get; set; }

        public string CUTOUT_TYPE { get; set; }

        public float ORIENTATION { get; set; }

        public string DIST_X { get; set; }

        public string DIST_Y { get; set; }

        public string CHECK_STATUS { get; set; }

        public string DATE_TIME { get; set; }

        public string ENGINEER { get; set; }
    }

    public class HoleInput
    {
        public string SO { get; set; }

        public string BOX_ASSY_TYPE { get; set; }

        public string HOLE_LOCATION { get; set; }

        public string DIST_X { get; set; }

        public string DIST_Y { get; set; }

        public string HOLE_COMPONENT { get; set; }

        public string HOLE_COMPONENT_TYPE { get; set; }

        public string HOLE_TYPE { get; set; }

        public string HOLE_SIZE { get; set; }

        public string HOLE_TERMINATION { get; set; }

        public string HOLE_DEPTH { get; set; }

        public string CHECK_STATUS { get; set; }

        public string DATE_TIME { get; set; }

        public string ENGINEER { get; set; }

    }

    public class SizeConfiguration
    {
        public double SizeInch { get; set; }

        public double BoundarySizeInch { get; set; }

        public double OuterSizeInch { get; set; }
    }

    public class Attr
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Style { get; set; }

        public string Class { get; set; }
    }

    public class Attr2
    {
        public string Cx { get; set; }

        public string Cy { get; set; }

        public string R { get; set; }

        public string Id { get; set; }

        public string Name { get; set; }

        public string Class { get; set; }

        public string X { get; set; }

        public string Y { get; set; }

        public string Style { get; set; }
    }

    public class Attr3
    {
        public string Text { get; set; }
    }

    public class ChildNode2
    {
        public string Type { get; set; }

        public Attr3 Attr { get; set; }
    }

    public class ChildNode
    {
        public string Type { get; set; }

        public Attr2 Attr { get; set; }

        public List<ChildNode2> ChildNodes { get; set; }
    }

    public class GroupElement
    {
        public string Type { get; set; }

        public Attr Attr { get; set; }

        public List<ChildNode> ChildNodes { get; set; }
    }

    public class RootObject
    {
        public string ObjectID { get; set; }

        public string View { get; set; }

        public string MasterType { get; set; }

        public string Type { get; set; }

        public string Subtype { get; set; }

        public string Hsize { get; set; }

        public string CatalogNo { get; set; }

        public string InsertColor { get; set; }

        public string VoltageOption { get; set; }

        public string ContactType { get; set; }

        public string ContactType_R { get; set; }

        public string NamePlateOption { get; set; }

        public string AccessoryOption { get; set; }

        public string LockoutOption { get; set; }

        public string LockoutPosition { get; set; }

        public string CustomText1 { get; set; }

        public string CustomText2 { get; set; }

        public string CustomText3 { get; set; }

        public string CustomText4 { get; set; }

        public string DisplayID { get; set; }

        public int DisplayNumber { get; set; }

        public SizeConfiguration SizeConfiguration { get; set; }

        public double XPoint { get; set; }

        public double YPoint { get; set; }

        public double XInches { get; set; }

        public double YInches { get; set; }

        public GroupElement GroupElement { get; set; }
    }

    public class EnclosureDataModel
    {
        public string EnclosureType { get; set; }

        public string CatalogNo { get; set; }

        public string SelectedHingeOption { get; set; }

        public string SelectedHingeOrientation { get; set; }

        public string SelectedBackPanel { get; set; }

        public string SelectedInternalGroundingKit { get; set; }

        public string SelectedExternalGroundingKit { get; set; }

        public string SelectedBoltOption { get; set; }

        public string SelectedFinishType { get; set; }

        public string SummaryData { get; set; }
    }
}