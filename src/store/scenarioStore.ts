import { create } from 'zustand'
import type { Scenario } from '../types'

interface ScenarioState {
  scenario: Scenario
  setScenario: (s: Scenario) => void
}

export const useScenarioStore = create<ScenarioState>()((set) => ({
  scenario: 'success',
  setScenario: (s) => set({ scenario: s }),
}))
