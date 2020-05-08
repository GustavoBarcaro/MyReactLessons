import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import {withRouter} from 'react-router-dom'
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component {
    state ={
        orderForm:{
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
        },
        isValid:false,
        loading: false
    }

    checkValidity = (value, rules) => {
        //definir como true e perguntar se era true antes em cada check da validação
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid
    }


    orderHandler = (event) =>{

        event.preventDefault();
        this.setState({
            loading:true
        });
        const formData = {};
        for (let elementID in this.state.orderForm){
            formData[elementID] = this.state.orderForm[elementID].value
        }
        const order = {
            ingredients: this.props.ingredients,
            //must calculate the price in the backend
            price: this.props.price,
            orderData: formData
            
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading:false
                });
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({
                    loading:false
                });
            });
    }

    inputChangdHandler = (event, inputID) => {
        //ainda não é um clone
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //agora se tornou um clone
        const updatedFormElement = {
            ...updatedOrderForm[inputID]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = event.target.value.length > 0;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        console.log(updatedFormElement);
        updatedOrderForm[inputID] = updatedFormElement;

        let formIsValid = true;
        for(let inputIndentifiers in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIndentifiers].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            isValid: formIsValid
        })
    }

    render () {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map(formEl =>(
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
                }
                {
                    this.state.isValid ? null : <p style={{
                        color:'red',
                        fontSize:'15px',
                        fontWeight:'bold'
                    }}>Valores incorretos ou faltando</p>
                }
                <Button btnType="Success" disabled={!this.state.isValid}>ORDER</Button>
            </form>
        )
        if(this.state.loading) {
            form=<Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}  

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}


export default connect(mapStateToProps)(withRouter(ContactData));