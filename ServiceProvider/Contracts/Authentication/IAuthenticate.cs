using System;
using System.Threading;
using System.Threading.Tasks;
using ServiceProvider.Authentication;
using ServiceProvider.Contracts.Common;

namespace ServiceProvider.Contracts.Authentication
{
    public interface IAuthenticate : IDisposable
    {
        Task<Result<LoginResponse>> LoginAsync(string username, byte[] password, CancellationToken cancel = default(CancellationToken));
    }
}
