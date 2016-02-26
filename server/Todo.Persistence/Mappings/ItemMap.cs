namespace Todo.Persistence.Mappings
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.ModelConfiguration;
    using Domain.Models;

    public class ItemMap : EntityTypeConfiguration<Item>
    {
        public ItemMap()
        {
            HasKey(i => i.Id);
            Property(i => i.Title).IsRequired().HasMaxLength(250);
            Property(i => i.UserId)
                .HasColumnAnnotation(IndexAnnotation.AnnotationName, new IndexAnnotation(new IndexAttribute()))
                .IsRequired()
                .HasMaxLength(250);
        }
    }
}