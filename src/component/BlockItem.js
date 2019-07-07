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
        const { empty, fixed, color } = this.props;
        return (
            <div className="block"
                tabIndex={(empty || fixed)? undefined: "-1"}
                style={{ 
                	backgroundColor: (empty)? "unset": color,
                    border: "#555555 1px", 
                	borderStyle: (empty)? "solid": (fixed)? "dashed": "unset"
                }}
                onClick={this.onBlockFocus}
            ></div>
        )
    }
}

export default BlockItem;
