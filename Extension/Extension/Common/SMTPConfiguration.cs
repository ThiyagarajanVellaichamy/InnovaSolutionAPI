using System;
using ServiceProvider.Contracts.Common;

namespace Extension.Common
{
    public class SMTPConfiguration : ISMTPConfiguration
    {
        
        public string FromAccount { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool SSL { get; set; }
        public int Port { get; set; }
    }
}
