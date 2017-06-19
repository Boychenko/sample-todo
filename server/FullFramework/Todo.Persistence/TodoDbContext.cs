using System.Data.Entity;

using Todo.Persistence.Mappings;

namespace Todo.Persistence
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext()
            : base("DefaultConnection")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new ItemMap());

            base.OnModelCreating(modelBuilder);
        }
    }
}