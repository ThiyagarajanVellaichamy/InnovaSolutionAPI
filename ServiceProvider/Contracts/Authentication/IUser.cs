using System;
namespace ServiceProvider.Contracts.Authentication
{
    public interface IUser
    {
        long Id { get; }
        string Name { get; }
    }
}
