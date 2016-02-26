namespace Todo.Domain.BusinessObjects.Query
{
    public class Paging
    {
        public Paging()
        {
            Page = 1;
        }

        public int Page { get; set; }

        public int? PageSize { get; set; }

        public int PageSizeValue => PageSize ?? 25;

        public int SkipCount => (Page - 1) * PageSizeValue;

        public void FixPageForCount(int count)
        {
            if (count <= SkipCount)
            {
                Page = 1;
            }
        }
    }
}