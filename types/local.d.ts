export interface WebhookEvent<
  TEventName extends string,
  TData extends Record<string, any>
> {
  event: TEventName
  params: TData
  txHash: string
  blockNumber: number
  blockTime: string
  txIndex: number
  logIndex: number
  from: string
  to: string
}

export interface DrawGachaData {
  drawler: string
  amount: string
  itemType: string
}

export interface CraftGachaData {
  crafter: string
  itemId: string
}

export type UnifiedWebhookEvent =
  | WebhookEvent<'DrawGacha', DrawGachaData>
  | WebhookEvent<'CraftGacha', CraftGachaData>
