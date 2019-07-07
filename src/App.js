import React, { Component } from 'react';
import BlockList from './component/BlockList';
import './app.css';

const SCALE_TOP = 255;

class App extends Component {
    constructor(props) {
        super(props);

        this.INIT_TOTAL_NUM = 5;
        this.INIT_FIXED_NUM = 2;
        this.state = {
            level: 1,
            totalNum: this.INIT_TOTAL_NUM,
            fixedNum: this.INIT_FIXED_NUM,
            fullColorList: [],
            puzzleList: [],
            answerList: [],
            puzzleClickedId: -1,
            answerClickedId: -1,
            isPerfect: true
        };
    }

    componentDidMount() {
        this.newPuzzle();
    }

    newPuzzle() {
        const TOTAL_NUM = this.state.totalNum;
        const FIXED_NUM = this.state.fixedNum;
        const fixedIndexList = [];
        for(let i=0; i<FIXED_NUM; i++){
            // get unique number
            const num = this.getRandom(TOTAL_NUM);
            if(!fixedIndexList.includes(num)){
                fixedIndexList.push(num);
            } else {
                i--;
            }
        }

        const puzzleList = [];
        const answerList = [];
        const fullColorList = [];
        const randomColorList = this.getRandomColorList();
        for(let i=0; i<TOTAL_NUM; i++){
            const colorStyle = randomColorList[i];
            const isFixed = fixedIndexList.includes(i);
            puzzleList.push({
                fixed: isFixed,
                empty: !isFixed,
                color: (isFixed)? colorStyle: "unset"
            });
            fullColorList.push(colorStyle);

            if(!isFixed){
                const block = {
                    fixed: false,
                    empty: false,
                    color: colorStyle
                }
                // random sorting
                if(this.getRandom(2) > 0){
                    answerList.push(block);
                } else {
                    answerList.unshift(block);
                }
            }
        }
        this.setState({puzzleList: puzzleList, answerList: answerList, fullColorList: fullColorList});
    }

    getRandom(max) {
        return Math.floor(Math.random()*max);
    }

    getRandomColorList() {
        const LEVEL = this.state.level;
        const TOTAL_NUM = this.state.totalNum;
        const SCALE_INC = (SCALE_TOP / TOTAL_NUM) - LEVEL*2;
        const MAX_START_POINT = SCALE_TOP - (TOTAL_NUM*SCALE_INC);

        const redStart = this.getRandom(MAX_START_POINT);
        const greenStart = this.getRandom(MAX_START_POINT);
        const blueStart = this.getRandom(MAX_START_POINT);
        const redScale = this.getRandom(SCALE_INC);
        const greenScale = this.getRandom(SCALE_INC);
        const blueScale = this.getRandom(SCALE_INC);

        const list = [];
        for(let i=0; i<TOTAL_NUM; i++){
            list.push(`rgb(${redStart + i*redScale},${greenStart + i*greenScale},${blueStart + i*blueScale})`);
        }
        return list;
    }

    cutAndPaste(_from, _to) {
        _to.color = _from.color;
        _to.empty = false;
        _from.color = "unset";
        _from.empty = true;
    }

    exchangeColor(_from, _to) {
        const temp = _to.color;
        _to.color = _from.color;
        _from.color = temp;
    }

    exchangeBlocks(_fromSameSide, _fromCrossSide, _to) {
        if(_to.empty){
            if(_fromCrossSide){
                this.cutAndPaste(_fromCrossSide, _to);
            } else if(_fromSameSide){
                this.cutAndPaste(_fromSameSide, _to);
            }
        } else {
            if(_fromCrossSide){
                this.exchangeColor(_fromCrossSide, _to);
            } else if(_fromSameSide){
                this.exchangeColor(_fromSameSide, _to);
            }
        }
    }

    isCompleted() {
        const puzzleList = this.state.puzzleList;
        const fullColorList = this.state.fullColorList;
        for(let i=0,len=puzzleList.length; i<len; i++){
            if(puzzleList[i].color !== fullColorList[i]){
                return false;
            }
        }
        return true;
    }

    onPuzzleClicked = (i) => {
        const { puzzleClickedId, answerClickedId, puzzleList, answerList, isPerfect, level } = this.state;
        const _to = puzzleList[i];
        const _fromSameSide = puzzleList[puzzleClickedId];
        const _fromCrossSide = answerList[answerClickedId];

        if(_to.fixed){
            this.setState({puzzleClickedId: -1, answerClickedId: -1});
            return ;
        } else if(!_to.empty && puzzleClickedId === -1 && answerClickedId === -1 ){
            this.setState({puzzleClickedId: i, answerClickedId: -1});
            return ;
        }

        // Completed without any misplacement
        let newIsPerfect = isPerfect;
        if(!(_to.empty && _fromCrossSide)){
            newIsPerfect = false;
        }

        this.exchangeBlocks(_fromSameSide, _fromCrossSide, _to);

        this.setState({puzzleClickedId: -1, answerClickedId: -1, isPerfect: newIsPerfect}, this.setNewLevel);
    }

    setNewLevel = () => {
        if(this.isCompleted()){
            const level = this.state.level;
            this.setState({ 
                level: level+1, 
                isPerfect: true,
                totalNum: this.INIT_TOTAL_NUM+(level/this.INIT_FIXED_NUM),
                fixedNum: this.INIT_FIXED_NUM+(level/this.INIT_TOTAL_NUM)
            }, this.newPuzzle);
        }
    }

    onAnswerClicked = (i) => {
        const { puzzleClickedId, answerClickedId, puzzleList, answerList } = this.state;
        const _to = answerList[i];
        const _fromSameSide = answerList[answerClickedId];
        const _fromCrossSide = puzzleList[puzzleClickedId];

        if(!_to.empty && puzzleClickedId === -1 && answerClickedId === -1 ){
            this.setState({puzzleClickedId: -1, answerClickedId: i});
            return ;
        }

        this.exchangeBlocks(_fromSameSide, _fromCrossSide, _to)
        this.setState({puzzleClickedId: -1, answerClickedId: -1});
    }

    render() {
        return (
            <div>
                <div className="pure-g">
                    <div className="pure-u-1-5"><p>Level: {this.state.level}</p></div>
                    <div className="pure-u-1-5">
                        <BlockList 
                            list={this.state.puzzleList} 
                            isVertical={true}
                            onBlockClicked={this.onPuzzleClicked}
                        />  
                    </div>
                    <div className="pure-u-3-5">
                        <BlockList 
                            list={this.state.answerList} 
                            onBlockClicked={this.onAnswerClicked}
                        />   
                    </div>
                </div>       
            </div>
        )
    }
}

export default App;
