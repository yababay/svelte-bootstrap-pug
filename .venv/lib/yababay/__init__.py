from aiohttp.web import RouteTableDef, Response

routes = RouteTableDef()

@routes.post('/api/save/{fn}')
async def toc(request):
    fn = request.match_info['fn']
    text = await request.text()
    with open(f'../docs/content/{fn}', 'w') as f:
        f.write(text)
    return Response(text='ok', content_type='text/plain')

