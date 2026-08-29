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
