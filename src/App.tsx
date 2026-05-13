import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AmbarPage from './pages/AmbarPage'
import RplkHome from './pages/RplkHome'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RplkHome />} />
        <Route path="/empreendimentos/ambar" element={<AmbarPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
