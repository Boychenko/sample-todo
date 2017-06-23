namespace Todo.Persistance
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Reflection;

    public static class DbContextExtensions
    {
        /// <summary>
        /// Use it, when you need to use paging with your select query
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="pageSize"></param>
        /// <param name="pageNumber"></param>
        /// <returns></returns>
        public static IQueryable<T> ToPagedQuery<T>(this IQueryable<T> query, int pageSize, int pageNumber)
        {
            if (pageSize < 1 ||
                pageSize == int.MaxValue)
            {
                return query;
            }

            pageNumber = pageNumber > 0 ? pageNumber : 1;

            return query.Skip(pageSize * (pageNumber - 1)).Take(pageSize);
        }

        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string properyName, bool asc = true)
        {
            if (source.Expression.Type == typeof(IOrderedQueryable<T>))
                return (source as IOrderedQueryable<T>).ThenBy(properyName, asc);

            var type = typeof(T);
            var property = type.GetProperty(properyName);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExp = Expression.Lambda(propertyAccess, parameter);
            MethodCallExpression resultExp =
                Expression.Call(
                    typeof(Queryable),
                    asc ? "OrderBy" : "OrderByDescending",
                    new Type[] { type, property.PropertyType }, source.Expression, Expression.Quote(orderByExp));

            return (IOrderedQueryable<T>)source.Provider.CreateQuery<T>(resultExp);
        }

        public static IOrderedQueryable<T> ThenBy<T>(this IOrderedQueryable<T> source, string properyName, bool asc = true)
        {
            var type = typeof(T);
            var property = type.GetProperty(properyName);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExp = Expression.Lambda(propertyAccess, parameter);
            MethodCallExpression resultExp =
                Expression.Call(
                    typeof(Queryable),
                    asc ? "ThenBy" : "ThenByDescending",
                    new Type[] { type, property.PropertyType }, source.Expression, Expression.Quote(orderByExp));

            return (IOrderedQueryable<T>)source.Provider.CreateQuery<T>(resultExp);
        }
    }
}