/* Imports
------------------------------------------------------------ */
import '../../../style.css';
import * as React from 'react';
import { useEffect, useState } from 'react';


/* CreateMode
------------------------------------------------------------ */
export const CreateMode = (props) => {


    // Data
    const [targetSet, setTargetSet] = useState('');                     // Component set selected by the wizard
    const [targetProps, setTargetProps] = useState([]);                 // Selected properties values of the targetSet
    const [targetFrame, setTargetFrame] = useState(props.frames[0]);    // Selected frame where the variant will be inserted
    // let oldTargetSet;
    

    // Function to send the creation message
    function sendMsg(): void {
        parent.postMessage({
            pluginMessage: {
                type: 'createVariant',
                set: targetSet,
                props: targetProps,
                frame: targetFrame
            }
        }, '*');
    }


    // Whenever the selectable component sets change, if possible, the first one is selected (default value)
    useEffect(() => {
        if (props.compSets.length != 0) {
            setTargetSet(props.compSets[0].name);
        }
    }, [props.compSets]);


    // Whenever the component set is selected, targetProps are setted by default
    useEffect(() => {
        if (targetSet.length == 0) return;

        let newTargetProps = [];
        props.compSets
            .find(set => set.name === targetSet)
            .properties.forEach(p => {
                newTargetProps = [...newTargetProps, { name: p.name, value: p.values[0] }];
            });
        
        setTargetProps(newTargetProps);
    }, [targetSet]);


    // JSX
    return (
        <div>
            <p>Select the frame where you want to create your new variant:</p>
            { props.frames.length === 0 && (
                <p style={{ textAlign: 'center' }}>There are no selectable frames</p>
            )}

            { props.frames.length != 0 && (
                <div className='centered-box'>
                    <select className='single-select' onChange={ (e) => setTargetFrame(e.target.value) }>
                        { props.frames.map(frame => {
                            return <option key={ frame } value={ frame }>
                                { frame }
                            </option>
                        }) }
                    </select>
                </div>
            )}
            <hr />


            <p>Select the component set:</p>
            { props.compSets.length === 0 && (
                <div className='centered-box'>
                    <p style={{ textAlign: 'center' }}>There are no selectable components sets</p>
                </div>
            )}


            { props.compSets.length != 0 && (
                <div>
                    <div className='centered-box'>
                        <select 
                            className='single-select' onChange={ (e) => setTargetSet(e.target.value) }>
                            { props.compSets.map(set => {
                                return <option key={ set.name } value={ set.name }>
                                    { set.name }
                                </option>
                            }) }
                        </select>
                    </div>
                    <hr />


                    <p>Select the variant property values:</p>
                    <div>
                        {
                            props.compSets
                                .find(set => set.name === targetSet)
                                ?.properties.map(property => {
                                    return <div key={ property.name } className='inline-box'>
                                        <p>{ property.name }</p>

                                        <select 
                                            className='single-select'
                                            value={ targetProps.find(p => p.name === property.name)?.value }
                                            onChange={ (e) => {
                                                setTargetProps(old => {
                                                    const help = JSON.parse(JSON.stringify(old));                       // Deep copy
                                                    help.find(p => p.name === property.name).value = e.target.value;
                                                    return help;
                                                });
                                            }}
                                        >
                                            { property.values.map(value => (
                                                <option key={ value } value={ value }>
                                                    { value }
                                                </option>
                                            ))
                                            }
                                        </select>
                                    </div>
                                })

                        }
                    </div>
                    <hr />


                    <div className='centered-box'>
                        <p>Create the variant:</p>
                        <button className='green-button' onClick={ () => sendMsg() }>Create</button>
                    </div>
                </div>
            )} 
        </div>
    )
}