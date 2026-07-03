import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Trash2, Calendar, User } from 'lucide-react'

import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { type SimulationRecord } from '@/data/simulation'

export function History() {
  const { getAll, deleteSimulation } = useSimulationStorage()
  const navigate = useNavigate()

  const [items, setItems] = useState<SimulationRecord[]>([])

  useEffect(() => {
    setItems(getAll())
  }, [])

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setItems(getAll()) // atualiza UI depois de deletar
  }

  const handleView = (id: string) => {
    navigate(`/resultado/${id}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Histórico de Simulações</h1>
        <p className="text-muted-foreground text-sm">
          Veja todas as suas simulações salvas
        </p>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <p className="text-muted-foreground">
            Nenhuma simulação encontrada ainda.
          </p>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            
            {/* Info */}
            <div className="flex flex-col gap-1">
              
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <User size={16} className="text-primary" />
                {item.user?.name || 'Usuário'}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Calendar size={14} />
                {new Date(item.createdAt || Date.now()).toLocaleString(
                  'pt-BR'
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                Meta: {item.goalName || 'Sem nome'} • R$ {item.goalAmount}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 sm:justify-end">
              
              <button
                onClick={() => handleView(item.id)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition cursor-pointer"
              >
                <Eye size={16} />
                Ver
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition cursor-pointer"
              >
                <Trash2 size={16} />
                Excluir
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}