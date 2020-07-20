using Killark.Models;
using ServiceProvider.Contracts.Common;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading;

namespace Killark.Data
{
    public class Database
    {
        private SqlConnection Connection;

        public Database(IAppSetting appSettings)
        {
            //try
            //{
            //    Connection = new SqlConnection(appSettings.Connection);
            //    Connection.Open();
            //    Thread.Sleep(50);
            //    Connection.Close();
            //}
            //catch (SqlException ex)
            //{
            //    throw ex;
            //}
        }

        #region Enclosure

        public List<EnclosureDimension> GetEnclosureDimension(string EnclosureType)
        {
            List<EnclosureDimension> Dimension = new List<EnclosureDimension>();
            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[Enclosure] WHERE EnclosureType = @EnclosureType";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                SqlCommand.Parameters.AddWithValue("@EnclosureType", EnclosureType);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);
                foreach (DataRow value in Data.Rows)
                {
                    Dimension.Add(new EnclosureDimension
                    {
                        Dimension = Convert.ToString(value["EnclosureDimension"]),
                        CatalogNumber = Convert.ToString(value["CatalogNumber"]),
                        EnclosureType = Convert.ToString(value["EnclosureType"]),
                        ExternalDimension = Convert.ToString(value["ExternalDimension"]),
                        InternalDimension = Convert.ToString(value["InternalDimension"]),
                        MaxSize = Convert.ToString(value["MaxSize"]),
                        OperatorsCount = Convert.ToString(value["OperatorsCount"]),
                        WeightLBS = Convert.ToString(value["WeightLBS"]),
                        InternalGroundingKit = Convert.ToString(value["InternalGroundingKit"]),
                        ExternalGroundingKit = Convert.ToString(value["ExternalGroundingKit"]),
                        BoltOption = Convert.ToString(value["BoltOption"]),
                        MountingPanNumber = Convert.ToString(value["MountingPanNumber"]),
                        HingeOption = Convert.ToString(value["HingeOption"]),
                    });
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return Dimension;
        }

        public EnclosureDimension GetEnclosureDimensionInfo(string CatalogNumber)
        {
            List<EnclosureDimension> EnclosureInfo = new List<EnclosureDimension>();
            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[Enclosure] WHERE CatalogNumber = @CatalogNumber";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                SqlCommand.Parameters.AddWithValue("@CatalogNumber", CatalogNumber);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);

                foreach (DataRow value in Data.Rows)
                {
                    EnclosureInfo.Add(
                        new EnclosureDimension
                        {
                            Dimension = Convert.ToString(value["EnclosureDimension"]),
                            CatalogNumber = Convert.ToString(value["CatalogNumber"]),
                            EnclosureType = Convert.ToString(value["EnclosureType"]),
                            ExternalDimension = Convert.ToString(value["ExternalDimension"]),
                            InternalDimension = Convert.ToString(value["InternalDimension"]),
                            MaxSize = Convert.ToString(value["MaxSize"]),
                            OperatorsCount = Convert.ToString(value["OperatorsCount"]),
                            WeightLBS = Convert.ToString(value["WeightLBS"]),
                            InternalGroundingKit = Convert.ToString(value["InternalGroundingKit"]),
                            ExternalGroundingKit = Convert.ToString(value["ExternalGroundingKit"]),
                            BoltOption = Convert.ToString(value["BoltOption"]),
                            MountingPanNumber = Convert.ToString(value["MountingPanNumber"]),
                            HingeOption = Convert.ToString(value["HingeOption"]),
                        });
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return EnclosureInfo.First();
        }

        #endregion

        #region Window Option

        public List<WindowOptionType> GetCutoutOption(string TableName)
        {
            List<WindowOptionType> tablelist = new List<WindowOptionType>();
            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + TableName + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter sd = new SqlDataAdapter(SqlCommand);
                DataTable dt = new DataTable();
                sd.Fill(dt);

                foreach (DataRow value in dt.Rows)
                {
                    tablelist.Add(
                        new WindowOptionType
                        {
                            Type = Convert.ToString(value["type"]),
                            MaxNoOfRectangularWindow = Convert.ToString(value["maximum_number_of_rectangular_windows"]),
                            MaxNoOfCircularWindow = Convert.ToString(value["maximum_number_of_circular_windows"]),
                            WindowOption = new List<string>()
                            {
                                Convert.ToString(value["windowQty1"]),
                                Convert.ToString(value["windowQty2"]),
                                Convert.ToString(value["windowQty3"]),
                                Convert.ToString(value["windowQty4"]),
                                Convert.ToString(value["windowQty5"])
                            }
                        });
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return tablelist;
        }

        #endregion

        #region Box View

        public List<ComponentOption> GetBoxComponent()
        {
            List<ComponentOption> Component = new List<ComponentOption>();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[BOX_Component]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);
                foreach (DataRow value in Data.Rows)
                {
                    Component.Add(new ComponentOption()
                    {
                        Component = Convert.ToString(value["Component"]),
                        SupportedFace = Convert.ToString(value["SupportedFace"]),
                        SupportedSize = Convert.ToString(value["SupportedSize"])
                    });
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return Component;
        }

        #endregion

        #region GZ Operator

        public List<string> GetGZOperatorSubType(string GZOperatorSubType, string ColumnString)
        {
            List<string> OperatorSubType = new List<string>();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + GZOperatorSubType + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);

                foreach (DataRow value in Data.Rows)
                {
                    if (!OperatorSubType.Contains(Convert.ToString(value[ColumnString])))
                    {
                        OperatorSubType.Add(Convert.ToString(value[ColumnString]));
                    }                                       
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return OperatorSubType;
        }

        public GZPushButtonsType GetGZOperatorPushButtonsType(string GZPushButton, string Row)
        {
            GZPushButtonsType PushButtonsType = new GZPushButtonsType();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + GZPushButton + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);

                foreach (DataRow value in Data.Rows)
                {
                    if (Convert.ToString(value["OperatorSubType"]) == Row)
                    {
                        PushButtonsType = new GZPushButtonsType()
                        {
                            InsertColor = Convert.ToString(value["InsertColor"]).Split('|').ToList(),
                            ContactConfiguration = Convert.ToString(value["ContactConfiguration"]).Split('|').ToList(),
                            SpecifyLEDVoltage = Convert.ToString(value["SpecifyLEDVoltage"]).Split('|').ToList(),
                            AccessoryOptions = Convert.ToString(value["AccessoryOptions"]).Split('|').ToList(),
                            LockoutOptions = Convert.ToString(value["LockoutOptions"]).Split('|').ToList(),
                            NamePlateOptions = Convert.ToString(value["NamePlateOptions"]).Split('|').ToList()
                        };

                        break;
                    }
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return PushButtonsType;
        }  

        public GZPilotLightsType GetGZOperatorPilotLightsType(string GZPilotLight)
        {
            GZPilotLightsType PilotLightType = new GZPilotLightsType();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + GZPilotLight + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);
                foreach (DataRow value in Data.Rows)
                {
                    PilotLightType = new GZPilotLightsType()
                    {
                        SpecifyLensColor = Convert.ToString(value["SpecifyLensColor"]).Split('|').ToList(),
                        SpecifyLEDVoltage = Convert.ToString(value["SpecifyLEDVoltage"]).Split('|').ToList(),
                        AccessoryOptions = Convert.ToString(value["AccessoryOptions"]).Split('|').ToList(),
                        LockoutOptions = Convert.ToString(value["LockoutOptions"]).Split('|').ToList(),
                        NamePlateOptions = Convert.ToString(value["NamePlateOptions"]).Split('|').ToList()
                    };
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return PilotLightType;
        }

        public List<string> GetGZOperatorSpecifySwitchType(string GZSelectorSwitch, string Row)
        {
            List<string> SpecifySwitchType = new List<string>();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + GZSelectorSwitch + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);

                foreach (DataRow value in Data.Rows)
                {
                    if(Convert.ToString(value["OperatorSubType"]) == Row)
                    {
                        SpecifySwitchType.Add(Convert.ToString(value["SpecifySwitchType"]));
                    }
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return SpecifySwitchType;
        }

        public GZSelectorSwitchesSubType GetGZOperatorSelectorSwitchesType(string GZSelectorSwitch, string Row)
        {
            GZSelectorSwitchesSubType SelectorSwitchSubType = new GZSelectorSwitchesSubType();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + GZSelectorSwitch + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);
                foreach (DataRow value in Data.Rows)
                {
                    if (Convert.ToString(value["SpecifySwitchType"]) == Row)
                    {
                        SelectorSwitchSubType = new GZSelectorSwitchesSubType()
                        {
                            ContactConfiguration = Convert.ToString(value["ContactConfiguration"]).Split('|').ToList(),
                            AccessoryOptions = Convert.ToString(value["AccessoryOptions"]).Split('|').ToList(),
                            LockoutOptions = Convert.ToString(value["LockoutOptions"]).Split('|').ToList(),
                            LockoutPosition = Convert.ToString(value["LockoutPosition"]).Split('|').ToList(),
                            NamePlateOptions = Convert.ToString(value["NamePlateOptions"]).Split('|').ToList()
                        };

                        break;
                    }
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return SelectorSwitchSubType;
        }

        public GZSpecialityOpeatorsType GetGZOperatorSpecialityOpeatorsType(string GZSpecialityOpeator, string Row)
        {
            GZSpecialityOpeatorsType SpecialityOpeatorType = new GZSpecialityOpeatorsType();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + GZSpecialityOpeator + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);
                foreach (DataRow value in Data.Rows)
                {
                    if (Convert.ToString(value["OperatorSubType"]) == Row)
                    {
                        SpecialityOpeatorType = new GZSpecialityOpeatorsType()
                        {
                            SpecifyResistanceSubType = Convert.ToString(value["SpecifyResistanceSubType"]).Replace("??", "Ω").Split('|').ToList(),
                            AccessoryOptions = Convert.ToString(value["AccessoryOptions"]).Split('|').ToList(),
                            LockoutOptions = Convert.ToString(value["LockoutOptions"]).Split('|').ToList(),
                            NamePlateOptions = Convert.ToString(value["NamePlateOptions"]).Split('|').ToList()
                        };

                        break;
                    }
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return SpecialityOpeatorType;
        }

        #endregion

        #region GO Operator

        public List<string> GetGOOperatorSubType
            (string GOOperatorSubType, string ColumnString)
        {
            List<string> OperatorSubType = new List<string>();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + GOOperatorSubType + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);

                foreach (DataRow value in Data.Rows)
                {
                    if (!OperatorSubType.Contains(Convert.ToString(value[ColumnString])))
                    {
                        OperatorSubType.Add(Convert.ToString(value[ColumnString]));
                    }
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return OperatorSubType;
        }

        public List<string> GetGOOperatorPushButtonColorType
            (string GOPushButtonColor, string OperatorSubType)
        {
            List<string> PushButtonColorType = new List<string>();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + GOPushButtonColor + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);

                foreach (DataRow value in Data.Rows)
                {
                    if (Convert.ToString(value["OperatorSubType"]) == OperatorSubType)
                    {
                        PushButtonColorType.Add(Convert.ToString(value["ColorOption"]));
                    }
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return PushButtonColorType;
        }

        public GOPushButtons.GOPushButtonsType GetGOOperatorPushButtonType
            (string GOPushButton, string OperatorSubType, string ColorOption)
        {
            GOPushButtons.GOPushButtonsType PushButtonType = new GOPushButtons.GOPushButtonsType();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + GOPushButton + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);

                foreach (DataRow value in Data.Rows)
                {
                    if ((Convert.ToString(value["OperatorSubType"]) == OperatorSubType)
                        && (Convert.ToString(value["ColorOption"]) == ColorOption))
                    {
                        PushButtonType = new GOPushButtons.GOPushButtonsType()
                        {
                            ContactConfiguration = Convert.ToString(value["ContactConfiguration"]).Split('|').ToList(),
                            RightButtonContactConfiguration = Convert.ToString(value["RightButtonContactConfiguration"]).Split('|').ToList(),
                            NamePlateOptions = Convert.ToString(value["NamePlateOptions"]).Split('|').ToList(),
                            AccessoryOptions = Convert.ToString(value["AccessoryOptions"]).Split('|').ToList(),
                            LockoutOptions = Convert.ToString(value["LockoutOptions"]).Split('|').ToList()
                        };

                        break;
                    }
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return PushButtonType;
        }

        public GOPilotLights.GOPilotLightsType GetGOOperatorPilotLightsType
            (string GOPilotLight, string OperatorSubType)
        {
            GOPilotLights.GOPilotLightsType PilotLightType = new GOPilotLights.GOPilotLightsType();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + GOPilotLight + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);

                foreach (DataRow value in Data.Rows)
                {
                    if (Convert.ToString(value["OperatorSubType"]) == OperatorSubType)
                    {
                        PilotLightType = new GOPilotLights.GOPilotLightsType()
                        {
                            ColorOption = Convert.ToString(value["ColorOption"]).Split('|').ToList(),
                            ContactConfiguration = Convert.ToString(value["ContactConfiguration"]).Split('|').ToList(),
                            PilotLightVoltage = Convert.ToString(value["PilotLightVoltage"]).Split('|').ToList(),
                            NamePlateOptions = Convert.ToString(value["NamePlateOptions"]).Split('|').ToList(),
                            AccessoryOptions = Convert.ToString(value["AccessoryOptions"]).Split('|').ToList()
                        };

                        break;
                    }
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return PilotLightType;
        }

        public List<string> GetGOOperatorSelectorSwitchPositionType
            (string GOSelectorSwitch, string OperatorSubType)
        {
            List<string> PositionType = new List<string>();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + GOSelectorSwitch + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);

                foreach (DataRow value in Data.Rows)
                {
                    if (Convert.ToString(value["OperatorSubType"]) == OperatorSubType)
                    {
                        PositionType.Add(Convert.ToString(value["SelectorSwitchPosition"]));
                    }
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return PositionType;
        }

        public GOSelectorSwitches.GOSelectorSwitchesType GetGOOperatorSelectorSwitchType
            (string GOSelectorSwitch, string OperatorSubType, string PositionType)
        {
            GOSelectorSwitches.GOSelectorSwitchesType SelectorSwitchType = new GOSelectorSwitches.GOSelectorSwitchesType();

            try
            {
                string SqlQuery = "SELECT * FROM [dbDesignAutomation].[dbo].[" + GOSelectorSwitch + "]";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlDataAdapter DataAdapter = new SqlDataAdapter(SqlCommand);
                DataTable Data = new DataTable();
                DataAdapter.Fill(Data);
                foreach (DataRow value in Data.Rows)
                {
                    if ((Convert.ToString(value["OperatorSubType"]) == OperatorSubType)
                        && (Convert.ToString(value["SelectorSwitchPosition"]) == PositionType))
                    {
                        SelectorSwitchType = new GOSelectorSwitches.GOSelectorSwitchesType()
                        {
                            ContactConfiguration = Convert.ToString(value["ContactConfiguration"]).Split('|').ToList(),
                            AccessoryOptions = Convert.ToString(value["AccessoryOptions"]).Split('|').ToList(),
                            LockoutOptions = Convert.ToString(value["LockoutOptions"]).Split('|').ToList(),
                            LockoutType = Convert.ToString(value["LockoutType"]).Split('|').ToList(),
                            NamePlateOptions = Convert.ToString(value["NamePlateOptions"]).Split('|').ToList()
                        };

                        break;
                    }
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return SelectorSwitchType;
        }

        #endregion

        #region Dashboard

        public List<DashboardModel> GetDashboardTableDetails(string engineer)
        {
            List<DashboardModel> dashboardlist = new List<DashboardModel>();
            try
            {
                string SqlQuery = "SELECT SO,EXB_BOX_ASSEMBLY_TYPE,DATE_TIME,STATUS FROM [dbDesignAutomation].[dbo].[EXB_GENERAL_INPUTS_WEB] WHERE ENGINEER=@engineer";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                SqlCommand.Parameters.AddWithValue("@engineer", engineer);
                SqlDataAdapter sd = new SqlDataAdapter(SqlCommand);
                DataTable dt = new DataTable();
                sd.Fill(dt);

                foreach (DataRow value in dt.Rows)
                {
                    dashboardlist.Add(
                        new DashboardModel
                        {
                            Id = Convert.ToString(value["SO"]),
                            ProductType = Convert.ToString(value["EXB_BOX_ASSEMBLY_TYPE"]),
                            TimeStamp = Convert.ToString(value["DATE_TIME"]),
                            Status = Convert.ToString(value["STATUS"]),
                        }
                        );
                }
                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return dashboardlist;
        }

        #endregion

        #region User Details

        public bool CheckLoginDetails(LoginViewModel LoginModel, out Dictionary<string, object> CustomerInfo)
        {
            bool Result = false;

            CustomerInfo = new Dictionary<string, object>();

            try
            {
                string SqlQuery = $"SELECT FIRST_NAME, LAST_NAME, COMPANY_NAME, EMAIL_ADDRESS, PASSWORD FROM " +
                    $"[dbDesignAutomation].[dbo].[USER_REGISTRATION] WHERE EMAIL_ADDRESS = @emailAddress AND PASSWORD = @password";

                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                SqlCommand.Parameters.AddWithValue("@emailAddress", LoginModel.EmailId.Trim().ToLower());
                SqlCommand.Parameters.AddWithValue("@password", LoginModel.Password);
                Connection.Open();
                SqlDataAdapter sd = new SqlDataAdapter(SqlCommand);
                DataTable dt = new DataTable();
                sd.Fill(dt);

                if (dt.Rows.Count != 0)
                {
                    CustomerInfo["FIRST_NAME"] = dt.Rows[0]["FIRST_NAME"];
                    CustomerInfo["LAST_NAME"] = dt.Rows[0]["LAST_NAME"];
                    CustomerInfo["COMPANY_NAME"] = dt.Rows[0]["COMPANY_NAME"];
                    CustomerInfo["EMAIL_ADDRESS"] = dt.Rows[0]["EMAIL_ADDRESS"];

                    Result = true;
                }

                Connection.Close();
            }
            catch
            {

            }

            return Result;
        }

        public string RegisterUser(RegisterViewModel registerModel)
        {
            try
            {
                string SqlQuery = $"Insert into [dbDesignAutomation].[dbo].[USER_REGISTRATION] " +
                    $"(FIRST_NAME, LAST_NAME, COMPANY_NAME, EMAIL_ADDRESS, PASSWORD," +
                    $"TITLE, JOB_TITLE, BUSINESS_CLASS, ADDRESS, ADDRESS_CONT," +
                    $"CITY, COUNTRY_STATE, POSTCODE, COUNTRY, TELEPHONE, FAX) " +
                    $"values(@FIRST_NAME, @LAST_NAME, @COMPANY_NAME, @EMAIL_ADDRESS, @PASSWORD," +
                    $"@TITLE, @JOB_TITLE, @BUSINESS_CLASS, @ADDRESS, @ADDRESS_CONT," +
                    $"@CITY, @COUNTRY_STATE, @POSTCODE, @COUNTRY, @TELEPHONE, @FAX)";

                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                SqlCommand.Parameters.AddWithValue("@FIRST_NAME", registerModel.FirstName);
                SqlCommand.Parameters.AddWithValue("@LAST_NAME", registerModel.LastName);
                SqlCommand.Parameters.AddWithValue("@COMPANY_NAME", registerModel.Company);
                SqlCommand.Parameters.AddWithValue("@EMAIL_ADDRESS", registerModel.EmailId.Trim().ToLower());
                SqlCommand.Parameters.AddWithValue("@PASSWORD", registerModel.Password);
                SqlCommand.Parameters.AddWithValue("@TITLE",
                    string.IsNullOrWhiteSpace(registerModel.Title) ? string.Empty : registerModel.Title);
                SqlCommand.Parameters.AddWithValue("@JOB_TITLE",
                    string.IsNullOrWhiteSpace(registerModel.JobTitle) ? string.Empty : registerModel.JobTitle);
                SqlCommand.Parameters.AddWithValue("@BUSINESS_CLASS",
                    string.IsNullOrWhiteSpace(registerModel.BusinessClass) ? string.Empty : registerModel.BusinessClass);
                SqlCommand.Parameters.AddWithValue("@ADDRESS",
                    string.IsNullOrWhiteSpace(registerModel.Address) ? string.Empty : registerModel.Address);
                SqlCommand.Parameters.AddWithValue("@ADDRESS_CONT",
                    string.IsNullOrWhiteSpace(registerModel.AddressCont) ? string.Empty : registerModel.AddressCont);
                SqlCommand.Parameters.AddWithValue("@CITY",
                    string.IsNullOrWhiteSpace(registerModel.City) ? string.Empty : registerModel.City);
                SqlCommand.Parameters.AddWithValue("@COUNTRY_STATE",
                    string.IsNullOrWhiteSpace(registerModel.CountryState) ? string.Empty : registerModel.CountryState);
                SqlCommand.Parameters.AddWithValue("@POSTCODE",
                    string.IsNullOrWhiteSpace(registerModel.Postcode) ? string.Empty : registerModel.Postcode);
                SqlCommand.Parameters.AddWithValue("@COUNTRY",
                    string.IsNullOrWhiteSpace(registerModel.Country) ? string.Empty : registerModel.Country);
                SqlCommand.Parameters.AddWithValue("@TELEPHONE",
                    string.IsNullOrWhiteSpace(registerModel.Telephone) ? string.Empty : registerModel.Telephone);
                SqlCommand.Parameters.AddWithValue("@FAX",
                    string.IsNullOrWhiteSpace(registerModel.Fax) ? string.Empty : registerModel.Fax);
                                               
                Connection.Open();
                SqlCommand.ExecuteNonQuery();

                Connection.Close();
            }
            catch (SqlException ex)
            {
                return ex.Message.ToString();
            }

            return string.Empty;
        }

        public bool ValidateToken(string TokenValue)
        {
            bool IsValidated = false;
            try
            {
                Connection.Open();
                SqlCommand SqlCommand = new SqlCommand("NewPasswordChange", Connection);
                SqlCommand.CommandType = CommandType.StoredProcedure;
                SqlCommand.Parameters.AddWithValue("@ForgotPasswordToken", TokenValue);
                SqlCommand.Parameters.AddWithValue("@ExpiredTime", DateTime.UtcNow);
                SqlCommand.Parameters.AddWithValue("@StatementType", "TokenValid");
                SqlCommand.Parameters.Add("@Exists", SqlDbType.Char, 500);
                SqlCommand.Parameters["@Exists"].Direction = ParameterDirection.Output;
                SqlCommand.ExecuteNonQuery();
                string message = (string)SqlCommand.Parameters["@Exists"].Value;
                Connection.Close();
                if ((Convert.ToInt32(message.ToString())) == 1)
                {
                    IsValidated = true;
                }
                else
                {
                    IsValidated = false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return IsValidated;
        }

        public bool RegisterToken(string EmailId, string TokenValue, DateTime TokenExpTime, string ResetLink)
        {
            bool isValid = false;
            try
            {
                Connection.Open();
                SqlCommand SqlCommand = new SqlCommand("ForgotPasswordProcedure", Connection);
                SqlCommand.CommandType = CommandType.StoredProcedure;
                SqlCommand.Parameters.AddWithValue("@EMAIL_ADDRESS", EmailId.Trim().ToLower());
                SqlCommand.Parameters.AddWithValue("@ForgotPasswordToken", TokenValue);
                SqlCommand.Parameters.AddWithValue("@ExpiredTime", TokenExpTime);
                SqlCommand.Parameters.Add("@Exists", SqlDbType.Char, 500);
                SqlCommand.Parameters["@Exists"].Direction = ParameterDirection.Output;
                SqlCommand.ExecuteNonQuery();
                string message = (string)SqlCommand.Parameters["@Exists"].Value;
                Connection.Close();
                if ((Convert.ToInt32(message.ToString())) == 0)
                {
                    isValid = false;
                }
                else
                {
                    isValid = true;
                }
            }
            catch (Exception ex)
            {
                var errormessage = ex.Message;
            }
            return isValid;
        }

        public bool UpdatePassword(string TokenValue, string Password, DateTime CurrentTime, string StatementType)
        {
            bool IsValidated = false;
            try
            {
                Connection.Open();
                SqlCommand SqlCommand = new SqlCommand("NewPasswordChange", Connection);
                SqlCommand.CommandType = CommandType.StoredProcedure;
                SqlCommand.Parameters.AddWithValue("@ForgotPasswordToken", TokenValue);
                SqlCommand.Parameters.AddWithValue("@PASSWORD", Password);
                SqlCommand.Parameters.AddWithValue("@ExpiredTime", CurrentTime);
                SqlCommand.Parameters.AddWithValue("@StatementType", StatementType);
                SqlCommand.Parameters.Add("@Exists", SqlDbType.Char, 500);
                SqlCommand.Parameters["@Exists"].Direction = ParameterDirection.Output;
                SqlCommand.ExecuteNonQuery();
                string message = (string)SqlCommand.Parameters["@Exists"].Value;
                var outputval = Convert.ToInt32(message.ToString());
                Connection.Close();
                if ((Convert.ToInt32(message.ToString())) == 1)
                {
                    IsValidated = true;
                }
                else
                {
                    IsValidated = false;
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            return IsValidated;
        }

        public string GetOldPassword(string TokenValue)
        {
            string OldPassword = string.Empty;

            try
            {
                string SqlQuery = "SELECT PASSWORD FROM [dbDesignAutomation].[dbo].[USER_REGISTRATION] WHERE ForgotPasswordToken=@ForgotPasswordToken";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlCommand.Parameters.AddWithValue("@ForgotPasswordToken", TokenValue);
                SqlDataAdapter sd = new SqlDataAdapter(SqlCommand);
                DataTable dt = new DataTable();
                sd.Fill(dt);
                foreach (DataRow value in dt.Rows)
                {
                    OldPassword = Convert.ToString(value["PASSWORD"]);
                }

                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return OldPassword;
        }

        public bool CheckUserAvailable(string Username)
        {
            bool Status = false;

            try
            {
                string SqlQuery = "SELECT EMAIL_ADDRESS FROM [dbDesignAutomation].[dbo].[USER_REGISTRATION] WHERE EMAIL_ADDRESS = @emailAddress";
                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                Connection.Open();
                SqlCommand.Parameters.AddWithValue("@emailAddress", Username.Trim().ToLower());
                SqlDataAdapter sd = new SqlDataAdapter(SqlCommand);
                DataTable dt = new DataTable();
                sd.Fill(dt);

                if(dt.Rows.Count != 0)
                {
                    Status = true;
                }

                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            return Status;
        }

        #endregion

        #region Insert Values for Render 

        public int InsertOperatorInputs(OperatorInput Operator)
        {
            try
            {
                string SqlQuery = $"Insert into [dbDesignAutomation].[dbo].[EXB_GZ_OPERATOR_INPUTS_WEB] " +
                    $"(SO,BOX_ASSY_TYPE,HOLE_LOCATION,DIST_X,DIST_Y,CATALOG_NUMBER,THREAD_TYPE,MAIN_OPERATOR_TYPE," +
                    $"OPERATOR_TYPE,INSERT_COLOR,CONTACT_CONIG,LED_VOLTAGE,ACCESSORY_OPTION,LOCKOUT_OPTION," +
                    $"LOCKOUT_POSITION,LEGEND_PLATE_TEXT,CUSTOM_TEXT1,CUSTOM_TEXT2,CUSTOM_TEXT3,CUSTOM_TEXT4,CHECK_STATUS,DATE_TIME,ENGINEER)" +
                    $" values(@SO,@BOX_ASSY_TYPE,@HOLE_LOCATION,@DIST_X,@DIST_Y,@CATALOG_NUMBER,@THREAD_TYPE,@MAIN_OPERATOR_TYPE," +
                    $"@OPERATOR_TYPE,@INSERT_COLOR,@CONTACT_CONIG,@LED_VOLTAGE,@ACCESSORY_OPTION," +
                    $"@LOCKOUT_OPTION,@LOCKOUT_POSITION,@LEGEND_PLATE_TEXT,@CUSTOM_TEXT1,@CUSTOM_TEXT2,@CUSTOM_TEXT3," +
                    $"@CUSTOM_TEXT4,@CHECK_STATUS,@DATE_TIME,@ENGINEER)";

                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                SqlCommand.Parameters.AddWithValue("@SO", Operator.SO);
                SqlCommand.Parameters.AddWithValue("@BOX_ASSY_TYPE", Operator.BOX_ASSY_TYPE);
                SqlCommand.Parameters.AddWithValue("@HOLE_LOCATION", Operator.HOLE_LOCATION);
                SqlCommand.Parameters.AddWithValue("@DIST_X", Operator.DIST_X);
                SqlCommand.Parameters.AddWithValue("@DIST_Y", Operator.DIST_Y);
                SqlCommand.Parameters.AddWithValue("@CATALOG_NUMBER", Operator.CATALOG_NUMBER);
                SqlCommand.Parameters.AddWithValue("@THREAD_TYPE", Operator.THREAD_TYPE);
                SqlCommand.Parameters.AddWithValue("@MAIN_OPERATOR_TYPE", Operator.MAIN_OPERATOR_TYPE);
                SqlCommand.Parameters.AddWithValue("@OPERATOR_TYPE", Operator.OPERATOR_TYPE);
                SqlCommand.Parameters.AddWithValue("@INSERT_COLOR", Operator.INSERT_COLOR);
                SqlCommand.Parameters.AddWithValue("@CONTACT_CONIG", Operator.CONTACT_CONIG);
                SqlCommand.Parameters.AddWithValue("@LED_VOLTAGE", Operator.LED_VOLTAGE);
                SqlCommand.Parameters.AddWithValue("@ACCESSORY_OPTION", Operator.ACCESSORY_OPTION);
                SqlCommand.Parameters.AddWithValue("@LOCKOUT_OPTION", Operator.LOCKOUT_OPTION);
                SqlCommand.Parameters.AddWithValue("@LOCKOUT_POSITION", Operator.LOCKOUT_POSITION);
                SqlCommand.Parameters.AddWithValue("@LEGEND_PLATE_TEXT", Operator.LEGEND_PLATE_TEXT);
                SqlCommand.Parameters.AddWithValue("@CUSTOM_TEXT1", Operator.CUSTOM_TEXT1);
                SqlCommand.Parameters.AddWithValue("@CUSTOM_TEXT2", Operator.CUSTOM_TEXT2);
                SqlCommand.Parameters.AddWithValue("@CUSTOM_TEXT3", Operator.CUSTOM_TEXT3);
                SqlCommand.Parameters.AddWithValue("@CUSTOM_TEXT4", Operator.CUSTOM_TEXT4);
                SqlCommand.Parameters.AddWithValue("@CHECK_STATUS", Operator.CHECK_STATUS);
                SqlCommand.Parameters.AddWithValue("@DATE_TIME", Operator.DATE_TIME);
                SqlCommand.Parameters.AddWithValue("@ENGINEER", Operator.ENGINEER);

                Connection.Open();

                SqlCommand.ExecuteNonQuery();

                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            return 1;
        }

        public int InsertWindowOptionInputs(WindowOptionInput WindowOption)
        {
            try
            {
                string SqlQuery = $"Insert into [dbDesignAutomation].[dbo].[EXB_WINDOW_CUTOUT_INPUTS_WEB] " +
                    $"(SO,BOX_ASSY_TYPE,CUTOUT_SHAPE,CUTOUT_TYPE,ORIENTATION,DIST_X,DIST_Y,CHECK_STATUS,DATE_TIME,ENGINEER)" +
                    $" values(@SO,@BOX_ASSY_TYPE,@CUTOUT_SHAPE,@CUTOUT_TYPE,@ORIENTATION,@DIST_X,@DIST_Y,@CHECK_STATUS,@DATE_TIME,@ENGINEER)";

                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                SqlCommand.Parameters.AddWithValue("@SO", WindowOption.SO);
                SqlCommand.Parameters.AddWithValue("@BOX_ASSY_TYPE", WindowOption.BOX_ASSY_TYPE);
                SqlCommand.Parameters.AddWithValue("@CUTOUT_SHAPE", WindowOption.CUTOUT_SHAPE);
                SqlCommand.Parameters.AddWithValue("@CUTOUT_TYPE", WindowOption.CUTOUT_TYPE);
                SqlCommand.Parameters.AddWithValue("@ORIENTATION", WindowOption.ORIENTATION);
                SqlCommand.Parameters.AddWithValue("@DIST_X", WindowOption.DIST_X);
                SqlCommand.Parameters.AddWithValue("@DIST_Y", WindowOption.DIST_Y);
                SqlCommand.Parameters.AddWithValue("@CHECK_STATUS", WindowOption.CHECK_STATUS);
                SqlCommand.Parameters.AddWithValue("@DATE_TIME", WindowOption.DATE_TIME);
                SqlCommand.Parameters.AddWithValue("@ENGINEER", WindowOption.ENGINEER);

                Connection.Open();

                SqlCommand.ExecuteNonQuery();

                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            return 1;
        }

        public int InsertGeneralInputs(GeneralInput GeneralInput)
        {
            try
            {
                string SqlQuery = $"Insert into [dbDesignAutomation].[dbo].[EXB_GENERAL_INPUTS_WEB] " +
                    $"(SO,EXB_BOX_SERIES_TYPE,EXB_BOX_ASSEMBLY_TYPE,BACK_PANEL,MOUNTING_FEET," +
                    $"MOUNTING_FEET_ORIENTATION,HINGE,HINGE_ORIENTATION,FINISH_TYPE,EXTERNAL_GROUNDING_KIT," +
                    $"INTERNAL_GROUNDING_KIT,SPECIFY_PAINT,BOLT_MATERIAL_AND_HOLE_TYPE,CUSTOMER_NAME,COMPANY_NAME,DESIGNER," +
                    $"CHECKED_BY,SALES_NUMBER,QUOTE_NUMBER,LINE_NUMBER,DATE,REVISION,CUSTOMER_APPROVAL,BOX_MODIFICATION," +
                    $"COVER_MODIFICATION,PAN_MODIFICATION,DATE_TIME,ENGINEER,VAULT_CHECKIN,CERTIFICATION_TYPE,ENCLOSURE_TYPE,SUMMARY_DATA) " +
                    $"values(@SO,@EXB_BOX_SERIES_TYPE,@EXB_BOX_ASSEMBLY_TYPE,@BACK_PANEL,@MOUNTING_FEET,@MOUNTING_FEET_ORIENTATION," +
                    $"@HINGE,@HINGE_ORIENTATION,@FINISH_TYPE,@EXTERNAL_GROUNDING_KIT,@INTERNAL_GROUNDING_KIT,@SPECIFY_PAINT," +
                    $"@BOLT_MATERIAL_AND_HOLE_TYPE,@CUSTOMER_NAME,@COMPANY_NAME,@DESIGNER,@CHECKED_BY,@SALES_NUMBER,@QUOTE_NUMBER,@LINE_NUMBER," +
                    $"@DATE,@REVISION,@CUSTOMER_APPROVAL,@BOX_MODIFICATION,@COVER_MODIFICATION,@PAN_MODIFICATION,@DATE_TIME," +
                    $"@ENGINEER,@VAULT_CHECKIN,@CERTIFICATION_TYPE,@ENCLOSURE_TYPE,@SUMMARY_DATA)";

                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                SqlCommand.Parameters.AddWithValue("@SO", GeneralInput.SO);
                SqlCommand.Parameters.AddWithValue("@EXB_BOX_SERIES_TYPE", GeneralInput.EXB_BOX_SERIES_TYPE);
                SqlCommand.Parameters.AddWithValue("@EXB_BOX_ASSEMBLY_TYPE", GeneralInput.EXB_BOX_ASSEMBLY_TYPE);
                SqlCommand.Parameters.AddWithValue("@BACK_PANEL", GeneralInput.BACK_PANEL);
                SqlCommand.Parameters.AddWithValue("@MOUNTING_FEET", GeneralInput.MOUNTING_FEET);
                SqlCommand.Parameters.AddWithValue("@MOUNTING_FEET_ORIENTATION", GeneralInput.MOUNTING_FEET_ORIENTATION);
                SqlCommand.Parameters.AddWithValue("@HINGE", GeneralInput.HINGE);
                SqlCommand.Parameters.AddWithValue("@HINGE_ORIENTATION", GeneralInput.HINGE_ORIENTATION);
                SqlCommand.Parameters.AddWithValue("@FINISH_TYPE", GeneralInput.FINISH_TYPE);
                SqlCommand.Parameters.AddWithValue("@SPECIFY_PAINT", GeneralInput.SPECIFY_PAINT);
                SqlCommand.Parameters.AddWithValue("@BOLT_MATERIAL_AND_HOLE_TYPE", GeneralInput.BOLT_MATERIAL_AND_HOLE_TYPE);
                SqlCommand.Parameters.AddWithValue("@CUSTOMER_NAME", GeneralInput.CUSTOMER_NAME);
                SqlCommand.Parameters.AddWithValue("@COMPANY_NAME", GeneralInput.COMPANY_NAME);
                SqlCommand.Parameters.AddWithValue("@EXTERNAL_GROUNDING_KIT", GeneralInput.EXTERNAL_GROUNDING_KIT);
                SqlCommand.Parameters.AddWithValue("@INTERNAL_GROUNDING_KIT", GeneralInput.INTERNAL_GROUNDING_KIT);
                SqlCommand.Parameters.AddWithValue("@DESIGNER", GeneralInput.DESIGNER);
                SqlCommand.Parameters.AddWithValue("@CHECKED_BY", GeneralInput.CHECKED_BY);
                SqlCommand.Parameters.AddWithValue("@SALES_NUMBER", GeneralInput.SALES_NUMBER);
                SqlCommand.Parameters.AddWithValue("@QUOTE_NUMBER", GeneralInput.QUOTE_NUMBER);
                SqlCommand.Parameters.AddWithValue("@LINE_NUMBER", GeneralInput.LINE_NUMBER);
                SqlCommand.Parameters.AddWithValue("@DATE", GeneralInput.DATE);
                SqlCommand.Parameters.AddWithValue("@REVISION", GeneralInput.REVISION);
                SqlCommand.Parameters.AddWithValue("@CUSTOMER_APPROVAL", GeneralInput.CUSTOMER_APPROVAL);
                SqlCommand.Parameters.AddWithValue("@BOX_MODIFICATION", GeneralInput.BOX_MODIFICATION);
                SqlCommand.Parameters.AddWithValue("@COVER_MODIFICATION", GeneralInput.COVER_MODIFICATION);
                SqlCommand.Parameters.AddWithValue("@PAN_MODIFICATION", GeneralInput.PAN_MODIFICATION);
                SqlCommand.Parameters.AddWithValue("@DATE_TIME", GeneralInput.DATE_TIME);
                SqlCommand.Parameters.AddWithValue("@ENGINEER", GeneralInput.ENGINEER);
                SqlCommand.Parameters.AddWithValue("@VAULT_CHECKIN", GeneralInput.VAULT_CHECKIN);
                SqlCommand.Parameters.AddWithValue("@CERTIFICATION_TYPE", GeneralInput.CERTIFICATION_TYPE);
                SqlCommand.Parameters.AddWithValue("@ENCLOSURE_TYPE", GeneralInput.ENCLOSURE_TYPE);
                SqlCommand.Parameters.AddWithValue("@SUMMARY_DATA", GeneralInput.SUMMARY_DATA);
                Connection.Open();

                SqlCommand.ExecuteNonQuery();

                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            return 1;
        }

        public int InsertHoleInputs(HoleInput holeInput)
        {
            try
            {
                string SqlQuery = $"Insert into [dbDesignAutomation].[dbo].[GR_EXB_HOLE_INPUTS_WEB] " +
                    $"(SO,BOX_ASSY_TYPE,HOLE_LOCATION,HOLE_TYPE,HOLE_SIZE,HOLE_COMPONENT,HOLE_COMPONENT_TYPE," +
                    $"DIST_X,DIST_Y,HOLE_TERMINATION,HOLE_DEPTH,CHECK_STATUS,DATE_TIME,ENGINEER) " +
                    $"values(@SO,@BOX_ASSY_TYPE,@HOLE_LOCATION,@HOLE_TYPE,@HOLE_SIZE,@HOLE_COMPONENT," +
                    $"@HOLE_COMPONENT_TYPE,@DIST_X,@DIST_Y,@HOLE_TERMINATION,@HOLE_DEPTH,@CHECK_STATUS,@DATE_TIME,@ENGINEER)";

                SqlCommand SqlCommand = new SqlCommand(SqlQuery, Connection);
                SqlCommand.Parameters.AddWithValue("@SO", holeInput.SO);
                SqlCommand.Parameters.AddWithValue("@BOX_ASSY_TYPE", holeInput.BOX_ASSY_TYPE);
                SqlCommand.Parameters.AddWithValue("@HOLE_LOCATION", holeInput.HOLE_LOCATION);
                SqlCommand.Parameters.AddWithValue("@DIST_X", holeInput.DIST_X);
                SqlCommand.Parameters.AddWithValue("@DIST_Y", holeInput.DIST_Y);
                SqlCommand.Parameters.AddWithValue("@HOLE_COMPONENT", holeInput.HOLE_COMPONENT);
                SqlCommand.Parameters.AddWithValue("@HOLE_COMPONENT_TYPE", holeInput.HOLE_COMPONENT_TYPE);
                SqlCommand.Parameters.AddWithValue("@HOLE_TYPE", holeInput.HOLE_TYPE);
                SqlCommand.Parameters.AddWithValue("@HOLE_SIZE", holeInput.HOLE_SIZE);
                SqlCommand.Parameters.AddWithValue("@HOLE_TERMINATION", holeInput.HOLE_TERMINATION);
                SqlCommand.Parameters.AddWithValue("@HOLE_DEPTH", holeInput.HOLE_DEPTH);
                SqlCommand.Parameters.AddWithValue("@CHECK_STATUS", holeInput.CHECK_STATUS);
                SqlCommand.Parameters.AddWithValue("@DATE_TIME", holeInput.DATE_TIME);
                SqlCommand.Parameters.AddWithValue("@ENGINEER", holeInput.ENGINEER);

                Connection.Open();

                SqlCommand.ExecuteNonQuery();

                Connection.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            return 1;
        }
        
        #endregion
    }
}