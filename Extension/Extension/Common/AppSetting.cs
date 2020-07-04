using System;
using ServiceProvider.Contracts.Common;

namespace Extension.Common
{
    public class AppSetting : IAppSetting
    {
        public string AppName { get; set; }
        public string Description { get; set; }
        public string BASEPATH { get; set; }
        public string AESKey { get; set; }
        public string JWTSecretKey { get; set; }
        public string AllowedFileTypes { get; set; }
        public long MaxFileSize { get; set; }
        public string Version { get; set; }
        public string Connection { get; set; }
        public int ExpiryBuffer { get; set; }
    }
}
