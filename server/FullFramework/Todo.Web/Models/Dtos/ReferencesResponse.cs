namespace Todo.Web.Models.Dtos
{
    using System.Collections.Generic;

    public class ReferencesResponse
    {
        public Dictionary<int, string> Priorities { get; set; }
    }
}