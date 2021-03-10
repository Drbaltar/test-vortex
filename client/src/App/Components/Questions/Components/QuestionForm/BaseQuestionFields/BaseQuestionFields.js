import React from 'react';

import SelectBox from '../../../../shared-components/SelectBox';
import TextArea from '../../../../shared-components/TextArea';
import TextField from '../../../../shared-components/TextField';

const BaseQuestionFields = (props) => {
    const { inputHandler,
        questionType, isQuestionTypeValid,
        questionDescription, isQuestionDescriptionValid, 
        correctAnswer, isCorrectAnswerValid,
    } = props;

    const alternateAnswerArray = createAlternateAnswerArray(props);

    return (
        <div>
            {getQuestionTypeField(questionType, isQuestionTypeValid, inputHandler)}
            {getQuestionDescriptionField(questionDescription, isQuestionDescriptionValid, inputHandler)}
            {getCorrectAnswerField(questionType, correctAnswer, isCorrectAnswerValid, inputHandler)}
            {questionType === 'Multiple Choice' ? getAlternateAnswerFields(alternateAnswerArray, inputHandler) : null}
        </div>
    );
};

const createAlternateAnswerArray = (props) => {
    return [
        { name: 'A', value: props.answerA, isValid: props.isAnswerAValid},
        { name: 'B', value: props.answerB, isValid: props.isAnswerBValid},
        { name: 'C', value: props.answerC, isValid: props.isAnswerCValid},
    ];
};

const getQuestionTypeField = (value, isValid, inputHandler) => {
    return <SelectBox id='questionType' label='Question Type'
        options={['Multiple Choice', 'Fill-in-the-Blank', 'True or False']}
        value={value} isValid={isValid} inputChange={inputHandler}
        errorMessage='You must select the question type!'/>;
};

const getQuestionDescriptionField = (value, isValid, inputHandler) => {
    return <TextArea id='questionDescription' label='Question Description' type='text' rows='4'
        value={value} isValid={isValid} inputChange={inputHandler}
        errorMessage='The question description must be at least 10 characters!'/>;
};

const getCorrectAnswerField = (questionType, value, isValid, inputHandler) => {
    if (questionType === 'True or False') {
        return getTFAnswerField(value, isValid, inputHandler);
    } else {
        return getTextAnswerField(value, isValid, inputHandler);
    }
};

const getTFAnswerField = (value, isValid, inputHandler) => {
    return <SelectBox id='correctAnswer' label='Correct Answer'
        options={['', 'True', 'False']}
        value={value} isValid={isValid} inputChange={inputHandler}
        errorMessage={'Please select either \'True\' or \'False\''}/>;
};

const getTextAnswerField = (value, isValid, inputHandler) => {
    return <TextField id='correctAnswer' label='Correct Answer' type='text'
        value={value} isValid={isValid} inputChange={inputHandler}
        errorMessage={'The \'Correct Answer\' field is required!'}/>;
};

const getAlternateAnswerFields = (alternateAnswerArray, inputHandler) => {
    return alternateAnswerArray.map((entry) => {
        return <TextField key={`answer${entry.name}`} id={`answer${entry.name}`}
            label={`Answer ${entry.name}`} type="text"
            value={entry.value} isValid={entry.isValid} inputChange={inputHandler}
            errorMessage={`The 'Answer ${entry.name}' field is required!`}/>;
    });
};

export default BaseQuestionFields;