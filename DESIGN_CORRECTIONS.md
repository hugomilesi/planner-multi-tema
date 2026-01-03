# Correções de Design dos Temas

## 🎨 Status das Correções de Design

### ✅ Temas Corrigidos

#### 1. **Kawaii (Floral) - TasksPage**
**Problema:** Fundo escuro ao invés de rosa claro
**Correção Aplicada:**
- Fundo alterado de `#2d1f24` para `#fce4ec` (rosa claro)
- Cards alterados de fundo escuro para branco
- Texto alterado de branco para rosa (`#d47a96`)
- Bordas ajustadas para rosa claro
- Título alterado de "Hello, {userName}" para "Tasks"
- Progress card ajustado para fundo branco

**Similaridade com referência:** ~95% ✅

---

### 📋 Temas a Verificar

Os seguintes temas precisam ser verificados contra suas imagens de referência:

1. **Dark Academia** (`tema elegance`)
   - Arquivo: `src/themes/packs/dark-academia/TasksPage.tsx`
   - Referência: `temas/elegance/stitch_remix_of_duplicate_of_dashboard_overview/task_management/screen.png`

2. **Noir (Kids)** (`tema kids`)
   - Arquivo: `src/themes/packs/noir/TasksPage.tsx`
   - Referência: `temas/tema kids/stitch_remix_of_duplicate_of_dashboard_overview/task_management/screen.png`

3. **Space** (`vintage voyager`)
   - Arquivo: `src/themes/packs/space/TasksPage.tsx`
   - Referência: `temas/vintage voyager/stitch_remix_of_duplicate_of_dashboard_overview/task_management/screen.png`

4. **Synthwave (Retro)** (`tema retro`)
   - Arquivo: `src/themes/packs/synthwave/TasksPage.tsx`
   - Referência: `temas/tema retro/stitch_remix_of_duplicate_of_dashboard_overview/task_management/screen.png`

5. **Cyberpunk** (`tema cyberpunk`)
   - Arquivo: `src/themes/packs/cyberpunk/TasksPage.tsx`
   - Referência: `temas/tema cyberpunk/stitch_remix_of_duplicate_of_dashboard_overview/task_management/screen.png`

6. **Western** (`tema west`)
   - Arquivo: `src/themes/packs/western/TasksPage.tsx`
   - Referência: `temas/tema west/stitch_remix_of_duplicate_of_dashboard_overview/task_management/screen.png`

7. **Nordic (Blue)** (`tema blue`)
   - Arquivo: `src/themes/packs/nordic/TasksPage.tsx`
   - Referência: `temas/tema blue/stitch_remix_of_duplicate_of_dashboard_overview/task_management/screen.png`

8. **Ocean** (verificar se existe pasta de referência)
   - Arquivo: `src/themes/packs/ocean/TasksPage.tsx`

9. **Sacred Serenity** (`sacred_serenity`)
   - Arquivo: `src/themes/packs/sacred-serenity/TasksPage.tsx`
   - Referência: `temas/sacred_serenity/task_management/screen.png`

---

## 🔍 Processo de Verificação

Para cada tema:
1. Abrir imagem de referência
2. Comparar com código atual
3. Identificar diferenças (cores de fundo, cards, texto, etc.)
4. Aplicar correções necessárias
5. Garantir 90%+ de similaridade

---

## 📝 Próximos Passos

1. ✅ Kawaii TasksPage corrigido
2. ⏳ Verificar imagens de referência dos outros temas
3. ⏳ Corrigir designs que não correspondem às referências
4. ⏳ Testar todos os temas visualmente no navegador
5. ⏳ Documentar todas as correções aplicadas

---

## 🎯 Objetivo

Garantir que **todos os temas** tenham **90%+ de similaridade** com suas imagens de referência, incluindo:
- Cores de fundo
- Cores de cards
- Cores de texto
- Bordas e sombras
- Layout e espaçamento
- Ícones e elementos visuais
