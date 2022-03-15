import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DrawGachaHistory from 'App/Models/DrawGachaHistory'
import { gachaValidator } from 'App/Schema/GachaValidator'

export default class GachasController {
  public async getDrawHistory({ request, response }: HttpContextContract) {
    // validate input data
    const payload = await request.validate({
      schema: gachaValidator,
      data: request.params(),
    })

    const address = payload.address

    const historyRecords = await DrawGachaHistory.query().where(
      'drawler',
      address,
    )

    if (!historyRecords.length) {
      return response.notFound({
        statusCode: 404,
        message: 'have not already drawn gacha',
      })
    }

    response.ok({
      statusCode: 200,
      message: 'success',
      data: historyRecords,
    })
  }
}
