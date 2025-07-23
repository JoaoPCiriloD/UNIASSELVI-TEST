# Cópia do Site UNIASSELVI - Cursos Técnicos

Este projeto contém uma cópia completa e funcional do site da UNIASSELVI para cursos técnicos.

## 📁 Estrutura do Projeto

```
📦 test/
├── � index.html      # Página principal (raiz)
├── 📂 html/           # Páginas HTML secundárias
│   ├── cronograma.html # Página de boas-vindas
│   └── instituicao.html # Página sobre a UNIASSELVI (sem navegação)
├── 📂 css/            # Arquivos de estilo
│   ├── styles.css     # CSS principal
│   ├── aos.css        # Animate On Scroll
│   └── slimselect.min.css # Biblioteca SlimSelect
├── 📂 js/             # Arquivos JavaScript
│   ├── index.js       # Script principal
│   ├── cronograma.js  # Script específico do cronograma
│   ├── aos.js         # Animate On Scroll
│   ├── lazysizes.min.js # Lazy loading de imagens
│   ├── progressbar.min.js # Barra de progresso
│   └── slimselect.min.js # Biblioteca SlimSelect
└── 📂 img/            # Imagens locais
    ├── 5.png          # Nota 5 (conceito ENADE)
    ├── facebook.png   # Ícone Facebook
    ├── favicon.png    # Favicon do site
    ├── instagram.png  # Ícone Instagram
    ├── libras-icon.png # Ícone de acessibilidade
    ├── logo.png       # Logo UNIASSELVI
    ├── star.svg       # Ícone de estrela (avaliações)
    ├── twitter.png    # Ícone Twitter
    ├── video_w.svg    # Ícone de vídeo
    └── youtube.png    # Ícone YouTube
```

## 🌐 Páginas Disponíveis

### 1. **index.html** - Página Principal (Raiz)

- Banner de boas-vindas
- 11 etapas do curso técnico com vídeos
- Seção sobre a instituição
- Links para apps iOS/Android
- Integração com VLibras para acessibilidade
- **Localização**: Na raiz do projeto para acesso direto

### 2. **html/cronograma.html** - Boas-Vindas

- Página de apresentação
- Informações sobre coordenadores
- Design com imagens de fundo personalizadas

> **Nota**: As páginas "Sobre a UNIASSELVI" e "Você conhece o NUAPI?" foram removidas da navegação conforme solicitado.

- Animações de scroll (AOS)
- Informações sobre conceitos e notas do MEC

## ⚡ Funcionalidades

### JavaScript (index.js)

- Menu responsivo para mobile
- Navegação suave entre seções
- Barra de progresso da página
- Lazy loading de vídeos do YouTube
- Destaque automático do item ativo no menu
- Suporte a parâmetros de URL para navegação direta

### CSS (styles.css)

- Design responsivo (mobile-first)
- Variáveis CSS customizadas
- Animações e transições suaves
- Cores e tipografia da marca UNIASSELVI
- Grid system flexível

### Bibliotecas Integradas

- **AOS (Animate On Scroll)** - Animações ao fazer scroll
- **LazyLoading** - Carregamento otimizado de imagens
- **ProgressBar** - Barra de progresso visual
- **SlimSelect** - Dropdowns estilizados
- **VLibras** - Acessibilidade em Libras

## 🎨 Design e UX

- **Cores principais**: Roxo (#5f2180), Amarelo (#ffdd00), Preto (#1d1d1b)
- **Tipografia**: Rubik (texto), Neo-Sans (títulos)
- **Layout responsivo** para desktop, tablet e mobile
- **Acessibilidade** com skip links e integração VLibras

## 🚀 Como Usar

1. Abra qualquer arquivo HTML em um navegador
2. Navegue entre as páginas usando o menu
3. Use os links internos para pular para seções específicas
4. Experimente o menu mobile redimensionando a janela

## �️ Imagens Implementadas

Todas as imagens utilizadas nas páginas foram baixadas e organizadas localmente:

### Imagens Principais

- **5.png**: Nota 5 utilizada na seção de conceito ENADE
- **star.svg**: Ícones de estrelas para avaliações e conceitos
- **logo.png**: Logo oficial da UNIASSELVI (footer)
- **favicon.png**: Ícone do site exibido na aba do navegador

### Ícones de Redes Sociais

- **facebook.png**: Ícone do Facebook
- **instagram.png**: Ícone do Instagram
- **twitter.png**: Ícone do Twitter
- **youtube.png**: Ícone do YouTube

### Ícones Funcionais

- **libras-icon.png**: Ícone de acessibilidade para VLibras
- **video_w.svg**: Ícone de vídeo (página cronograma)

> **Nota**: Todas as imagens estão organizadas na pasta `/img/` e os caminhos foram atualizados em todas as páginas HTML para referenciar os arquivos locais.

## �📱 Recursos Mobile

- Menu hambúrguer responsivo
- Touch-friendly navigation
- Imagens otimizadas para dispositivos móveis
- Vídeos responsivos do YouTube

## 🔗 Links Externos

- Portal UNIASSELVI
- Apps iOS e Android
- Redes sociais (Instagram, Facebook, YouTube, Twitter)
- AVA (Ambiente Virtual de Aprendizagem)
- VLibras para acessibilidade

## 📊 Tecnologias Utilizadas

- HTML5 semântico
- CSS3 com Flexbox/Grid
- JavaScript ES6+
- Google Tag Manager (Analytics)
- YouTube API (embed)
- Font APIs (Google Fonts, Adobe Fonts)

---

**Desenvolvido como cópia fiel do site oficial da UNIASSELVI**
