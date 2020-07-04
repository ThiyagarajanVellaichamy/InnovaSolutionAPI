using System;
namespace ServiceProvider.Contracts.Common
{
    public interface IAppSetting
    {
        string Connection { get; set; }
        string AppName { get; set; }
        string Description { get; set; }
        string BASEPATH { get; set; }
        string AESKey { get; set; }
        string JWTSecretKey { get; set; }
        string AllowedFileTypes { get; set; }
        long MaxFileSize { get; set; }
        string Version { get; set; }
        int ExpiryBuffer { get; set; }
    }
}
