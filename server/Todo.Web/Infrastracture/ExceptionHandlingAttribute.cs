namespace Todo.Web.Infrastracture
{
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Http.Filters;

    public class ExceptionHandlingAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            var exception = context.Exception;
            if(!(exception is HttpResponseException))
            {
                context.Response = context.Request.CreateErrorResponse(
                    HttpStatusCode.InternalServerError,
                    "An error occurred, please try again or contact the administrator.");
                context.Response.ReasonPhrase = "Critical Exception";
            }
        }
    }
}