import React, { Component } from 'react';

class SortControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort : {
                by : 'name',
                value : 1
            }
        }
    }
    onClick = (sortName, sortValue) =>{
        this.setState({
            sort : {
                by : sortName,
                value : sortValue
            }
        })
        console.log('sortC'+JSON.stringify(this.state));
        this.props.onSort(sortName,sortValue)
    }
    render() {
        let {sort} = this.state
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name',1)}>
                            <span role="button" className=" ml-5">
                                <span>
                                    <i className="fa fa-sort-alpha-asc pr-5"></i>
                                    Tên A-Z
                                </span>
                                {(sort.by === 'name' && sort.value === 1) ? <i className="glyphicon glyphicon-ok ml-10"></i> : ''}
                            </span>
                        </li>
                        <li onClick={() => this.onClick('name',-1)}>
                            <span role="button" className=" ml-5">
                                <span>
                                    <i className="fa fa-sort-alpha-desc pr-5"></i>
                                    Tên Z-A
                                </span>
                                {(sort.by === 'name' && sort.value === -1) ? <i className="glyphicon glyphicon-ok ml-10"></i> : ''}
                            </span>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={() => this.onClick('status',1)}>
                            <span role="button" className="ml-10">Trạng Thái Kích Hoạt</span>
                            {(sort.by === 'status' && sort.value === 1) ? <i className="glyphicon glyphicon-ok ml-5"></i> : ''}
                        </li>
                        <li onClick={() => this.onClick('status',-1)}>
                            <span role="button" className="ml-10">Trạng Thái Ẩn</span>
                            {(sort.by === 'status' && sort.value === -1) ? <i className="glyphicon glyphicon-ok ml-10"></i> : ''}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SortControl;