import React, { Component } from 'react';
import classes from './Doc.css';

import SortableTree from 'react-sortable-tree'; // https://github.com/frontend-collective/react-sortable-tree
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'; // https://github.com/frontend-collective/react-sortable-tree-theme-file-explorer

import JSIcon from '../../assets/js-icon.png';
import ImgIcon from '../../assets/img-icon.png';
class Doc extends Component {
    state = {
        treeData: [
            { 
                title: 'src/',
                type: "dir",
                expanded: true,
                children: [ 
                    { 
                        title: 'assets',
                        type: "file", 
                    },
                    {
                        title: 'components',
                        expanded: true,
                        type: "dir",
                        children: [
                            {
                                title: 'Choices',
                                type: "dir",
                                children: [
                                    {
                                        title: 'Choices.js',
                                        type: "js",
                                    }
                                ]
                            },
                            {
                                title: 'Error404',
                                type: "dir",
                                children: [
                                    {
                                        type: "js",
                                        title: 'Error404.js'
                                    }
                                ]
                            }
                        ]
                    }
                ] 
            }
        ],
    }

    render() {
        return (
            <div className={classes.Doc}>
                <p className={classes.Title}>tree</p>
                <div className={classes.DocCont}>
                    <div className={classes.DocSideBar}>
                        <SortableTree
                            treeData={this.state.treeData}
                            onChange={treeData => this.setState({ treeData })}
                            theme={FileExplorerTheme}
                            canDrag={false}
                            generateNodeProps={rowInfo => ({
                                icons: rowInfo.node.type === "js"
                                ? [ <img src={JSIcon} alt="JS Icon" /> ]
                                : rowInfo.node.type === "file"
                                    ? [ <img src={ImgIcon} alt="Img Icon" /> ]
                                    : []
                            })}
                        />
                    </div>
                    <div className={classes.DocBody}>
                    </div>
                </div>
            </div>
        );
    }
}

export default Doc;