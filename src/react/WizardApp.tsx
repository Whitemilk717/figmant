/* Imports
------------------------------------------------------------ */
import './style';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { ChatFunctionality } from './functionalities/chat/ChatFunctionality';
import { VariantsFunctionality } from './functionalities/variants/VariantsFunctionality';
import { NavigationFunctionality } from './functionalities/navigation/NavigationFunctionality';


/* WizardApp React component 
------------------------------------------------------------ */
export const WizardApp = () => {


    // Data
    const [nodes, setNodes] = useState([]);                     // Selectable nodes present in the chatbox
    const [frames, setFrames] = useState([]);                   // Selectable frames
    const [logsOn, setLogsOn] = useState('');                   // Confirmed radio option
    const [answers, setAnswers] = useState([]);                 // Selectable answers present in the chatbox
    const [compSets, setcompSets] = useState([]);               // Selectable component sets
    const [variants, setVariants] = useState([]);               // Selectable created variants
    const [selectedOpt, setSelectedOpt] = useState('');         // Selected radio option
    const [premadeAnswers, setPremadeAnswers] = useState([]);   // Pre-made answers created by the wizard for the chat functionality
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
        else if (msgType === 'componentSets') {
            setcompSets(msg.data.pluginMessage.compSets);
        }

        // Saving available frames received by code.ts
        else if (msgType === 'frames') {
            setFrames(msg.data.pluginMessage.frames);
        }

        // Saving available created variants received by code.ts
        else if (msgType === 'createdVariants') {
            setVariants(msg.data.pluginMessage.variants);
        }

    }


    // Function that sends the wizard's choice about the log file when it is selected
    useEffect(() => {
        if (logsOn != '') {
            parent.postMessage({
                pluginMessage: {
                    type: 'logsOn',
                    logsOn: logsOn
                }
            }, '*');
        }
    }, [logsOn]);


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
            <fieldset>
                <legend><b>Personal notes</b></legend>

                <p>Here are your personal notes:</p>
                <textarea className='notes-box' rows={ 4 } cols={ 38 }></textarea>

            </fieldset>
            <br /><br />

            { logsOn === '' && (
                <div>

                    <fieldset>
                        <legend><b>Log files</b></legend>

                        <p>Select an option to continue:</p>
                        <div className='centered-box'>
                            <div className='inline-box'>
                                <input type="radio" id="ON" name="logsOn" value="ON" onChange={ (e) => setSelectedOpt(e.target.value) } />
                                <label htmlFor="ON">Send logs to local server. Require local server startup</label>
                            </div>
                            <br />
                            <div className='inline-box'>
                                <input type="radio" id="OFF" name="logsOn" value="OFF" onChange={ (e) => setSelectedOpt(e.target.value) }/>
                                <label htmlFor="OFF">Don't send logs to local server. Doesn't require local server startup</label>
                            </div>
                        </div>
                        <br />

                        <div className='centered-box'>
                            <button className='green-button' onClick={ () => setLogsOn(selectedOpt) }>Confirm</button>
                        </div>
                    </fieldset>

                    <br /><br />
                </div>
            )}

            { logsOn != '' && (
                <div>
                    <fieldset>
                        <legend><b>Functionality</b></legend>

                        <p>Choose a functionality:</p>
                        <div className='centered-box'>
                            <select className='single-select' onChange={ (e) => setFunctionality(e.target.value) }>
                                <option value='chat'>Chat manipulation</option>
                                <option value='variants'>Variants manipulation</option>
                                {/* <option value='navigation'>Frame navigation</option> */}
                            </select>
                        </div>
                    </fieldset>
                    <br /><br />

                    { functionality === 'chat' && (
                        <ChatFunctionality answers={ answers } nodes={ nodes } premadeAnswers={ premadeAnswers } setPremadeAnswers={ setPremadeAnswers }/>
                    )}

                    { functionality === 'variants' && (
                        <VariantsFunctionality compSets={ compSets } frames={ frames } variants={ variants } />
                    )}

                    {/* { functionality === 'navigation' && (
                        <NavigationFunctionality frames={ frames } />
                    )} */}
                
                    <br /><br />
                </div>
            )}

            <fieldset>
                <legend><b>End WoZ simulation</b></legend>

                <p>Click the button below to end the simulation</p>
                <div className='centered-box'>
                    <button className='red-button' onClick={ () => closePlugin() }>End simulation</button>
                </div>
            </fieldset>
        </div>
    );
};