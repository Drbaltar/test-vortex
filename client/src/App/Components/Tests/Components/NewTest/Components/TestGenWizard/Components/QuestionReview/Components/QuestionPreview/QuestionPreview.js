import React from 'react';

import QuestionPreviewModal from './Components/QuestionPreviewModal/QuestionPreviewModal';

class QuestionPreview extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            resultsPerPage: 10,
            pageDisplayed: 1,
            modal: false,
            selectedQuestion: null
        };

        this.state = this.initialState;
    }

    handleInputChange = (event) => {
        const {target: { id, value}} = event;

        this.setState({[id]: value}, () => {
            if (id === 'resultsPerPage') {
                this.setState({pageDisplayed: 1});
            }
        });
    }

    handlePageChange = (event, newPageNumber) => {
        event.preventDefault();

        this.setState({pageDisplayed: newPageNumber});
    }

    selectQuestion = (index) => {
        this.setState({modal: true, selectedQuestion: this.props.testQuestions[index - 1]});
    }

    toggleModal = () => {
        if (this.state.modal) {
            this.setState({modal: false, selectedQuestion: null});
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
                <div className="container-fluid">
                    <div className="row justify-content-between">
                        <div className="col-auto">
                            <p>{`${this.props.testQuestions.length} ${this.props.testQuestions.length === 1 ?
                                'Question' : 'Questions'} Found for the Test!`}</p>
                        </div>
                        <form className="form-inline col-auto mb-2">
                            <label htmlFor="resultsPerPage">Results Per Page</label>
                            <select className="form-control ml-2" id="resultsPerPage" value={this.state.resultsPerPage}
                                onChange={event => this.handleInputChange(event)}>
                                <option>5</option>
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                        </form> 
                    </div>          
                </div>
            );
        }
    }

    // Returns a list of the test questions
    getTestQuestionPreview = () => {
        const numPagesNeeded = Math.ceil(this.props.testQuestions.length / this.state.resultsPerPage);
        const questionRange = {
            start: this.state.resultsPerPage * (this.state.pageDisplayed - 1),
            end: this.state.resultsPerPage * this.state.pageDisplayed
        };

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
            } else {
                return null;
            }
        });

        return (
            <div>
                {filledList.slice(questionRange.start, questionRange.end)}
                {this.getPagination(numPagesNeeded)}
            </div>
        );
    }

    // Returns the pagination for navigation between pages
    getPagination = (numPagesNeeded) => {
        let pageButtons = [];

        for (let index = 1; index <= numPagesNeeded; index++) {
            pageButtons.push(
                <li className={`page-item ${index === this.state.pageDisplayed ? 'active' : ''}`}>
                    <button className="page-link"
                        onClick={(event) => this.handlePageChange(event, index)}>{index}</button>
                </li>
            );
        }

        return (
            <nav aria-label="Question Review Page Navigation">
                <ul className="pagination justify-content-center mt-2">
                    <li className={`page-item ${this.state.pageDisplayed === 1 ? 'disabled' : ''}`}>
                        <button className="page-link"
                            onClick={(event) => this.handlePageChange(event, this.state.pageDisplayed - 1)}>Previous</button>
                    </li>
                    {pageButtons}
                    <li className={`page-item ${this.state.pageDisplayed === numPagesNeeded ? 'disabled' : ''}`}>
                        <button className="page-link"
                            onClick={(event) => this.handlePageChange(event, this.state.pageDisplayed + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        );
    }
    
    render() {
        return (
            <div>
                {this.getSearchMessage()}
                <div className='list-group'>
                    {this.props.testQuestions.length !== 0 ? this.getTestQuestionPreview() : null}
                </div>
                <QuestionPreviewModal toggleModal={this.toggleModal} modal={this.state.modal}
                    testQuestion={this.state.selectedQuestion}/>
            </div>
        );
    }
}

export default QuestionPreview;