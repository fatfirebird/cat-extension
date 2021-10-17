import { browser } from 'webextension-polyfill-ts'
import { api } from '../api'
import { BACKGROUND_ACTION, TBackgroundRequest } from '../types/background-request'

browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({
    cat: null,
  })
})

browser.runtime.onMessage.addListener(({ action }: TBackgroundRequest) => {
  switch (action) {
    case BACKGROUND_ACTION.GET_CAT: {
      return api.cats
        .get()
        .then(({ data }) => {
          browser.storage.sync.set({
            cat: data[0],
          })
          return data
        })
        .catch((err) => err)
    }

    default:
      break
  }
})
