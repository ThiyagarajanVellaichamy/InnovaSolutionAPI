using System;
using System.Data;
using System.Data.OleDb;

namespace DBManager.DL
{
    public class Excel : IDisposable
    {
        OleDbConnection connection;
        OleDbCommand command = new OleDbCommand();
        OleDbDataAdapter da;
        public Excel(string path)
        {
            string oledbConnectString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path + ";Extended Properties=\"Excel 12.0;HDR=YES\";";
            connection = new OleDbConnection(oledbConnectString);
        }
        public DataTable ExecuteQuery(string query)
        {
            command.CommandText = query;
            command.Connection = connection;
            da = new OleDbDataAdapter(command);
            System.Data.DataTable dt = new System.Data.DataTable();
            da.Fill(dt);
            return dt;
        }

        public DataTable ExecuteWithoutDatatype(string query)
        {
            command.CommandText = query;
            command.Connection = connection;
            da = new OleDbDataAdapter(command);
            System.Data.DataTable dt = new System.Data.DataTable();
            da.FillSchema(dt, SchemaType.Source);
            foreach (DataColumn cl in dt.Columns)
            {
                if (cl.DataType != typeof(string))
                    cl.DataType = typeof(string);
            }
            da.Fill(dt);
            return dt;
        }
        public int ExecuteNonQuery(string query)
        {
            command.Connection = connection;
            command.CommandText = query;
            return command.ExecuteNonQuery();
        }

        public void Dispose()
        {
            if (da != null) { da.Dispose(); }
            if (command != null) { command.Dispose(); }
            if (connection != null) { connection.Close(); connection.Dispose(); }
        }


        public DataTable GetOleDbSchemaTable()
        {
            connection.Open();
            DataTable dt = connection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            connection.Close();
            return dt;
        }


    }
}
