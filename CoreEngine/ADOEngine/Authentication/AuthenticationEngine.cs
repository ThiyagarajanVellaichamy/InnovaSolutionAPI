using System.Collections;
using System.Threading;
using System.Threading.Tasks;
using ADOEngine.Response;
using ServiceProvider.Authentication;
using ServiceProvider.Contracts.Authentication;
using ServiceProvider.Contracts.Common;

namespace ADOEngine.Authentication
{
    public class AuthenticateEngine : BaseEngine, IAuthenticate
    {
        private const string SP_LOGIN = "USER.AUTHENTICATE";

        public AuthenticateEngine(IAppSetting configuration) : base(configuration)
        {

        }

        public async Task<Result<LoginResponse>> LoginAsync(string username, byte[] password, CancellationToken cancel = default)
        {
            return await dummyLogin();
            Hashtable param = new Hashtable();
            param.Add(key: "@password", value: password);
            param.Add(key: "@username", value: username);

            var result = await context.ExecuteAsync(SP_LOGIN, param, System.Data.CommandType.StoredProcedure, cancel);
            if (result.Rows.Count > 0)
                return new Result<LoginResponse>(new ADOLoginResponse(result.Rows[0]), Status.Success, "Authenticated");
            else
                return new Result<LoginResponse>(null, Status.Failed, "Invalid credential");
        }

        private async Task<Result<LoginResponse>> dummyLogin() => await Task.Run(()=>new Result<LoginResponse>(
            new LoginResponse { Id = 1, Name = "Thiyagarajan" }, Status.Success, "Authenticated"));
    }
}
