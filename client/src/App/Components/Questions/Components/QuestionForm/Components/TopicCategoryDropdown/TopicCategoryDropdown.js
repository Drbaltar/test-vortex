import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class TopicCategoryDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDropdownOpen: false
        }
    }

    toggleDropdown = () => {
        this.setState({isDropdownOpen: !this.state.isDropdownOpen});
    }

    render() {
        // Assign the correct className to validTag based on whether the prop states the input value is valid
        // and create an optional error message if the field does not have a valid input
        let validTag;
        let errorMessage;
        if (this.props.isValid != null) {
            if (this.props.isValid) {
                validTag = 'is-valid';
            } else {
                validTag = 'is-invalid';
                errorMessage = (<small style={{color: 'darkred'}}>
                    {this.props.errorMessage}
                </small>);
            }
        }

        return (
            <div className='mb-3'>
                <label htmlFor='topicCategory'>Topic ({this.props.categoryType})</label>
                <div className='input-group'>
                    <div className='input-group-prepend'>
                        <Dropdown isOpen={this.state.isDropdownOpen} toggle={() => this.toggleDropdown()}>
                            <DropdownToggle caret>
                                Existing Categories
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>ECS</DropdownItem>
                                <DropdownItem>AMG</DropdownItem>
                                <DropdownItem>BCP</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <input type='text' className={`form-control ${validTag}`} value={this.props.inputCategory}
                        id={this.props.categoryID}
                        onChange={(event) => this.props.inputChange(event)} />
                </div>
                {errorMessage}
            </div>
        );
    }
}

export default TopicCategoryDropdown;


