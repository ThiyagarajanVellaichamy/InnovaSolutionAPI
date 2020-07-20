using System;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;
using DBManager.DL;

namespace ADOEngine
{
    public abstract class BaseEngine : IDisposable
    {
        private readonly ILoggerManager _logger;
        protected readonly IAppSetting setting;
        protected DBEntity context;
        /// <summary>
        /// To Initialize the constructor
        /// </summary>
        /// <param name="configuration"></param>
        public BaseEngine(IAppSetting configuration)
        {
            this.setting = configuration;
            Initialize(configuration);
        }

        public BaseEngine(IAppSetting configuration, ILoggerManager logger)
        {
            this.setting = configuration;
            this.Initialize(configuration);
            this._logger = logger;
        }

        private void Initialize(IAppSetting configuration)
        {
            if(!string.IsNullOrEmpty(configuration.Connection))
                this.context = new DBEntity(configuration.Connection);
        }

        /// <summary>
        /// To Dispose context
        /// </summary>
        public void Dispose()
        {
            this.context?.Dispose();
        }
    }
}
