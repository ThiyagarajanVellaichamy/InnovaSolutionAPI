using System;
using System.Threading.Tasks;

namespace ServiceProvider.Contracts.Persistance
{
    public interface INotification
    {
        Task<bool> SendAsync();
    }
}
