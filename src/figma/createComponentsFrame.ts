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


    // Creation of the user question component
    const userQuestionComp = figma.createComponent();
    setMsg(userQuestionComp, 'user-question', '#D9D9D9', defaultFontName, 'Question');
    frame.appendChild(userQuestionComp);


    // Creation of the bot icon component
    const botIconComp = figma.createComponent();
    await setIcon(botIconComp, 'bot-icon', '#9EFFCA');
    frame.appendChild(botIconComp);
    

    // Creation of the bot answer component
    const botAnswerComp = figma.createComponent();
    setMsg(botAnswerComp, 'bot-answer', '#9EFFCA', defaultFontName, 'Answer')
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
        ? 'https://img.icons8.com/ios/100/user--v1.png'
        : 'https://img.icons8.com/ios/100/robot-2--v1.png'
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


/* Function to set the ansewr/question component frame
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
    msg.primaryAxisSizingMode = 'FIXED';
    msg.counterAxisAlignItems = 'CENTER';
    msg.primaryAxisAlignItems = 'CENTER';

    text.name = name + '-text';
    text.fontName = fontName;
    text.fontSize = 19;
    text.characters = characters;
    msg.appendChild(text);
}