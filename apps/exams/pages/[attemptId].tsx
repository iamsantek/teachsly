import type { NextPage } from 'next'
import { Questions } from '../components/Questions'
import { CurrentScreen, PlacementSettings, PlacementContext as PlacementContextType } from '../types/types'
import { useState } from 'react'
import { GoodByeScreen } from '../components/GoodByeScreen'
import { Intro } from '../components/intro/Intro'
import { defaultPlacementConfiguration, PlacementContext } from '../context/PlacementContext'

const Home: NextPage = () => {
  const [placementConfiguration, setPlacementConfiguration] = useState<PlacementSettings>(defaultPlacementConfiguration)

  const screens = {
    [CurrentScreen.Intro]: <Intro />,
    [CurrentScreen.Questions]: <Questions />,
    [CurrentScreen.GoodBye]: <GoodByeScreen />
  }

  const defaultContext: PlacementContextType = {
    context: placementConfiguration,
    setContext: setPlacementConfiguration
  }

  return (
    <PlacementContext.Provider value={defaultContext}>
      {screens[placementConfiguration.currentScreen]}
    </PlacementContext.Provider>
  )
}

export default Home
