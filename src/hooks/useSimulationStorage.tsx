import {
  type SimulationFormData,
  type SimulationRecord,
} from '@/data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {
  const getAll = (): SimulationRecord[] => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    return storage ? JSON.parse(storage) : []
  }

  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID()

    const record: SimulationRecord = {
      ...formData,
      id,
      createdAt: ''
    }

    const savedData = getAll()

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([record, ...savedData]),
    )

    return id
  }

  const getFormData = (id: string) => {
    const savedData = getAll()
    return savedData.find((record) => record.id === id) || null
  }

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const updated = getAll().map((record) =>
      record.id === id ? { ...data } : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  const deleteSimulation = (id: string) => {
    const filtered = getAll().filter((record) => record.id !== id)

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered))
  }

  return {
    saveFormData,
    getFormData,
    updateSimulation,
    deleteSimulation,
    getAll,
  }
}