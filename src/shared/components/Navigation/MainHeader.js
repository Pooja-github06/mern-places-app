import React from 'react';

import './MainHeader.css';

const MainHeader = props => {
    return <header className="main-header">{props.children}</header>; //props.children is used to pass content in between <mainheader /> which is their in mainnavigation page
};

export default MainHeader;
