# Projeto: Tarefas com Next.js

Este projeto é uma projeto de tarefas pessoal desenvolvido com Next.js, TypeScript e Tailwind CSS, Firebase.

---

## Estrutura e Tecnologias

* **Framework:** Next.js (versão 15.x)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS para classes utilitárias e estilos globais.
* **Roteamento:** Usa o App Router do Next.js.
* **Componentes:** Componentes React estão localizados em `src/components`.

---

## Convenções de Código e Padrões

* **TypeScript:** Preferimos tipagens explícitas sempre que possível.
* **Tailwind CSS:** Use classes utilitárias do Tailwind para estilização. Evite CSS modules ou arquivos `.css` tradicionais a menos que estritamente necessário.

* **Organização de Arquivos:**
    * Páginas em `app/`.
    * Componentes reutilizáveis em `src/components`.
    * Funções utilitárias em `src/lib`.
    * Definições de tipos em `src/types`.
* **Estado:** Uso de React Hooks (`useState`, `useEffect`, `useContext`) para gerenciamento de estado local. Evitar soluções de estado mais complexas a menos que haja necessidade.

---

## Objetivos e Foco do Projeto

* **Desempenho:** Otimizar para carregamento rápido e bom SEO.
* **Responsividade:** O layout deve ser responsivo para dispositivos móveis e desktops.
* **Manutenibilidade:** Código limpo e modular, fácil de entender e expandir.

---

## Instruções para o Gemini

* Ao sugerir código, **sempre priorize TypeScript** e inclua tipagens quando apropriado.
* Para estilização, **gere classes Tailwind CSS**. Se precisar de estilos personalizados, use a diretiva `@apply` ou considere `style={{}}` inline para estilos simples.
* Ao refatorar, concentre-se em **extrair lógica para hooks personalizados ou funções utilitárias** em `src/lib`.
* Se for pedido para adicionar novas funcionalidades, **proponha a criação de novos componentes em `src/components`** quando apropriado.
* Ao lidar com roteamento, lembre-se que o projeto usa o **App Router do Next.js**.