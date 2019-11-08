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
        });
    }

    buildTabs = () => {
        const tabs = this.state.gunneryData.map((gunneryTable) => {
            let filteredSubtasks = Object.values(gunneryTable.subtasks).filter(entry => entry.toLowerCase().includes(this.state.searchInput.toLowerCase()));
            return(
                <button className="btn btn-outline-secondary col-sm" key={gunneryTable.table} id={gunneryTable.table} title={gunneryTable.description} 
                    onClick={() => this.setState({openTab: gunneryTable.table})}>{gunneryTable.table}
                    <span className="badge badge-primary ml-3" 
                    onClick={() => this.setState({openTab: gunneryTable.table})}>{filteredSubtasks.length}</span>
                </button>
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
                            options={Object.values(selectedTable.subtasks).filter(entry => entry.toLowerCase().includes(this.state.searchInput.toLowerCase()))}
                            inputChange={(event) => this.handleSubtaskSelect(event)}/>
                    </div>
                )
            }
    }

    handleInputChange = (event) => {
        const {target: { id, value}} = event;
        this.setState({[id]: value});
    };

    handleSubtaskSelect = (event) => {
        let table, subtask;
        
        this.state.gunneryData.forEach(entry => {
            Object.entries(entry.subtasks).forEach(task => {
                if (event.target.value === task[1]) {
                    table = entry.table;
                    subtask = task[0];
                }
            })
        });

        this.props.subtaskSelect(table, subtask);
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
                <div className="container">
                    <div className="row">
                        {this.buildTabs()}
                    </div>
                </div>
                {this.buildPane()}
            </div>
        )
    }
}

export default GunnerySelector;