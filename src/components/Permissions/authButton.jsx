import React, {useState} from 'react';
import {Button} from "antd";

function AuthButton(props) {
    const {name,...others} = props
    const name_list = [
        "menu_delete"
    ]
    if (name_list.includes(name)){
        return <Button {...others}/>
    }
    return React.ReactNode
}

export default AuthButton;