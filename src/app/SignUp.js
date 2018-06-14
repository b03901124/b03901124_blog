import React from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './css/Login.css';

var sha256 = require('js-sha256');

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            field_user: "",
            field_pass: "",
            error: false
        };
        document.title = "Sign Up";
    }
    componentWillMount = () => {
        var retrievedObject = sessionStorage.getItem('userInfo');
        if(retrievedObject != null) {
            window.alert(retrievedObject + '\nYou have already login...');
            var username = JSON.parse(retrievedObject)['username'];
            this.props.history.push('/blog/' + username);
        }
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
            error: false
        });
    };

    toggleSignUp = e => {
        var re = RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$');
        if(this.state.field_user.match(re) === null) {
            window.alert('Your username must be the combination of letters and numbers!');
            this.setState({
                error: true,
                field_user: "",
                field_pass: ""
            });
            return;
        }
        axios.post('/user/signup', {
            username: this.state.field_user,
            password: sha256(this.state.field_pass),
            updateTime: Date()
        })
        .then((res) => {
            if(res.data._message == null){
                window.alert('Sign Up Successfully!');
                this.loginPage();
            } else {
                window.alert(res.data._message + ' (already used or invalid)');
                this.setState({
                    error: true,
                    field_user: "",
                    field_pass: ""
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    loginPage = e => {
        this.props.history.push('/login');
    };

    render() {
        return (
            // <Dialog 
            //     open
            //     style={{backgroundImage: 'url("/assets/signup.jpg")', backgroundSize:'cover'}}
            //     onRequestClose={this.toggleLogin}
            //     fullScreen={this.props.fullScreen}>
            //     <DialogTitle>註冊</DialogTitle>
            //     <DialogContent>
            //     <DialogContentText>
            //         請輸入您的帳號與密碼。
            //     </DialogContentText>
            //     <TextField
            //         autoFocus
            //         error={this.state.error}
            //         margin="dense"
            //         id="username"
            //         label="帳號"
            //         type="username"
            //         value={this.state.field_user}
            //         onChange={this.handleChange('field_user')}
            //         fullWidth
            //     />
            //     <TextField
            //         autoFocus
            //         error={this.state.error}
            //         margin="dense"
            //         id="password"
            //         label="密碼"
            //         type="password"
            //         value={this.state.field_pass}
            //         onChange={this.handleChange('field_pass')}
            //         fullWidth
            //     />
            //     </DialogContent>
            //     <DialogActions>
            //     <Button onClick={this.loginPage} color="secondary">
            //         退回
            //     </Button>
            //     <Button onClick={this.toggleSignUp} color="primary">
            //         確認
            //     </Button>
            //     </DialogActions>
            // </Dialog>
            <div className='form'>
                <div className='form_logo'>
                    Sign<span>U</span>p
                </div>
                <div className='form_title'>
                    Enter yout username & passward!
                    {/* Sign<span>U</span>p */}
                </div>
                <form className='form_items'>
                    <div className='form_inputs'>
                        <input 
                            type='text'
                            error={this.state.error.toString()}
                            value={this.state.field_user}
                            onChange={this.handleChange('field_user')}
                            required/>
                        <label>username</label>
                    </div>
                    <div className='form_inputs'>
                        <input
                            type='password'
                            error={this.state.error.toString()}
                            value={this.state.field_pass}
                            onChange={this.handleChange('field_pass')}
                            required/>
                        <label>password</label>
                    </div>
                    <button onClick={this.toggleSignUp} 
                        className='form_button'>Confirm</button>
                </form>
                <div className='form_other'>
                    <a href='#' ></a>                
                    <a href='#' onClick={this.loginPage}>Back</a>                
                </div>
            </div>
        );
    }
}

export default SignUp;