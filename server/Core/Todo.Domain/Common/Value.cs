namespace Todo.Domain.Common
{
    using System;
    using System.Diagnostics;

    public abstract class Value<T> : IComparable, IComparable<T>, IEquatable<T> where T : Value<T>, new()
    {
        [DebuggerStepThrough]
        public Value() { }


        public override bool Equals(object obj)
        {
            var otherValue = obj as T;
            if (otherValue == null)
            {
                return false;
            }
            return Equals(otherValue);
        }

        public abstract bool Equals(T other);

        public abstract override int GetHashCode();

        public virtual int CompareTo(object other)
        {
            if (ReferenceEquals(other, null))
                return 1; // All instances are greater than null

            var otherValue = other as T;
            if (otherValue == null)
            {
                throw new ArgumentException($"The comparing type must be '{GetType()}'", nameof(other));
            }
            return CompareTo(otherValue);
        }

        public abstract int CompareTo(T other);

        public static bool operator ==(Value<T> a, Value<T> b)
        {
            // If both are null, or both are same instance, return true.
            if (ReferenceEquals(a, b))
            {
                return true;
            }
            // If one is null, but not both, return false.
            if (((object)a == null) || ((object)b == null))
            {
                return false;
            }
            return a.Equals(b);
        }

        public static bool operator !=(Value<T> a, Value<T> b)
        {
            return !(a == b);
        }
    }
}