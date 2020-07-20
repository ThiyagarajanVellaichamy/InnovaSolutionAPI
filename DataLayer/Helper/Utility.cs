/****************************************************************************************************
* Copyright © Thiyagarajan Vellaichamy. All rights reserved.      
* You must not remove this notice, or any other, from this software.  
* -------------------------------------------------------------------------------------------------
* Created By      |      Date        |       Purpose 
* ------------------------------------------------------------------------------------------------- 
* Thiyagarajan V  |      23-Jul-2017 |       Custom Datarow Object
* -------------------------------------------------------------------------------------------------
* Modified By     |      Date        |       Purpose
*-------------------------------------------------------------------------------------------------- 
* ***************************************************************************************************/
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Helper
{
    public enum TimeZone
    {
        UTC = 0,
        EST = 1,
        CST = 2,
        MST = 3,
        PST = 4
    }
    public class Utility
    {
        public const int PagePerCount = 10;
        public const string Version = "27";

        public static DateTime UTCToEST(DateTime datetime)
        {
            TimeZoneInfo easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            DateTime easternTime = TimeZoneInfo.ConvertTimeFromUtc(datetime, easternZone);
            return easternTime;
        }

        public static string GetDaySuffix(int day)
        {
            switch (day)
            {
                case 1:
                case 21:
                case 31:
                    return "st";
                case 2:
                case 22:
                    return "nd";
                case 3:
                case 23:
                    return "rd";
                default:
                    return "th";
            }
        }

        public static string ToString(DateTime? value, string format)
        {
            if (value.HasValue) { return value.Value.ToString(format); }
            else { return string.Empty; }
        }
        public static string ToString(double? value, string format)
        {
            if (value.HasValue) { return value.Value.ToString(format); }
            else { return string.Empty; }
        }
        /// <summary>
        /// Convert from object to string
        /// </summary>
        /// <param name="value">object value</param>
        /// <returns>string</returns>
        public static string ToString(object value)
        {
            if (value == null)
                return string.Empty;
            else
                return Convert.ToString(value);
        }
        public static string ToString(object value, string defaultValue)
        {
            if (value == null)
                return defaultValue;
            else
                return Convert.ToString(value);

        }
        public static string ToSQLString(object value)
        {
            if (value == null)
                return string.Empty;
            else
                return Convert.ToString(value).Replace("'", "''");
        }
        public static string ToSQLQueryString(object value)
        {
            if (value == null)
                return string.Empty;
            else
                return Convert.ToString(value).Replace("[", "[[]");
        }
        /// <summary>
        /// Convert from object to integer
        /// </summary>
        /// <param name="value">value to convert</param>
        /// <returns>integer</returns>
        public static int ToInt(object value)
        {
            return ToInt(ToString(value));
        }
        /// <summary>
        /// Convert from string value to integer
        /// </summary>
        /// <param name="value">value to convert</param>
        /// <returns>integer</returns>
        public static int ToInt(string value)
        {
            int iVal = 0;
            if (value != null && value.Length > 0)
            {
                int.TryParse(value, out iVal);
            }
            return iVal;
        }

        public static short ToShort(string value)
        {
            short iVal = 0;
            if (value != null && value.Length > 0)
            {
                short.TryParse(value, out iVal);
            }
            return iVal;
        }

        /// <summary>
        /// Covert Object to Bool
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool ToBool(object value)
        {
            bool iBool = false;
            string strVal = ToString(value);
            if (strVal == "on" || strVal == "1") { return true; }
            else if (bool.TryParse(strVal, out iBool))
            { return iBool; }
            else { return false; }

        }

        /// <summary>
        /// To convert object to guid.
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static Guid ToGuid(object value)
        {
            Guid gid;
            return Guid.TryParse(ToString(value), out gid) ? gid : Guid.Empty;
        }

        /// <summary>
        /// Convert Int to Bool
        /// </summary>
        /// <param name="iValue"></param>
        /// <returns></returns>
        public static bool ToBool(int iValue)
        {
            if (iValue == 1) { return true; }
            else { return false; }
        }


        /// <summary>
        /// Covert Object to Date Time
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static DateTime? ToDateTime(object value)
        {
            DateTime iDate;
            if (DateTime.TryParse(Utility.ToString(value), out iDate))
            {
                return iDate;
            }
            else
            {
                return null;
            }
        }
        public static DateTime? ToDateTime(string date, string format)
        {
            try
            {
                return DateTime.ParseExact(date, format, null);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        /// <summary>
        /// Decode URL
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string Decode(string value)
        {
            string strResult = string.Empty;
            try
            {
                //value = value.Replace("%B0", "°");
                strResult = System.Uri.UnescapeDataString(value);
            }
            catch (Exception ex)
            {
                //strResult = System.Web.HttpContext.Current.Server.UrlDecode(value);
            }
            return strResult;
        }
        /// <summary>
        /// Encode URL
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string Encode(string value)
        {
            string strResult = string.Empty;
            try
            {
                strResult = System.Uri.EscapeDataString(value);
            }
            catch (Exception ex)
            {
                //strResult = System.Web.HttpContext.Current.Server.UrlEncode(value);
            }
            return strResult;
        }
        /// <summary>
        /// Convert object to Long datatype 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static long ToLong(object value)
        {
            return ToLong(ToString(value));
        }

        /// <summary>
        /// Convert string to Long datatype 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static long ToLong(string value)
        {
            long iVal = 0;
            if (value != null && value.Length > 0)
            {
                Int64.TryParse(value, out iVal);
            }
            return iVal;
        }

        /// <summary>
        /// Convert object to float datatype 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static float ToFloat(object value)
        {
            return ToFloat(ToString(value));
        }

        /// <summary>
        /// Convert object to string datatype 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static float ToFloat(string value)
        {
            float iVal = 0;
            if (value != null && value.Length > 0)
            {
                float.TryParse(value, out iVal);
            }
            return iVal;
        }


        /// <summary>
        /// Convert String to Decimal Value with 2 default decimal point after "." DOT
        /// </summary>
        /// <param name="value"></param>
        /// <param name="decimals"></param>
        /// <returns></returns>
        public static Decimal ToDecimal(object value, int decimals = 2)
        {
            Decimal iVal = 0;
            if (value != null)
            {
                if (Decimal.TryParse(ToString(value), out iVal))
                {
                    iVal = Decimal.Round(iVal, decimals);
                }
            }
            return iVal;
        }

        /// <summary>
        /// Convert String to Decimal Value with 2 default decimal point after "." DOT
        /// </summary>
        /// <param name="value"></param>
        /// <param name="decimals"></param>
        /// <returns></returns>
        public static Decimal ToDecimal(object value)
        {
            Decimal iVal = 0;
            if (value != null)
            {
                Decimal.TryParse(ToString(value), out iVal);
            }
            return iVal;
        }
        public static double ToDouble(object value)
        {
            double iVal = 0;
            if (value != null)
            {
                double.TryParse(ToString(value), out iVal);
            }
            return iVal;
        }

       
        public static string FirstCharToUpper(string input)
        {
            if (string.IsNullOrEmpty(input))
                return "";
            else
                return input.First().ToString().ToUpper() + input.Substring(1);
        }
        public static DateTimeOffset ToDayTimeOffset(DateTime? dt, string offsetTimeZone)
        {
            TimeZoneInfo tst = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            DateTimeOffset dtStart = DateTimeOffset.Parse(dt.Value.ToString("yyyy-MM-dd HH:mm:ss") + offsetTimeZone, CultureInfo.InvariantCulture);
            if (tst.IsDaylightSavingTime(dtStart.DateTime))
            {
                int i;
                int.TryParse(offsetTimeZone, out i);
                i = i + 100; // day time increase 1 hr
                if (i > 0)
                {
                    if (i < 1000)
                    {
                        offsetTimeZone = "+0" + i.ToString();
                    }
                    else
                    {
                        offsetTimeZone = "+" + i.ToString();
                    }
                }
                else
                {
                    offsetTimeZone = i.ToString();
                    if (i > -999)
                    {
                        offsetTimeZone = i.ToString().Replace("-", "-0");
                    }
                }
                dtStart = DateTimeOffset.Parse(dt.Value.ToString("yyyy-MM-dd HH:mm:ss") + offsetTimeZone, CultureInfo.InvariantCulture);
            }

            return dtStart;
        }

        public static DateTime? ToUTCDatetime(object objDate)
        {
            //DateTime ut = DateTime.SpecifyKind(objDate, DateTimeKind.Utc);
            //return TimeZoneInfo.ConvertTimeToUtc(Convert.ToDateTime(objDate));
            if (objDate != null)
            {
                return Convert.ToDateTime(objDate).ToUniversalTime();
            }
            else
            {
                return null;
            }
        }

       


        static Dictionary<TimeZone, string> timezone = new Dictionary<TimeZone, string>()
        {
            { TimeZone.UTC,"Coordinated Universal Time"},
            {TimeZone.EST,"Eastern Standard Time" },
            {TimeZone.CST,"Central Standard Time" },
            {TimeZone.MST,"Mountain Standard Time" },
            {TimeZone.PST,"Pacific Standard Time" }
        };

        public static DateTime? UTCTo(DateTime? objDate, TimeZone tz)
        {
            if (objDate.HasValue)
            {
                DateTime? dt;
                switch (tz)
                {
                    case TimeZone.CST:
                        dt = objDate.Value.AddHours(-6);
                        return dt.Value;
                    case TimeZone.EST:
                        dt = objDate.Value.AddHours(-5);
                        return dt.Value;
                    case TimeZone.MST:
                        dt = objDate.Value.AddHours(-7);
                        return dt.Value;
                    case TimeZone.PST:
                        dt = objDate.Value.AddHours(-8);
                        return dt.Value;
                }

                return null;
            }
            else { return null; }
        }

    }
}
