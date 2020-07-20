using System;
using System.Collections;
using System.Data;
using System.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;

namespace DBManager
{
    internal class SQLDBManager : IDBManager
    {
        private SqlCommand _sqlCommand = null;
        private SqlDataAdapter _objAdapter = null;
        public SQLDBManager(string conString)
        {
            try
            {
                Connection = new SqlConnection(conString);
                Connection.Open();
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public SqlConnection Connection { get; } = null;
        private SqlDataAdapter DataAdapter()
        {
            if (_objAdapter == null) { _objAdapter = new SqlDataAdapter(_sqlCommand); }
            else { _objAdapter.SelectCommand = _sqlCommand;
            }
            return _objAdapter;
        }
        private SqlCommand Command(CommandType type, string text, Hashtable parameters)
        {
            if (_sqlCommand == null)
            {
                _sqlCommand = new SqlCommand(text, Connection);
                _sqlCommand.CommandTimeout = 2000;
            }
            else
            {
                _sqlCommand.CommandText = text;
                _sqlCommand.Parameters.Clear();
            }
            _sqlCommand.CommandType = type;
            if (parameters != null)
            {
                foreach (string key in parameters.Keys)
                {
                    _sqlCommand.Parameters.AddWithValue(key, parameters[key]);
                }
            }
            return _sqlCommand;
        }


        public void Dispose()
        {
            if (_objAdapter != null) { _objAdapter.Dispose(); _objAdapter = null; }
            if (_sqlCommand != null) { _sqlCommand.Dispose(); _sqlCommand = null; }
            if (Connection != null) { if (Connection.State == ConnectionState.Open) { Connection.Close(); Connection.Dispose(); } }
            GC.SuppressFinalize(this);
        }

        public DBProvider Provider
        {
            get { return DBProvider.MSSQL; }
        }


        public async Task<DataTable> ExecuteAsync(string query_procedure, Hashtable parameters, CancellationToken cancellation = default)
        {
            return await ExecuteAsync(query_procedure, parameters, CommandType.StoredProcedure, cancellation);
        }

        public async Task<DataTable> ExecuteAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default)
        {
            return await ExecuteAsync(query_procedure,parameters, queryType, null, cancellation);
        }

        public async Task<DataTable> ExecuteAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default)
        {
            DataTable objData = null;
            _sqlCommand = Command(queryType, query_procedure, parameters);
            if (timeOut.HasValue) { _sqlCommand.CommandTimeout = timeOut.Value; }
            _objAdapter = DataAdapter();
            objData = new DataTable();
            await Task.Run(() =>_objAdapter.Fill((DataTable)objData),cancellation); 
            return objData;
        }

        public async Task<DataSet> ExecuteQueryAsync(string query, CancellationToken cancellation = default)
        {
            return await ExecuteQueryAsync(query, new Hashtable(), cancellation);
        }

        public async Task<DataSet> ExecuteQueryAsync(string storedProcedure, Hashtable parameters, CancellationToken cancellation = default)
        {
            return await ExecuteQueryAsync(storedProcedure, parameters, CommandType.StoredProcedure, cancellation);
        }

        public async Task<DataSet> ExecuteQueryAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default)
        {
            return await ExecuteQueryAsync(query_procedure, parameters, queryType, null, cancellation);
        }

        public async Task<DataSet> ExecuteQueryAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default)
        {
            DataSet objData = null;
            _sqlCommand = Command(queryType, query_procedure, parameters);
            if (timeOut.HasValue) { _sqlCommand.CommandTimeout = timeOut.Value; }
            _objAdapter = DataAdapter();
            objData = new DataSet();
            await Task.Run(() => _objAdapter.Fill((DataSet)objData), cancellation); 
            return objData;
        }

        public Task<XmlReader> ExecuteXMLReaderAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default)
        {
            throw new NotImplementedException();
        }

        public Task<XmlReader> ExecuteXMLReaderAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default)
        {
            throw new NotImplementedException();
        }

        public async Task<int> ExecuteNonQueryAsync(string query, CancellationToken cancellation = default)
        {
            return await ExecuteNonQueryAsync(query, new Hashtable(), cancellation);
        }

        public async Task<int> ExecuteNonQueryAsync(string storedProcedure, Hashtable parameters, CancellationToken cancellation = default)
        {
            return await ExecuteNonQueryAsync(storedProcedure, parameters, CommandType.StoredProcedure, cancellation);
        }

        public async Task<int> ExecuteNonQueryAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default)
        {
            return await ExecuteNonQueryAsync(query_procedure, parameters, queryType, null, cancellation);
        }

        public async Task<int> ExecuteNonQueryAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default)
        {
            int iResult = 0;
            try
            {
                _sqlCommand = Command(queryType, query_procedure, parameters);
                if(timeOut.HasValue)
                 _sqlCommand.CommandTimeout = timeOut.Value;
                iResult = await _sqlCommand.ExecuteNonQueryAsync(cancellation);
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return iResult;
        }

        public async Task<object> ExecuteScalarAsync(string query, CancellationToken cancellation = default)
        {
            return await ExecuteScalarAsync(query,new Hashtable(), cancellation);
        }

        public async Task<object> ExecuteScalarAsync(string storedProcedure, Hashtable parameters, CancellationToken cancellation = default)
        {
            return await ExecuteScalarAsync(storedProcedure, parameters, CommandType.StoredProcedure, cancellation);
        }

        public async Task<object> ExecuteScalarAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default)
        {
            return await ExecuteScalarAsync(query_procedure, parameters, queryType, null,cancellation);
        }

        public async Task<object> ExecuteScalarAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default)
        {
            System.Xml.XmlReader objResult = null;
            try
            {
                _sqlCommand = Command(queryType, query_procedure, parameters);
                if (timeOut.HasValue) { _sqlCommand.CommandTimeout = timeOut.Value; }
                objResult = await _sqlCommand.ExecuteXmlReaderAsync(cancellation);
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return objResult;
        }
    }
}