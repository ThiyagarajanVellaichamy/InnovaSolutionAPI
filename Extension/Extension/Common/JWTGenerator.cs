using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ServiceProvider.Contracts.Authentication;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;

namespace Extension.Common
{
    public class JWTGenerator : IToken<IUser>
    {
        private readonly IAppSetting _app;
        public JWTGenerator(IAppSetting app)
        {
            this._app = app;
        }
        /// <summary>
        /// To Generate token
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public string Generate(IUser param)
        {
            return this.Generate(param, DateTime.Now.AddDays(1));
        }
        /// <summary>
        /// To Generate token with expiry
        /// </summary>
        /// <param name="param"></param>
        /// <param name="expired"></param>
        /// <returns></returns>
        public string Generate(IUser param, DateTime expired)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this._app.JWTSecretKey);
            var securitykey = new SymmetricSecurityKey(key);
            var signingcredential = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256Signature);
            var claimlist = new List<Claim>();
            claimlist.Add(new Claim("Id", param.Id.ToString()));
            claimlist.Add(new Claim("Name", param.Name.ToString()));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims: claimlist),
                Expires = expired,
                SigningCredentials = signingcredential
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

}
