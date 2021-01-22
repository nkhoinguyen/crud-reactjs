import React, { Component } from 'react';

class SearchControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword : ''
        }
    }
    onChange = (e) =>{
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name] : value
        })
    }
    onClick = () => {
        this.props.onSearch(this.state.keyword)
        // console.log("click");
        // console.log(this.state);
    }
    render() {
        let {keyword} = this.state
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input onChange={this.onChange} name="keyword" value={keyword} type="text" className="form-control" placeholder="Nhập từ khóa..." />
                    <span className="input-group-btn">
                        <button onClick={this.onClick} className="btn btn-primary" type="button">
                            <span className="fa fa-search mr-5"></span>Tìm
                            </button>
                    </span>
                </div>
            </div>
        );
    }
}

export default SearchControl;