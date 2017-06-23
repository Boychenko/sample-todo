namespace Todo.Persistance
{
    using Domain.Models;
    using Microsoft.EntityFrameworkCore;

    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>().HasKey(i => i.Id);
            modelBuilder.Entity<Item>().Property(i => i.Title).IsRequired().HasMaxLength(250);
            modelBuilder.Entity<Item>().Property(i => i.UserId).IsRequired().HasMaxLength(250);
            modelBuilder.Entity<Item>().HasIndex(i => i.UserId);

            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                modelBuilder.Entity(entity.Name).ToTable(entity.Relational().TableName + "s");
            }
        }
    }
}