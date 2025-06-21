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
    await setIcon(userIconComp, 'user-icon', '#F4C788');
    frame.appendChild(userIconComp);


    // Creation and configuration of the user question component
    const userQuestionComp = figma.createComponent();
    setMsg(userQuestionComp, 'user-question', '#F4C788', defaultFontName, 'Question');
    figma.variables.createVariableCollection('figmant collection');                     // Variables are created when they are needed
    frame.appendChild(userQuestionComp);


    // Creation and configuration of the bot icon component
    const botIconComp = figma.createComponent();
    await setIcon(botIconComp, 'bot-icon', '#FFA9AB');
    frame.appendChild(botIconComp);
    

    // Creation and configuration of the bot answer component
    const botAnswerComp = figma.createComponent();
    setMsg(botAnswerComp, 'bot-answer', '#FFA9AB', defaultFontName, 'Answer')
    frame.appendChild(botAnswerComp);
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
        ? 'https://img.icons8.com/?size=100&id=22396&format=png&color=000000'           // icons by icons8.com
        : 'https://img.icons8.com/?size=100&id=4DFnl05gNOVV&format=png&color=000000'    // icons by icons8.com
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


/* Function to set the answer and question component frame
------------------------------------------------------------ */
function setMsg(msg, name, color, fontName, characters) {

    msg.name = name;
    msg.cornerRadius = 10;
    msg.fills = [figma.util.solidPaint(color)];

    msg.paddingTop = 20;
    msg.paddingLeft = 10;
    msg.paddingRight = 10;
    msg.paddingBottom = 20;

    msg.layoutMode = 'VERTICAL';
    if (name === 'user-question') {             // For the questions, the text inside is scrollable
        msg.resize(380, 60);
        msg.primaryAxisSizingMode = 'FIXED';   
        msg.clipsContent = true;
        msg.overflowDirection = 'VERTICAL';
    }
    else {
        msg.resize(380, 45);                    // For the answers, the height of the box adjusts dynamically
        msg.primaryAxisSizingMode = 'AUTO';
    }
    msg.counterAxisSizingMode = 'FIXED';
    msg.primaryAxisAlignItems = 'CENTER';
    msg.counterAxisAlignItems = 'CENTER';

    const text = figma.createText();
    text.fontName = fontName;
    text.name = name + '-text';
    text.fontSize = 19;
    text.resize(360, 25);
    text.characters = characters;
    text.layoutAlign = 'STRETCH';           // Setting "STRETCH" will make the node "stretch" to fill the width of the parent vertical auto-layout frame
    text.textAutoResize = 'HEIGHT';         // The width of the textbox is fixed. Characters wrap to fit in the textbox. The height of the textbox automatically adjusts to fit its content
    text.textAlignHorizontal = 'CENTER';
    msg.appendChild(text);
}