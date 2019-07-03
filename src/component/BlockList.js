import React, { Component } from 'react';
import BlockItem from './BlockItem';

class BlockList extends Component {

    getList() {
        if(this.props.isVertical){
            return this.props.list.map((block, i) => {
                return  <div className="vertical" key={i}>
                            <BlockItem 
                                key={i} 
                                fixed={block.fixed} 
                                empty={block.empty} 
                                color={block.color} 
                                onClick={this.props.onBlockClicked.bind(null, i)}
                            />
                        </div>
            });
        } else {
            return this.props.list.map((block, i) => {
                return  <BlockItem 
                            key={i} 
                            fixed={block.fixed} 
                            empty={block.empty} 
                            color={block.color} 
                            onClick={this.props.onBlockClicked.bind(null, i)}
                        />
            });
        }
    }

    render() {
        return this.getList()
    }
}

export default BlockList;
