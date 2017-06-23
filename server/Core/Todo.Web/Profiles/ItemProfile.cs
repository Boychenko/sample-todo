namespace Todo.Web.Profiles
{
    using AutoMapper;
    using Domain.Models;
    using Models.Dtos;

    public class ItemProfile : Profile
    {
        public ItemProfile()
        {
            CreateMap<Item, ItemDto>();

            CreateMap<ItemDto, Item>();
        }
    }
}