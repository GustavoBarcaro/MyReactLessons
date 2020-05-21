import React from 'react';

const user = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>Age: {props.age}</p>
            <style jsx>
                {
                    `
                    div {
                        border: 1px solid #eee;
                        bo-shadow: 0 2px 3px #ccc;
                        padding: 20px;
                        text-align: center
                    }
                    `
                }
            </style>
        </div>
    )

};

export default user