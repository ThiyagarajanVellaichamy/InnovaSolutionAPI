/****************************************************************************************************
* Copyright © Thiyagarajan Vellaichamy. All rights reserved.      
* You must not remove this notice, or any other, from this software.  
* -------------------------------------------------------------------------------------------------
* Created By      |      Date        |       Purpose 
* ------------------------------------------------------------------------------------------------- 
* Thiyagarajan V  |      23-Nov-2017 |       Other (Except SQL) Database manager to connect the database
* -------------------------------------------------------------------------------------------------
* Modified By     |      Date        |       Purpose
*-------------------------------------------------------------------------------------------------- 
* ***************************************************************************************************/
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.Odbc;
using System.Data.OleDb;
using System.Collections;
using System.Xml;
using System.IO;
using Helper;

namespace DBManager.DL
{
    internal sealed class OtherDBManager : IDBManager
    {
        #region Private Variables
        private DBProvider _provider;
        private IDbConnection _iDbConnection = null;
        private IDbCommand _objDBCmd = null;
        private IDbDataAdapter _dataAdapter = null;
        private string _conString = string.Empty;
        private static Dictionary<Type, DbType> typeMap = new Dictionary<Type, DbType>();
        private static Dictionary<string, string[]> lstParams = new Dictionary<string, string[]>();
        #endregion
        #region Private Method
        /// <summary>
        /// Create / Update OLEDB Command and assign to common interface i.e IDBCommand
        /// Bind the parameters
        /// </summary>
        /// <param name="text">command text</param>
        /// <param name="parameters">Parameters rerquired to execute the command text</param>
        private void CreateOLEDBCommand(string text, Hashtable parameters, CommandType type)
        {
            if (_objDBCmd == null)
            {
                _objDBCmd = new OleDbCommand(text);
            }
            else
            {
                _objDBCmd.CommandText = text;
                _objDBCmd.Parameters.Clear();
            }
            _objDBCmd.CommandType = type;
            if (parameters != null)
            {
                foreach (string key in parameters.Keys)
                {
                    IDbDataParameter objParam = new OleDbParameter(key, parameters[key]);
                    _objDBCmd.Parameters.Add(objParam);
                }
            }
        }
        private static void InitParamsCollection()
        {
            typeMap[typeof(byte)] = DbType.Byte;
            typeMap[typeof(sbyte)] = DbType.SByte;
            typeMap[typeof(short)] = DbType.Int16;
            typeMap[typeof(ushort)] = DbType.UInt16;
            typeMap[typeof(int)] = DbType.Int32;
            typeMap[typeof(uint)] = DbType.UInt32;
            typeMap[typeof(long)] = DbType.Int64;
            typeMap[typeof(ulong)] = DbType.UInt64;
            typeMap[typeof(float)] = DbType.Single;
            typeMap[typeof(double)] = DbType.Double;
            typeMap[typeof(decimal)] = DbType.Decimal;
            typeMap[typeof(bool)] = DbType.Boolean;
            typeMap[typeof(string)] = DbType.String;
            typeMap[typeof(char)] = DbType.StringFixedLength;
            typeMap[typeof(Guid)] = DbType.Guid;
            typeMap[typeof(DateTime)] = DbType.DateTime;
            typeMap[typeof(DateTimeOffset)] = DbType.DateTimeOffset;
            typeMap[typeof(byte[])] = DbType.Binary;
            typeMap[typeof(byte?)] = DbType.Byte;
            typeMap[typeof(sbyte?)] = DbType.SByte;
            typeMap[typeof(short?)] = DbType.Int16;
            typeMap[typeof(ushort?)] = DbType.UInt16;
            typeMap[typeof(int?)] = DbType.Int32;
            typeMap[typeof(uint?)] = DbType.UInt32;
            typeMap[typeof(long?)] = DbType.Int64;
            typeMap[typeof(ulong?)] = DbType.UInt64;
            typeMap[typeof(float?)] = DbType.Single;
            typeMap[typeof(double?)] = DbType.Double;
            typeMap[typeof(decimal?)] = DbType.Decimal;
            typeMap[typeof(bool?)] = DbType.Boolean;
            typeMap[typeof(char?)] = DbType.StringFixedLength;
            typeMap[typeof(Guid?)] = DbType.Guid;
            typeMap[typeof(DateTime?)] = DbType.DateTime;
            typeMap[typeof(DateTimeOffset?)] = DbType.DateTimeOffset;
            lstParams.Add("DSP_GetSPParamsWithPos", new string[] { "@SPName" });
        }

        public bool ParamsValidation(string spName, Hashtable parameters)
        {
            StringBuilder objText = new StringBuilder();
            if (!lstParams.ContainsKey(spName))
            {
                Hashtable htable = new Hashtable();
                htable.Add("@SPName", spName);
                DataSet dset = ExecuteQuery("DSP_GetSPParamsWithPos", htable, CommandType.StoredProcedure);
                if (dset.Tables.Count > 0 && dset.Tables[0].Rows.Count > 0)
                {
                    _objDBCmd.Parameters.Clear();
                    string strKey = string.Empty;
                    CDataRow objRow = new CDataRow(); string[] arr_strParam = new string[dset.Tables[0].Rows.Count];
                    bool isInit = true;
                    for (int i = 0; i < dset.Tables[0].Rows.Count; i++)
                    {
                        objRow.Row = dset.Tables[0].Rows[i];
                        strKey = objRow.StringValue("PARAMETER_NAME");
                        arr_strParam[i] = strKey;
                        if (parameters.Contains(strKey))
                        {
                            object objVal = parameters[strKey];
                            Type valType = objVal.GetType();
                            if (valType.Name == "DateTime" || valType.Name == "DateTime?")
                            {
                                objVal = ((DateTime)objVal).ToString("yyyy-MM-dd hh:mm:ss"); valType = objVal.GetType();
                            }
                            IDbDataParameter objParam = new OdbcParameter(strKey, objVal);
                            if (typeMap.ContainsKey(valType)) { objParam.DbType = typeMap[valType]; }
                            _objDBCmd.Parameters.Add(objParam);
                            if (isInit) { objText.Append("?"); isInit = false; }
                            else { objText.Append(",?"); }
                        }
                    }
                    _objDBCmd.CommandText = "{call " + spName + " (" + objText.ToString() + ") }";
                    lstParams.Add(spName, arr_strParam);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                string[] arr_strParams = lstParams[spName];
                bool isInit = true;
                foreach (string key in arr_strParams)
                {
                    if (parameters.Contains(key))
                    {
                        object objVal = parameters[key];
                        Type valType = objVal.GetType();
                        if (valType.Name == "DateTime" || valType.Name == "DateTime?")
                        {
                            objVal = ((DateTime)objVal).ToString("yyyy-MM-dd hh:mm:ss"); valType = objVal.GetType();
                        }
                        IDbDataParameter objParam = new OdbcParameter(key, objVal);
                        if (typeMap.ContainsKey(valType)) { objParam.DbType = typeMap[valType]; }
                        _objDBCmd.Parameters.Add(objParam);
                        if (isInit) { objText.Append("?"); isInit = false; }
                        else { objText.Append(",?"); }
                    }
                }
                _objDBCmd.CommandText = "{call " + spName + " (" + objText.ToString() + ") }";
                return true;
            }

        }
        /// <summary>
        /// Create / Update ODBC Command and assign to common interface i.e IDBCommand.
        /// Bind the parameters
        /// </summary>
        /// <param name="text">Command Text</param>
        /// <param name="parameters">Parameters rerquired to execute the command text</param>
        private void CreateODBCCommand(string text, Hashtable parameters, CommandType type)
        {
            string strText = text;
            StringBuilder objText = new StringBuilder();
            if (_objDBCmd == null)
            {
                _objDBCmd = new OdbcCommand();
            }
            else
            {
                _objDBCmd.Parameters.Clear();
            }
            _objDBCmd.CommandType = type;
            if (type == CommandType.StoredProcedure && parameters != null && ParamsValidation(text, parameters) == false)
            {
                bool isInit = true;
                foreach (string key in parameters.Keys)
                {
                    if (isInit) { objText.Append(GetParameter(key, parameters)); isInit = false; }
                    else { objText.Append("," + GetParameter(key, parameters)); }
                }
                strText = "{call " + strText + " (" + objText.ToString() + ") }";
                _objDBCmd.CommandText = strText;
            }
            else if (parameters == null || parameters.Count == 0)
            {
                _objDBCmd.CommandType = type;
                _objDBCmd.CommandText = text;
            }
        }
        private string GetParameter(string key, Hashtable htable)
        {
            string strReturn = string.Empty;
            switch (htable[key].GetType().Name)
            {
                case "String":
                    strReturn = key + "='" + htable[key] + "'";
                    break;
                case "Boolean":
                    strReturn = key + "=" + ((Convert.ToBoolean(htable[key]) == true) ? "1" : "0");
                    break;
                default:
                    strReturn = key + "=" + htable[key];
                    break;
            }
            return strReturn;
        }
        /// <summary>
        /// Create  / Update Data Adapter with respective provider type
        /// </summary>
        /// <returns>IDbDataAdapter</returns>
        private IDbDataAdapter DataAdapter()
        {
            switch (Provider)
            {
                case DBProvider.OleDb:
                    if (_dataAdapter == null) { _dataAdapter = new OleDbDataAdapter(); }
                    _dataAdapter.SelectCommand = _objDBCmd;
                    break;
                case DBProvider.Odbc:
                    if (_dataAdapter == null) { _dataAdapter = new OdbcDataAdapter(); }
                    _dataAdapter.SelectCommand = _objDBCmd;
                    break;
                default:
                    _dataAdapter = null;
                    break;
            }
            return _dataAdapter;
        }
        #endregion
        #region Public Method
        /// <summary>
        /// Constructor to connect the database with respective connection string and provider type
        /// </summary>
        /// <param name="provider">Provider Type like MSSQL, Oracle etc.</param>
        /// <param name="conString">Connection String</param>
        public OtherDBManager(DBProvider provider, string conString)
        {
            _provider = provider;
            _conString = conString;
            try
            {
                _iDbConnection = GetConnection();
                if (_iDbConnection != null) { _iDbConnection.Open(); }
            }
            catch (OleDbException ex)
            {
                throw ex;
            }
            catch (OdbcException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// Get Provider Type like as MSSQL, Oracle etc
        /// </summary>
        public DBProvider Provider
        {
            get { return _provider; }
        }

        /// <summary>
        /// Get the database connection depends upon the provider
        /// </summary>
        /// <returns>IDbConnection</returns>
        public IDbConnection GetConnection()
        {
            if (lstParams.Count == 0) { InitParamsCollection(); }
            if (_iDbConnection == null)
            {
                switch (Provider)
                {
                    case DBProvider.OleDb:
                        _iDbConnection = new OleDbConnection(_conString);
                        break;
                    case DBProvider.Odbc:
                        _iDbConnection = new OdbcConnection(_conString);
                        break;
                    default:
                        return null;
                }
            }
            return _iDbConnection;
        }
        /// <summary>
        /// Create / Update the Command and bind the parameters
        /// </summary>
        /// <param name="type">Command Type</param>
        /// <param name="text">Command text</param>
        /// <param name="parameters">Parameters rerquired to execute the command text</param>
        /// <returns>IDbCommand</returns>
        public IDbCommand Command(CommandType type, string text, Hashtable parameters)
        {
            switch (Provider)
            {
                case DBProvider.OleDb:
                    CreateOLEDBCommand(text, parameters, type);
                    break;
                case DBProvider.Odbc:
                    CreateODBCCommand(text, parameters, type);
                    break;
                default:
                    _objDBCmd = null;
                    break;
            }
            if (_objDBCmd != null) { _objDBCmd.Connection = _iDbConnection; }
            return _objDBCmd;
        }
        public DataTable Execute(string query_procedure, Hashtable parameters, CommandType queryType)
        {
            return Execute<DataTable>(query_procedure, parameters, queryType);
        }
        public T Execute<T>(string query_procedure, Hashtable parameters, CommandType queryType)
        {
            return Execute<T>(query_procedure, parameters, queryType, null);
        }
        public T Execute<T>(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut)
        {
            object objData = null;
            _objDBCmd = Command(queryType, query_procedure, parameters);
            if (timeOut.HasValue) { _objDBCmd.CommandTimeout = timeOut.Value; }
            _dataAdapter = DataAdapter();
            if (typeof(T) == typeof(DataSet)) { objData = new DataSet(); _dataAdapter.Fill((DataSet)objData); }
            else if (typeof(T) == typeof(DataTable)) { DataSet dt = new DataSet(); _dataAdapter.Fill(dt); dt.Tables[0].TableName = Guid.NewGuid().ToString(); objData = dt.Tables[0].Copy(); }
            else { objData = Convert.ChangeType(null, typeof(T)); }
            return (T)objData;
        }

        /// <summary>
        /// Execute the Strored procedure
        /// </summary>
        /// <param name="procName">Procedure name</param>
        /// <returns>DataSet</returns>
        public DataSet ExecuteQuery(string query)
        {
            return ExecuteQuery(query, null, CommandType.Text);
        }
        public DataSet ExecuteQuery(string storedProcedure, Hashtable parameters)
        {
            return ExecuteQuery(storedProcedure, parameters, CommandType.StoredProcedure);
        }
        public DataSet ExecuteQuery(string query_procedure, Hashtable parameters, CommandType queryType)
        {
            return ExecuteQuery(query_procedure, parameters, CommandType.StoredProcedure, null);
        }
        public DataSet ExecuteQuery(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut)
        {
            DataSet objData = new DataSet();
            try
            {
                _objDBCmd = Command(queryType, query_procedure, parameters);
                if (timeOut.HasValue) { _objDBCmd.CommandTimeout = timeOut.Value; }
                _dataAdapter = DataAdapter();
                _dataAdapter.SelectCommand = _objDBCmd;
                _dataAdapter.Fill(objData);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return objData;
        }

        /// <summary>
        /// Execute the CUD Strored procedure
        /// </summary>
        /// <param name="procName">Procedure Name</param>
        /// <returns>Number of rows are affected result as Integer</returns>
        public int ExecuteNonQuery(string query)
        {
            return ExecuteNonQuery(query, null, CommandType.Text);
        }
        public int ExecuteNonQuery(string storedProcedure, Hashtable parameters)
        {
            return ExecuteNonQuery(storedProcedure, parameters, CommandType.StoredProcedure);
        }
        public int ExecuteNonQuery(string query_procedure, Hashtable parameters, CommandType queryType)
        {
            int iResult = 0;
            try
            {
                _objDBCmd = Command(queryType, query_procedure, parameters);
                iResult = _objDBCmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return iResult;
        }
        public int ExecuteNonQuery(string query_procedure, Hashtable parameters, CommandType queryType, int timeOut)
        {
            int iResult = 0;
            try
            {
                _objDBCmd = Command(queryType, query_procedure, parameters);
                _objDBCmd.CommandTimeout = timeOut;
                iResult = _objDBCmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
              
                throw ex;
            }
            return iResult;
        }
        /// <summary>
        /// Execute the Strored procedure
        /// </summary>
        /// <param name="procName">Procedure Name</param>
        /// <returns>From the SP result first row and first column value as object</returns>
        public object ExecuteScalar(string query)
        {
            return ExecuteScalar(query, null, CommandType.Text);
        }
        public object ExecuteScalar(string storedProcedure, Hashtable parameters)
        {
            return ExecuteScalar(storedProcedure, parameters, CommandType.StoredProcedure);
        }
        public object ExecuteScalar(string query_procedure, Hashtable parameters, CommandType queryType)
        {
            object objResult = 0;
            try
            {
                _objDBCmd = Command(queryType, query_procedure, parameters);
                objResult = _objDBCmd.ExecuteScalar();
            }
            catch (Exception ex)
            {
               
                throw ex;
            }
            return objResult;
        }

        /// <summary>
        /// Dispose and Call GC
        /// </summary>
        public void Dispose()
        {
            if (_objDBCmd != null) { _objDBCmd.Dispose(); _objDBCmd = null; }
            if (_iDbConnection != null) { if (_iDbConnection.State == ConnectionState.Open) { _iDbConnection.Close(); _iDbConnection.Dispose(); } }
            if (_dataAdapter != null) { _dataAdapter = null; }
            GC.SuppressFinalize(this);
        }
        #endregion

        public XmlReader ExecuteXMLReader(string query_procedure, System.Collections.Hashtable parameters, CommandType queryType, int? timeOut)
        {
            XmlReader objData = null;
            try
            {
                _objDBCmd = Command(queryType, query_procedure, parameters);
                if (timeOut.HasValue) { _objDBCmd.CommandTimeout = timeOut.Value; }
                IDataReader reader = _objDBCmd.ExecuteReader();
                StringBuilder objString = new StringBuilder();
                while (reader.FieldCount > 0 && reader.Read())
                {
                    objString.Append(reader.GetString(0));
                }
                var st = new StringReader(objString.ToString());
                objData = XmlReader.Create(st);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return objData;
        }
        public XmlReader ExecuteXMLReader(string query_procedure, System.Collections.Hashtable parameters, CommandType queryType)
        {
            return ExecuteXMLReader(query_procedure, parameters, queryType, null);
        }
    }
}
