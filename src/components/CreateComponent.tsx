/* Imports
------------------------------------------------------------ */
import '../styles/style';
import * as React from 'react';
import { useRef } from 'react';


/* CreateComponent 
------------------------------------------------------------ */
export const CreateComponent = (props) => {

    const wizardText = useRef<HTMLTextAreaElement>(null);   // Text inserted by the wizard


    /* Function to send the creation message
    -------------------------------------------------------- */
    function sendCreation(premadeAnswer: string): void {
        if (premadeAnswer.length != 0) {
            parent.postMessage({
                pluginMessage: {
                    type: 'createAnswer',
                    characters: premadeAnswer
                }
            }, '*');
        } else {
            parent.postMessage({
                pluginMessage: {
                    type: 'createAnswer',
                    characters: wizardText.current.value
                }
            }, '*');
        }
    }


    /* Function to send the next question message
    -------------------------------------------------------- */
    function sendNextQuestion(): void {
        parent.postMessage({
            pluginMessage: {
                type: 'nextQuestion'
            }
        }, '*');
    }


    /* JSX
    -------------------------------------------------------- */
    return (
        <div>
            <p>Pre-made Answers:</p>
            <div className='premade-answers-box'>
                <button className='green-button' onClick={ () => sendCreation("I don't know") }>I don't know</button>
                <button className='green-button' onClick={ () => sendCreation('Can you repeat?') }>Can you repeat?</button>
                <button className='green-button' onClick={ () => sendCreation('Thinking...') }>Thinking...</button>
            </div>

            <hr />

            <p>Write your custom Answer:</p>
            <form onSubmit={ (e) => { e.preventDefault(); sendCreation('') }}>
                <textarea className='custom-answer-box' rows={ 4 } cols={ 43 } ref={ wizardText }></textarea>
                <div className='centered-box'>
                    <button className='spaced-green-button' type="submit">Invia</button>
                </div>
            </form>

            <hr />

            <div className='centered-box'>
                <p>Go to the next question:</p>
                <button className='green-button' onClick={ () => sendNextQuestion() }>Next question</button>
            </div>
        </div>
    )

}