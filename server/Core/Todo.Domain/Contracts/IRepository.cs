namespace Todo.Domain.Contracts
{
    using System.Collections.Generic;

    public interface IRepository<TEntity, in TSpecifications> 
        where TEntity : class
        where TSpecifications : class
    {
        List<TEntity> GetBySpecification(TSpecifications specifications = null);

        int CountBySpecification(TSpecifications specifications = null);

        void Add(TEntity entity);

        void Update(TEntity entity);

        void Remove(TEntity entity);

        void Remove(object id);
    }
}