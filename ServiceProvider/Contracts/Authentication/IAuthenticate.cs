using System;
using System.Threading;
using System.Threading.Tasks;
using ReadModel.Authentication;

namespace ServiceProvider.Contracts.Authentication
{
    public interface IAuthenticate : IDisposable
    {
        Task<LoginResponse> LoginAsync(string username, byte[] password, CancellationToken cancel = default(CancellationToken));
    }
}
