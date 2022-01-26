from aiohttp.web import RouteTableDef, Response
from .queries import initialize, save

routes = RouteTableDef()

@routes.post('/api/save/{fn}')
async def _save(request):
    fn = request.match_info['fn']
    text = await request.text()
    save(fn, text)
    return Response(text='ok', content_type='text/plain')


@routes.get('/api/initialize')
async def _initialize(request):
    title = request.rel_url.query['title']
    date = request.rel_url.query['date']
    link = initialize(title, date)
    return Response(text=link, content_type='text/plain')

