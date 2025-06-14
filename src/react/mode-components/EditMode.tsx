/* Imports
------------------------------------------------------------ */
import '../style';
import * as React from 'react';
import { useRef, useState } from 'react';


/* EditComponent 
------------------------------------------------------------ */
export const EditMode = (props) => {


    // Data
    const wizardText = useRef<HTMLTextAreaElement>(null);                // Text inserted by the wizard
    const [targetAnswer, setTargetAnswer] = useState(props.answers[0]);   // Answer selected by the wizard


    // Function to send the edit answer msg
    function sendMessage(premadeAnswer: string): void {
        if (premadeAnswer.length != 0) {
            parent.postMessage({
                pluginMessage: {
                    type: 'editAnswer',
                    target: targetAnswer,
                    payload: premadeAnswer
                }
            }, '*');
        } else {
            parent.postMessage({
                pluginMessage: {
                    type: 'editAnswer',
                    target: targetAnswer,
                    payload: wizardText.current.value
                }
            }, '*');
        }
    }


    // JSX
    return (
        <div>
            <p>Select the message:</p>

                { props.answers.length === 0 &&  (
                    <div className='centered-box'>
                        <p style={{ textAlign: 'center' }}>There are no selectable messages</p>
                    </div>
                )}

                { props.answers.length != 0 && (
                    <div className='centered-box'>
                        <select className='select' onChange={ (e) => setTargetAnswer(e.target.value) }>
                            { props.answers.map(node => {
                                return <option key={ node } value={ node }>{ node }</option>
                            }) }
                        </select>

                        <p>Pre-made answers:</p>
                        <div className='premade-answers-box'>
                            <button className='green-button' onClick={ () => sendMessage("I don't know") }>I don't know</button>
                            <button className='green-button' onClick={ () => sendMessage('Can you repeat?') }>Can you repeat?</button>
                            <button className='green-button' onClick={ () => sendMessage('Thinking...') }>Thinking...</button>
                        </div>
                        <hr />

                        <p>Write your custom answer:</p>
                        <form onSubmit={ (e) => { e.preventDefault(); sendMessage('') }}>
                            <textarea className='custom-answer-box' rows={ 4 } cols={ 43 } ref={ wizardText }></textarea>
                            <div className='centered-box'>
                                <button className='spaced-green-button' type="submit">Invia</button>
                            </div>
                        </form>
                    </div>
                ) }
        </div>
    )

}