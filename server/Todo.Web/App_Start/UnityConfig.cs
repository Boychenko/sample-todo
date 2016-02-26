namespace Todo.Web
{
    using System;
    using System.Data.Entity;
    using System.Linq;
    using AutoMapper;
    using Domain.Contracts;
    using Domain.Contracts.Services;
    using Microsoft.Practices.Unity;
    using Persistence;
    using Profiles;
    using Services;

    /// <summary>
    ///     Specifies the Unity configuration for the main container.
    /// </summary>
    public static class UnityConfig
    {
        /// <summary>Registers the type mappings with the Unity container.</summary>
        /// <param name="container">The unity container to configure.</param>
        /// <remarks>
        ///     There is no need to register concrete types such as controllers or API controllers (unless you want to
        ///     change the defaults), as Unity allows resolving a concrete type even if it was not previously registered.
        /// </remarks>
        private static void RegisterTypes(IUnityContainer container)
        {
            container.RegisterType<DbContext, TodoDbContext>(new HierarchicalLifetimeManager());
            container.RegisterType<IUnitOfWork, UnitOfWork>(new HierarchicalLifetimeManager());

            container.RegisterType<IItemService, ItemService>(new HierarchicalLifetimeManager());

            var profiles =
            from t in typeof(DtoProfile).Assembly.GetTypes()
            where typeof(Profile).IsAssignableFrom(t)
            select (Profile)Activator.CreateInstance(t);

            var config = new MapperConfiguration(cfg =>
            {
                foreach (var profile in profiles)
                {
                    cfg.AddProfile(profile);
                }
            });

            container.RegisterInstance(config);
            container.RegisterType<IMapper>(new InjectionFactory(c => c.Resolve<MapperConfiguration>().CreateMapper()));
        }

        #region Unity Container

        private static readonly Lazy<IUnityContainer> container = new Lazy<IUnityContainer>(() =>
        {
            var container = new UnityContainer();
            RegisterTypes(container);
            return container;
        });

        /// <summary>
        ///     Gets the configured Unity container.
        /// </summary>
        public static IUnityContainer GetConfiguredContainer()
        {
            return container.Value;
        }

        #endregion
    }
}