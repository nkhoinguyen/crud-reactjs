import React, { Component } from 'react';
import TaskItem from './TaskItem';
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state={
            filterName : '',
            filterStatus : -1
        }
    }
    onChange = (e) =>{
        let target = e.target
        let name = target.name
        let value = target.value
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
            )

        this.setState({
            [name] : value
        })
    }
    render() {
        let {tasks} = this.props;
        let ele = tasks.map((value,index)=>{
            return <TaskItem 
                        task = {value} 
                        key = {value.id} 
                        index = {index} 
                        onUpdateStatus = {this.props.onUpdateStatus}
                        onDeleteTask = {this.props.onDeleteTask}
                        onUpdateTask = {this.props.onUpdateTask}
                    />
        })
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input onChange={this.onChange} name="filterName" type="text" className="form-control" />
                        </td>
                        <td>
                            <select onChange={this.onChange} name="filterStatus" className="form-control">
                                <option value="-1">Tất Cả</option>
                                <option value="0">Ẩn</option>
                                <option value="1">Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {ele}
                </tbody>
            </table>
        );
    }
}

export default TaskList;