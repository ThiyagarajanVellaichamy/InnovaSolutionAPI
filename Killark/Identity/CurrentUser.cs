using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using ServiceProvider.Contracts.Authentication;
using System.Linq;

namespace Killark.Identity
{
    public class CurrentUser : ICurrentUser
    {
        private readonly IHttpContextAccessor httpContext;
        private readonly IConfiguration configuration;

        /// <summary>
        /// To Initialize current user info using Middle ware DI.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="configuration"></param>
        public CurrentUser(IHttpContextAccessor context, IConfiguration configuration)
        {
            this.httpContext = context;
            this.configuration = configuration;
            var identity = (ClaimsIdentity)context.HttpContext.User.Identity;
            IEnumerable<Claim> claims = identity.Claims;

            if (claims != null && claims.Count() > 0)
            {
                var _id = claims.Where(y => y.Type.Equals("Id"))
                                .Select(x => x.Value).FirstOrDefault();
                this.Id = long.TryParse(_id, out long id) ? id : 0;
                this.Name = claims.Where(y => y.Type.Equals("Name"))
                                    .Select(x => x.Value).FirstOrDefault();
            }
        }

        public long Id { get; set; }

        public string Name { get; set; }
    }
}
