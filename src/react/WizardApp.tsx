/* Imports
------------------------------------------------------------ */
import './style';
import * as React from 'react';
import { useState } from 'react';
import { ChatFunctionality } from './functionalities/chat/ChatFunctionality';
import { VariantsFunctionality } from './functionalities/variants/VariantsFunctionality';


/* WizardApp React component 
------------------------------------------------------------ */
export const WizardApp = () => {


    // Data
    const [nodes, setNodes] = useState([]);                     // Selectable nodes present in the chatbox
    const [frames, setFrames] = useState([]);                   // Selectable frames
    const [answers, setAnswers] = useState([]);                 // Selectable answers present in the chatbox
    const [compSets, setcompSets] = useState([]);               // Selectable component sets
    const [functionality, setFunctionality] = useState('chat'); // Plugin functionality chosen by the wizard


    // onmessage handlers
    onmessage = (msg) => {
        const msgType = msg.data.pluginMessage.type;

        // Saving available selectable nodes and answers received by code.ts
        if (msgType === 'chat') {
            setNodes(msg.data.pluginMessage.nodes);
            setAnswers(msg.data.pluginMessage.answers);
        }

        // Saving available component sets received by code.ts
        else if (msgType === 'variants') {
            setcompSets(msg.data.pluginMessage.compSets);
        }

        // Saving available frames received by code.ts
        else if (msgType === 'frames') {
            setFrames(msg.data.pluginMessage.frames);
        }

    }


    // Function that sends the last message
    function closePlugin(): void {
        parent.postMessage({
            pluginMessage: {
                type: 'closePlugin',
            }
        }, '*');
    }


    // JSX 
    return (
        <div>
            <p>Here are your personal notes:</p>
            <textarea className='notes-box' rows={ 4 } cols={ 43 }></textarea>
            <hr />


            <p>Select a functionality</p>
            <div className='centered-box'>
                <select className='single-select' onChange={ (e) => setFunctionality(e.target.value) }>
                    <option value='chat'>Chat manipulation</option>
                    <option value='variants'>Variants manipulation</option>
                </select>
            </div>
            <hr />


            { functionality === 'chat' && (
                <ChatFunctionality answers={ answers } nodes={ nodes } />
            )}


            { functionality === 'variants' && (
                <VariantsFunctionality compSets={ compSets } frames={ frames }/>
            )}


            <p>End WoZ simulation:</p>
            <div className='centered-box'>
                <button className='red-button' onClick={ () => closePlugin() }>End simulation</button>
            </div>
        </div>
    );
};