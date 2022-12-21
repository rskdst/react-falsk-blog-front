import React, {useState} from 'react';
import {Button} from "antd";
import { connect } from 'react-redux';

import { existValue } from '../../utils/common';

function AuthButton(props) {
    const {name,root,menu_list,...others} = props
    
    if (existValue(menu_list,root,name)){
        return <Button {...others}/>
    }
    return React.ReactNode
}

export default connect(
    state =>({
        menu_list:state.menu_list
    }),
    {
        
    }
)(AuthButton);