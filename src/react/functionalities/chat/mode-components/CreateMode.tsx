/* Imports
------------------------------------------------------------ */
import '../../../style.css';
import * as React from 'react';
import { useRef, useState } from 'react';


/* CreateMode
------------------------------------------------------------ */
export const CreateMode = (props) => {


    // Data
    let newButtonFlag = false;                                          // Flag to create a new pre-made answer
    const wizardText = useRef(null);                                    // Text inserted by the wizard
    const [answerIconFlag, setAnswerIconFlag] = useState(false);        // Does the icon need to be inserted?
    const [questionIconFlag, setQuestionIconFlag] = useState(false);    // Does the icon need to be inserted?


    // Function to send the creation message (both answer and question)
    function sendMsg(premadeAnswer: string, questionFlag: boolean): void {

        if (questionFlag) {                         // If true, the wizard wants to create a new question
            parent.postMessage({
                pluginMessage: {
                    type: 'createQuestion',
                    iconFlag : questionIconFlag,
                }
            }, '*');
            return;
        }

        parent.postMessage({                        // Otherwise, the wizard wants to create a new answer
            pluginMessage: {
                type: 'createAnswer',
                iconFlag : answerIconFlag,
                payload: premadeAnswer.length != 0  
                ? premadeAnswer
                : wizardText.current.value
            }
        }, '*');
    }


    // Function to handle the submit of the custom text
    function handleSubmit() {
        if (newButtonFlag) {                                                                // If true, the wizard wants to create a new pre-made answer button
            props.setPremadeAnswers([...props.premadeAnswers, wizardText.current.value]);
            newButtonFlag = false;
            return;
        }

        sendMsg('', false);                                                     // Otherwise, the wizard wants to send a msg
    }


    // JSX
    return (
        <div>
            <fieldset>
                <legend><b>Answer section</b></legend>

                <p>Want to add an icon?</p>
                <div className='centered-checkbox'>    
                    <input type="checkbox" checked={ answerIconFlag } id='answerIconFlag' onChange={ (e) => setAnswerIconFlag(e.target.checked) } />
                    <label htmlFor="answerIconFlag">Answer with icon</label>
                </div>
                <hr />

                <p>Pre-made answers:</p>
                <div className='premade-answers-box'>
                    <button className='custom-answer-button' onClick={ () => sendMsg('Thinking...', false) }>Thinking...</button>           {/* Default pre-made answers */}
                    <button className='custom-answer-button' onClick={ () => sendMsg("I don't know", false) }>I don't know</button>
                    <button className='custom-answer-button' onClick={ () => sendMsg('Can you repeat?', false) }>Can you repeat?</button>

                    { props.premadeAnswers.map((text, i) => {                                                                       {/* Custom pre-made answers */}
                        return <button className='custom-answer-button' key={i} onClick={ () => sendMsg(text, false) }>{text}</button>
                    }) }
                </div>
                <hr />

                <p>Write your custom answer:</p>
                <form id='customAnswer' onSubmit={ (e) => { e.preventDefault(); handleSubmit() }}>
                    <textarea className='custom-answer-box' rows={ 4 } cols={ 38 } ref={ wizardText }></textarea>
                </form>
                <div className='centered-box'>
                    <button className='green-button' type="submit" form='customAnswer'>Send answer</button>
                    <br />
                    <button className='green-button' type="submit" onClick={ () => newButtonFlag=true } form='customAnswer'>Create a new pre-made answer button</button>
                </div>
            </fieldset>
            <br /><br />
            

            <fieldset>
                <legend><b>Question section</b></legend>

                <p>Want to add an icon?</p>    
                <div className='centered-checkbox'>    
                    <input type="checkbox" checked={ questionIconFlag } id='questionIconFlag' onChange={ (e) => setQuestionIconFlag(e.target.checked) } />
                    <label htmlFor="questionIconFlag">Question with icon</label>
                </div>
                <hr />

                <p>Go to next question:</p>    
                <div className='centered-box'>
                    <button className='green-button' onClick={ () => sendMsg('', true) }>Next question</button>
                </div>
            </fieldset>
        </div>
    )
}