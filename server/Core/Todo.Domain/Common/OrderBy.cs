namespace Todo.Domain.Common
{
    public class OrderBy
    {
        public string PropertyName { get; set; }

        public OrderDirection OrderDirection { get; set; }

        public OrderBy(string propertyName, OrderDirection orderDirection)
        {
            this.PropertyName = propertyName;
            this.OrderDirection = orderDirection;
        }

        public static OrderBy Asc(string propertyName)
        {
            return new OrderBy(propertyName, OrderDirection.Asc);
        }

        public static OrderBy Desc(string propertyName)
        {
            return new OrderBy(propertyName, OrderDirection.Desc);
        }
    }

}