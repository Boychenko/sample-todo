namespace Todo.Domain.Common
{
    public abstract class IdentityEntity<T> : Entity<long, T>
        where T : Entity<long, T>, new()
    {
        public override long Id { get; set; }
    }
}