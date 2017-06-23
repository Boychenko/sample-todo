namespace Todo.Domain.Common
{
    using System;
    using System.Linq.Expressions;
    using System.Reflection;

    public class OrderBy
    {
        public string PropertyName { get; }

        public OrderDirection OrderDirection { get; }

        public OrderBy(string propertyName, OrderDirection orderDirection)
        {
            this.PropertyName = propertyName;
            this.OrderDirection = orderDirection;
        }

        public static OrderBy Asc(string propertyName)
        {
            return new OrderBy(propertyName, OrderDirection.Asc);
        }

        public static OrderBy Asc<TSource, TProperty>(Expression<Func<TSource, TProperty>> propertyLambda)
        {
            var propertyInfo = GetPropertyInfo(propertyLambda);
            return new OrderBy(propertyInfo.Name, OrderDirection.Asc);
        }

        public static OrderBy Desc(string propertyName)
        {
            return new OrderBy(propertyName, OrderDirection.Desc);
        }

        public static OrderBy Desc<TSource, TProperty>(Expression<Func<TSource, TProperty>> propertyLambda)
        {
            var propertyInfo = GetPropertyInfo(propertyLambda);
            return new OrderBy(propertyInfo.Name, OrderDirection.Desc);
        }

        private static PropertyInfo GetPropertyInfo<TSource, TProperty>(Expression<Func<TSource, TProperty>> propertyLambda)
        {
            Type type = typeof(TSource);

            MemberExpression member = propertyLambda.Body as MemberExpression;
            if (member == null)
                throw new ArgumentException(string.Format("Expression '{0}' refers to a method, not a property.", propertyLambda.ToString()));

            System.Reflection.PropertyInfo propInfo = member.Member as PropertyInfo;
            if (propInfo == null)
                throw new ArgumentException(string.Format("Expression '{0}' refers to a field, not a property.", propertyLambda.ToString()));

            if (type != propInfo.DeclaringType && !type.GetTypeInfo().IsSubclassOf(propInfo.DeclaringType))
                throw new ArgumentException(string.Format("Expresion '{0}' refers to a property that is not from type {1}.", propertyLambda.ToString(), type));

            return propInfo;
        }
    }

}