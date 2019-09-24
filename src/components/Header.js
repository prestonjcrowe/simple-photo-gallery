import React from 'react';
import Menu from './Menu.js';

function Header(props) {

    const { name, contact  } = props.config;
    return (
        <div className="Header">
            <h2 className="Name">{ name }</h2>
            <h4 className="Contact">{contact }</h4>
            <Menu/>
        </div>
    );
}

export default Header;