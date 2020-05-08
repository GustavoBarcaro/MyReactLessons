import React, { Component } from "react";
import axios from '../../axios-orders';
import { connect } from 'react-redux';
 
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/index'



class BurgerBuilder extends Component{
    
    state = {
        purchasing: false,
        loading: false,
        error: false
    }


    componentDidMount () {
        // axios.get('https://burger-builder-2f7a6.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({
        //             error: true
        //         })
        //     }); 
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        return sum > 0
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    render () {
        const disableInfo = {
            ...this.props.ingredients
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null
       

        let burger =  this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        price={this.props.price}
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disableInfo}
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
                        order={this.purchaseHandler}
                    />
                </Aux>
             )
             orderSummary = <OrderSummary
                                price={this.props.price}
                                purchaseCanceled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                ingredients={this.props.ingredients}
                            />
        }
        
        if ( this.state.loading ) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onAddIngredient: (ingredientName) => dispatch(actionCreators.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actionCreators.removeIngredient(ingredientName))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));