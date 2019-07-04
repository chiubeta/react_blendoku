import React, { Component } from 'react';

class BlockItem extends Component {
    constructor(props) {
        super(props);

        this.state = {borderColor: ""};
    }

    onBlockFocus = (e) => {
        this.props.onClick();
    }

    render() {
        return (
            <div className="block"
                tabIndex={(this.props.empty || this.props.fixed)? undefined: "-1"}
                style={{ 
                	backgroundColor: (this.props.empty)? "unset": this.props.color,
                    border: "#555555 1px", 
                	borderStyle: (this.props.empty)? "solid": (this.props.fixed)? "dashed": "unset"
                }}
                onClick={this.onBlockFocus}
            ></div>
        )
    }
}

export default BlockItem;
