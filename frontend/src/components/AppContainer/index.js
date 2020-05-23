import React from 'react';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function AppContainer({children}) {
    return(
        <div className="container">
            <img src={logoImg} alt="AirCnC"/>
            <div className="content">
                {children}
            </div>
    </div>
    );
}