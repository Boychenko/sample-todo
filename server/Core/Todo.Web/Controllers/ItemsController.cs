namespace Todo.Web.Controllers
{
    using System.Linq;
    using AutoMapper;
    using Domain.Contracts.Items;
    using Domain.Contracts.Services;
    using Domain.Models;
    using Helpers;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Models.Dtos;
    using Persistance;

    [Route("api/[controller]")]
    public class ItemsController : BaseController
    {
        private readonly IItemService _itemService;

        private readonly IMapper _mapper;

        public ItemsController(IItemService itemService, IMapper mapper)
        {
            _itemService = itemService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Get([FromQuery] ListRequest request)
        {
            request = request ?? new ListRequest();
            var spec = new ItemSpecifications
            {
                Limit = request.PageSize ?? 25,
                Page = request.Page,
                UserIds = { User.Identity.GetAppUserId() },
            };
            var result = _itemService.GetBySpecification(spec);

            var response = new ListResponse<ItemDto>
            {
                Page = result.Page,
                PageSize = result.PageSize,
                List = result.List.Select(i => _mapper.Map<Item, ItemDto>(i)).ToList(),
                Total = result.Total
            };
            return Ok(response);
        }

        [HttpGet]
        [Route("{id:int}", Name = "GetItemById")]
        public IActionResult Get(long id)
        {
            var item = _itemService.GetById(User.Identity.GetAppUserId(), id);
            return Ok(_mapper.Map<Item, ItemDto>(item));
        }

        [HttpPost]
        [Route("")]
        public IActionResult Post([FromBody]ItemDto itemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _mapper.Map(itemDto, new Item());
            item = _itemService.Create(User.Identity.GetAppUserId(), item);
            return Created(Url.Link("GetItemById", new { item.Id }), _mapper.Map<Item, ItemDto>(item));
        }

        [HttpPut]
        [Route("")]
        public IActionResult Put([FromBody]ItemDto itemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _mapper.Map(itemDto, _itemService.GetById(User.Identity.GetAppUserId(), itemDto.Id));
            item = _itemService.Update(User.Identity.GetAppUserId(), item);
            return Ok(_mapper.Map<Item, ItemDto>(item));
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete(long id)
        {
            _itemService.Delete(User.Identity.GetAppUserId(), id);
            return Ok();
        }
    }
}