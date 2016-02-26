namespace Todo.Web.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using AutoMapper;
    using Domain.Contracts.Services;
    using Domain.Models;
    using Helpers;
    using Models;
    using Models.Dtos;

    [Authorize]
    [RoutePrefix("api/items")]
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
        public async Task<IHttpActionResult> Get([FromUri] ListRequest request)
        {
            request = request ?? new ListRequest();
            var result = await _itemService.Get(User.Identity.GetAppUserId(), request.ToQuery());
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
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Get(long id)
        {
            var item = await _itemService.Get(User.Identity.GetAppUserId(), id);
            return Ok(_mapper.Map<Item, ItemDto>(item));
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Post(ItemDto itemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _mapper.Map(itemDto, new Item());
            item = await _itemService.Create(User.Identity.GetAppUserId(), item);
            return Created(Url.Link("DefaultApi", new { controller = "Items", item.Id }), _mapper.Map<Item, ItemDto>(item));
        }

        [HttpPut]
        [Route("")]
        public async Task<IHttpActionResult> Put(ItemDto itemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _mapper.Map(itemDto, await _itemService.Get(User.Identity.GetAppUserId(), itemDto.Id));
            item = await _itemService.Update(User.Identity.GetAppUserId(), item);
            return Ok(_mapper.Map<Item, ItemDto>(item));
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Delete(long id)
        {
            await _itemService.Delete(User.Identity.GetAppUserId(), id);
            return Ok();
        }
    }
}