/****************************************************************************************************
* Copyright © Thiyagarajan Vellaichamy. All rights reserved.      
* You must not remove this notice, or any other, from this software.  
* -------------------------------------------------------------------------------------------------
* Created By      |      Date        |       Purpose 
* ------------------------------------------------------------------------------------------------- 
* Thiyagarajan V  |      23-Nov-2017 |       Common Database manager Interface to connect the database
* -------------------------------------------------------------------------------------------------
* Modified By     |      Date        |       Purpose
*-------------------------------------------------------------------------------------------------- 
* ***************************************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Collections;
using System.Xml;
using System.Threading;
using System.Threading.Tasks;

namespace DBManager
{
    public enum DBProvider
    {
        MSSQL,
        Oracle,
        OleDb,
        Odbc
    }

   
    interface IDBManager : IDisposable
    {
        /// <summary>
        /// Provider Type
        /// </summary>
        DBProvider Provider { get; }

        /// <summary>
        /// Execute Strored procedure and returns DataTable
        /// </summary>
        //DataTable Execute(string query);
        //DataTable Execute(string storedProcedure, Hashtable parameters);
        //DataTable Execute(string query_procedure, Hashtable parameters, CommandType queryType);
        Task<DataTable> ExecuteAsync(string query_procedure, Hashtable parameters, CancellationToken cancellation= default(CancellationToken));
        Task<DataTable> ExecuteAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default(CancellationToken));
        Task<DataTable> ExecuteAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default(CancellationToken));

        /// <summary>
        /// Execute Strored procedure and returns DataSet
        /// </summary>
        Task<DataSet> ExecuteQueryAsync(string query, CancellationToken cancellation = default(CancellationToken));
        Task<DataSet> ExecuteQueryAsync(string storedProcedure, Hashtable parameters, CancellationToken cancellation = default(CancellationToken));
        Task<DataSet> ExecuteQueryAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default(CancellationToken));
        Task<DataSet> ExecuteQueryAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default(CancellationToken));

        Task<XmlReader> ExecuteXMLReaderAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default(CancellationToken));
        Task<XmlReader> ExecuteXMLReaderAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default(CancellationToken));
        /// <summary>
        /// Execute the CUD Strored procedure
        /// </summary>
        /// <param name="procName">Procedure Name</param>
        /// <returns>Number of rows are affected result as Integer</returns>
        Task<int> ExecuteNonQueryAsync(string query, CancellationToken cancellation = default(CancellationToken));
        Task<int> ExecuteNonQueryAsync(string storedProcedure, Hashtable parameters, CancellationToken cancellation = default(CancellationToken));
        Task<int> ExecuteNonQueryAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default(CancellationToken));
        Task<int> ExecuteNonQueryAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default(CancellationToken));
        /// <summary>
        /// Execute the Strored procedure
        /// </summary>
        /// <param name="procName">Procedure Name</param>
        /// <returns>From the SP result first row and first column value as object</returns>
        Task<object> ExecuteScalarAsync(string query, CancellationToken cancellation = default(CancellationToken));
        Task<object> ExecuteScalarAsync(string storedProcedure, Hashtable parameters, CancellationToken cancellation = default(CancellationToken));
        Task<object> ExecuteScalarAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default(CancellationToken));
        Task<object> ExecuteScalarAsync(string query_procedure, Hashtable parameters, CommandType queryType,int? timeOut, CancellationToken cancellation = default(CancellationToken));
    }   
}
