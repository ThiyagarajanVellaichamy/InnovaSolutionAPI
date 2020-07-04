using System;
namespace WriteModel.Authentication
{
    public interface IUser
    {
        long Id { get; }
        string Name { get; }
    }
}
