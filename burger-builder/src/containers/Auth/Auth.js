import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../hoc/shared/utility';

class Auth extends Component {

    state = {
            controls: {
                email:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        name:'email',
                        placeholder: 'Your Email*'
                    },
                    value: '',
                    validation:{
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
    
                },
                password:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        name:'password',
                        placeholder: 'Your Password*'
                    },
                    value: '',
                    validation:{
                        required: true,
                        minLength: 8
                    },
                    valid: false,
                    touched: false
    
                }
            },
            isSignup: true
    }
    
    componentDidMount () {
        if(!this.props.building && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }
  


    inputChangdHandler = (event , controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({
            controls: updatedControls
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return{
                isSignup: !prevState.isSignup
            };
        });
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id:key,
                config: this.state.controls[key]
            })
        }
        let form = formElementsArray.map( formEl => (
            <Input
                key={formEl.id}
                invalid={!formEl.config.valid}
                elementType={formEl.config.elementType} 
                elementConfig={formEl.config.elementConfig}
                shouldValidate={formEl.config.validation}
                touched={formEl.config.touched}
                changed={(event) => this.inputChangdHandler(event, formEl.id)}
                value={formEl.config.value}/>
        ))
        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = <p> {this.props.error.message}</p>
        }
        return(
            <div className={classes.Auth}>
                { this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath}/> : null}
                { errorMessage }
                <form onSubmit={this.submitHandler}>
                    { form }
                    <Button btnType="Success" >Submit</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}</Button>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps )(Auth);