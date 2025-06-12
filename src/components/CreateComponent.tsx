/* Imports
------------------------------------------------------------ */
import '../styles/style';
import * as React from 'react';


/* CreateComponent 
------------------------------------------------------------ */
export const CreateComponent = (props) => {


    /* Function to create a text component
    -------------------------------------------------------- */
    function createComponent(premadeAnswer: string): void {
        if (premadeAnswer.length != 0) {
            parent.postMessage({
                pluginMessage: {
                    type: 'createAnswer',
                    characters: premadeAnswer
                }
            }, '*');
        } else {
            // ...
        }
    }


    /* JSX
    -------------------------------------------------------- */
    return (
        <div>
            <p>Pre-made Answers:</p>
            <div className='premade-answers-box'>
                <button className='premade-answer-button' onClick={ () => createComponent("I don't know") }>I don't know</button>
                <button className='premade-answer-button' onClick={ () => createComponent('Can you repeat?') }>Can you repeat?</button>
                <button className='premade-answer-button' onClick={ () => createComponent('Thinking...') }>Thinking...</button>
            </div>

            <hr />

            <p>Write your custom Answer:</p>
            <form onSubmit={ (e) => { e.preventDefault(); console.log('todo') }}>
                <textarea className='custom-answer-box' rows={ 4 } cols={ 43 } ref={ props.wizardText }></textarea>
                <div className='centered-box'>
                    <button className='send-custom-answer-button' type="submit">Invia</button>
                </div>
            </form>
        </div>
    )

}