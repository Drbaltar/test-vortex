import React from 'react';
import TextField from './TextField';
import TextArea from './TextArea';
import SelectBox from './SelectBox';

class InputForm extends React.Component {
    state = {
        questionType: 'Multiple Choice',
        questionDescription: '',
        correctAnswer: ''
    }

    handleInputChange = (event) => {
        const {target: { id, value}} = event;
        this.setState({[id]: value}, () => console.log(this.state));        
    };

    render() {
        return(
            <form>
                <SelectBox label="Question Type" id="questionType"
                    options={['Multiple Choice', 'Fill-in-the-Blank', 'True or False']}
                    inputChange={(event) => this.handleInputChange(event)}/>
                <TextArea label="Question Description" id="questionDescription" type="text" rows="4"
                    value={this.state.questionDescription}
                    inputChange={(event) => this.handleInputChange(event)}/>
                <TextField label="Correct Answer"id="correctAnswer" type="text"
                    value={this.state.correctAnswer}
                    inputChange={(event) => this.handleInputChange(event)}/>
            </form> 
        )
    }
}

export default InputForm;