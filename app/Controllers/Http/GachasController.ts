import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DrawGachaHistory from 'App/Models/DrawGachaHistory'
import { gachaValidator, paginateValidator } from 'App/Schema/GachaValidator'
import { normalizeAddress } from 'App/Utils/blockchain'

export default class GachasController {
  public async getDrawHistory({ request, response }: HttpContextContract) {
    // validate input data
    const payload = await request.validate({
      schema: gachaValidator,
      data: request.params(),
    })

    const { page, limit } = await request.validate({
      schema: paginateValidator,
      data: request.all(),
    })

    const address = payload.address

    let rawQuery = DrawGachaHistory.query().where(
      'drawler',
      normalizeAddress(address),
    )

    let historyRecords = await rawQuery

    if (page && limit) {
      historyRecords = await rawQuery.paginate(page, limit)
    }

    response.ok({
      statusCode: 200,
      message: 'success',
      data: historyRecords,
    })
  }
}
