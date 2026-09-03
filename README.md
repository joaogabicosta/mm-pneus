mm-pneus

Site da MM Pneus, feito em Next.js e publicado na Vercel.

Como editar os textos do site:

- Abra a pasta app/ neste repositorio.
- - O arquivo app/page.tsx tem a maior parte dos textos (titulo, botoes, mensagem do WhatsApp, endereco, etc).
  - - Clique no icone de lapis (editar) no canto superior direito do arquivo no GitHub.
    - - Altere apenas o texto entre aspas, sem mexer nas tags ou chaves.
      - - Role ate o final, escreva uma mensagem de commit e clique em Commit changes (direto na branch main).
        - - A Vercel publica a atualizacao automaticamente em cerca de 1 minuto.
         
          - Outros textos podem estar em app/layout.tsx (titulo da aba do navegador) ou app/components/HeroCarousel.tsx (legendas do carrossel).
         
          - Observacao sobre imagens: public/logo.png e public/hero/slide-1.jpg, slide-2.jpg, slide-3.jpg nao foram migradas automaticamente (arquivos binarios). Se estiverem quebradas no site, envie-as novamente pela opcao Add file do GitHub.

---

## Avaliacoes do Google (automatico)

A secao "Avaliacoes no Google" da home busca os dados direto do perfil da
MM Pneus no Google, a cada 6 horas, sem precisar de novo deploy. Ela mostra
a nota media real, o total de avaliacoes e ate 10 comentarios de 4 e 5
estrelas, dos mais recentes para os mais antigos.

Arquivos envolvidos:

- `app/lib/googleReviews.ts` - busca e filtra as avaliacoes na Google Places API.
- `app/avaliacoes.ts` - lista de reserva (avaliacoes reais ja coletadas).
- `app/page.tsx` - monta os cartoes na tela.

### Limite do Google

A Places API devolve no maximo 5 avaliacoes por perfil - e isso e um limite
da propria Google, nao do site. Por isso o codigo pega as que a API liberar
e completa os 10 cartoes com a lista de reserva de `app/avaliacoes.ts`.
A unica forma oficial de puxar todas as avaliacoes e a Google Business
Profile API, que exige login do dono do perfil e aprovacao da Google.

### Como ligar (uma vez so)

1. Acesse https://console.cloud.google.com/ e crie um projeto.
2. Em "APIs e servicos" ative a **Places API (New)**.
3. Em "Credenciais" crie uma **chave de API**. Restrinja por API (apenas
   Places API) - a chave e usada no servidor, nunca aparece no navegador.
4. Na Vercel, no projeto `mm-pneus`, em Settings > Environment Variables,
   adicione:

   | Nome | Valor |
   |---|---|
   | `GOOGLE_MAPS_API_KEY` | a chave criada no passo 3 |
   | `GOOGLE_PLACE_ID` | (opcional) o Place ID do perfil |

   Sem o `GOOGLE_PLACE_ID` o site descobre o perfil sozinho pelo nome e
   endereco, e guarda esse resultado por 30 dias.
5. Clique em **Redeploy** na Vercel para a chave passar a valer.

Enquanto a chave nao estiver configurada, o site continua funcionando
normalmente com a lista de `app/avaliacoes.ts` - nada quebra.

### Custo

Com a atualizacao a cada 6 horas o site faz cerca de 120 chamadas por mes.
A cota gratuita da Google para esse tipo de consulta e de 1.000 chamadas
mensais, entao na pratica o custo e zero.
