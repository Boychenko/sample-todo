namespace Todo.Web.Profiles
{
    using AutoMapper;
    using Domain.Models;
    using Models.Dtos;

    public class DtoProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<Item, ItemDto>();

            CreateMap<ItemDto, Item>();
        }
    }
}