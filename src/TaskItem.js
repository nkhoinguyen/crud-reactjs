import React, { Component } from 'react';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }
    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id)
    }
    onUpdateTask = () => {
        this.props.onUpdateTask(this.props.task.id)
    }
    render() {

        let {task, index} = this.props;

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center cursor">
                    <span onClick={this.onUpdateStatus} className={(task.status === true) ? "label label-success" : "label label-danger"}>
                        {(task.status === true) ? "Kích hoạt" : "Ẩn"}
                    </span>
                </td>
                <td className="text-center">
                    <button onClick={this.onUpdateTask} type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-5"></span>Sửa
                </button>
                &nbsp;
                <button onClick={this.onDeleteTask} type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5"></span>
                        Xóa
                </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;