namespace Todo.Domain.Common
{
    using System;
    using System.Collections.Generic;

    public abstract class SpecificationsIdentifiersBase<TIdentifier> : SpecificationsBase
        where TIdentifier : IConvertible
    {
        public List<TIdentifier> Identifiers { get; set; } = new List<TIdentifier>();
    }
}