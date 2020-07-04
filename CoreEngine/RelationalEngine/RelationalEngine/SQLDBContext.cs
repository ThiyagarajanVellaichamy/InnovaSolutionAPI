using System;
using DataModel.Audit;
using Microsoft.EntityFrameworkCore;
using ServiceProvider.Contracts.Common;

namespace RelationalEngine
{
    public class SQLDBContext : DbContext
    {
        private readonly IAppSetting Configuration;
        public SQLDBContext(IAppSetting configuration)
        {
            this.Configuration = configuration;
        }

        public SQLDBContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.Connection);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserVerification> UserVerifications { get; set; }

    }
}
