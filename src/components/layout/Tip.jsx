import React from 'react';

function Tip(props) {
    return (
        <>
            <div style={{
                margin: '10px',
                height: '3rem',
                borderBottom: '1px solid rgba(5, 5, 5, 0.06)'
            }}>
                <h1 style={{lineHeight:'2rem',fontWeight:'bolder'}}>{props.tipName}</h1>
            </div>
        </>
    );
}

export default Tip;