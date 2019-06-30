import React, { Component } from 'react';

class BlockItem extends Component {
    constructor(props) {
        super(props);

        this.state = {borderColor: ""};
    }

    onBlockFocus = (e) => {
        if(!this.props.empty && !this.props.fixed){
            e.target.style.borderColor = "white";
            e.target.style.borderStyle = "solid";
        }
        this.props.onClick();
    }

    onBlockBlur = (e) => {
        if(!this.props.empty && !this.props.fixed){
            e.target.style.borderColor = "#555555";
            e.target.style.borderStyle = (this.props.empty)? "solid": (this.props.fixed)? "dashed": "unset";
        }
    }

    render() {
        return (
            <div tabIndex="-1"
                style={{
                	width: "50px", 
                	height: "50px", 
                	display: "inline-block", 
                    borderRadius: "10px", 
                	backgroundColor: (this.props.empty)? "unset": this.props.color,
                    border: "#555555 1px", 
                	borderStyle: (this.props.empty)? "solid": (this.props.fixed)? "dashed": "unset"
                }}
                onClick={this.onBlockFocus}
                onBlur={this.onBlockBlur}
            ></div>
        )
    }
}

export default BlockItem;
