# Monitoramento de Umidade de Plantas 🌱

Este é um projeto simples desenvolvido em React com Tailwind CSS para monitorar a umidade do solo, baseado nos dados enviados por um ESP32. O site exibe informações atualizadas sobre as condições do solo, ajudando a gerenciar a irrigação de forma mais eficiente.

---

## 🚀 Funcionalidades

- **Monitoramento em tempo real**: Exibe os dados de umidade do solo capturados pelo sensor.
- **Interface amigável**: Design limpo e responsivo, criado com Tailwind CSS.
- **Fácil integração**: Compatível com ESP32 para envio de dados via Wi-Fi.

---

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para a construção da interface de usuário.
- **Tailwind CSS**: Framework de estilos para um design responsivo e moderno.
- **ESP32**: Microcontrolador utilizado para medir a umidade do solo e enviar os dados para o site.

---

## 📂 Estrutura do Projeto

```plaintext
src/
├── components/
│   ├── Header.jsx         // Componente do cabeçalho do site
│   ├── CardUmidade.jsx    // Componente que exibe os dados de umidade
│   ├── CardBomba.jsx    // Componente que exibe o status da bomba
│   ├── StatusSolo.jsx    // Componente que exibe o status do solo
│   ├── HistoricoMedicao.jsx    // Componente que exibe card com as 3 ultimas medições
│   ├── GraficoTotalUmidade.jsx    // Componente que exibe histórico completo de medições registradas
│   ├── firebase.js    // Arquivo de configuração do firebase
├── App.jsx                // Componente principal da aplicação
├── App.css               // Estilos globais adicionais
├── index.html              // Ponto de entrada do React
```

---

## 📦 Como Executar o Projeto

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/seu-usuario/monitoramento-umidade-plantas.git
   ```
2. **Acesse o diretório do projeto:**
   ```bash
   cd monitoramento-umidade-plantas
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Execute o projeto:**
   ```bash
   npm run dev
   ```
5. **Acesse no navegador:**
   O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

---

## 📖 Como Integrar com o ESP32

1. Configure o ESP32 para enviar os dados de medição para o servidor web.
2. Certifique-se de que o site esteja configurado para receber e exibir os dados enviados.

---

## 📚 Referências

- **Documentação do React**: [reactjs.org](https://reactjs.org)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **ESP32**: [espressif.com](https://www.espressif.com/)

---

## 💡 Melhorias Futuras

- Implementar notificações de baixa umidade.
- Criar uma funcionalidade de login para personalizar o monitoramento.

---

**Desenvolvido por:** Igor
**Licença:** MIT
