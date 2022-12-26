import React, {useState} from 'react';
import {Button} from "antd";
import { connect } from 'react-redux';

import { existValue } from '../../utils/common';

function AuthButton(props) {
    const {name,root,menu,...others} = props
    
    if (existValue(menu,root,name)){
        return <Button {...others}/>
    }
    return React.ReactNode
}

export default connect(
    state =>({
        menu:state.menu
    }),
    {
        
    }
)(AuthButton);