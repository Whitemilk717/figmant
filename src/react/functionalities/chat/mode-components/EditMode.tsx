/* Imports
------------------------------------------------------------ */
import '../../../style.css';
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';


/* EditComponent 
------------------------------------------------------------ */
export const EditMode = (props) => {


    // Data
    let newButtonFlag = false;                              // Flag to create a new pre-made answer
    const wizardText = useRef<HTMLTextAreaElement>(null);   // Text inserted by the wizard
    const [targetAnswer, setTargetAnswer] = useState('');   // Answer selected by the wizard


    // Function to send the edit answer msg
    function sendMsg(premadeAnswer: string): void {

        if (premadeAnswer.length != 0) {            // If != 0, the wizard has chosen a pre-made answer
            parent.postMessage({
                pluginMessage: {
                    type: 'editAnswer',
                    target: targetAnswer,
                    payload: premadeAnswer
                }
            }, '*');
            return;
        }

        parent.postMessage({                        // Otherwise, the wizard has typed a custom answer
            pluginMessage: {
                type: 'editAnswer',
                target: targetAnswer,
                payload: wizardText.current.value
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

        sendMsg('');                                                                        // Otherwise, the wizard wants to edit a msg
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
                                        <button className='custom-answer-button' onClick={ () => sendMsg('Thinking...') }>Thinking...</button>          {/* Default pre-made answers */}     
                                        <button className='custom-answer-button' onClick={ () => sendMsg("I don't know") }>I don't know</button>
                                        <button className='custom-answer-button' onClick={ () => sendMsg('Can you repeat?') }>Can you repeat?</button>

                                        { props.premadeAnswers.map((text, i) => {                                                               {/* Custom pre-made answers */}
                                            return <button className='custom-answer-button' key={i} onClick={ () => sendMsg(text) }>{text}</button>
                                        }) }
                                    </div>
                                    <hr />

                                    <p>Write your custom answer:</p>
                                    <form id='customAnswer' onSubmit={ (e) => { e.preventDefault(); handleSubmit() }}>
                                        <textarea className='custom-answer-box' rows={ 4 } cols={ 38 } ref={ wizardText }></textarea>
                                    </form>
                                    <div className='centered-box'>
                                        <button className='green-button' type="submit" form='customAnswer'>Invia</button>
                                        <br />
                                        <button className='green-button' type="submit" onClick={ () => newButtonFlag=true } form='customAnswer'>Create a new pre-made answer button</button>
                                    </div>
                                </div>
                            )}
                    </fieldset>
                </div>
            )}
        </div>
    )
}