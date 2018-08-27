import React, { Component } from 'react';
import classes from './Doc.css';

import SortableTree from 'react-sortable-tree'; // https://github.com/frontend-collective/react-sortable-tree
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'; // https://github.com/frontend-collective/react-sortable-tree-theme-file-explorer
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime as codeStyle } from 'react-syntax-highlighter/styles/hljs';

import JSIcon from '../../assets/js-icon.png';
import ImgIcon from '../../assets/img-icon.png';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import * as docsContent from '../../doc/docsContent';

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
        docsBody: {}
    }

    nodeClickedHandler = fileName => {
        const docsContentObj = docsContent[fileName.replace('.js', '')];
        let docsBody = {
            title: fileName
        };
        if(typeof docsContentObj["desc"] !== "undefined") {
            docsBody["desc"] = docsContentObj["desc"];
        }

        if(typeof docsContentObj["link"] !== "undefined") {
            docsBody["link"] = docsContentObj["link"];
        }
        
        if(typeof docsContentObj["props"] !== "undefined") {
            docsBody["props"] = docsContentObj["props"];
        }

        if(typeof docsContentObj["body"] !== "undefined") {
            docsBody["body"] = docsContentObj["body"];
        }

        this.setState({
            ...this.state,
            docsBody: docsBody
        })
    }

    render() {
        let docsBody = null;
        if(Object.keys(this.state.docsBody).length !== 0) {
            const docsBodyState = this.state.docsBody;
            let code = ``;
            if(typeof docsBodyState["body"] !== "undefined") {
                const content = docsBodyState["body"];
                for(let i = 0; i < content.length; i++) {
                    code += content[i] +'\n';
                }
            }

            docsBody = (
                <Aux>
                    <div className={classes.Header}>
                        <p className={classes.Desc}>{docsBodyState['desc']}</p>
                        <p className={classes.Link}><a href={docsBodyState['link']} target="_blank">{docsBodyState['title']}</a></p>
                    </div>

                    {
                        typeof docsBodyState["props"] !== "undefined"
                        ? (
                            <Aux>
                                <p className={classes.propsTitle}>props</p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>name</th>
                                            <th>type</th>
                                            <th>description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {docsBodyState["props"].map(row => {
                                            return (
                                                <tr key={row["name"]}>
                                                    <td>{row["name"]}</td>
                                                    <td>{row["type"]}</td>
                                                    <td>{row["desc"]}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </Aux>
                          )
                        : null
                    }

                    {
                        typeof docsBodyState["body"] !== "undefined"
                        ? (
                            <div className={classes.Code}>
                                <SyntaxHighlighter language='jsx' style={codeStyle}>
                                    {code}
                                </SyntaxHighlighter>
                            </div>
                          )
                        : null
                    }
                </Aux>
            );
        }
        return (
            <div className={classes.Doc}>
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
                                    : [],
                                onClick: rowInfo.node.type === "js" ? () => this.nodeClickedHandler(rowInfo.node.title) : null
                            })}
                        />
                    </div>
                    <div className={classes.DocBody}>
                        {docsBody}
                    </div>
                </div>
            </div>
        );
    }
}

export default Doc;