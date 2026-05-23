# HR Mármores — Sistema de Ponto

PWA de registro de ponto eletrônico com painel do gerente.

---

## Estrutura dos arquivos

```
index.html      → App dos funcionários (bater ponto)
gerente.html    → Painel do gerente (cálculo de horas e pagamentos)
sw.js           → Service Worker (cache offline)
manifest.json   → Configuração do PWA
icon-192.png    → Ícone PWA 192×192
icon-512.png    → Ícone PWA 512×512
```

---

## Como publicar no GitHub Pages

1. Acesse o repositório no GitHub
2. Vá em **Settings → Pages**
3. Em *Source*, selecione **Deploy from a branch**
4. Selecione o branch `main` e pasta `/ (root)`
5. Clique em **Save**
6. Aguarde ~1 minuto e acesse `https://SEU_USUARIO.github.io/NOME_DO_REPO/`

---

## Configuração inicial (primeiro uso)

### 1. Criar o GitHub Token (PAT)

1. GitHub → Settings → Developer settings → Personal access tokens → **Tokens (classic)**
2. Generate new token → marque apenas **`gist`**
3. Copie o token gerado (`ghp_...`)

### 2. Configurar no Gerente

1. Abra `gerente.html`
2. Toque em ⚙️ (Configurações)
3. Cole o **Token** no campo GitHub Token
4. Deixe o **ID do Gist** vazio (será criado automaticamente na primeira sincronização)
5. Ajuste os funcionários (nomes, salários, PINs)
6. Salvar

### 3. Configurar no App dos Funcionários

1. Abra `index.html`
2. Toque em **"Configurar token / endpoint"** (abaixo do botão Entrar)
3. Cole o mesmo **Token** e o **Gist ID** (obtido depois da primeira sincronização do gerente)
4. Salvar → testar conexão

### 4. Fluxo de uso

```
Funcionário bate ponto no index.html
         ↓
Dados ficam no Gist (dados_ponto.json)
         ↓
Gerente abre gerente.html → "Importar Registros do App (Gist)"
         ↓
Gerente calcula e clica "Publicar Resultado no App dos Funcionários"
         ↓
Funcionário vê saldo atualizado na tela de Ponto
```

---

## Funcionários padrão (altere em Configurações)

| Nome     | Salário  | Tipo    | Jornada | PIN  |
|----------|----------|---------|---------|------|
| hangel   | R$ 1.500 | Mensal  | 8h/dia  | 1111 |
| fabricio | R$ 400   | Semanal | 8h/dia  | 1234 |
| gibs     | R$ 1.000 | Mensal  | 8h/dia  | 2345 |
| hugo     | R$ 1.900 | Mensal  | 8h/dia  | 3456 |
| tiago    | R$ 400   | Mensal  | 4h/dia  | 4567 |

> Altere em `gerente.html → ⚙️ → Funcionários e Salários`

---

## Instalar como PWA (app no celular)

- **Android (Chrome)**: toque nos 3 pontinhos → "Adicionar à tela inicial"
- **iPhone (Safari)**: toque em Compartilhar → "Adicionar à Tela de Início"

---

## Solução de problemas

**App não atualiza após mudanças no GitHub:**
- Limpe o cache do browser ou acesse em aba anônima
- O Service Worker pode estar servindo versão antiga

**"Token ou Gist ID não configurado":**
- Vá em Config (ícone engrenagem) e preencha novamente

**Funcionário não aparece no Gist:**
- Verifique se o nome digitado no login é idêntico ao cadastrado no gerente
- Nomes são comparados em minúsculas (case-insensitive)
