export enum BACKGROUND_ACTION {
  GET_CAT = 'GET_CAT',
  REMOVE_CAT = 'REMOVE_CAT',
}

export type TBackgroundRequest = {
  message?: string
  action: BACKGROUND_ACTION
}
