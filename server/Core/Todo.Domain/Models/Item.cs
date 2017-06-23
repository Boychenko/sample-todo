namespace Todo.Domain.Models
{
    using System;
    using Common;

    public class Item : IdentityEntity<Item>
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public Priority Priority { get; set; }

        public DateTime DueDate { get; set; }

        public string UserId { get; set; }

        public bool Completed { get; set; }
    }
}