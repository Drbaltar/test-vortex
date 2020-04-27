import React from 'react';
import Axios from 'axios';

import TopicCategoryDropdown from './Components/TopicsCategoryDropdown/TopicCategoryDropdown';

class TopicCategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            existingTopicCategories: null
        }
    }

    getExistingTopics = (event) => {
        event.preventDefault();
        if (this.props.gunneryTable.length === 0) {
            return;
        }

        Axios.get('/api/questions/topics', { params: { table: this.props.gunneryTable[0].table, 
            subtask: this.props.gunneryTable[0].subtask}})
            .then((response) => this.setState({existingTopicCategories: response.data}))
            .catch((response) => {
                this.setState({existingTopicCategories: null});
            });
    }

    render() {
        let majorTopics = [];
        let subTopics = [];

        if (this.state.existingTopicCategories !== null && Object.keys(this.state.existingTopicCategories).length !== 0) {
            majorTopics = Object.keys(this.state.existingTopicCategories);
            if (majorTopics.includes(this.props.topic.majorCategory)) {
                subTopics = this.state.existingTopicCategories[this.props.topic.majorCategory];
            }
        }

        return (
            <div className="border border-muted rounded mt-3 p-3">
                <small id="multChoiceAnswerLabel" className="form-text">Select or input a Major Category and Sub-Category for your question topic:</small>
                <button className='btn btn-primary' onClick={(event) => this.getExistingTopics(event)}>Update Topics</button>
                <TopicCategoryDropdown categoryType='Major Category' inputCategory={this.props.topic.majorCategory} 
                    categoryID='majorCategory' inputChange={(event) => this.props.inputChange(event)}
                    isValid={this.props.isMajorTopicValid} existingTopicCategories={majorTopics}
                    errorMessage={'You must select or input a Major Category for your question topic!'}
                    topicChange={(category, value) => this.props.topicChange(category, value)}/>
                <TopicCategoryDropdown categoryType='Sub-Category' inputCategory={this.props.topic.subCategory}
                    categoryID='subCategory' inputChange={(event) => this.props.inputChange(event)}
                    isValid={this.props.isSubTopicValid} existingTopicCategories={subTopics}
                    errorMessage={'You must select or input a Sub-Category for your question topic!'}
                    topicChange={(category, value) => this.props.topicChange(category, value)}/>
            </div>
        )
    }
}

export default TopicCategories;

