import React, { useState }  from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import {withRouter} from 'react-router-dom'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData  = (props) => {
    const [orderForm, setOrderForm] = useState({
        name:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                name:'name',
                placeholder: 'Your Name*'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false

        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                name:'email',
                placeholder: 'Your E-Mail*'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false

        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                name:'zipCode',
                placeholder: 'ZIP Code*'
            },
            value: '',
            validation:{
                required: true,
                minLength: 8,
                maxLength: 8
            },
            valid: false,
            touched: false

        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                name:'street',
                placeholder: 'Street*'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false

        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                name:'deliveryMethod',
                options:[
                    {
                        value: 'fastest',
                        displayValue: 'Fastest'
                    },
                    {
                        value: 'cheepest',
                        displayValue: 'Cheepest'
                    }
                ]
            },
            validation:{},
            value: 'fastest',
            valid:true
        },
    });

    const [ isValid, setIsValid ] = useState(false);

    const orderHandler = (event) =>{
        event.preventDefault();
        const formData = {};
        for (let elementID in orderForm){
            formData[elementID] = orderForm[elementID].value
        }
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userID: props.userID

        }
        props.onOrder(order, props.token);

    }

    const inputChangdHandler = (event, inputID) => {

        const updatedFormElement =  updateObject(orderForm[inputID], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputID].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputID]: updatedFormElement
        });
        let formIsValid = true;
        for(let inputIndentifiers in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIndentifiers].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setIsValid(formIsValid);
    }

    
    const formElementsArray = [];
    for(let key in orderForm) {
        formElementsArray.push({
            id:key,
            config: orderForm[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {
                formElementsArray.map(formEl =>(
                    <Input
                        key={formEl.id}
                        invalid={!formEl.config.valid}
                        elementType={formEl.config.elementType} 
                        elementConfig={formEl.config.elementConfig}
                        shouldValidate={formEl.config.validation}
                        touched={formEl.config.touched}
                        changed={(event) => inputChangdHandler(event, formEl.id)}
                        value={formEl.config.value}/>
                ))
            }
            {
                isValid ? null : <p style={{
                    color:'red',
                    fontSize:'15px',
                    fontWeight:'bold'
                }}>Valores incorretos ou faltando</p>
            }
            <Button btnType="Success" disabled={!isValid}>ORDER</Button>
        </form>
    )
    if(props.loading) {
        form=<Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            { form }
        </div>
    )
    
}  

const mapStateToProps = state => {
    return{
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userID: state.auth.userID
    }
}

const mapDispatchToProps = dispatch => {
    return{
         onOrder: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));