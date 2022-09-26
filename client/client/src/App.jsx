// import { useState } from 'react'
import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [nome, setNome] = useState("")
  const [sobreNome, setSobreNome] = useState("")
  const [endereco, setEndereco] = useState("")

  const [pessoasList, setPessoasList] = useState([])

  const addPessoa = () => {
    Axios.post('http://localhost:3001/create',
      {
        nome: nome,
        sobreNome: sobreNome,
        endereco: endereco
      }).then(console.log("success"));
  }

  const getPessoas = () => {
    Axios.get('http://localhost:3001/pessoas').then((response) => { console.log(response); });
}

  // document.querySelector('#tableClient>tbody')
  //   .addEventListener('click', editDelete)

  return (
    <div className="App">
      <header>
        <h1 className="header-title">Cadastro</h1>
      </header>

      <main>

        <button
          type="button"
          className="button blue mobile"
          id="cadastrarPessoa"
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          Cadastrar
        </button>

        <button
          type="button"
          className="button blue mobile"
          id="atualizar"
          onClick={getPessoas}
        >
          atualizar tabela
        </button>

        <table
          id='tablePessoas'
          className='records'
        >
          <thead>
            <tr>
              <th>id</th>
              <th>nome</th>
              <th>sobrenome</th>
              <th>endereço</th>
              <th>ação</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </main>

      <div className={`modal ${isModalVisible ? "active" : ""}`} id="modal">
        <div className="modal-content">
          <header className="modal-header">
            <h2 className='modal-title'>Novo Pessoa</h2>
            <span className="modal-close" id="modalClose"
              onClick={() => {
                setIsModalVisible(false);
              }}>&#10006;</span>
          </header>
          <form id="form" className="modal-form">
            <input type="text" id="nome" data-index="new" className="modal-field" placeholder="Nome da Pessoa" onChange={(e) => { setNome(e.target.value); }}
              required />
            <input type="text" id="sobreNome" className="modal-field" placeholder="sobrenome da pessoa" onChange={(e) => { setSobreNome(e.target.value); }} required />
            <input type="text" id="endereco" className="modal-field" placeholder="endereco da pessoa" onChange={(e) => { setEndereco(e.target.value); }} />
          </form>
          <footer className="modal-footer">
            <button id="salvar" className="button green" onClick={addPessoa}>Salvar</button>
            <button id="cancelar" className="button blue" onClick={() => {
              setIsModalVisible(false);
            }}>Cancelar</button>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
