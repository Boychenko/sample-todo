namespace Todo.Domain.BusinessObjects.Query
{
    public class Sorting
    {
        public Sorting(string field, bool asc)
        {
            Field= field;
            Asc = asc;
        }

        public string Field { get; }

        public bool Asc { get; }

        public override string ToString()
        {
            return $"{Field} {(Asc ? "ASC" : "DESC")}";
        }
    }
}