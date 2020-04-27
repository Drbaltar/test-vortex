import React from 'react';

import TopicCategoryDropdown from './Components/TopicsCategoryDropdown/TopicCategoryDropdown';

const TopicCategories = (props) => {
    let majorTopics = [];
    let subTopics = [];

    if (props.existingTopicCategories !== null && Object.keys(props.existingTopicCategories).length !== 0) {
        majorTopics = Object.keys(props.existingTopicCategories).sort();
        if (majorTopics.includes(props.topic.majorCategory)) {
            subTopics = props.existingTopicCategories[props.topic.majorCategory].sort();
        }
    }

    return (
        <div className="border border-muted rounded mt-3 p-3">
            <small id="multChoiceAnswerLabel" className="form-text">Select or input a Major Category and Sub-Category for your question topic:</small>
            <TopicCategoryDropdown categoryType='Major Category' inputCategory={props.topic.majorCategory} 
                categoryID='majorCategory' inputChange={(event) => props.inputChange(event)}
                isValid={props.isMajorTopicValid} existingTopicCategories={majorTopics}
                errorMessage={'You must select or input a Major Category for your question topic!'}
                topicChange={(category, value) => props.topicChange(category, value)}
                isTopicLoading={props.isTopicLoading}/>
            <TopicCategoryDropdown categoryType='Sub-Category' inputCategory={props.topic.subCategory}
                categoryID='subCategory' inputChange={(event) => props.inputChange(event)}
                isValid={props.isSubTopicValid} existingTopicCategories={subTopics}
                errorMessage={'You must select or input a Sub-Category for your question topic!'}
                topicChange={(category, value) => props.topicChange(category, value)}
                isTopicLoading={props.isTopicLoading}/>
        </div>
    )
}

export default TopicCategories;

