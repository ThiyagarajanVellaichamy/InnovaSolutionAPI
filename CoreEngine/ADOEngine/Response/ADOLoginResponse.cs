using System.Data;
using Helper;
using ServiceProvider.Authentication;

namespace ADOEngine.Response
{
    public class ADOLoginResponse : LoginResponse
    {
        private const string param_id = "id";
        private const string param_name = "name";
        public ADOLoginResponse(DataRow dr)
        {
            this.Id = dr.GetValueAs<long>(param_id);
            this.Name = dr.GetValueAs<string>(param_name);
        }
    }
}
