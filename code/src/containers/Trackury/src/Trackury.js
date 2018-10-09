import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import classes from './Trackury.css';
import '../../../../node_modules/react-toastify/dist/ReactToastify.css';

import Roadmap from '../src/components/Roadmap/Roadmap';
import FloatingButton from '../src/components/FloatingButton/FloatingButton';
import BugsAndFeatures from '../src/components/BugsAndFeatures/BugsAndFeatures';
import AddBugAndFeatures from '../src/components/AddBugAndFeatures/AddBugAndFeatures';

import { SERVER_ROOT_URL } from '../../../shared/serverLinks';

class Trackury extends Component {
    state = {
        roadmapData: [],
        bugsData: [],
        featuresData: [],
        showAddBugAndFeaturesModal: false,
        titleValue: "",
        descriptionValue: "",
        loading: true,
        error: "",
        modalType: "",
        loadData: false,
        loadDataType: "",
        voterRendered: false,
        showCompleted: false,
        loaded: false,
        dataCalled: false
    }

    componentDidMount() {
        this.loadData("all");
    }

    componentDidUpdate() {
        if(!this.state.dataCalled && !this.state.loaded) {
            this.loadData("all");
            this.setState(prevState => ({
                dataCalled: true
            }));
        }
    }

    loadData = (type) => {
        axios.post(`${SERVER_ROOT_URL}/feedback/get-data.php`, qs.stringify({
            type,
            userId: this.props.userId
        }))
        .then(res => {
            if(type === "all" || type === "roadmap") {
                if(res.data.roadmap !== undefined) {
                    this.setState(prevState => ({
                        roadmapData: res.data["roadmap"]
                    }));
                }
            }

            if(type === "all" || type === "bugs") {
                if(res.data.bugs !== undefined) {
                    this.setState(prevState => ({
                        bugsData: res.data["bugs"]
                    }));
                }
            }

            if(type === "all" || type === "features") {
                if(res.data.features !== undefined) {
                    this.setState(prevState => ({
                        featuresData: res.data["features"]
                    }));
                }
            }

            this.setState(prevState => ({
                loading: false,
                loaded: true
            }));
        })
        .catch(err => {
            toast.error("Some error caused in fetching the details, please try again after some time.", {
                toastId: "error"
            });
            this.setState(prevState => ({
                loading: false
            }));
        });
    }

    checkboxToggleHandler = (type, rootIndex, childIndex, entryId) => {
        if(this.props.userId !== undefined && this.props.userId !== "" && this.props.userId !== null) {
            let checkedVal = false;
            let newData = [];
            if(type === "roadmap") {
                newData = [...this.state.roadmapData];
                checkedVal = newData[rootIndex]["data"][childIndex]["checked"];
            } else if(type === "bugs") {
                newData = [...this.state.bugsData];
                checkedVal = newData[rootIndex]["checked"];
            } else if(type === "features") {
                newData = [...this.state.featuresData];
                checkedVal = newData[rootIndex]["checked"]
            }

            this.setState(prevState => ({
                loading: true
            }));

            let completed = 0;
            if(!checkedVal) {
                completed = 1;
            }
            
            axios.post(`${SERVER_ROOT_URL}/feedback/complete.php`, qs.stringify({
                entryId,
                type,
                completed,
                userId: this.props.userId,
            }))
            .then(res => {
                if(res.data.status === "success") {
                    if(type === "roadmap") {
                        let newData = [...this.state.roadmapData];
                        newData[rootIndex]["data"][childIndex]["checked"] = !newData[rootIndex]["data"][childIndex]["checked"];
                        this.setState(prevState => ({roadmapData: newData}));
                    } else if(type === "bugs") {
                        let newData = [...this.state.bugsData];
                        newData[rootIndex]["checked"] = !newData[rootIndex]["checked"];
                        this.setState(prevState => ({bugsData: newData}));
                    } else if(type === "features") {
                        let newData = [...this.state.featuresData];
                        newData[rootIndex]["checked"] = !newData[rootIndex]["checked"];
                        this.setState(prevState => ({featuresData: newData}));
                    }
                    this.setState(prevState => ({
                        loading: false
                    }));
                } else {
                    toast.error("Some error caused in completing the item, please try again after some time.", {
                        toastId: "error"
                    });
                    this.setState(prevState => ({
                        loading: false
                    }));
                }
            })
            .catch(err => {
                toast.error("Some error caused in completing the item, please try again after some time.", {
                    toastId: "error"
                });
                this.setState(prevState => ({
                    loading: false
                }));
            });
        } else {
            if (!toast.isActive("error")) {
                toast.error("Please login to complete or vote", {
                    toastId: "error"
                });
            }
            this.setState(prevState => ({
                loading: false
            }));
        }
    }

    votesUpClickedHandler = (type, rootIndex, childIndex, entryId) => {
        if(this.props.userId !== undefined && this.props.userId !== "" && this.props.userId !== null) {
            this.setState(prevState => ({
                loading: true,
                voterRendered: true
            }));
            
            axios.post(`${SERVER_ROOT_URL}/feedback/vote.php`, qs.stringify({
                entryId,
                type,
                userId: this.props.userId,
            }))
            .then(res => {
                if(res.data.status === "success") {
                    if(type === "roadmap") {
                        let newData = [...this.state.roadmapData];
                        newData[rootIndex]["data"][childIndex]["votes"]++;
                        this.setState(prevState => ({data: newData}));
                    } else if(type === "bugs") {
                        let newData = [...this.state.bugsData];
                        newData[rootIndex]["votes"]++;
                        this.setState(prevState => ({bugsData: newData}));
                    } else if(type === "features") {
                        let newData = [...this.state.featuresData];
                        newData[rootIndex]["votes"]++;
                        this.setState(prevState => ({featuresData: newData}));
                    }
                    this.loadData(type);
                } else if(res.data.msg === "already voted") {
                    toast.error("You have already voted on that title", {
                        toastId: "error"
                    });
                    this.setState(prevState => ({
                        loading: false
                    }));
                } else {
                    toast.error("Some error caused in voting, please try again after some time.", {
                        toastId: "error"
                    });
                    this.setState(prevState => ({
                        loading: false
                    }));
                }
            })
            .catch(err => {
                toast.error("Some error caused in voting, please try again after some time.", {
                    toastId: "error"
                });
                this.setState(prevState => ({
                    loading: false
                }));
            });
        } else {
            if (!toast.isActive("error")) {
                toast.error("Please login to complete or vote", {
                    toastId: "error"
                });
            }
            this.setState(prevState => ({
                loading: false
            }));
        }
    }

    openAddBugsAndFeaturesHandler = (type) => {
        this.setState(prevState => ({
            showAddBugAndFeaturesModal: !prevState.showAddBugAndFeaturesModal,
            modalType: type
        }));
    }

    bugsAndFeaturesAdditionHandler = (event, type, title, description) => {
        event.preventDefault();
        if(title !== "" && description !== "") {
            this.setState(prevState => ({
                loading: !prevState.loading
            }));
            axios.post(`${SERVER_ROOT_URL}/feedback/save-bugs-or-features.php`, qs.stringify({
                userId: this.props.userId,
                title: title.trim(),
                type: type.trim(),
                description: description.trim(),
            }))
            .then(res => {
                if(res.data.status === "success") {
                    this.setState(prevState => ({
                        showAddBugAndFeaturesModal: false,
                        titleValue: "",
                        descriptionValue: "",
                        loading: false,
                        error: "",
                        modalType: ""
                    }));
                    this.loadData(type);
                } else {
                    this.setState(prevState => ({
                        error: "Sever Error, Please try again",
                        loading: false,
                    })); 
                }
            })
            .catch(err => {
                this.setState(prevState => ({
                    error: "Sever Error, Please try again",
                    loading: false,
                }));
                console.log(err.response);
            });
        } else {
            this.setState(prevState => ({
                error: "Both the inputs are required",
                loading: false,
            }));
        }
    }

    backdropClosedHandler = () => {
        this.setState(prevState => ({
            showAddBugAndFeaturesModal: !prevState.showAddBugAndFeaturesModal
        }));
    }

    titleInputChangedHandler = (event) => {
        const val = event.target.value;
        this.setState(prevState => ({
            titleValue: val
        }));
    }

    descriptionChangedHandler = (event) => {
        const val = event.target.value;
        this.setState(prevState => ({
            descriptionValue: val
        }));
    }

    toggleCompletedClickedHandler = () => {
        this.setState(prevState => ({
            showCompleted: !prevState.showCompleted
        }));
    }
    
    render() {
        return (
            <div className={classes.Trackury}>
                <Roadmap
                    data={this.state.roadmapData}
                    loading={this.state.loading}
                    dataType={this.state.dataType}
                    showCompleted={this.state.showCompleted}
                    voterRendered={this.state.voterRendered}
                    votesUpClicked={this.votesUpClickedHandler}
                    checkBoxClicked={this.checkboxToggleHandler}
                />
                <div className="this-is-a-class">
                    <BugsAndFeatures
                        type="bugs"
                        loading={this.state.loading}
                        bugsData={this.state.bugsData}
                        dataType={this.state.dataType}
                        voterRendered={this.state.voterRendered}
                        showCompleted={this.state.showCompleted}
                        votesUpClicked={this.votesUpClickedHandler}
                        checkBoxClicked={this.checkboxToggleHandler}
                        addButtonClicked={() => this.openAddBugsAndFeaturesHandler("bugs")} />
                    <BugsAndFeatures
                        type="features"
                        loading={this.state.loading}
                        dataType={this.state.dataType}
                        featuresData={this.state.featuresData}
                        voterRendered={this.state.voterRendered}
                        showCompleted={this.state.showCompleted}
                        votesUpClicked={this.votesUpClickedHandler}
                        checkBoxClicked={this.checkboxToggleHandler}
                        addButtonClicked={() => this.openAddBugsAndFeaturesHandler("features")} />
                </div>
                <AddBugAndFeatures
                    error={this.state.error}
                    type={this.state.modalType}
                    loading={this.state.loading}
                    visible={this.state.showAddBugAndFeaturesModal} 
                    backdropClosed={this.backdropClosedHandler} 
                    titleValue={this.state.titleValue}
                    descriptionValue={this.state.descriptionValue}
                    titleInputChanged={this.titleInputChangedHandler}
                    descriptionChanged={this.descriptionChangedHandler}
                    bugsAndFeaturesModalPostButtonClicked={this.bugsAndFeaturesAdditionHandler}/>
                <div className={classes.ToastContainer}>
                    <ToastContainer />
                </div>
                <FloatingButton 
                    showCompleted={this.state.showCompleted}
                    toggleCompletedClicked={this.toggleCompletedClickedHandler} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(Trackury);