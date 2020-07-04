using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ReadModel.Authentication;
using ServiceProvider.Contracts.Authentication;
using ServiceProvider.Contracts.Common;

namespace RelationalEngine.Authentication
{
    public sealed class AuthenticateEngine : BaseEngine, IAuthenticate
    {

        public AuthenticateEngine(IAppSetting configuration) : base(configuration)
        {

        }
        public async Task<LoginResponse> LoginAsync(string username, byte[] password, CancellationToken cancel = default)
        {
            var usr = await context.Users.FirstOrDefaultAsync(s => s.Password == password && s.Email == username && s.IsActive == true, cancel);
            if (usr != null)
            {
                return new LoginResponse
                {
                    Id = usr.Id,
                    Name = usr.Name
                };
            }
            else
            {
                return null;
            }
        }
    }
}
