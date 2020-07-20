/****************************************************************************************************
* Copyright © Vagus Technology. All rights reserved.      
* You must not remove this notice, or any other, from this software.  
* -------------------------------------------------------------------------------------------------
* Created By      |      Date        |       Purpose 
* ------------------------------------------------------------------------------------------------- 
** Vijay P V      |      23-Jul-2017 |       Custom Datarow Object
* -------------------------------------------------------------------------------------------------
* Modified By     |      Date        |       Purpose
*-------------------------------------------------------------------------------------------------- 
* ***************************************************************************************************/
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

namespace Helper
{

    public class CDataRow
    {
        /// <summary>
        /// Get / Set Datarow
        /// </summary>
        public DataRow Row
        {
            get;
            set;
        }
        /// <summary>
        /// Get Column value from the datarow
        /// </summary>        
        /// <param name="colName">column name</param>
        /// <returns>object</returns>
        public object GetValue(string colName)
        {
            object objVal = null;
            if (Row != null && Contains(colName))
            {
                objVal = Row[colName];
            }
            return objVal;
        }
        public Type GetType(string colName)
        {
            return Row.Table.Columns[colName].DataType;
        }
        /// <summary>
        /// Validate column name is available or not
        /// </summary>
        /// <param name="colName">column name</param>
        /// <returns>bool</returns>
        /// 

        public bool Contains(string colName)
        {
            return Row.Table.Columns.Contains(colName);
        }
        /// <summary>
        /// Get string value from the datarow
        /// </summary>
        /// <param name="row"></param>
        /// <param name="colName"></param>
        /// <returns></returns>
        public string StringValue(string colName)
        {
            return Convert.ToString(GetValue(colName));
        }
        public string SQLStringValue(string colName)
        {
            return Convert.ToString(GetValue(colName)).Replace("'", "''");
        }
        /// <summary>
        /// Get integer value from the datarow
        /// </summary>
        /// <param name="colName"></param>
        /// <returns></returns>
        public int IntValue(string colName)
        {
            return Utility.ToInt(GetValue(colName));
        }
        /// <summary>
        /// To Get Guid value.
        /// </summary>
        /// <param name="colName"></param>
        /// <returns></returns>
        public Guid GuidValue(string colName)
        {
            return Utility.ToGuid(GetValue(colName));
        }

        public long LongValue(string colName)
        {
            return Utility.ToLong(GetValue(colName));
        }

        public string Base64(string colName)
        {
            try
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    new BinaryFormatter().Serialize(ms, GetValue(colName));
                    return Convert.ToBase64String(ms.ToArray());
                }
            }
            catch
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// Get Bool Result from datarow
        /// </summary>
        /// <param name="colName"></param>
        /// <returns></returns>
        public bool BoolValue(string colName)
        {
            return Utility.ToBool(GetValue(colName));
        }

        /// <summary>
        /// Get Float Result from Datarow
        /// </summary>
        /// <param name="colName"></param>
        /// <returns></returns>
        public float FloatValue(string colName)
        {
            return Utility.ToFloat(GetValue(colName));
        }

        public string DateTimeValue(string colName, string format)
        {
            return Utility.ToString(DateTimeValue(colName), format);
        }
        /// <summary>
        /// Return the Date Time 
        /// </summary>
        /// <param name="colName"></param>
        /// <returns></returns>
        public DateTime? DateTimeValue(string colName)
        {
            object obj = GetValue(colName);
            if (obj != null && obj.GetType().Name == "DateTime")
            {
                return (DateTime)obj;
            }
            else { return null; }
        }

        public TimeSpan? Timespanvalue(string colName)
        {
            object obj = GetValue(colName);
            if (obj != null && obj.GetType().Name == "TimeSpan")
            {
                return TimeSpan.Parse(obj.ToString());
            }
            else { return null; }
        }

        public DateTime? UTCDateTimeValue(string colName)
        {
            object obj = GetValue(colName);
            if (obj != null && obj.GetType().Name == "DateTime")
            {
                DateTime dt = (DateTime)obj;
                return DateTimeOffset.Parse(dt.ToString("yyyy-MM-dd HH:mm:ss") + "+0000", CultureInfo.InvariantCulture).UtcDateTime;
            }
            else { return null; }
        }

        public byte[] GetBytes(string colName)
        {
            object obj = GetValue(colName);
            if (obj != null)
            {
                try
                {
                    return (byte[])obj;
                }
                catch (Exception ex)
                {
                    return null;
                }

            }
            else { return null; }
        }
        public Decimal DecimalValue(string colName, int decimals = 2)
        {
            return Utility.ToDecimal(GetValue(colName), decimals);
        }

        public DateTime? TimeValue(string colName)
        {
            object obj = GetValue(colName);
            if (obj != null && obj.GetType().Name == "TimeSpan")
            {
                return Utility.ToDateTime(GetValue(colName));
            }
            else { return null; }
        }
       
    }
}
