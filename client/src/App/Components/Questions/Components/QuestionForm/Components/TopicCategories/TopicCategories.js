import React from 'react';

import TopicCategoryDropdown from './Components/TopicsCategoryDropdown/TopicCategoryDropdown';

class TopicCategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            existingTopicCategories: null
        }
    }

    render() {
        return (
            <div className="border border-muted rounded mt-3 p-3">
                <small id="multChoiceAnswerLabel" className="form-text">Select or input a Major Category and Sub-Category for your question topic:</small>
                <TopicCategoryDropdown categoryType='Major Category' inputCategory={this.props.topic.majorCategory} 
                    categoryID='majorCategory' inputChange={(event) => this.props.inputChange(event)}
                    isValid={this.props.isMajorTopicValid}
                    errorMessage={'You must select or input a Major Category for your question topic!'}/>
                <TopicCategoryDropdown categoryType='Sub-Category' inputCategory={this.props.topic.subCategory}
                    categoryID='subCategory' inputChange={(event) => this.props.inputChange(event)}
                    isValid={this.props.isSubTopicValid}
                    errorMessage={'You must select or input a Sub-Category for your question topic!'}/>
            </div>
        )
    }
}

export default TopicCategories;

