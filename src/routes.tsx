import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/components/layout/Layout.routes";
import { SimulationFormPage } from "./pages/SimulationFormePage";
import { SimulationResultsPage } from "./pages/SimulationResultsPage";



export const router = createBrowserRouter([
  {
     element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <SimulationFormPage />,
      },
      {
        path: '/resultado/:id',
        element: <SimulationResultsPage />,
      },
      {
        path: '/historico',
        element: <h1>Histórico de Simulações</h1>,
      },
    ],
  },
])