import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';

import EditIcon from '@material-ui/icons/ModeEdit';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

import EditArticle from './EditArticle.js';
import InsetList from './InsetList.js';
import PreviewArticle from './PreviewArticle.js';
import ButtonAppBar from './ButtonAppBar.js';
import SimpleDialog from './SimpleDialog.js';

const styles = {
    bg: {
        backgroundSize: 'cover',
    }
};

class Blog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            hostname: "",
            title: "",
            time: "",
            content: "",
            hash: "",
            postList: [],
            userList: [],
            mode: "preview",
            open: false,
        };
    }
    componentDidMount(){
        var retrievedObject = sessionStorage.getItem('userInfo');
        if(retrievedObject == null) {
            window.alert('You have not login, go to guest mode!');
            var username = "Guest mode";
        } else {
            retrievedObject = JSON.parse(retrievedObject);
            var username = retrievedObject.username;
        }
        var host = this.props.location.pathname.split('/')[2];
        if(host === undefined) {
            host = "";
        }

        axios.get('/user/allusers', {
            params: {
                username: username
            }
        })
        .then((res) => {
            for(var i = 0; i < res['data'].length; i++) {
                var user = JSON.parse(res['data'][i]);
                this.setState({
                    userList: this.state.userList.concat(user),
                });
            }
        })
        .catch(function (error){
            console.log(err);
        });

        axios.get('/blog/list', {
            params: {
                hostname: host
            }
        })
        .then((res) => {
            // console.log(res.data)
            res.data.sort((a, b) => a.timestamp - b.timestamp);
            for(var i = 0; i < res['data'].length; i++) {
                var post = res['data'][i];
                post['pressed'] = false;
                this.setState({
                    postList: this.state.postList.concat(post),
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });

        this.setState({
            username: username,
            hostname: host
        }, () => {
            document.title = this.state.username;
        });
    }

    funcArticle() {
        if(this.state.mode === "none"){
            return null;
        } else if(this.state.mode === "preview") {
            console.log(this.state.postList)
            var lists = this.state.postList.map(item => (
                <div id={item.hash}>
                    <PreviewArticle
                        key={item.hash}
                        hash={item.hash}
                        title={item.title}
                        time={item.time}
                        content={item.content}
                        handleEditCb={this.handleEditCb}
                        isSelf={this.state.username === this.state.hostname}
                        deleteArticleCb={this.deleteArticleCb}
                    />
                </div>
            ));
            return lists;
            // return <PreviewArticle 
            //             title={this.state.title}
            //             time={this.state.time}
            //             content={this.state.content}
            //             handleEditCb={this.handleEditCb}
            //             isSelf={this.state.username === this.state.hostname}
            //             deleteArticleCb={this.deleteArticleCb}/>;
        } else if(this.state.mode === "edit") {
            return <EditArticle
                        title={this.state.title}
                        time={this.state.time}
                        content={this.state.content}
                        handleTitleCb={this.handleTitleCb}
                        handleContentCb={this.handleContentCb}
                        savePostCb={this.savePostCb}
                        cancelPostCb={this.cancelPostCb}/>;
        }
    }

    handleTitleCb = (v) => {
        this.setState({
            title: v
        })
    }

    handleContentCb = (v) => {
        this.setState({
            content: v
        })
    }

    savePostCb = () => {
        var newPost = false;
        if(this.state.hash === ""){
            var hash = Math.random().toString(36).substr(2, 5);
            newPost = true;
        } else {
            var hash = this.state.hash;
        }
        console.log(this.state)
        var myres = null;
        this.setState({
            hash: hash
        }, () => {
            axios.put('/blog/post', {
                title: this.state.title,
                content: this.state.content,
                hash: this.state.hash,
                author: this.state.username
            })
            .then((res) => {
                myres = res.data;
                myres['pressed'] = false;

                if(newPost === true){
                    this.setState({
                        postList: this.state.postList.concat(myres),
                        title: "",
                        time: "",
                        content: "",
                        hash: "",
                        mode: "preview"
                    });
                } else {
                    var tmpList = [];
                    for(var i = 0; i < this.state.postList.length; i++) {
                        var post = this.state.postList[i];
                        if(post['hash'] === hash) {
                            post = myres;
                        } else {
                            //do nothing
                        }
                        tmpList.push(post);
                    }
                    tmpList.sort((a, b) => a.timestamp - b.timestamp);

                    this.setState({
                        postList: tmpList,
                        title: "",
                        time: "",
                        content: "",
                        hash: "",
                        mode: "preview"
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        })
    }

    cancelPostCb = () => {
        if(this.state.hash === "") {
            this.setState({
                title: "",
                title: "",
                time: "",
                content: "",
                hash: "",
                mode: "preview",
            });
        } else {
            for(var i = 0; i < this.state.postList.length; i++) {
                var post = this.state.postList[i];
                if(post['hash'] === this.state.hash) {
                    this.setState({
                        title: post['title'],
                        time: post['time'],
                        content: post['content'],
                        hash: post['hash'],
                        mode: "preview",
                    }, () => {
                        return;
                    });
                }
            }
        }
    }
    handleEditCb = (e, data) => {
        e.preventDefault();
        this.setState({
            mode: "edit",
            title: data.title,
            time: data.time,
            content: data.content,
            hash: data.hash
        });
    }
    // handleEditCb = (e) => {
    //     e.preventDefault();
    //     this.setState({
    //         mode: "edit",
    //     });
    // }

    handlePreviewCb = (hash) => {
        var tmpList = [];
        for(var i = 0; i < this.state.postList.length; i++) {
            var post = this.state.postList[i];
            if(post['hash'] === hash) {
                post['pressed'] = true;
                this.setState({
                    title: post['title'],
                    time: post['time'],
                    content: post['content'],
                    hash: post['hash']
                });
            } else {
                post['pressed'] = false;
            }
            tmpList.push(post);
        }
        this.setState({
            postList: tmpList,
            mode: "preview",
        });
    }

    deleteArticleCb = (e, hash) => {
        e.preventDefault();
        this.setState({
            hash: hash
        });
        axios.delete('/blog/post', {
            params: {
                hash: hash
                // hash: this.state.hash
            }
        })
        .then((res) => {
            var tmpList = [];
            var original_title = [];
            for(var i = 0; i < this.state.postList.length; i++) {
                var post = this.state.postList[i];
                if(post['hash'] === this.state.hash) {
                    original_title = post['title'];
                    continue;
                } else {
                    post['pressed'] = false;
                }
                tmpList.push(post);
            }
            this.setState({
                postList: tmpList,
                mode: "preview",
                title: "",
                time: "",
                content: "",
                hash: ""
            }, () => {
                window.alert(original_title + 'have been deleted!!');
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    funcFab() {
        if(this.state.hostname !== this.state.username) return null;
        return (
            <Button variant="fab" color="primary" onClick={e => this.handleFab(e)}
                style={{
                top: 30,
                // bottom: 30,
                left: 50,
                position: 'sticky',
                }}>
                <EditIcon/>
            </Button>
        );
    }

    handleFab = (e) => {
        e.preventDefault();
        this.setState({
            mode: "edit",
            hash: "",
            title: "",
            time: "",
            content: "",
        });
    }

    handleClickOpen = (e) => {
        this.setState({
            open: true,
        })
    }

    handleClose = value => {
        this.setState({
            hostname: value,
            open: false}, () => {
                this.props.history.push('/blog/' + this.state.hostname);
                location.reload();
        })
    }

    render() {
        return (
            <div>
                <ButtonAppBar history={this.props.history} 
                    username={this.state.username} 
                    hostname={this.state.hostname}
                    handleClickOpen={e => this.handleClickOpen(e)}>
                </ButtonAppBar>
                <SimpleDialog
                    users={this.state.userList}
                    open={this.state.open}
                    onClose={this.handleClose}/>

                {this.funcFab()}
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={9}>
                        {this.funcArticle()}
                    </Grid>
                    <Grid item xs={8} sm={2}>
                        <InsetList mode={this.state.mode} 
                            handlePreviewCb={this.handlePreviewCb} 
                            postList={this.state.postList}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Blog;