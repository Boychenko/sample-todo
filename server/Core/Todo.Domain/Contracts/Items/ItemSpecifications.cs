namespace Todo.Domain.Contracts.Items
{
    using System.Collections.Generic;
    using Common;
    using Models;

    public class ItemSpecifications : SpecificationsIdentifiersBase<long>
    {
        public List<string> UserIds { get; set; } = new List<string>();

        public override List<OrderBy> OrderBysDefault => new List<OrderBy> { OrderBy.Asc(nameof(Item.Id)) };
    }
}