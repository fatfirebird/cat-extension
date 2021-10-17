export enum BACKGROUND_ACTION {
  GET_CAT = 'GET_CAT',
  SHOW_CAT = 'SHOW_CAT',
}

export type TBackgroundRequest = {
  message?: string
  action: BACKGROUND_ACTION
}
