/* Function to create the components frame
------------------------------------------------------------ */
export async function createComponentsFrame() {

    
    // Creation and configuration of the base frame
    let frame = figma.currentPage.findOne(node => node.name === 'Components-frame');
    if (frame) {
        figma.notify("'Components-frame' already exists");
        return;
    } 
    frame = figma.createFrame();
    setFrame(frame);
    

    // Loading of the default font name
    const defaultFontName = { family: 'Inter', style: 'Italic' };
    await figma.loadFontAsync(defaultFontName);


    // Creation and configuration of the user icon component
    const userIconComp = figma.createComponent();
    await setIcon(userIconComp, 'user-icon', '#D9D9D9');
    frame.appendChild(userIconComp);


    // Creation and configuration of the user question component
    const userQuestionComp = figma.createComponent();
    setMsg(userQuestionComp, 'user-question', '#D9D9D9', defaultFontName, 'Question');
    frame.appendChild(userQuestionComp);


    // Creation and configuration of the bot icon component
    const botIconComp = figma.createComponent();
    await setIcon(botIconComp, 'bot-icon', '#9EFFCA');
    frame.appendChild(botIconComp);
    

    // Creation and configuration of the bot answer component
    const botAnswerComp = figma.createComponent();
    setMsg(botAnswerComp, 'bot-answer', '#9EFFCA', defaultFontName, 'Answer')
    frame.appendChild(botAnswerComp);


    // Creation and configuration of the input field component
    const inputFieldComp = figma.createComponent();
    setMsg(inputFieldComp, 'input-field', '#D9D9D9', defaultFontName, '');
    await setVar(inputFieldComp);
    frame.appendChild(inputFieldComp);
}





/* Function to set the component frame
------------------------------------------------------------ */
function setFrame(frame: FrameNode) {
    frame.name = 'Components-frame';

    frame.x = 0;
    frame.y = 0;
    frame.itemSpacing = 10;
    
    frame.paddingTop = 10;
    frame.paddingLeft = 10;
    frame.paddingRight = 10;
    frame.paddingBottom = 10;
    
    frame.layoutMode = 'VERTICAL';
    frame.layoutSizingVertical = 'HUG';
    frame.layoutSizingHorizontal = 'HUG';
    frame.counterAxisAlignItems = 'CENTER';
    frame.primaryAxisAlignItems = 'CENTER';
}


/* Function to set the icon component frame
------------------------------------------------------------ */
async function setIcon(icon, name, color) {
    icon.name = name;
    icon.resize(40, 40);
    icon.cornerRadius = 50;
    icon.lockAspectRatio();
    icon.fills = [figma.util.solidPaint(color)];

    icon.layoutMode = 'VERTICAL';
    icon.primaryAxisSizingMode = 'FIXED';
    icon.counterAxisSizingMode = 'FIXED';
    icon.counterAxisAlignItems = 'CENTER';
    icon.primaryAxisAlignItems = 'CENTER';

    // Get an image from a URL.
    await figma.createImageAsync(
        name.includes('user')
        ? 'https://img.icons8.com/ios/100/user--v1.png'     // icons by icons8.com
        : 'https://img.icons8.com/ios/100/robot-2--v1.png'  // icons by icons8.com
    ).then(async (image: Image) => {

        // Create the image node
        const node = figma.createRectangle();
        node.resize(icon.width - 10, icon.height - 10);
        node.name = name + '-image';
        node.fills = [{
            type: 'IMAGE',
            imageHash: image.hash,
            scaleMode: 'FIT'
        }];
        node.constraints = {
            horizontal: 'STRETCH',
            vertical: 'STRETCH'
        };
        icon.appendChild(node);
    });
}


/* Function to set the ansewr, question and input field component frame
------------------------------------------------------------ */
function setMsg(msg, name, color, fontName, characters) {
    const text = figma.createText();

    msg.name = name;
    msg.resize(380, 45);
    msg.cornerRadius = 10;
    msg.fills = [figma.util.solidPaint(color)];

    msg.paddingTop = 10;
    msg.paddingLeft = 10;
    msg.paddingRight = 10;
    msg.paddingBottom = 10;

    msg.layoutMode = 'VERTICAL';
    msg.primaryAxisSizingMode = 'AUTO';
    msg.counterAxisSizingMode = 'FIXED';
    msg.primaryAxisAlignItems = 'CENTER';
    msg.counterAxisAlignItems = 'CENTER';

    text.fontName = fontName;
    text.name = name + '-text';
    text.fontSize = 19;
    text.resize(360, 25);
    text.characters = characters;
    text.layoutAlign = 'STRETCH';                                   // Setting "STRETCH" will make the node "stretch" to fill the width of the parent vertical auto-layout frame
    text.textAutoResize = 'HEIGHT';                                 // The width of the textbox is fixed. Characters wrap to fit in the textbox. The height of the textbox automatically adjusts to fit its content
    if (name === 'input-field') text.textAlignHorizontal = 'LEFT';
    else text.textAlignHorizontal = 'CENTER';
    msg.appendChild(text);
}


/* Function to set the input variable
------------------------------------------------------------ */
async function setVar(comp) {

    // collection creation
    const collection = figma.variables.createVariableCollection('figmant collection');
    const modeId = collection.modes[0].modeId;

    // variable creation, configuration and bound with the text component
    const variable = figma.variables.createVariable(
        'text-var',
        collection,
        'STRING'
    );
    variable.setValueForMode(modeId, 'Type here...');
    comp.children[0].setBoundVariable('characters', variable);

    // keyCodes map
    const keyCodes = {

        // Letters
        65: 'a',
        66: 'b',
        67: 'c',
        68: 'd',
        69: 'e',
        70: 'f',
        71: 'g',
        72: 'h',
        73: 'i',
        74: 'j',
        75: 'k',
        76: 'l',
        77: 'm',
        78: 'n',
        79: 'o',
        80: 'p',
        81: 'q',
        82: 'r',
        83: 's',
        84: 't',
        85: 'u',
        86: 'v',
        87: 'w',
        88: 'x',
        89: 'y',
        90: 'z',

        // Numbers (not from the numpad)
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',

        // Numbers (from the numpad)
        96: '0',
        97: '1',
        98: '2',
        99: '3',
        100: '4',
        101: '5',
        102: '6',
        103: '7',
        104: '8',
        105: '9',

        // Symbols (not from the numpad)
        187: '+',
        188: ',',
        189: '-',
        190: '.',
        219: "'",
        226: '<',

        // Symbols (from the numpad)
        106: '*',
        107: '+',
        109: '-',
        110: '.',
        111: '/',

        // Accented letters
        186: 'é',
        191: 'ù',
        192: 'ò',
        221: 'ì',
        222: 'à',

        // Special keys
        8: '',    // backspace
        13: "\n",   // Enter
        32: ' ',   // blank space
    };

    // Reactions registration
    const allReactions = [];
    for (const keyCode in keyCodes) {

        let reaction;
        
        // If the key is the backspace, the characters need to be removed
        if (Number(keyCode) == 8) {
            reaction = {
                trigger: { 
                    type: 'ON_KEY_DOWN',
                    device: 'KEYBOARD',
                    keyCodes: [Number(keyCode)]
                },
                actions: [
                    {
                        type: 'SET_VARIABLE',       // empty the variable
                        variableId: variable.id,
                        variableValue: {
                            type: 'STRING',
                            resolvedType: 'STRING',
                            value: ''
                        }
                    }
                ]
            };
        }

        // Otherwise, the character is added
        else {
            reaction = {
                trigger: { 
                    type: 'ON_KEY_DOWN',
                    device: 'KEYBOARD',
                    keyCodes: [Number(keyCode)]
                },
                actions: [
                    {
                        type: 'CONDITIONAL',
                        conditionalBlocks: [
                            {
                                condition: {                                // if
                                    type: 'EXPRESSION',
                                    resolvedType: 'BOOLEAN',
                                    value: {
                                        expressionArguments: [
                                            {
                                                type: 'VARIABLE_ALIAS',
                                                resolvedType: 'STRING',
                                                value: {
                                                    type: 'VARIABLE_ALIAS',
                                                    id: variable.id
                                                }
                                            },
                                            {
                                                type: 'STRING',
                                                resolvedType: 'STRING',
                                                value: 'Type here...'
                                            }
                                        ],
                                        expressionFunction: 'EQUALS'
                                    }
                                },
                                actions: [
                                    {
                                        type: 'SET_VARIABLE',               // then (reset with the new key)
                                        variableId: variable.id,
                                        variableValue: {
                                            type: 'STRING',
                                            resolvedType: 'STRING',
                                            value: keyCodes[keyCode]
                                        }
                                    }
                                ]
                            },
                            {
                                actions: [
                                    { 
                                        type: 'SET_VARIABLE',               // else (concat the current value with the new key)
                                        variableId: variable.id,
                                        variableValue: {
                                            type: 'EXPRESSION',
                                            resolvedType: 'STRING',
                                            value: {
                                                expressionFunction: 'ADDITION',
                                                expressionArguments: [
                                                    {
                                                        type: 'EXPRESSION',
                                                        resolvedType: 'STRING',
                                                        value: {
                                                            expressionFunction: 'VAR_MODE_LOOKUP',
                                                            expressionArguments: [
                                                                {
                                                                    type: 'VARIABLE_ALIAS',
                                                                    resolvedType: 'STRING',
                                                                    value: {
                                                                        type: 'VARIABLE_ALIAS',
                                                                        id: variable.id
                                                                    }
                                                                },
                                                                {
                                                                    type: 'STRING',
                                                                    resolvedType: 'STRING',
                                                                    value: modeId
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        type: 'STRING',
                                                        resolvedType: 'STRING',
                                                        value: keyCodes[keyCode]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        }

    allReactions.push(reaction);
    }

    await comp.setReactionsAsync(allReactions);
}