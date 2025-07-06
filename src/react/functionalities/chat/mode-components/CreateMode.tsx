/* Imports
------------------------------------------------------------ */
import '../../../style.css';
import * as React from 'react';
import { useRef, useState } from 'react';


/* CreateMode
------------------------------------------------------------ */
export const CreateMode = () => {


    // Data
    const wizardText = useRef(null);                                    // Text inserted by the wizard
    const [answerIconFlag, setAnswerIconFlag] = useState(false);        // Does the icon need to be inserted?
    const [questionIconFlag, setQuestionIconFlag] = useState(false);    // Does the icon need to be inserted?


    // Function to send the creation message (both answer and question)
    function sendMsg(premadeAnswer: string, questionFlag: boolean): void {
        if (questionFlag) {
            parent.postMessage({
                pluginMessage: {
                    type: 'createQuestion',
                    iconFlag : questionIconFlag,
                }
            }, '*');
            return;
        }

        parent.postMessage({
            pluginMessage: {
                type: 'createAnswer',
                iconFlag : answerIconFlag,
                payload: premadeAnswer.length != 0
                ? premadeAnswer
                : wizardText.current.value
            }
        }, '*');
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
                    <button className='green-button' onClick={ () => sendMsg('Thinking...', false) }>Thinking...</button>
                    <button className='green-button' onClick={ () => sendMsg("I don't know", false) }>I don't know</button>
                    <button className='green-button' onClick={ () => sendMsg('Can you repeat?', false) }>Can you repeat?</button>
                </div>
                <hr />

                <p>Write your custom answer:</p>
                <form id='customAnswer' onSubmit={ (e) => { e.preventDefault(); sendMsg('', false) }}>
                    <textarea className='custom-answer-box' rows={ 4 } cols={ 38 } ref={ wizardText }></textarea>
                </form>
                <div className='centered-box'>
                    <button className='green-button' type="submit" form='customAnswer'>Invia</button>
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