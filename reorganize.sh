#!/bin/bash

echo "🔧 Reorganizando projeto LuxyBerry (modo seguro)..."

# 1. Garantir pastas principais
mkdir -p backend frontend

# 2. FRONTEND
echo "📦 Organizando frontend..."

# Mover HTML principal
[ -f luxyberry.html ] && mv luxyberry.html frontend/index.html

# Mover pastas comuns de frontend
for dir in css js assets imagens; do
  if [ -d "$dir" ]; then
    mv "$dir" frontend/
  fi
done

# 3. BACKEND
echo "⚙️ Organizando backend..."

# Se node_modules estiver na raiz, mover
[ -d node_modules ] && mv node_modules backend/

# Mover arquivos JS de backend se existirem na raiz
for file in server.js index.js app.js; do
  [ -f "$file" ] && mv "$file" backend/
done

# Mover dependências para backend
[ -f package.json ] && mv package.json backend/
[ -f package-lock.json ] && mv package-lock.json backend/

# 4. Arquivos raiz
echo "📄 Ajustando arquivos raiz..."

touch README.md .gitignore

# 5. Garantir .gitignore mínimo
cat <<EOF > .gitignore
node_modules
.env
.DS_Store
EOF

echo "✅ Reorganização concluída com sucesso."
echo "👉 Verifique a estrutura com: tree -L 3"
