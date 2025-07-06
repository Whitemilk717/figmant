/* Imports
------------------------------------------------------------ */
import '../../../style.css';
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';


/* EditComponent 
------------------------------------------------------------ */
export const EditMode = (props) => {


    // Data
    const wizardText = useRef<HTMLTextAreaElement>(null);   // Text inserted by the wizard
    const [targetAnswer, setTargetAnswer] = useState('');   // Answer selected by the wizard


    // Function to send the edit answer msg
    function sendMsg(premadeAnswer: string): void {
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


    // Whenever the selectable answers change, if possible and if nothing has been selected yet, the first one is selected.
    useEffect(() => {
        if (props.answers.length != 0 && targetAnswer.length == 0) {
            setTargetAnswer(props.answers[0].name);
        }
    }, [props.answers]);
    

    // JSX
    return (
        <div>

            <fieldset>
                <legend><b>Answer selection</b></legend>

                <p>Select an answer to edit:</p>
                { props.answers.length === 0 && (
                    <div className='centered-box'>
                        <p style={{ textAlign: 'center' }}>There are no selectable answers</p>
                    </div>
                )}

                { props.answers.length != 0 && (
                    <div className='centered-box'>
                        <select className='single-select' onChange={ (e) => setTargetAnswer(e.target.value) }>
                            { props.answers.map(node => {
                                return <option key={ node.name } value={ node.name }>
                                    {(node.fullText
                                        ? node.name + ' (' + node.preview + ')'
                                        : node.name + ' (' + node.preview + '...)'
                                    )}
                                </option>
                            }) }
                        </select>
                    </div>
                )}
            </fieldset>

            { props.answers.length != 0 && (
                <div>
                    <br /><br />
                    <fieldset>
                        <legend><b>New answer content</b></legend>

                            { props.answers.length != 0 && (
                                <div>
                                    <p>Pre-made answers:</p>
                                    <div className='premade-answers-box'>
                                        <button className='green-button' onClick={ () => sendMsg('Thinking...') }>Thinking...</button>
                                        <button className='green-button' onClick={ () => sendMsg("I don't know") }>I don't know</button>
                                        <button className='green-button' onClick={ () => sendMsg('Can you repeat?') }>Can you repeat?</button>
                                    </div>
                                    <hr />

                                    <p>Write your custom answer:</p>
                                    <form id='customAnswer' onSubmit={ (e) => { e.preventDefault(); sendMsg('') }}>
                                        <textarea className='custom-answer-box' rows={ 4 } cols={ 38 } ref={ wizardText }></textarea>
                                    </form>
                                    <div className='centered-box'>
                                        <button className='green-button' type="submit" form='customAnswer'>Invia</button>
                                    </div>
                                </div>
                            )}
                    </fieldset>
                </div>
            )}
        </div>
    )
}