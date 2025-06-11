/* Imports
------------------------------------------------------------ */
import * as React from 'react';
// import { 
//     centeredBox, 
//     premadeAnswersBox,
//     textArea,
//     select,
//     button,
//     sendCustomAnswerButton
// } from '../styles/wizardAppStyle';


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
            {/* <div style={ centeredBox }>     */}
            <div>
                {/* <select style={ select } onChange={ (e) => props.setSelectedComponent(e.target.value) }> */}
                <select onChange={ (e) => props.setSelectedComponent(e.target.value) }>
                    { props.textNodes.map(node => {
                        return <option key={ node } value={ node }>{ node }</option>
                    }) }
                </select>
            </div>

            <hr />

            <p>Pre-made answers:</p>
            {/* <div style={ premadeAnswersBox }> */}
            <div>
                {/* <button style={ button } onClick={ () => changeText('Pasta') }>Pasta</button> */}
                <button onClick={ () => changeText('Pasta') }>Pasta</button>
                {/* <button style={ button } onClick={ () => changeText('Salad') }>Salad</button> */}
                <button onClick={ () => changeText('Salad') }>Salad</button>
                {/* <button style={ button } onClick={ () => changeText('Thinking...') }>Thinking...</button> */}
                <button onClick={ () => changeText('Thinking...') }>Thinking...</button>
            </div>

            <hr />

            <p>Write your custom answer:</p>
            <form onSubmit={ (e) => { e.preventDefault(); changeText('') }}>
                {/* <textarea style={ textArea } rows={ 4 } cols={ 42 } ref={ props.wizardText }></textarea> */}
                <textarea rows={ 4 } cols={ 42 } ref={ props.wizardText }></textarea>
                {/* <div style={ centeredBox }>  */}
                <div> 
                    {/* <button style={ sendCustomAnswerButton } type="submit">Invia</button> */}
                    <button type="submit">Invia</button>
                </div>
            </form>
        </div>
    )

}