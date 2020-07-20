using System;
using System.Collections;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;

namespace DBManager.DL
{
    public class DBEntity : IDBManager
    {
        private DBProvider _provider;
        private IDBManager manager = null;
        private string _conString = string.Empty;

        public DBEntity(string connectionStringName, DBProvider provider = DBProvider.MSSQL)
        {
            _conString = connectionStringName;
            _provider = provider;
            switch (provider) {
                case DBProvider.MSSQL:
                    manager = new SQLDBManager(_conString);
                    break;
            }
        }

        public DBProvider Provider
        {
            get { return _provider; }
        }

      

        public async Task<DataTable> ExecuteAsync(string query_procedure, Hashtable parameters, CancellationToken cancellation = default)
        {
            return await manager.ExecuteAsync(query_procedure, parameters, cancellation);
        }

        public async Task<DataTable> ExecuteAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default)
        {
            return await manager.ExecuteAsync(query_procedure, parameters, queryType, cancellation);
        }

        public async Task<DataTable> ExecuteAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default)
        {
            return await manager.ExecuteAsync(query_procedure, parameters, queryType, timeOut, cancellation);
        }

        public async Task<DataSet> ExecuteQueryAsync(string query, CancellationToken cancellation = default)
        {
            return await manager.ExecuteQueryAsync(query, cancellation);
        }

        public async Task<DataSet> ExecuteQueryAsync(string storedProcedure, Hashtable parameters, CancellationToken cancellation = default)
        {
            return await manager.ExecuteQueryAsync(storedProcedure, parameters, cancellation);
        }

        public async Task<DataSet> ExecuteQueryAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default)
        {
            return await manager.ExecuteQueryAsync(query_procedure, parameters, queryType, cancellation);
        }

        public async Task<DataSet> ExecuteQueryAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default)
        {
            return await manager.ExecuteQueryAsync(query_procedure, parameters, queryType, timeOut, cancellation);
        }

        public async Task<XmlReader> ExecuteXMLReaderAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default)
        {
            return await manager.ExecuteXMLReaderAsync(query_procedure, parameters, queryType, cancellation);
        }

        public async Task<XmlReader> ExecuteXMLReaderAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default)
        {
            return await manager.ExecuteXMLReaderAsync(query_procedure, parameters, queryType, timeOut, cancellation);
        }

        public async Task<int> ExecuteNonQueryAsync(string query, CancellationToken cancellation = default)
        {
            return await manager.ExecuteNonQueryAsync(query, cancellation);
        }

        public async Task<int> ExecuteNonQueryAsync(string storedProcedure, Hashtable parameters, CancellationToken cancellation = default)
        {
            return await manager.ExecuteNonQueryAsync(storedProcedure, parameters, cancellation);
        }

        public async Task<int> ExecuteNonQueryAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default)
        {
            return await manager.ExecuteNonQueryAsync(query_procedure, parameters, cancellation);
        }

        public async Task<int> ExecuteNonQueryAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default)
        {
            return await manager.ExecuteNonQueryAsync(query_procedure, parameters, queryType, timeOut, cancellation);
        }

        public async Task<object> ExecuteScalarAsync(string query, CancellationToken cancellation = default)
        {
            return await manager.ExecuteScalarAsync(query, cancellation);
        }

        public async Task<object> ExecuteScalarAsync(string storedProcedure, Hashtable parameters, CancellationToken cancellation = default)
        {
            return await manager.ExecuteScalarAsync(storedProcedure, parameters, cancellation);
        }

        public async Task<object> ExecuteScalarAsync(string query_procedure, Hashtable parameters, CommandType queryType, CancellationToken cancellation = default)
        {
            return await manager.ExecuteScalarAsync(query_procedure, parameters, queryType, cancellation);
        }

        public async Task<object> ExecuteScalarAsync(string query_procedure, Hashtable parameters, CommandType queryType, int? timeOut, CancellationToken cancellation = default)
        {
            return await manager.ExecuteScalarAsync(query_procedure, parameters, queryType, timeOut, cancellation);
        }

        public void Dispose()
        {
            if(manager!=null)
                manager.Dispose();
        }
    }
}