using System;
namespace ServiceProvider.Contracts.Authentication
{
    public interface ICurrentUser
    {
        long Id { get; set; }
        string Name { get; set; }
    }
}
