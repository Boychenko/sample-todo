namespace Todo.Domain.Contracts
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading.Tasks;

    public interface IRepository<T> where T : class
    {
        IQueryable<T> All();

        IQueryable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties);

        IQueryable<T> Where(params Expression<Func<T, bool>>[] predicates);

        Task<T> FindById(object id);

        void Add(T entity);

        void Update(T entity);

        void Remove(T entity);

        void Remove(object id);
    }
}