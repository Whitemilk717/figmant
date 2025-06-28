/* Imports
------------------------------------------------------------ */
import { sendBox } from '../boxes/sendBox';
import { searchBox } from '../boxes/searchBox';


/* keyCodes map
------------------------------------------------------------ */
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
    8: '',      // Backspace
    13: "?",    // Enter is translated into a question mark
    32: ' ',    // Blank space
};



/* Function to create a question node
------------------------------------------------------------ */
export async function createQuestion(msg) {


    // Data
    const iconComp = figma.currentPage.findOne(searchBox.nodeNamed('User-icon')) as ComponentNode;
    const questionComp = figma.currentPage.findOne(searchBox.nodeNamed('User-question')) as ComponentNode;
    const chatBox = figma.currentPage.findOne(searchBox.nodeNamed('Chat-box')) as FrameNode;
    let nextNumber;


    // If it's the first message, add the icon
    if (msg.iconFlag) {
        const newIcon = iconComp.createInstance();
        nextNumber = String(searchBox.nextCompNum(chatBox, 'User-icon'));
        newIcon.name = newIcon.name.concat('-', nextNumber);
        chatBox.appendChild(newIcon);

        newIcon.children[0].name = newIcon.name + ' / Image';
    }


    // Add the new question instance
    const newQuestion = questionComp.createInstance();
    nextNumber = String(searchBox.nextCompNum(chatBox, 'User-question'));
    newQuestion.name = newQuestion.name.concat('-', nextNumber);

    newQuestion.children[0].name = newQuestion.name + ' / Text';


    // Creation of the new text variable
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const figmantCollection = collections.find(collection => collection.name === 'Figmant collection');
    const modeId = figmantCollection.defaultModeId;
    nextNumber = await searchBox.nextVarNum();
    const newVar = figma.variables.createVariable(
        'Text-var-' + nextNumber,
        figmantCollection,
        'STRING'
    );
    newVar.setValueForMode(modeId, 'Type here...');
    ((newQuestion.children[0] as FrameNode)
        .children[0] as TextNode)
        .setBoundVariable("characters", newVar);


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
                        type: 'SET_VARIABLE',       // Empty the variable
                        variableId: newVar.id,
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
                                                    id: newVar.id
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
                                        variableId: newVar.id,
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
                                        variableId: newVar.id,
                                        variableValue: {
                                            type: 'EXPRESSION',
                                            resolvedType: 'STRING',
                                            value: {
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
                                                                        id: newVar.id
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
                                                ],
                                                expressionFunction: 'ADDITION'
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
    await newQuestion.setReactionsAsync(allReactions);
    chatBox.appendChild(newQuestion);


    // Send to WizardApp every selectable chatbox node and answer node 
    sendBox.chatBoxNodes();
}