/* Imports
------------------------------------------------------------ */
import '../style';
import * as React from 'react';
import { useRef } from 'react';


/* CreateAnswer
------------------------------------------------------------ */
export const CreateMode = () => {


    // Data
    const wizardText = useRef<HTMLTextAreaElement>(null);   // Text inserted by the wizard


    // Function to send the creation message (both answer and question)
    function sendMsg(premadeAnswer: string, questionFlag: boolean): void {
        if (questionFlag) {
            parent.postMessage({
                pluginMessage: {
                    type: 'createQuestion'
                }
            }, '*');
        } 
        else if (premadeAnswer.length != 0) {
            parent.postMessage({
                pluginMessage: {
                    type: 'createAnswer',
                    payload: premadeAnswer
                }
            }, '*');
        } else {
            parent.postMessage({
                pluginMessage: {
                    type: 'createAnswer',
                    payload: wizardText.current.value
                }
            }, '*');
        }
    }


    // JSX
    return (
        <div>
            <p>Pre-made Answers:</p>
            <div className='premade-answers-box'>
                <button className='green-button' onClick={ () => sendMsg('Thinking...', false) }>Thinking...</button>
                <button className='green-button' onClick={ () => sendMsg("I don't know", false) }>I don't know</button>
                <button className='green-button' onClick={ () => sendMsg('Can you repeat?', false) }>Can you repeat?</button>
            </div>
            <hr />

            <p>Write your custom Answer:</p>
            <form onSubmit={ (e) => { e.preventDefault(); sendMsg('', false) }}>
                <textarea className='custom-answer-box' rows={ 4 } cols={ 43 } ref={ wizardText }></textarea>
                <div className='centered-box'>
                    <button className='spaced-green-button' type="submit">Invia</button>
                </div>
            </form>
            <hr />

            <div className='centered-box'>
                <p>Go to the next question:</p>
                <button className='green-button' onClick={ () => sendMsg('', true) }>Next question</button>
            </div>
        </div>
    )
}