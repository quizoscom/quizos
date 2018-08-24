import React, { Component } from 'react';
import classes from './Doc.css';

class Doc extends Component {
    constructor(props) {
        super(props);
        this.noOfSpaces = 0;
    }

    state = {
        tree: {
            'src': [
                { 'assets': [] },
                { 'components': [
                        { 'Choices': [ { 'Choices.js': [] } ] },
                        { 'Navigation': [ { 'NavigationItems': [ { 'NavigationItems.js': [] }, { 'NavigationItem': [ { 'NavigationItem.js': [] } ] } ] }, { 'Toolbar': [ { 'Toolbar.js': [] } ] } ] } 
                    ]
                },
                { 'containers': [
                        { 'Auth': [ { 'Auth.js': [] } ] }
                    ]
                }
            ]
        },
        tree2: {
            "name": "a",
            "children": [
                {
                    "name": "h",
                    "children": []
                },
                {
                    "name": "i",
                    "children": []
                },
                {
                    "name": "j",
                    "children": []
                }
            ]
        }
    }

    componentDidMount() {
        this.createTree(this.state.tree2, this.state.tree2.children);
    }

    createTree = (tree, noOfChilds) => {
        let printStr = '';
        for(let i = 0; i < this.noOfSpaces; i++) {
            printStr += '-'
        }
        printStr += tree.name;
        console.log(printStr);
        if(tree.children.length > 0) {
            this.noOfSpaces++;
        }
         for(let j = 0; j < tree.children.length; j++) {
             if(tree.children[j].length > 0) {
                this.createTree(tree.children[j], tree.children.length);
             } else {
                this.createTree(tree.children[j]);
             }
        }
        this.noOfSpaces--;
    }

    render() {


        return (
            <div className={classes.Doc}>
                <p className={classes.Title}>tree</p>
                <div className={classes.DocCont}>
                    <div className={classes.DocSideBar}>

                    </div>
                    <div className={classes.DocBody}>
                    </div>
                </div>
            </div>
        );
    }
}

export default Doc;