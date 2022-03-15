import {
  WebhookEvent,
  DrawGachaData,
  CraftGachaData,
} from './../../../types/local.d'

import { WebhookProcessStatus } from './../../Models/WebhookLog'
import { UnifiedWebhookEvent } from './../../../types/local'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WebhookLog from 'App/Models/WebhookLog'
import DrawGachaHistory from 'App/Models/DrawGachaHistory'
import { DateTime } from 'luxon'
import { normalizeAddress } from 'App/Utils/blockchain'

export default class EventsController {
  public async processEvent({
    request,
    response,
    logger,
  }: HttpContextContract) {
    logger.info(`[Webhook] - ${JSON.stringify(request.all())}`)

    const data = request.only([
      'event',
      'params',
      'txHash',
      'blockNumber',
      'blockTime',
      'txIndex',
      'from',
      'to',
    ]) as UnifiedWebhookEvent

    let webhookLog = await WebhookLog.findBy('txHash', data.txHash)
    if (webhookLog) {
      logger.info(
        `This event has already been processed! ${JSON.stringify(data)}`,
      )

      return response.ok({
        statusCode: 200,
        message: 'processed',
      })
    }

    webhookLog = await WebhookLog.create({
      data: JSON.stringify(data),
      txHash: data.txHash,
    })

    console.log(data.event, 'event')

    switch (data.event) {
      case 'DrawGacha':
        await this.handleDrawGacha(data)
        break

      case 'CraftGacha':
        await this.handleCraftGacha(data)
        break

      default:
        return response.badRequest({
          message: 'Unknown event',
        })
    }

    webhookLog.status = WebhookProcessStatus.Done
    await webhookLog.save()

    return response.ok({
      statusCode: 200,
      message: 'successfully',
    })
  }

  private async handleDrawGacha(
    data: WebhookEvent<'DrawGacha', DrawGachaData>,
  ) {
    console.log(data.params, 'params')
    const { params, blockTime } = data
    await DrawGachaHistory.create({
      drawler: normalizeAddress(params.drawler),
      amount: params.amount,
      itemType: params.itemType,
      drawTime: DateTime.fromMillis(parseInt(blockTime) * 1000),
    })
  }

  private async handleCraftGacha(
    data: WebhookEvent<'CraftGacha', CraftGachaData>,
  ) {
    const { params } = data

    // handle craft gacha goes here...
  }
}
