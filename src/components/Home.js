import React from "react"
import blob1 from "../images/blobs.png";
import blob2 from "../images/blob2.png";

export default function Home(props) {
    return (
        <div className="home">
            <img src={blob1} className="blob1" alt=""/>
            <img src={blob2} className="blob2" alt=""/>
            <h1 className="title">Quizzical</h1>
            <p className="para">Just your usual quiz game</p>
            <button className="start-quiz" onClick={props.showSettings}>Start Quiz</button>
        </div>
    )
}