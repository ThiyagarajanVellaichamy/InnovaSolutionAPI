using System;
namespace ServiceProvider.Contracts.Common
{
    public interface ISMTPConfiguration
    {
        string FromAccount { get; set; }
        string UserName { get; set; }
        string Password { get; set; }
        bool SSL { get; set; }
        int Port { get; set; }
    }
}
