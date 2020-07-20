using System;
using ServiceProvider.Contracts.Authentication;

namespace ServiceProvider.Authentication
{
    public class LoginResponse : IUser
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
