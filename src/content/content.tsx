import React, { useEffect, useState } from 'react'
import { browser } from 'webextension-polyfill-ts'
import { TCat } from '../api/api.types'

export const Content: React.FC = () => {
  const [randomCat, setRandomCat] = useState<TCat | null>(null)

  useEffect(() => {
    const getInitialCat = async () => {
      const { cat } = await browser.storage.sync.get('cat')
      setRandomCat(cat)
    }

    getInitialCat()
  }, [])

  const handleClick = () => {
    if (randomCat?.url) {
      window.open(randomCat.url)
    }
  }

  browser.storage.onChanged.addListener(({ cat }) => {
    if (cat) {
      setRandomCat(cat.newValue)
    }
  })

  if (!randomCat || !randomCat?.url) return null

  return (
    <div>
      <button className="btn btn-default btn-md gl-button ml-sm-0" onClick={handleClick}>
        <img src={randomCat.url} width="250px" height="100%" />
      </button>
    </div>
  )
}
