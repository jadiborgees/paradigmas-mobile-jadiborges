# ADO 1 · Web x Mobile: diferenças de paradigma na prática

Repositório da atividade prática de desenvolvimento mobile. Aqui a gente aborda as diferenças de paradigma entre Web e Mobile, analisa dois aplicativos de mercado e migra um componente web (a Navbar) para React Native.

---

## 1. Fundamentação

### Ciclo de build e distribuição

Na web, publicar uma mudança é simples: você sobe o código (HTML, CSS e JavaScript) para um servidor de hospedagem, como a Vercel, e pronto. Assim que o deploy termina, qualquer pessoa que abrir ou recarregar o site já vê a versão nova.

No mobile é bem diferente. Depois de salvar o código, é preciso gerar o pacote compilado (APK ou AAB no Android, IPA no iOS) e enviar para as lojas, a Google Play e a App Store. Lá o app passa por uma revisão de segurança, privacidade e políticas de conteúdo. Mesmo depois de aprovado, ele não chega a todo mundo de uma vez: muita gente continua com versões antigas até atualizar manualmente ou até a atualização automática rodar. Por isso, quem desenvolve para mobile precisa garantir que as versões antigas continuem funcionando com as APIs e os bancos de dados atuais.

### Ciclo de vida do aplicativo

Na web, a aba do navegador é passageira: quando você fecha a aba, a página é descartada e o que estava na memória se perde (o navegador também pode suspender abas que estão inativas). No desktop, os programas continuam rodando em segundo plano até que o usuário ou o sistema encerre de forma explícita.

No mobile, como memória e bateria são limitadas, quem manda no ciclo de vida do app é o sistema operacional, e ele é bem rígido. Na prática, um app passa por três estados principais:

* **Ativo (foreground):** o app está aberto na tela e você está usando.
* **Em segundo plano (background):** você saiu do app, seja para abrir outro ou voltar para a tela inicial, mas ele ainda pode executar algumas tarefas limitadas.
* **Encerrado pelo sistema (killed):** o Android ou o iOS pode finalizar o processo a qualquer momento para liberar RAM para o app que está em uso.

Por causa disso, o app não pode contar com a memória para guardar dados importantes (como um carrinho ou um rascunho). O ideal é salvar o estado antes de ir para segundo plano.

### Restrições do dispositivo

Desenvolver para mobile significa trabalhar com limitações de hardware bem sérias:

* **Bateria e processamento:** tarefas pesadas gastam a bateria rápido e esquentam o aparelho.
* **Memória RAM:** celulares de entrada e intermediários têm pouca RAM, então é preciso otimizar os componentes e cuidar do gerenciamento de estado.
* **Conectividade:** a rede móvel é instável por natureza, alternando entre 4G, 5G e áreas sem sinal. O app precisa funcionar offline ou, pelo menos, lidar bem com requisições que falham, sem travar nem mostrar um erro confuso.
* **Telas e display:** existe uma variedade enorme de tamanhos, proporções e densidades de pixel (PPI), além de elementos físicos como notch e ilha dinâmica. Por isso entram as safe areas, que são as áreas seguras da tela e impedem que o conteúdo fique escondido embaixo da barra de status ou dos botões de navegação por gestos.
* **Permissões:** para acessar câmera, localização, Bluetooth ou notificações push, o app precisa pedir autorização ao usuário, de preferência na hora em que for usar o recurso.

### Entrada e interação

Na web, a interação gira em torno do ponteiro: o mouse, o cursor e eventos como o `:hover`, que só acontece quando você passa o mouse por cima de algo. No mobile, tudo é toque direto na tela, e isso muda bastante coisa. As áreas de toque precisam ser confortáveis (o Material Design recomenda pelo menos 48x48dp e a Apple recomenda 44x44pt), o app tem que dar conta de gestos como swipe e pinch to zoom, e ainda existe o problema do teclado virtual, que cobre metade da tela e pode esconder ou empurrar os campos de texto.

### UX mobile

O contexto de uso no celular não tem nada a ver com o do desktop. Muitas vezes a pessoa está em pé, andando, com uma mão só e com pressa. Por isso, a zona do polegar (deixar as principais ações na parte de baixo da tela) e uma navegação fluida, com abas inferiores (bottom navigation) e menus laterais (drawers), fazem toda a diferença na experiência.

---

## 2. Pesquisa de campo: análise de 2 aplicativos

### Aplicativo 1: Instagram

**Prints:**

<img src="docs/apps/instagram1.jpeg" width="250" alt="Tela do Instagram" />
<img src="docs/apps/instagram2.jpeg" width="250" alt="Tela do Instagram" />

**Análise de 3 pontos da fundamentação:**

1. **Restrições (rede instável):** o Instagram guarda em cache as imagens e vídeos que já foram vistos. Quando o sinal cai, ainda dá para navegar pelo feed que tinha acabado de carregar, e curtidas e comentários ficam numa fila para serem enviados quando a conexão voltar.
2. **UX mobile (zona do polegar):** a barra de navegação principal (Início, Reels, Criar, Notificações e Perfil) fica na parte de baixo da tela, o que deixa tudo ao alcance do polegar com uma mão só.
3. **Permissões:** o app só pede acesso à câmera e ao microfone quando o usuário tenta criar um Story ou gravar um Reel, explicando por que precisa deles naquele momento.

**Comparação com a web (Instagram Web):** a versão web é boa para ver fotos e mensagens em telas grandes, com teclado físico, mas tem limitações em recursos nativos. Um exemplo é publicar Stories ou Reels direto da câmera do computador, que não tem a mesma fluidez do app.

### Aplicativo 2: Shopee

**Prints:**

<img src="docs/apps/shopee1.jpeg" width="250" alt="Tela da Shopee" />
<img src="docs/apps/shopee2.jpeg" width="250" alt="Tela da Shopee" />

**Análise de 3 pontos da fundamentação:**

1. **Ciclo de vida do aplicativo:** quando o usuário sai do app para responder uma mensagem ou conferir um pagamento em outro aplicativo, o carrinho continua salvo. Assim os itens escolhidos não se perdem, mesmo que o sistema encerre o processo por falta de RAM.
2. **Entrada e interação:** a busca e a aplicação de cupons usam botões grandes e carrosséis horizontais feitos para o swipe com o polegar.
3. **Restrições (conectividade e desempenho):** como é um e-commerce cheio de imagens de produtos, o app carrega o conteúdo aos poucos (lazy loading). Isso economiza dados móveis e evita travamentos em celulares de entrada e intermediários.

**Comparação com a web (Shopee Web):** a versão web é mais voltada para buscas detalhadas, comparação de preços em abas diferentes e digitação de cupons e endereços, que é mais fácil com teclado. Já o app aposta em notificações push personalizadas, jogos promocionais e checkout rápido ligado às carteiras digitais do celular.

---

## 3. Prática: Web vs React Native

Nesta etapa reconstruímos um componente de navegação (Navbar), que originalmente seria feito em HTML e CSS para a web, usando agora o React Native. O código está em `src/components/Navbar.jsx`.

### As 5 principais diferenças de paradigma

1. **Não existem as tags HTML tradicionais.** Na web, a página é estruturada com `<div>`, `<nav>`, `<header>` ou `<span>`. No React Native essas tags não existem, então usamos os componentes do framework, como o `<View>` (o bloco básico, equivalente à div) e o `<SafeAreaView>`.

2. **Todo texto precisa estar dentro de `<Text>`.** Na web dá para colocar texto solto dentro de uma `<div>` ou `<p>`. No React Native, qualquer string tem que estar dentro de um `<Text>`, e renderizar texto fora dele gera um erro que quebra a tela.

3. **Estilização com `StyleSheet` e JavaScript.** Não usamos arquivos `.css` ou `.scss`. Os estilos são objetos JavaScript criados com `StyleSheet.create()`, e as propriedades ficam em camelCase (`backgroundColor` em vez de `background-color`). Os números não levam "px", porque são unidades independentes da densidade de pixels da tela.

4. **Flexbox como padrão, e com a direção invertida.** No React Native, os componentes baseados em `View` já usam `display: flex` por padrão. O que muda é que o `flexDirection` padrão é `column` (pensado para a rolagem vertical do celular), enquanto na web o padrão do flexbox é `row`.

5. **Quase não existe herança de estilos.** Na web, uma cor ou fonte definida em uma `<div>` pai é herdada por todos os filhos. No React Native isso não acontece de uma `View` para os `<Text>` dentro dela (só existe herança entre `<Text>` aninhados). Para manter um padrão visual, é preciso aplicar o estilo em cada `<Text>` ou criar um componente de tipografia próprio para reaproveitar.
