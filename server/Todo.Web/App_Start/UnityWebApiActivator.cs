using System.Web.Http;
using Microsoft.Practices.Unity.WebApi;

namespace Todo.Web
{
    /// <summary>Provides the bootstrapping for integrating Unity with WebApi when it is hosted in ASP.NET</summary>
    public static class UnityWebApiActivator
    {
        /// <summary>Integrates Unity when the application starts.</summary>
        public static void Start(HttpConfiguration config) 
        {
            var resolver = new UnityHierarchicalDependencyResolver(UnityConfig.GetConfiguredContainer());

            config.DependencyResolver = resolver;
        }

        /// <summary>Disposes the Unity container when the application is shut down.</summary>
        public static void Shutdown()
        {
            var container = UnityConfig.GetConfiguredContainer();
            container.Dispose();
        }
    }
}
