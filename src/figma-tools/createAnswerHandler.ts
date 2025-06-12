/* Imports
------------------------------------------------------------ */
import { sortBox } from './sortBox';
import { searchBox } from './searchBox';


/* Function to handle change text messages from the wizard
------------------------------------------------------------ */
export function createAnswerHandler(message): void {
    const answersFrames: SceneNode[] = figma.currentPage.findAll(searchBox.searchChatBoxFrames)
                                                        .sort(sortBox.sortChatBoxFrames);

    if (answersFrames[answersFrames.length-1].name.includes('question')) {
        console.log('Ultimo messaggio da parte di user');
        // devo creare un nuovo frame
    } else {
        console.log('Ultimo messaggio da parte di wizard');
        // creo un nuovo gruppo
    }
}