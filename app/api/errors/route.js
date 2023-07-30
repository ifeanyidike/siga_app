import { createEdgeRouter } from 'next-connect'
import { connectToDB } from '@utils/database'
import onError from '@backend/middlewares/errors'
import { GET } from '@/ourservices/route'

const router = createEdgeRouter(onError)
router.get(GET)
connectToDB()

export async function GET(request, cxt) {
  return router.run(request, cxt)
}
// export default router.handler({
//   onError: (err, req, event) => {
//     console.error(err.stack)
//     return new NextResponse('Something broke!', {
//       status: err.statusCode || 500,
//     })
//   },
// })
