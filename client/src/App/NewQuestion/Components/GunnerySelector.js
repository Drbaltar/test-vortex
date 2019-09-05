import React from 'react';
import SelectBox from './SelectBox';
import FireUnitGunneryData from '../data/FireUnitGunneryData.json';

class GunnerySelector extends React.Component {
    constructor (props) {
        super(props);

        this.initialState = {
            gunneryData: '',
            openTab: '',
            searchInput: ''
        }

        this.state = this.initialState;

        // Declare interim gunnery data placeholder
        let gunneryData;

        // Load gunnery data placeholder with either Battery or Battalion information
        if (props.unitType === 'Battery') {
            gunneryData = FireUnitGunneryData;
        } else if (props.unitType === 'Battalion') {
            gunneryData = FireUnitGunneryData;
        }

        // Build state gunnery data information
        this.state.gunneryData = Object.entries(gunneryData.TableDescriptions.Table).map((entry) => {
            return { table: entry[0], description: entry[1].Description, subtasks: entry[1].Subtask, 
                filteredSubtasks: Object.values(entry[1].Subtask)}
        })
    }

    buildTabs = () => {
        const tabs = this.state.gunneryData.map((gunneryTable) => {
            let filteredSubtasks = Object.values(gunneryTable.subtasks).filter(entry => entry.toLowerCase().includes(this.state.searchInput.toLowerCase()));
            return(
                <a className="nav-item nav-link" key={gunneryTable.table} id={gunneryTable.table} role="tab" title={gunneryTable.description} 
                    onClick={(event) => this.handleChangeTab(event)}>{gunneryTable.table}
                    <span className="badge badge-primary ml-3">{filteredSubtasks.length}</span>
                </a>
            )
        });
        return tabs;
    }

    buildPane = () => {
        let selectedTable = this.state.gunneryData.find(entry => entry.table === this.state.openTab);
        
        if (selectedTable) {
                return(
                    <div className="tab-pane fade show active mt-2" key={selectedTable.table} role="tabpanel">
                        <SelectBox label="Subtask List" id="subtaskList" size="8"
                            options={Object.values(selectedTable.subtasks).filter(entry => entry.toLowerCase().includes(this.state.searchInput.toLowerCase()))}/>
                    </div>
                )
            }
    }

    handleInputChange = (event) => {
        const {target: { id, value}} = event;
        this.setState({[id]: value});
    };

    handleChangeTab = (event) => {
        event.preventDefault();
        this.setState({openTab: event.target.id});   
    }

    render() {
        return(
            <div>
                <div className="row mb-2">
                    <form className="form-inline">
                        <label className="col">Gunnery Tables</label>
                        <input className="form-control col" type="text" id="searchInput" value={this.state.searchInput}
                            placeholder={'Subtask Filter'}
                            onChange={this.handleInputChange}/>
                    </form>
                </div>
                <ul className="nav nav-tabs nav-fill" role="tablist">
                    {this.buildTabs()}
                </ul>
                {this.buildPane()}
            </div>
        )
    }
}

export default GunnerySelector;