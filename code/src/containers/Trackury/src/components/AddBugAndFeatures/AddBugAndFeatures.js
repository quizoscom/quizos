import React, { Component } from 'react';

import classes from './AddBugAndFeatures.css';
import Loader from '../Loader/Loader';
import Rodal from 'rodal';

import '../../../../../../node_modules/rodal/lib/rodal.css';

class AddBugAndFeatures extends Component {
    preventClosingOnBackdropClicked = (event) => {
        event.stopPropagation();
    }

    render() {
        return (
            this.props.visible
            ? (
                <div className={classes.AddBugAndFeatures} onClick={this.props.backdropClosed ? this.props.backdropClosed : null}>
                    <Rodal
                        duration={800}
                        showMask={false}
                        animation="slideUp"
                        showCloseButton={false}
                        visible={this.props.visible}
                        onClose={this.props.backdropClosed}
                        customStyles={{height: "fit-content"}}
                    >
                        <div onClick={this.preventClosingOnBackdropClicked}>
                            {
                                this.props.error !== ""
                                ? <div className={classes.Error}><p>{this.props.error}</p></div>
                                : null
                            }
                            <p className={classes.Title}>{this.props.type === "bugs" ? "Add a Bug" : "Submit a new Feature Requests"}</p>
                            <form className={classes.Form}>
                                <div className={classes.FormInput}>
                                    <label htmlFor="bugTitle">Title</label>
                                    <input 
                                        id="bugTitle" 
                                        type="text" 
                                        placeholder="short self-descriptive title" 
                                        value={this.props.titleValue}
                                        onChange={this.props.titleInputChanged} />
                                </div>
                                <div className={classes.FormInput}>
                                    <label htmlFor="bugDescription">Description</label>
                                    <textarea
                                        id="bugDescription" 
                                        placeholder="Explain it here..." 
                                        onChange={this.props.descriptionChanged}
                                        value={this.props.descriptionValue}>
                                    </textarea>
                                </div>
                                {
                                    this.props.loading
                                    ? <Loader />
                                    : <button 
                                        className={classes.PostButton}
                                        onClick={(event) => this.props.bugsAndFeaturesModalPostButtonClicked(event, this.props.type, this.props.titleValue, this.props.descriptionValue)} >
                                        Post
                                    </button>
                                }
                            </form>
                        </div>
                    </Rodal>
                </div>
              )
            : null
        );
    }
}

export default AddBugAndFeatures;