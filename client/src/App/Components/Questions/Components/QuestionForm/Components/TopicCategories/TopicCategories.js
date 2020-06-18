import React from 'react';

import TopicCategoryDropdown from './Components/TopicsCategoryDropdown/TopicCategoryDropdown';

const TopicCategories = (props) => {
    let majorTopics = [];
    let subTopics = [];

    let approvedMajorTopics = [];
    let uniquePendingMajorTopics = [];
    let approvedSubTopics = [];
    let uniquePendingSubTopics = [];

    if (props.existingTopicCategories !== null && props.existingTopicCategories.length === 2) {
        let approvedTopics = props.existingTopicCategories[0];
        let pendingTopics = props.existingTopicCategories[1];

        if (approvedTopics) {
            approvedMajorTopics = Object.keys(approvedTopics).sort();
            if (approvedMajorTopics.includes(props.topic.majorCategory)) {
                approvedSubTopics = approvedTopics[props.topic.majorCategory].sort();
            }
        }

        if (pendingTopics) {
            let pendingMajorTopics = Object.keys(pendingTopics).sort();

            pendingMajorTopics.forEach((topic) => {
                if (!approvedMajorTopics.includes(topic)) {
                    uniquePendingMajorTopics.push(topic);
                }
            });

            if (pendingMajorTopics.includes(props.topic.majorCategory)) {
                let pendingSubTopics = pendingTopics[props.topic.majorCategory].sort();

                pendingSubTopics.forEach((topic) => {
                    if (!approvedSubTopics.includes(topic)) {
                        uniquePendingSubTopics.push(topic);
                    }
                });
            }
        }

        majorTopics.push(approvedMajorTopics, uniquePendingMajorTopics);
        subTopics.push(approvedSubTopics, uniquePendingSubTopics);
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
    );
};

export default TopicCategories;

