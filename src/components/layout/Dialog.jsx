import React,{useEffect} from 'react';
import {createPortal} from "react-dom";

function Dialog(props) {
    const rootNode = document.querySelector(".site-layout-content")
    const node = document.createElement("div")

    useEffect(() => {
        rootNode.appendChild(node)
        return () => {
            rootNode.removeChild(node);
        };
    }, []);

    return createPortal(
        <div className="com-dialog" style={{width:'100%',
                height:'100%',
                position: 'absolute',
                left:'0',
                top:"0",
                background:"rgba(5, 5, 5, 0.06)",
                overflow: 'auto',
                border:'1px solid rgba(5, 5, 5, 0.06)'
            }}>
            {props.children}
        </div>,
        rootNode
    );
}

export default Dialog;