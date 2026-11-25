# AutoScroll (Manifest V3)

Extensão para Google Chrome e navegadores baseados em Chromium que adiciona a **rolagem automática estilo Firefox** (clique do meio ou `Ctrl`/`⌘` + clique esquerdo), ideal para **Linux** e **macOS**, onde esse recurso nativo costuma não estar disponível.

Esta é uma versão atualizada para **Manifest V3** baseada na extensão original [Pauan/AutoScroll](https://github.com/Pauan/AutoScroll) (cujo pacote em Manifest V2 deixou de ser suportado na Chrome Web Store).

## Instalação no Chrome (Modo do desenvolvedor)

1. Baixe ou clone este repositório no seu computador.
2. Abra o Chrome e acesse `chrome://extensions`.
3. Ative a chave **Modo do desenvolvedor** no canto superior direito.
4. Clique em **Carregar sem compactação** (*Load unpacked*).
5. Selecione a pasta raiz deste projeto (onde está o arquivo `manifest.json`).

## Como usar

- **Clique com o botão do meio** (ou **`Ctrl`/`⌘` + clique esquerdo**) em qualquer área livre da página.
- Um ícone de âncora aparecerá no ponto clicado e o cursor indicará a direção da rolagem conforme você move o mouse.
- Quanto mais longe da âncora você mover o mouse, mais rápida será a rolagem.
- Para parar, clique novamente (no modo *sticky*) ou solte o botão (se estiver segurando após arrastar).

## Opções configuráveis

Você pode acessar as opções clicando com o botão direito no ícone da extensão → **Opções** (ou em `chrome://extensions` → **Detalhes** → **Opções da extensão**).

| Categoria | Opção | Padrão | Descrição |
|---|---|---|---|
| **Básico** | Rolar sem segurar o botão (`stickyScroll`) | Ligado | Mantém a rolagem ativa após clicar e soltar o botão. |
| **Básico** | Limiar de arrasto (`dragThreshold`) | `10` px | Distância máxima do clique para ativar o modo *sticky* ao soltar o botão. |
| **Básico** | Limiar de movimento (`moveThreshold`) | `10` px | Distância mínima da âncora para iniciar a rolagem. |
| **Básico** | Ativar com clique do meio (`middleClick`) | Ligado | Permite iniciar a rolagem com o botão do meio do mouse. |
| **Básico** | Ativar com Ctrl/⌘ + clique esquerdo (`ctrlClick`) | Ligado | Permite iniciar a rolagem segurando `Ctrl` (Linux/Windows) ou `⌘` (macOS) + clique esquerdo. |
| **Velocidade** | Velocidade (`moveSpeed`) | `10` | Divisor de velocidade da rolagem (quanto menor o valor, mais rápido rola). |
| **Velocidade** | Velocidade constante (`sameSpeed`) | Desligado | Ignora a distância do mouse e rola sempre na mesma velocidade. |
| **Velocidade** | Limite máximo (`shouldCap` / `capSpeed`) | Desligado | Limita a velocidade máxima de rolagem em pixels por quadro. |
| **Avançado** | Rolar elementos internos (`innerScroll`) | Ligado | Rola áreas internas com barra de rolagem própria (`overflow: auto`/`scroll`). |
| **Avançado** | Ativar em links e campos de texto (`scrollOnLinks`) | Desligado | Permite iniciar a rolagem ao clicar sobre links, `textarea` e `input`. |

## Diferenças em relação à extensão original (v4.10)

- **Manifest V3:** atualização completa do `manifest.json` para o padrão MV3 atual do Chrome (`options_ui`, `web_accessible_resources` em formato de objeto, remoção do antigo script de migração `main.js`).
- **Página de opções em pt-BR sem `eval`:** reescrita em HTML/CSS/JS puros (sem `require.js`) para cumprir a Content Security Policy do MV3, com botão de restaurar padrões e suporte automático a tema claro/escuro.
- **Correção do `capSpeed`:** no original, ativar o limite de velocidade com campo vazio travava a rolagem em `0`; agora só aplica o limite quando há um valor numérico válido (`>= 1`).
- **Guarda do `moveSpeed` e URLs pré-calculadas:** evita divisão por zero/NaN e previne erros de contexto invalidado após recarregar a extensão.
- **Supressão de clique fantasma:** bloqueia eventos `click`/`auxclick` logo após encerrar a rolagem para evitar que o soltar do botão abra links ou acione ações acidentais.
- **Limpeza de compatibilidade legada:** remoção dos fallbacks antigos `createShadowRoot`/`webkitCreateShadowRoot` em favor de `attachShadow({ mode: "closed" })` e substituição de `console.assert` por verificação de área no `storage.onChanged`.

## Créditos e Licença

Baseado no trabalho original de **Paul Chapman** ([Pauan/AutoScroll](https://github.com/Pauan/AutoScroll)).
Distribuído sob a licença **X11/MIT** — consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
