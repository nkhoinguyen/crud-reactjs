import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status : true
        }
    }
    componentWillMount(){
        if(this.props.task){
            let task = this.props.task
            this.setState({
                id : task.id,
                name : task.name,
                status : task.status
            })
        }
        console.log(this.state);
    }
    componentWillReceiveProps(nextProps){
        // console.log(nextProps);
        if(nextProps && nextProps.task){
            this.setState({
                id : nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status
            })
        }else if(!nextProps.task){
            this.setState({
                id: "",
                name: "",
                status : true
                })
        }
        // console.log(this.state);
    }

    closeForm = () => {
        this.props.isActived()
    }
    onChange = (e) =>{
        let target = e.target;
        let name = target.name;
        let value = target.value;
        if(name === "status"){
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name] : value
        })
    }
    onSubmit = (e) =>{
        e.preventDefault();
        this.props.onSubmit(this.state)
        this.closeForm();

    }
    onClear = () => {
        this.setState({
            name: '',
            status : false
        })
    }
    render() {
        let {task} = this.props
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{task !== null ? "Cập Nhật Công Việc" : "Thêm Công Việc"}<i onClick = {this.closeForm} className="fa fa-times-circle right cursor"></i></h3>
                    
                </div>
                <div className="panel-body">
                    <form onSubmit = {this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input onChange = {this.onChange} type="text" value={this.state.name} className="form-control" name="name" />
                        </div>
                        <label>Trạng Thái :</label>
                        <select onChange = {this.onChange} value={this.state.status} className="form-control" required="required" name="status">
                            <option value ={true}>Kích Hoạt</option>
                            <option value ={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button  type="submit" className="btn btn-warning">{task !== null ? "Cập Nhật" : "Thêm"}</button>&nbsp;
                            <button type="button" onClick = {this.closeForm} className="btn btn-danger">Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;