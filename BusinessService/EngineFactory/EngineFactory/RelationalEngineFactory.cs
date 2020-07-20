using System;
using System.Collections.Generic;
using System.Linq;
using ServiceProvider.Contracts.Authentication;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;

namespace EngineFactory
{
    public sealed class RelationalEngineFactory : IDisposable
    {



        private IList<object> diObject = new List<object>();
        /// <summary>
        /// To Initailize relational engine factory
        /// </summary>
        /// <param name="appsetting"></param>
        public RelationalEngineFactory(IAppSetting appsetting, ILoggerManager logger,IEncryption encryption)
        {
            this.diObject.Add(logger);
            this.diObject.Add(appsetting);
            this.diObject.Add(encryption);
        }

        /// <summary>
        /// To get instance 
        /// </summary>
        /// <typeparam name="T">T should be an inteface</typeparam>
        /// <typeparam name="I">I should be a concrete class which has inherited by T</typeparam>
        /// <returns></returns>
        public T GetInstance<T, I>() where I : class, T
        {
            return (T)Instance(typeof(I));
        }
        /// <summary>
        /// To get instance.
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        private object Instance(Type type)
        {
            try
            {
                var ctor = type
                    .GetConstructors()
                    .FirstOrDefault(c => c.GetParameters().Length > 0);

                if (ctor == null)
                {
                    return Activator.CreateInstance(type);
                }
                else
                {
                    var constructorParameters = ctor.GetParameters();
                    object[] instanceParam = new object[constructorParameters.Length];
                    foreach (var param in constructorParameters)
                    {
                        var value = diObject.FirstOrDefault(s =>
                        {

                            if (s.GetType() == param.ParameterType)
                                return true;
                            else
                                return s.GetType().GetInterfaces().Any(s => s.Name == param.ParameterType.Name);
                        });
                        instanceParam[param.Position] = value ?? constructorParameters[param.Position].DefaultValue;
                    }

                    return Activator.CreateInstance(type, instanceParam);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Dispose Current instance.
        /// </summary>
        public void Dispose()
        {
            this.diObject = null;
        }

    }
}
