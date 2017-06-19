namespace Todo.Web
{
    using System.Web.Http;
    using Infrastracture;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            config.Formatters.Remove(config.Formatters.XmlFormatter);

            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings.Formatting = Formatting.Indented;
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            config.Filters.Add(new ExceptionHandlingAttribute());
            // Web API routes
            config.MapHttpAttributeRoutes();
        }
    }
}