import React from "react";
import '../Stylings/Box.css';

export default function Box(props){
    return(<>
        <button className="square" onClick={props.onSquareClick}>{props.value}</button>
    </>);
}