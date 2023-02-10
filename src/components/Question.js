import React from "react"

export default function Question(props) {
    
    const answers = props.arr[0].map(answer => <div 
        className={answer.className} key={answer.text} 
        onClick={() => {
            props.choose(props.arr[1], answer.id);
            props.checkClass(answer.className);
        }} 
        // style={{background: answer.isSelected ? "#D6DBF5" : "transparent"}}
        >
            {
                props.fixString(answer.text)
            }
    </div>);
    
    return (
        <div className="quiz">
            <h2 className="question">{props.question}</h2>
            <div className="answers">
                {answers}
            </div>
            <hr />
        </div>
    )
}