import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import AppContainer from '../../components/AppContainer';

import camera from '../../assets/camera.svg';

import './styles.css';

// CORRGIR BUG DO VALUE GRATUITO


export default function New() {
    const [thumbnail, setThumbnail] = useState(null)
    const [company, setCompany] = useState('');
    const [techs,setTechs] = useState('');
    const [value, setValue] = useState('');

    const user_id = localStorage.getItem('user');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);
    const history = useHistory();
    
    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('value', value);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return(
        <AppContainer>
            <form onSubmit={handleSubmit}>
                <label 
                  style={{ backgroundImage: `url(${preview})` }} 
                  id="thumbnail"
                  className={thumbnail ? 'has-thumbnail' : ''}
                >
                    <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
                    <img src={camera} alt="Select img"/>
                </label>

                <label htmlFor="company">EMPRESA *</label>
                <input
                  className="company"
                  placeholder="Sua empresa incrível"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                />

                <label htmlFor="techs">TECONOLOGIAS * <span>(separadas por vírgulas)</span></label>
                <input 
                  className="techs"
                  placeholder="Quais tecnologias usam?"
                  value={techs}
                  onChange={e => setTechs(e.target.value)}
                />

                <label htmlFor="value">VALOR DA DIÁRIA * <span>(em branco para gratuito)</span></label>
                <input 
                  className="value"
                  placeholder="Valor cobrado por dia"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />

                <button className="btn" type="submit">Cadastrar</button>
            </form>
        </AppContainer>
    );
}