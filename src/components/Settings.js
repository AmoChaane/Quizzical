import React from "react"
import blob1 from "../images/blobs.png";
import blob2 from "../images/blob2.png";

export default function Settings(props) {    
    return (
        <div className="container">
            <img src={blob1} className="blob1" alt=""/>
            <img src={blob2} className="blob2" alt=""/>
            <div className="settings">
                <h1 className="general-settings">General Settings</h1>
                <div className="form">
                    <div className="input-holder">
                        <label>Number of questions</label>
                        <input onChange={event => props.handleChange(event)} type="number" name="numberOfQuestions" min="1" value={props.data.numberOfQuestions} style={{border: !props.formVal.status ? "2px solid red" : "none"}}/>
                        <p style={{color: "red"}}>{!props.formVal.status && props.formVal.text}</p>
                    </div>
                    <div className="input-holder">
                        <label>Select Category</label>
                        <select onChange={event => props.handleChange(event)} name="category" value={props.data.category}>
                            <option value="">Any Category</option>
			                <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            <option value="11">Entertainment: Film</option>
                            <option value="12">Entertainment: Music</option>
                            <option value="13">Entertainment: Musicals &amp; Theatres</option>
                            <option value="14">Entertainment: Television</option>
                            <option value="15">Entertainment: Video Games</option>
                            <option value="16">Entertainment: Board Games</option>
                            <option value="17">Science &amp; Nature</option>
                            <option value="18">Science: Computers</option>
                            <option value="19">Science: Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Art</option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="29">Entertainment: Comics</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                            <option value="32">Entertainment: Cartoon &amp; Animations</option>
                        </select>
                    </div>
                    <div className="input-holder">
                        <label>Select Difficulty</label>
                        <select onChange={event => props.handleChange(event)} name="difficulty" value={props.data.difficulty}>
                            <option value="">Any Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <button className="continue"onClick={() => {
                        if(props.data.numberOfQuestions) {
                            props.showQuizzes()
                            props.playAgainBtn();
                            props.setLoad(false);
                        } else {
                            props.setFormVal(prev => {
                                return {...prev, status: false}
                            })
                        }
                    }}>Continue</button>
                </div>
            </div>
        </div>
    )
}