namespace Todo.Web.Helpers
{
    using System.Security.Claims;
    using System.Security.Principal;

    public static class IdentityExtentions
    {
        public static string GetAppUserId(this IIdentity identity)
        {
            return "0db91a12-1c06-4654-abb1-8b6dcb6c73b5";
            var claimsIdentity = identity as ClaimsIdentity;

            if (claimsIdentity == null)
            {
                return null;
            }

            var issuerFromIdentity = claimsIdentity.FindFirst("iss"); 
            var subFromIdentity = claimsIdentity.FindFirst("sub");

            if (issuerFromIdentity == null || subFromIdentity == null)
            {
                return null;
            }

            return issuerFromIdentity.Value + subFromIdentity.Value;
        }
    }
}