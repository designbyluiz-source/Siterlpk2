#!/usr/bin/env bash
# Duplo-clique este arquivo no Finder para rodar o site Âmbar em dev.
# Vai abrir o Terminal automaticamente.

set -e

# Vai para a pasta deste script (o projeto), independente de onde foi chamado
cd "$(dirname "$0")"

echo "📂 Pasta do projeto: $(pwd)"
echo ""

# Garante node_modules instalado
if [ ! -d "node_modules" ]; then
  echo "📦 node_modules não encontrado. Rodando npm install..."
  npm install
  echo ""
fi

echo "🚀 Iniciando Vite dev server em http://localhost:5180"
echo "   (Pressione Ctrl + C para parar)"
echo ""
npm run dev
