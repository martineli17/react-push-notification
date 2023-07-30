# Push Notification - Web
<p>Quando se trata de Push Notification, existem alguns serviços cloud que realizam essa tarefa.</p>
<p>Dentro desse cenário, é comum encontrarmos diversos serviços cloud que realizam essa tarefa, porém é necessário configurá-lo e, em alguns casos, pagar pelo memso.</p>
<p>No entanto, existe uma solução alternativa gratuita que pode ser utilizada para Push Notification, utilizando recursos da própria Web.</p>

### Como usar
1. Na aplicação Front-End, é necessário, primeiro, criar um service-worker para registrar o serviço background responsável por processar as notificações. [Arquivo](https://github.com/martineli17/react-push-notification/blob/master/front/public/services-works/notification.js) 
2. Após a criação do service-worker é necessário registrá-lo e, ao finalizar o registro, solicitar as informações sobre a subcription da API do 'Push Manager' responsável pelo Push Notification. Com as informações obtidas, é necessário enviá-las para o Back-End. [Arquivo](https://github.com/martineli17/react-push-notification/blob/master/front/src/index.tsx)
3. No Back-End, é necessário instalar o pacote '[web-push](https://www.npmjs.com/package/web-push)' para o projeto NestJs e '[WebPush](https://github.com/web-push-libs/web-push-csharp/)' para o projeto .NET
4. Após a instalação, é necessário executar uma função para que retorne as credenciais (chave pública e privada) para o envio das notificações.
  - A função responsável (projeto NestJs) é a `generateVAPIDKeys()`
  - A função responsável (projeto .NET) é a `VapidHelper.GenerateVapidKeys()`
  - Basta executar essa função uma única vez, obter o retorno via console e utilizar via variáveis de ambiente da sua aplicação Back-End.
5. No Back-End, há um endpoint ('subscriber/:key') para salvar os dados de cada subscription para que seja possível enviar as notificações posteriormente (neste exemplo, foi usada uma classe para simular o banco de dados).
6. No Back-End, há um endpoint ('push/:key') para simular o envio de um Push Notification. Neste endpoint, é retornada a subscription referente àquela determinada 'key' e, assim, cria a mensagem a ser enviada.
7. Após o envio, a aplicação Front-End recebe essa notificação via service-worker e notifica o usuário (mesmo se o usuário não tiver acessando-a naquele momento).

### Observações
- Neste exemplo, há duas aplicações Back-End: uma em NestJs e outra em .NET . O intuito é demonstrar a utilização nestas duas linguagens.
- A chave pública gerada na aplicação Back-End, deve ser informada também na aplicação Front-End quando realizar o subscriber do push manager.
