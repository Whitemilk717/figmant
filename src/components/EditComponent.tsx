/* Imports
------------------------------------------------------------ */
import '../styles/style';
import * as React from 'react';


/* WizardApp React component 
------------------------------------------------------------ */
export const EditComponent = (props) => {


    /* Function to change a text component
    -------------------------------------------------------- */
    function changeText(premadeAnswer: string): void {
        if (premadeAnswer.length != 0) {
            parent.postMessage({
                pluginMessage: {
                    type: 'changeText',
                    textNodeName: props.selectedComponent,
                    newCharacters: premadeAnswer
                }
            }, '*');
        } else {
            parent.postMessage({
                pluginMessage: {
                    type: 'changeText',
                    textNodeName: props.selectedComponent,
                    newCharacters: props.wizardText.current.value
                }
            }, '*');
        }
    }


    /* JSX
    -------------------------------------------------------- */
    return (
        <div>
            <p>Edit a component:</p>
            <div className='centered-box'>
                <select className='select' onChange={ (e) => props.setSelectedComponent(e.target.value) }>
                    { props.textNodes.map(node => {
                        return <option key={ node } value={ node }>{ node }</option>
                    }) }
                </select>
            </div>

            <hr />

            <p>Pre-made answers:</p>
            <div className='premade-answers-box'>
                <button className='premade-answer-button' onClick={ () => changeText('Pasta') }>Pasta</button>
                <button className='premade-answer-button' onClick={ () => changeText('Salad') }>Salad</button>
                <button className='premade-answer-button' onClick={ () => changeText('Thinking...') }>Thinking...</button>
            </div>

            <hr />

            <p>Write your custom answer:</p>
            <form onSubmit={ (e) => { e.preventDefault(); changeText('') }}>
                <textarea className='custom-answer-box' rows={ 4 } cols={ 43 } ref={ props.wizardText }></textarea>
                <div className='centered-box'>
                    <button className='send-custom-answer-button' type="submit">Invia</button>
                </div>
            </form>
        </div>
    )

}