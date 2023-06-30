import Service from '@models/serviceModel'


export const newService = async (req, res, next) => {
  const service = await Service.create(req.body)
  res.status(200).json({
    service,
  })
}
