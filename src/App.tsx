import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AmbarPage from './pages/AmbarPage'
import RplkBlogPage from './pages/RplkBlogPage'
import RplkEmpreendimentosPage from './pages/RplkEmpreendimentosPage'
import RplkHome from './pages/RplkHome'
import TatemonoPage from './pages/TatemonoPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-w-0 overflow-x-clip">
        <Routes>
          <Route path="/" element={<RplkHome />} />
          <Route path="/blog" element={<RplkBlogPage />} />
          <Route path="/empreendimentos" element={<RplkEmpreendimentosPage />} />
          <Route path="/empreendimentos/ambar" element={<AmbarPage />} />
          <Route path="/empreendimentos/tatemono" element={<TatemonoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
