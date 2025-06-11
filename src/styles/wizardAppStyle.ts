/* CSS style objects
------------------------------------------------------------ */
const centeredBox = {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center'
};

const premadeAnswersBox = { 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-around'
}

const textArea = {
    borderRadius: 10,
    backgroundColor: '#DBF7E8'
}

const select = {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EEEBEB'
}

const button = {
    height: 40,
    border: 'none',
    borderRadius: 10,
    backgroundColor: '#EEEBEB'
}

const sendCustomAnswerButton = {
    height: 40,
    marginTop: 5,
    border: 'none',
    borderRadius: 10,
    backgroundColor: '#EEEBEB'
}


export { centeredBox, premadeAnswersBox, textArea, select, button, sendCustomAnswerButton };