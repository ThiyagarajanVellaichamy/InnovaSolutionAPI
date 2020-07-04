using System;
using EngineFactory;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;

namespace BusinessService
{
    public abstract class BaseService : IDisposable
    {
        protected readonly RelationalEngineFactory Instance;
        public BaseService(IAppSetting configuration,
                           ILoggerManager logger,
                           IEncryption encryption)
        {
            this.Instance = new RelationalEngineFactory(configuration, logger, encryption);
        }
        public virtual void Dispose()
        {
            this.Instance?.Dispose();
        }
    }
}
