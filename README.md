# FSW Barber

**FSW Barber** é um projeto que contem um catálogo de barbearias e cabeleireiros, onde é possível fazer reservas e buscar as barbearias, quando necessário, realizar o cancelamento.

## Construído Com

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Next.js](https://nextjs.org/) - Framework web base do projeto.
- [Next-auth](https://next-auth.js.org/) - Usado para uma fácil autenticação.
- [Shadcn/ui](https://ui.shadcn.com/) - Biblioteca de componentes facilmente reutilizáveis.
- [Zod](https://zod.dev/) - Usado para validar campos na pesquisa.
- [Prisma](https://www.prisma.io/) - Um simplificador na parte de banco de dados.

## Como Começar

- Clonar o repositório.

<pre><code>git clone https://github.com/LuizMadrid/fullstackweek-barber.git</code></pre>

- Abrir a pasta no VS Code
- Adicionar um arquivo .env no servidor contendo:
<pre><code>DATABASE_URL="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
NEXT_AUTH_SECRET="..."
</code></pre>
  
- Executar o projeto.

<pre><code>npm i</code></pre>
- "npm i" serve para instalar módulos e dependências que o projeto pode precisar.
<pre><code>npm run dev </code></pre>
- "npm run dev" é para dar início no projeto para ser visualizado.

## Minhas Melhorias

- Total responsividade nas telas disponíveis;
- Caso o horário da reserva na data atual seja inferior ao horário atual, não é mostrada esta hora para o agendamento;
- Loading com skeletons para uma melhor performance para o usuário;

## Autor

- Todo esse projeto foi idealizado pelo [Felipe Rocha](https://github.com/felipemotarocha) do canal [DicaParaDevs](https://www.youtube.com/@dicasparadevs). Com algumas melhorias realizadas por mim.

## Deploy do Projeto

- [FSW - Barber](https://fullstackweek-barber-sigma.vercel.app/)
