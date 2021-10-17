import { browser } from 'webextension-polyfill-ts'
import { api } from '../api'
import { BACKGROUND_ACTION, TBackgroundRequest } from '../types/background-request'

browser.runtime.onMessage.addListener(({ action, message }: TBackgroundRequest) => {
  switch (action) {
    case BACKGROUND_ACTION.GET_CAT: {
      return api.cats
        .get()
        .then((data) => data)
        .catch((err) => err)
    }

    default:
      break
  }
})
