namespace Todo.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using Domain.Models;
    using Models.Dtos;

    [RoutePrefix("api/references")]
    public class ReferencesController : BaseController
    {
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            var result = new ReferencesResponse();
            var priorities = new Dictionary<int, string>();
            foreach (var value in Enum.GetValues(typeof(Priority)).Cast<int>())
            {
                priorities.Add(value, ((Priority)value).ToString());
            }
            result.Priorities = priorities;
            return Ok(result);
        }
    }
}