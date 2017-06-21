namespace Todo.Web.Models.Dtos
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using Domain.Models;

    public class ItemDto
    {
        public long Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public Priority Priority { get; set; }

        public DateTime DueDate { get; set; }

        public bool Completed { get; set; }
    }
}