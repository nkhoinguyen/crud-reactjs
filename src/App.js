import './App.css';
import React, { Component } from 'react';
import TaskForm from './TaskForm';
import Control from './Control';
import TaskList from './TaskList';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            isActived: false,
            taskEditing : null,
            filter : {
                name : '',
                status : -1
            },
            keyword : '',
            sortBy : 'name',
            sortValue : 1

        }
    }
    componentDidMount(){
        // console.log("componentDidMount");
        if(localStorage && localStorage.getItem('tasks')){
            let tasks = JSON.parse(localStorage.getItem('tasks'))
            this.setState({
                tasks : tasks
            })
        }
    }
    onGenerate = () =>{
        console.log('onGenerate');
        let task = [
            {
                id: this.generateID(),
                name: "play game",
                status: true
            },
            {
                id: this.generateID(),
                name: "sleep",
                status: true
            },
            {
                id: this.generateID(),
                name: "study",
                status: false
            }
        ]
        this.setState({
            tasks : task
        })
        localStorage.setItem('tasks',JSON.stringify(task));
    }
    generateID(){
        return this.s4()+"-"+this.s4()+"-"+this.s4()+"-"+this.s4();
    }
    s4(){
        return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1)
    }
    displayForm = () => {
        if(this.state.isActived && this.state.taskEditing){
            this.setState({
                isActived: true,
                taskEditing : null
            })    

        }else{
            this.setState({
                isActived: !this.state.isActived,
                taskEditing : null
            })    
        }
    }
    onCloseForm = () => {
        console.log("this.onCloseForm");
        this.setState({
            isActived : false,
            taskEditing : null
        })
    }
    onShowForm = () => {
        console.log("this.onShowForm");
        this.setState({
            isActived : true
        })
    }
    onSubmit = (data) =>{
        // console.log(data);
        let {tasks} = this.state
        if(data.id === ''){
            data.id = this.generateID()
            tasks.push(data)    
        }else{
            let index = this.findIndex(data.id)
            tasks[index] = data
        }
        this.setState({
            tasks : tasks,
            taskEditing : null
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));    // lưu vào localStorage
    }
    onUpdateStatus = (id) =>{
        let {tasks} = this.state
        let index = this.findIndex(id)
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
        }
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(index);
    }
    onDeleteTask = (id) => {
        let {tasks} = this.state
        let index = this.findIndex(id)
        let start = 1

        // console.log(id);
        // console.log(JSON.stringify(tasks));
        // console.log(index);

        if(index !== -1){
            tasks.splice(index,start);
        }
        this.setState({
            tasks : tasks
        })
        // console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks))
        this.onCloseForm()  //đóng form lại
    }
    onUpdateTask = (id) =>{
        let {tasks} = this.state
        let index = this.findIndex(id)
        let taskEditing = tasks[index];
        this.setState({
            taskEditing : taskEditing
        })
        this.onShowForm()
    }
    findIndex = (id) => {
        let {tasks} = this.state;
        let result = -1;
        tasks.forEach((value, index) =>{
            if(value.id === id){
                result = index
            }
        })
        return result
    }
    onFilter = (filterName,filterStatus) =>{
        console.log(filterName,filterStatus);
        filterStatus = parseInt(filterStatus,10)
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }
        })
    }
    onSearch = (data) => {
        this.setState({
            keyword : data.toLowerCase()
        })
        
    }
    onSort = (sortName,sortValue) =>{
        this.setState({
            sortBy : sortName,
            sortValue : sortValue
        })
        
    }
    render() {

        let {tasks, isActived, taskEditing, filter, keyword, sortBy, sortValue} = this.state;   // let tasks = this.state.tasks
        let ele = isActived ? <TaskForm isActived = {this.onCloseForm} onSubmit={this.onSubmit} task = {taskEditing} /> : ''
        if(filter){
            if(filter.name){
                tasks = tasks.filter((tasks) => {
                    return tasks.name.toLowerCase().indexOf(filter.name) !== -1
                })
            }
            tasks = tasks.filter((tasks) => {
                if(filter.status === -1){
                    return tasks
                }else{
                    return tasks.status === (filter.status === 1 ? true : false)
                }
            })
        }
        if(keyword){
            tasks = tasks.filter((tasks) => {
                return tasks.name.toLowerCase().indexOf(keyword) !== -1
            })
        }
        if(sortBy === 'name'){
            tasks.sort((a,b)=>{
                if(a.name > b.name) return -sortValue
                else if(a.name < b.name) return sortValue
                else return 0
            })
        }else{
            tasks.sort((a,b)=>{
                if(a.status > b.status) return -sortValue
                else if(a.status < b.status) return sortValue
                else return 0
            })
        }
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={isActived ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                        {ele}
                    </div>
                    <div className={isActived ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button onClick={this.displayForm} type="button" className="btn btn-primary">
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        &nbsp;
                        <button onClick={this.onGenerate} type="button" className="btn btn-danger">
                            Tạo công việc
                        </button>
                        <Control onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList tasks = {tasks} onFilter={this.onFilter} onUpdateStatus={this.onUpdateStatus} onUpdateTask={this.onUpdateTask} onDeleteTask={this.onDeleteTask}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;