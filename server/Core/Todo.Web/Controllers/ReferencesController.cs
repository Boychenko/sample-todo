namespace Todo.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Domain.Models;
    using Microsoft.AspNetCore.Mvc;
    using Models.Dtos;

    [Route("api/[controller]")]
    public class ReferencesController : BaseController
    {
        [HttpGet]
        [Route("")]
        public IActionResult Get()
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