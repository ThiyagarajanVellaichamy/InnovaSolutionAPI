using System;
using WriteModel.Authentication;

namespace ServiceProvider.Contracts.Persistance
{
    public interface IToken<T> where T : IUser
    {
        string Generate(T param);
        string Generate(T param, DateTime expired);
    }
}
