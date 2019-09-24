import React from 'react';
import Menu from './Menu.js';
//bio | projects | tools | resume | interests | photography
function Header(props) {

    const { links, selected  } = props;
    return (
        <div className="Header">
            <h2 className="Name">Preston Crowe</h2>
            <h4 className="Contact">prestonjcrowe[at]gmail.com | seattle, wa</h4>
            <Menu/>
        </div>
    );
}

export default Header;