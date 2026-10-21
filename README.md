ADO 1 · Web x mobile: diferenças de paradigma na prática 

Repositório criado para a atividade prática de desenvolvimento mobile, abordando os conceitos fundamentais de diferenças de paradigma entre Web e Mobile, análise de aplicativos de mercado, e a migração de um componente web para o React Native. 

 

1. Fundamentação 

Ciclo de build e distribuição 

Na web, publicar uma mudança é simples: você sobe o código (HTML, CSS e JavaScript) para um servidor de hospedagem como por exemplo Vercel entre outros, e pronto. Assim que o deploy termina, qualquer pessoa que abrir ou recarregar o site já vê a versão nova. No mobile é bem diferente, depois de salvar o código, você precisa gerar o pacote compilado (APK ou AAB no Android, IPA no iOS) e enviar para as lojas, a Google Play e a App Store. Lá o app passa por uma revisão que verifica segurança, privacidade e políticas de conteúdo. E mesmo depois de aprovada, ela não chega a todo mundo de uma vez, muita gente continua usando versões antigas até atualizar manualmente ou até a atualização automática rodar. Por isso, quem desenvolve para mobile precisa garantir que as versões antigas do app continuem funcionando com as APIs e os bancos de dados atuais. 

 

Ciclo de vida do aplicativo 

Na web, uma aba do navegador é passageira: quando você fecha a aba ou o navegador, o processo morre ou fica pausado, e o que estava na memória RAM costuma ser descartado. No desktop, os programas continuam rodando em segundo plano até que você ou o sistema os encerrem de forma explícita. No mobile, a lógica é outra. Como memória e bateria são limitadas, quem manda no ciclo de vida do app é o sistema operacional, e ele é bem rígido nisso. Na prática, um app passa por três estados principais:  

Ativo (foreground): o app está aberto na tela e você está usando ele naquele momento.  

Em segundo plano (background): você saiu do app, seja para abrir outro ou voltar para a tela inicial, mas ele ainda pode executar algumas tarefas limitadas. 

Encerrado pelo sistema (killed): o Android ou o iOS pode finalizar o processo do app a qualquer momento para liberar RAM para o app que está em uso. 

Restrições do dispositivo 

Desenvolver para mobile significa trabalhar com limitações de hardware bem sérias: 

 

Bateria e processamento: tarefas pesadas gastam a bateria rápido e esquentam o aparelho. 

Memória RAM: celulares de entrada e intermediários têm pouca RAM, então é preciso otimizar bem os componentes e cuidar do gerenciamento de estado. 

Conectividade: a rede móvel é instável por natureza, alternando entre 4G, 5G e áreas sem sinal. O app precisa funcionar offline ou, pelo menos, lidar bem com requisições que falham, sem travar nem mostrar erro confuso. 

Telas e display: existe uma variedade enorme de tamanhos, proporções e densidades de pixel (PPI), além de elementos físicos como notch e ilha dinâmica. Por isso entram as safe areas, que são as áreas seguras da tela que impedem o conteúdo de ficar escondido embaixo da barra de status ou dos botões de navegação por gestos. 

Permissões: para acessar câmera, localização, Bluetooth ou notificações push, o app precisa pedir autorização explícita ao usuário, na hora em que for usar o recurso. 

 

Entrada e interação 

Na web, a interação gira em torno do ponteiro: o mouse, o cursor e eventos como o :hover, que só acontece quando você passa o mouse por cima de algo. No mobile, tudo é toque direto na tela, e isso muda bastante coisa. As áreas de toque precisam ser confortáveis (a recomendação costuma ser algo em torno de 48x48dp), o app tem que dar conta de gestos como swipe e pinch to zoom, e ainda existe o problema do teclado virtual, que aparece cobrindo metade da tela e pode esconder ou empurrar os campos de texto. 

UX mobile 

O contexto de uso no celular não tem nada a ver com o do desktop. Muitas vezes a pessoa está em pé, andando, com uma mão só e com pressa. Por isso, a zona do polegar (deixar as principais ações na parte de baixo da tela) e uma navegação fluida, com abas inferiores (bottom navigation) e menus laterais (drawers), fazem toda a diferença na experiência. 

 