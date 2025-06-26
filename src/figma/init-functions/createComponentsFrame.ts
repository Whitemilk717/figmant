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
    setComponentsFrame(frame);
    

    // Loading of the default font name
    const defaultFontName = { family: 'Inter', style: 'Italic' };
    await figma.loadFontAsync(defaultFontName);


    // Creation and configuration of the user icon component
    const userIconComp = figma.createComponent();
    await setIcon(userIconComp, 'User-icon', '#F4C788');
    frame.appendChild(userIconComp);


    // Creation and configuration of the user question component
    const userQuestionComp = figma.createComponent();
    setMsg(userQuestionComp, 'User-question', '#F4C788', defaultFontName, 'Question');
    figma.variables.createVariableCollection('Figmant collection');                     // Variables are created when they are needed
    frame.appendChild(userQuestionComp);


    // Creation and configuration of the bot icon component
    const botIconComp = figma.createComponent();
    await setIcon(botIconComp, 'Bot-icon', '#FFA9AB');
    frame.appendChild(botIconComp);
    

    // Creation and configuration of the bot answer component
    const botAnswerComp = figma.createComponent();
    setMsg(botAnswerComp, 'Bot-answer', '#FFA9AB', defaultFontName, 'Answer')
    frame.appendChild(botAnswerComp);
}



/* Function to set the component frame
------------------------------------------------------------ */
function setComponentsFrame(frame: FrameNode) {
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
    const image = await figma.createImageAsync(
        name.includes('user')
        ? 'https://img.icons8.com/?size=100&id=22396&format=png&color=000000'           // icons by icons8.com
        : 'https://img.icons8.com/?size=100&id=4DFnl05gNOVV&format=png&color=000000'    // icons by icons8.com
    );

    // Create the image node
    const node = figma.createRectangle();
    node.resize(icon.width - 10, icon.height - 10);
    node.name = name + ' / Image';
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
}


/* Function to set the answer and question component frame
------------------------------------------------------------ */
function setMsg(msg, name, color, fontName, characters) {
    

    msg.name = name;
    msg.resize(380, 80);
    msg.cornerRadius = 10;
    msg.fills = [figma.util.solidPaint(color)];

    msg.paddingTop = 10;
    msg.paddingLeft = 10;
    msg.paddingRight = 10;
    msg.paddingBottom = 10;

    msg.layoutMode = 'VERTICAL';
    msg.counterAxisSizingMode = 'FIXED';
    msg.primaryAxisAlignItems = 'CENTER';
    msg.counterAxisAlignItems = 'CENTER';

    const text = figma.createText();
    text.fontName = fontName;
    text.fontSize = 17;
    text.characters = characters;
    text.layoutAlign = 'STRETCH';           // Setting "STRETCH" will make the node "stretch" to fill the width of the parent vertical auto-layout frame
    text.textAutoResize = 'HEIGHT';         // The width of the textbox is fixed. Characters wrap to fit in the textbox. The height of the textbox automatically adjusts to fit its content
    text.textAlignHorizontal = 'CENTER';

    if (name === 'User-question') {             // For the questions, the text is scrollable thanks to an additional container frame
        msg.primaryAxisSizingMode = 'FIXED';

        const scrollableBox = figma.createFrame();
        scrollableBox.name = name + ' / Scrollable-box'
        scrollableBox.resize(360, 60);

        scrollableBox.layoutMode = 'VERTICAL';
        scrollableBox.primaryAxisSizingMode = 'FIXED';
        scrollableBox.counterAxisSizingMode = 'FIXED';
        scrollableBox.primaryAxisAlignItems = 'CENTER';
        scrollableBox.counterAxisAlignItems = 'CENTER';
        scrollableBox.fills = [figma.util.solidPaint(color)];
        scrollableBox.clipsContent = true;
        scrollableBox.overflowDirection = 'VERTICAL';
        
        msg.appendChild(scrollableBox);

        text.name = scrollableBox.name + ' / Text';
        scrollableBox.appendChild(text);
    }

    else {
        msg.primaryAxisSizingMode = 'AUTO';

        text.name = name + ' / Text';
        msg.appendChild(text);
    }
}