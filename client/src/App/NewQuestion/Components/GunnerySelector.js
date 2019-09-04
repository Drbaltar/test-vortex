import React from 'react';
import SelectBox from './SelectBox';
import FireUnitGunneryData from '../data/FireUnitGunneryData.json';

class GunnerySelector extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            openTab: '',
            gunneryData: ''
        }

        if (props.unitType === 'Battery') {
            this.state.gunneryData = FireUnitGunneryData;
        }
    }

    buildTabs = () => {
        const tableDescriptions = this.state.gunneryData.TableDescriptions.Table;
        const tabs = Object.keys(tableDescriptions).map((gunneryTable) => {
            return(
                <a className="nav-item nav-link" key={gunneryTable} id={gunneryTable} role="tab" title={tableDescriptions[gunneryTable].Description} 
                    onClick={(event) => this.handleChangeTab(event)}>{gunneryTable}
                    <span className="badge badge-primary ml-3">{Object.values(this.state.gunneryData.TableDescriptions.Table[gunneryTable].Subtask).length}</span>
                </a>
            )
        });
        return tabs;
    }

    buildPane = () => {
        if (this.state.openTab !== '') {            
            return(
                <div className="tab-content">
                    <div className="tab-pane fade show active" id={this.state.openTab} role="tabpanel" 
                        aria-labelledby={this.state.gunneryData.TableDescriptions.Table[this.state.openTab] + "-tab"}>
                        <SelectBox label="Subtask List" id="subtaskList" size="8"
                            options={Object.values(this.state.gunneryData.TableDescriptions.Table[this.state.openTab].Subtask)}/>
                        </div>
                </div>
            )
        }
    }

    handleChangeTab = (event) => {
        event.preventDefault();
        this.setState({openTab: event.target.id});   
    }

    render() {
        return(
            <div>
                <ul className="nav nav-tabs nav-fill" role="tablist">
                    {this.buildTabs()}
                </ul>
                {this.buildPane()}
            </div>
        )
    }
}

export default GunnerySelector;