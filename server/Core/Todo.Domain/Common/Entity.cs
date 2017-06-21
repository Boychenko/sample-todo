namespace Todo.Domain.Common
{
    using System;

    public abstract class Entity<TKeyType, T> : Value<T>
        where T : Entity<TKeyType, T>, new()
        where TKeyType : IComparable
    {
        public abstract TKeyType Id { get; set; }

        public override bool Equals(T other)
        {
            if (other == null)
            {
                return false;
            }
            return Id.Equals(other.Id);
        }

        public override int GetHashCode()
        {
            return GetType().FullName.GetHashCode() + Id.GetHashCode();
        }

        public override int CompareTo(T other)
        {
            if (ReferenceEquals(other, null))
                return 1; // All instances are greater than null

            return Id.CompareTo(other.Id);
        }
    }
}