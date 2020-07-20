/****************************************************************************************************
* Copyright © Thiyagarajan Vellaichamy. All rights reserved.      
* You must not remove this notice, or any other, from this software.  
* -------------------------------------------------------------------------------------------------
* Created By      |      Date        |       Purpose 
* ------------------------------------------------------------------------------------------------- 
* Thiyagarajan V   |     18-Jul-2020  |       Extention Method for datarow object
* -------------------------------------------------------------------------------------------------
* Modified By     |      Date        |       Purpose
*-------------------------------------------------------------------------------------------------- 
* ***************************************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace Helper
{

    public static class DataRowExtentions
    {
        /// <summary>
        /// To Update DataRowCollection lists Items. created by Thiyagarajan.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="action"></param>
        public static void Update(this DataRowCollection source, Action<DataRow> action)
        {
            foreach (var it in source)
            {
                action((DataRow)it);
            }
        }

        /// <summary>
        /// To Get Collection lists.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dt"></param>
        /// <param name="result"></param>
        /// <returns></returns>
        public static IList<T> GetLists<T>(this DataTable dt) where T : class, IDisposable
        {
            IList<T> list = dt.Rows.Count > 0 ? new List<T>() : null;
            if (list != null)
            {
                dt.Rows.Update(s =>
                {
                    using (T obj = (T)Activator.CreateInstance(typeof(T), s))
                    {
                        list.Add(obj);
                    }
                });
            }
            return list;
        }

        /// <summary>
        /// To Get Collection lists.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dt"></param>
        /// <param name="result"></param>
        /// <returns></returns>
        public static T First<T>(this DataTable dt) where T : class, IDisposable
        {
            T result = null;

            using (T obj = (T)Activator.CreateInstance(typeof(T), dt.Rows[0], ""))
            {
                result = obj;
            }

            return result;
        }
        /// <summary>
        /// To Get Collection lists.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dt"></param>
        /// <param name="result"></param>
        /// <returns></returns>
        public static T FirstOrDefault<T>(this DataTable dt) where T : class, IDisposable
        {
            T result = null;

            if (dt.Rows.Count > 0)
            {
                using (T obj = (T)Activator.CreateInstance(typeof(T), dt.Rows[0]))
                {
                    result = obj;
                }
            }
            return result;
        }

        /// <summary>
        /// To Get Collection lists.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dt"></param>
        /// <param name="result"></param>
        /// <returns></returns>
        public static IEnumerable<T> GetLists<T, T1>(this DataTable dt, T1 a) where T : IDisposable
        {
            IList<T> list = dt.Rows.Count > 0 ? new List<T>() : null;
            if (list != null)
            {
                dt.Rows.Update(s =>
                {
                    using (T obj = (T)Activator.CreateInstance(typeof(T), s, a, ""))
                    {
                        list.Add(obj);
                    }
                });
            }
            return list;
        }

        /// <summary>
        /// To Get Est DateTime.
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static DateTime? ToEst(this DateTime? dt)
        {
            if (dt.HasValue)
            {
                var utc = dt.Value.ToUniversalTime();
                TimeZoneInfo easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
                return dt = TimeZoneInfo.ConvertTimeFromUtc(utc, easternZone);
            }
            else
                return (DateTime?)null;
        }


        /// <summary>
        /// To Get EST Time with end of the day time 23:59:59
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static DateTime? ToEstEnd(this DateTime? dt)
        {
            if (dt.HasValue)
            {
                var utc = dt.Value.ToUniversalTime();
                TimeZoneInfo easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
                dt = TimeZoneInfo.ConvertTimeFromUtc(utc, easternZone);
                return DateTime.Parse(dt.Value.ToShortDateString() + string.Format(" {0}", "23:59:59"));
            }
            else
                return (DateTime?)null;
        }

        /// <summary>
        /// To Est End
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static DateTime ToEstEnd(this DateTime dt)
        {

            var utc = dt.ToUniversalTime();
            TimeZoneInfo easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            dt = TimeZoneInfo.ConvertTimeFromUtc(utc, easternZone);
            return DateTime.Parse(dt.ToShortDateString() + string.Format(" {0}", "23:59:59"));
        }


        /// <summary>
        /// To Est End
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static DateTime ToEnd(this DateTime dt)
        {
            return DateTime.Parse(dt.ToShortDateString() + string.Format(" {0}", "23:59:59"));
        }

        /// <summary>
        /// To Get Est DateTime.
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static DateTime ToEst(this DateTime dt)
        {
            TimeZoneInfo easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            return dt = TimeZoneInfo.ConvertTimeFromUtc(dt.ToUniversalTime(), easternZone);
        }

        public static string AgoDate(this DateTime dt)
        {
            DateTime currentDt = DateTime.Now.ToEst();
            int days = (currentDt - dt).Days, hours = 0, minutes = 0, weeks = 0, month = 0, year = 0;
            year = days / 365;
            month = (days - (year * 365)) / 30;
            weeks = (days - ((days - (year * 365)) / 30)) / 7;
            hours = (currentDt - dt).Hours;
            minutes = (currentDt - dt).Minutes;
            days = days - (year * 365 + month * 30 + weeks * 7);

            string resultset = string.Empty;

            if (year > 0)
                resultset += string.Format("{0} Year(s)", year);
            if (month > 0)
                resultset += (resultset.Length > 0 ? ", " : string.Empty) + string.Format("{0} Month(s)", month);
            if (weeks > 0)
                resultset += (resultset.Length > 0 ? ", " : string.Empty) + string.Format("{0} Week(s)", weeks);
            if (days > 1)
                resultset += (resultset.Length > 0 ? ", " : string.Empty) + string.Format("{0} Day(s)", days);
            if (days < 2 && days > 0)
                resultset += (resultset.Length > 0 ? ", " : string.Empty) + string.Format("Yesterday");
            if (hours > 0)
                resultset += (resultset.Length > 0 ? ", " : string.Empty) + string.Format("{0} Hour(s)", hours);
            if (minutes > 0)
                resultset += (resultset.Length > 0 ? ", " : string.Empty) + string.Format("{0} Minute(s)", minutes);
            return resultset;

        }

        /// <summary>
        /// Provides access to each of the column value in the row and returns value in the specified Type
        /// </summary>
        /// <typeparam name="T">A generic parameter that specifies the return type of the column</typeparam>
        /// <param name="row">The DataRow object from which value has to be retrived</param>
        /// <param name="columnName">The name of the column to return the value of</param>
        /// <returns></returns>
        public static T GetValueAs<T>(this DataRow row, string columnName) where T : IConvertible
        {
            return row.Table.Columns.Contains(columnName) && !DBNull.Value.Equals(row[columnName])
                ? row[columnName].GetType() == typeof(T)
                    ? (T)row[columnName] :
                        typeof(T).IsEnum
                                   ? row[columnName].GetType() == typeof(int)
                                        ? (T)row[columnName]
                                        : (T)Convert.ChangeType(row[columnName], typeof(int))
                        : (T)Convert.ChangeType(row[columnName], typeof(T))
                : default(T);
        }

        /// <summary>
        /// Provides access to each of the column value in the row and returns value in the specified Type
        /// </summary>
        /// <typeparam name="T">A generic parameter that specifies the return type of the column</typeparam>
        /// <param name="row">The DataRow object from which value has to be retrived</param>
        /// <param name="columnIndex">The index of the column to return the value of</param>
        /// <returns></returns>
        public static T GetValueAs<T>(this DataRow row, int columnIndex) where T : IConvertible
        {
            //return row.Table.Columns.Count > columnIndex && !DBNull.Value.Equals(row[columnIndex]) ? (typeof(T).IsEnum) ? (T)row[columnIndex] : (T)Convert.ChangeType(row[columnIndex], typeof(T)) : default(T);
            return GetValueAs<T>(row, (row.Table.Columns.Count > columnIndex) ? row.Table.Columns[columnIndex].ColumnName : string.Empty);
        }

        /// <summary>
        /// Provides access to each of the column value in the row and returns value in the specified Type
        /// </summary>
        /// <typeparam name="T">A generic parameter that specifies the return type of the column</typeparam>
        /// <param name="row">The DataRow object from which value has to be retrived</param>
        /// <param name="dataColumn">The datacolumn for which value has to be returned</param>
        /// <returns></returns>
        public static T GetValueAs<T>(this DataRow row, DataColumn dataColumn) where T : IConvertible
        {
            //return row.Table.Columns.Contains(dataColumn.ColumnName) && !DBNull.Value.Equals(row[dataColumn]) ? (typeof(T).IsEnum) ? (T)row[dataColumn] : (T)Convert.ChangeType(row[dataColumn], typeof(T)) : default(T);
            return GetValueAs<T>(row, (dataColumn != null) ? dataColumn.ColumnName : string.Empty);
        }

        /// <summary>
        /// Provides access to each of the column value in the row and returns value in the specified Type and retruns default value of T when type conversion fails
        /// </summary>
        /// <typeparam name="T">A generic parameter that specifies the return type of the column</typeparam>
        /// <param name="row">The DataRow object from which value has to be retrived</param>
        /// <param name="columnName">The name of the column to return the value of</param>
        /// <returns></returns>
        public static T GetValueOrDefaultAs<T>(this DataRow row, string columnName) where T : IConvertible
        {
            T val = default(T); try { val = GetValueAs<T>(row, columnName); }
            catch (Exception) { }
            return val;
        }

        /// <summary>
        /// Provides access to each of the column value in the row and returns value in the specified Type and retruns default value of T when type conversion fails
        /// </summary>
        /// <typeparam name="T">A generic parameter that specifies the return type of the column</typeparam>
        /// <param name="row">The DataRow object from which value has to be retrived</param>
        /// <param name="columnIndex">The index of the column to return the value of</param>
        /// <returns></returns>
        public static T GetValueOrDefaultAs<T>(this DataRow row, int columnIndex) where T : IConvertible
        {
            T val = default(T); try { val = GetValueAs<T>(row, columnIndex); }
            catch (Exception) { }
            return val;
        }

        /// <summary>
        /// Provides access to each of the column value in the row and returns value in the specified Type and retruns default value of T when type conversion fails
        /// </summary>
        /// <typeparam name="T">A generic parameter that specifies the return type of the column</typeparam>
        /// <param name="row">The DataRow object from which value has to be retrived</param>
        /// <param name="dataColumn">The datacolumn for which value has to be returned</param>
        /// <returns></returns> 
        public static T GetValueOrDefaultAs<T>(this DataRow row, DataColumn dataColumn) where T : IConvertible
        {
            T val = default(T); try { val = GetValueAs<T>(row, dataColumn); }
            catch (Exception) { }
            return val;
        }

        /// <summary>
        /// Provides access to each of the column value in the row and returns value in the specified Type and allows nullable
        /// </summary>
        /// <typeparam name="T">A generic parameter that specifies the return type of the column</typeparam>
        /// <param name="row">The DataRow object from which value has to be retrived</param>
        /// <param name="columnName">The name of the column to return the value of</param>
        /// <returns></returns>
        public static T? GetValueOrDefault<T>(this DataRow row, string columnName) where T : struct
        {
            T? val = default(T?);
            try
            {
                val = row.Table.Columns.Contains(columnName) && (!DBNull.Value.Equals(row[columnName]))
                            ? typeof(T).IsEnum
                                ? row[columnName].GetType() == typeof(int)
                                    ? (T)row[columnName]
                                    : (T)Convert.ChangeType(row[columnName], typeof(int))
                            : (T)Convert.ChangeType(row[columnName], typeof(T))
                      : default(T?);
                //val = row.Table.Columns.Contains(columnName) ? (!DBNull.Value.Equals(row[columnName]) ? (T)Convert.ChangeType(row[columnName], typeof(T)) : default(T?)) : default(T?);
            }
            catch (Exception) { }
            return val;
        }

        /// <summary>
        /// Provides access to each of the column value in the row and returns value in the specified Type and allows nullable
        /// </summary>
        /// <typeparam name="T">A generic parameter that specifies the return type of the column</typeparam>
        /// <param name="row">The DataRow object from which value has to be retrived</param>
        /// <param name="columnIndex">The index of the column to return the value of</param>
        /// <returns></returns>
        public static T? GetValueOrDefault<T>(this DataRow row, int columnIndex) where T : struct
        {
            return GetValueOrDefault<T>(row, (row.Table.Columns.Count > columnIndex) ? row.Table.Columns[columnIndex].ColumnName : string.Empty);
            //T? val = default(T?); try { val = row.Table.Columns.Count > columnIndex ? (!DBNull.Value.Equals(row[columnIndex]) ? (T)Convert.ChangeType(row[columnIndex], typeof(T)) : default(T?)) : default(T?); }
            //catch (Exception) { } return val;
        }

        /// <summary>
        /// Provides access to each of the column value in the row and returns value in the specified Type and allows nullable
        /// </summary>
        /// <typeparam name="T">A generic parameter that specifies the return type of the column</typeparam>
        /// <param name="row">The DataRow object from which value has to be retrived</param>
        /// <param name="dataColumn">The datacolumn for which value has to be returned</param>
        /// <returns></returns>
        public static T? GetValueOrDefault<T>(this DataRow row, DataColumn dataColumn) where T : struct
        {
            return GetValueOrDefault<T>(row, (dataColumn != null) ? dataColumn.ColumnName : string.Empty);
            //T? val = default(T?); try { val = row.Table.Columns.Contains(dataColumn.ColumnName) ? (!DBNull.Value.Equals(row[dataColumn]) ? (T)Convert.ChangeType(row[dataColumn], typeof(T)) : default(T?)) : default(T?); }
            //catch (Exception) { } return val;
        }
    }
}


