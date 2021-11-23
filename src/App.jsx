import React, {useState} from 'react'
import './App.css';
import axios from 'axios'
import MenuLoja from './lojas/MenuLoja'
var _ = require('lodash');

// const baseURL = 'http://localhost:8000/'
const baseURL = ' https://teste-puppeteer.herokuapp.com/'

function App() {

  const [estado, setEstado] = useState({listas: []});
  const [pesquisa, setPesquisa] = useState('');
  const [pesquisando, setPesquisando] = useState(false);
  const [status, setStatus] = useState('Nada pesquisado')

  var num = 1;

  const modificaStatus = () => {
    num = ((num % 3) + 1);
    setStatus(`Pesquisando${_.repeat('.', num)}`)
  }

//   document.addEventListener('keypress', function (event) {
//     if (event.keyCode !== 13 || pesquisando) return;
//     setPesquisando(true)
//     pegar();
// });

  const pegar = () => {
    setEstado({listas: []})
    if(pesquisa.replace(/\ /g, '') === ''){
      setStatus('Insira uma pesquisa');
      return;
    }

    const interval = setInterval(function() {
      modificaStatus();
    }, 500);
   
    setPesquisando(true);
    axios.get(baseURL + pesquisa).then(resp => {
      setEstado(resp.data)
      setPesquisando(false);
      clearInterval(interval);
    }).catch(err => {
      setStatus('Erro ao pesquisar, tente novamente');
      setPesquisando(false);
      clearInterval(interval);
    })
  } 

  const mudarTexto = (e) => {
    setPesquisa(e.target.value);
  }

  const verificaInput = (e) => {
    if(e.key === 'Enter'){
      pegar();
    }else{
      return
    }
  }

  return (
    <div className="App">
      <div>
        <h1>Ferramenta de pesquisa</h1>
        <h3>Criado por: <a className='LinkGit' href='https://github.com/ErickHenrique2000' target="_blank"><strong>Erick Henrique Silva</strong></a></h3>
      </div>
      <div onKeyDown={e => verificaInput(e)} className='caixaPesquisa'>
        <input className='input' placeholder="O que deseja buscar?" type="text" value={pesquisa} onChange={e => mudarTexto(e)}></input>
        <button id='submit' className='pesquisa' onClick={() => pegar()}>Pesquisar</button>
      </div>

      <div>
        {estado.listas.length > 0 ?
          <div className='grid'>
            <MenuLoja lista={estado.listas[0]} loja='Kabum'></MenuLoja>
            <MenuLoja lista={estado.listas[1]} loja='Pichau'></MenuLoja>
            <MenuLoja lista={estado.listas[2]} loja='Terabyte'></MenuLoja>
          </div>
          : <div className='status'>{status}</div>
        }
      </div>
    </div>
  );
}

export default App;
