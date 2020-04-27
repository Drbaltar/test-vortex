import React from 'react';

import QuestionPreviewModal from './Components/QuestionPreviewModal/QuestionPreviewModal';

class QuestionPreview extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            modal: false,
            selectedQuestion: null
        };

        this.state = this.initialState;
    }

    selectQuestion = (index) => {
        this.setState({modal: true, selectedQuestion: this.props.testQuestions[index - 1]});
    }

    toggleModal = () => {
        if (this.state.modal) {
            this.setState(this.initialState);
        } else {
            this.setState(prevState => ({
                modal: !prevState.modal
            }));
        }
    };

    // Returns a message of the number of questions found
    getSearchMessage = () => {
        if (this.props.testQuestions.length === 0) {
            return (
                <div>
                    <p>{'No Questions Found!'}</p>
                </div>
            );
        } else if (this.props.testQuestions.length > 0) {
            return (
                <div>
                    <p>{`${this.props.testQuestions.length} ${this.props.testQuestions.length === 1 ? 'Question' : 'Questions'} Found for the Test!`}</p>
                </div>
            );
        }
    }

    // Returns a list of the test questions
    getTestQuestionPreview = () => {
        // let questionList = this.props.testQuestions;

        let index = 0;
        const filledList = this.props.testQuestions.map((entry, index) => {
            if (entry.question_type === 'Multiple Choice') {
                return (
                    <div key={index++}>
                        <li type='button' className="list-group-item btn-light"
                            onClick={() => this.selectQuestion(index)}>
                            <div style={{fontSize:'110%'}}>
                                {`${index}) ${entry.question_description}`}
                            </div>
                            <div style={{marginLeft: '25px'}}>
                                <b>{`${entry.correct_answer}`}</b> <br/>
                                {`${entry.answer_a}`} <br/>
                                {`${entry.answer_b}`} <br/>
                                {`${entry.answer_c}`}
                            </div>    
                        </li>
                    </div>
                );
            } else if (entry.question_type === 'Fill-in-the-Blank') {
                return (
                    <div key={index++}>
                        <li type='button' className="list-group-item btn-light"
                            onClick={() => this.selectQuestion(index)}>
                            <div style={{fontSize:'110%'}}>
                                {`${index}) ${entry.question_description}`}
                            </div>
                            <div style={{marginLeft: '25px'}}>
                                <b>{`${entry.correct_answer}`}</b>
                            </div>
                        </li>
                    </div>
                );
            } else if (entry.question_type === 'True or False') {
                return (
                    <div key={index++}>
                        <li type='button' className="list-group-item btn-light"
                            onClick={() => this.selectQuestion(index)}>
                            <div style={{fontSize:'110%'}}>
                                {`${index}) ${entry.question_description}`}
                            </div>
                            <div style={{marginLeft: '25px'}}>
                                {entry.correct_answer === 'True' ? 
                                    <div><b>True</b><br/>False</div> :
                                    <div>True<br/><b>False</b></div>}
                            </div>
                        </li>
                    </div>
                );
            }
        });

        return filledList;
    }
    
    render() {
        return (
            <div>
                {this.getSearchMessage()}
                <div className='list-group pb-3'>
                    {this.getTestQuestionPreview()}
                </div>
                <QuestionPreviewModal toggleModal={this.toggleModal} modal={this.state.modal}
                    testQuestion={this.state.selectedQuestion}/>
            </div>
        );
    }
}

export default QuestionPreview;