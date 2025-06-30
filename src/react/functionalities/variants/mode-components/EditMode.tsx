/* Imports
------------------------------------------------------------ */
import '../../../style.css';
import * as React from 'react';
import { useEffect, useState } from 'react';


/* EditMode
------------------------------------------------------------ */
export const EditMode = (props) => {


    // Data
    const [targetSet, setTargetSet] = useState('');         // Name of the selected variant set
    const [targetFrame, setTargetFrame] = useState('');     // Name of the frame where the variant is located
    const [targetProps, setTargetProps] = useState([]);     // Selected properties values of the targetVariant
    const [targetVariant, setTargetVariant] = useState(''); // Name of the selected variant

    // Function to send the creation message
    function sendMsg(): void {
        parent.postMessage({
            pluginMessage: {
                type: 'editVariant',
                set: targetSet,
                frame: targetFrame,
                variant: targetVariant,
                props: targetProps
            }
        }, '*');
    }


    // Whenever the selectable variants change, if possible and if nothing has been selected yet, the first one is selected (default value)
    useEffect(() => {
        if (props.variants.length != 0 && targetVariant.length == 0) {
            setTargetSet(props.variants[0].set);
            setTargetFrame(props.variants[0].frame);
            setTargetVariant(props.variants[0].variant);
        }
    }, [props.variants]);


    // Whenever a variant is selected, targetProps are setted by default
    useEffect(() => {
        if (targetVariant.length == 0) return;

        setTargetProps([]);
        props.variants
            .find(v => v.set === targetSet )
            .properties.forEach(p => {
                setTargetProps(oldProps => {
                    return [...oldProps, { name: p.name, value: p.values[0] }]
                });
            })
    }, [targetVariant]);


    // JSX
    return (
        <div>
            <p>Select the existing variant:</p>
            { props.variants.length === 0 && (
                <div className='centered-box'>
                    <p style={{ textAlign: 'center' }}>There are no selectable existing variants</p>
                </div>
            )}

            { props.variants.length != 0 && (
                <div>
                    <div className='centered-box'>
                        <select 
                            className='single-select' 
                            onChange={ (e) => {
                                const help = e.target.value.split(':::');
                                setTargetSet(help[0]);
                                setTargetFrame(help[1]);
                                setTargetVariant(help[2]);
                            }}
                        >
                            { props.variants.map(v => {
                                return <option key={ v.variant } value={ `${v.set}:::${v.frame}:::${v.variant}` }>
                                    { `[${v.set}]: ${v.frame} / ${v.variant}` }
                                </option>
                            })}
                        </select>
                    </div>
                    <hr />


                    <p>Select the new variant property values:</p>
                    {
                        props.variants
                            .find(v => v.set === targetSet)
                            ?.properties.map(property => {
                                return <div key={ property.name } className='inline-box'>
                                    <p>{ property.name }</p>

                                    <select 
                                        className='single-select'
                                        onChange={ (e) => {
                                            setTargetProps(old => {
                                                const help = old;
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
                    <hr />


                    <div className='centered-box'>
                        <p>Edit the variant:</p>
                        <button className='green-button' onClick={ () => sendMsg() }>Edit</button>
                    </div>
                </div>
            )}


        </div>
    )
}