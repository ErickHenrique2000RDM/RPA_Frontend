import React, {useState} from 'react';
import './style.css';

export default props => {

    const [visible, setVisible] = useState(true);

    // if(document.getElementById('Click').clicked == true){
    //     setVisible(!visible); <textarea>
    // }

    return (
        <div className={`MenuLoja ${visible ? '' : 'hidden'}`}>
            <p tabindex={0} className='loja' id='Click' onClick={ () => {
                console.log('click');
                setVisible(!visible);
            }}>{props.loja}</p>
            {/*visible*/ true ? <div>
                {props.lista.map((item, key) => {
                    return (
                        <div tabindex={0} className={`capsula ${visible ? '' : 'hidden'}`} id={key}>
                          <p>Nome: {item.nome}</p>  
                          <p>Preco: {item.preco}</p>  
                          <a className='LinkItem' href={item.link} target="_blank">Acessar site</a>  
                        </div>
                      )
                })}
            </div> : <></>}
        </div>
    )
    
}