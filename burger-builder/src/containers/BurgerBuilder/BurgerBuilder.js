import React, { Component } from "react";
import axios from '../../axios-orders'


import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'



const INGREDIENT_PRICES = {
    salad: 1.5,
    cheese: 2,
    meat: 4,
    bacon: 2.5
}

class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice: 5,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }


    componentDidMount () {
        axios.get('https://burger-builder-2f7a6.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {
                this.setState({
                    error: true
                })
            }); 
    }


    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }



    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice, 
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        },0);
        this.setState({
            purchaseable: sum > 0
        })
        
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            totalPrice: newPrice, 
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseContinueHandler = () => {
        //alert('You continue!');

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    render () {
        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null
       

        let burger =  this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        price={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        purchaseable={this.state.purchaseable}
                        order={this.purchaseHandler}
                    />
                </Aux>
             )
             orderSummary = <OrderSummary
                                price={this.state.totalPrice}
                                purchaseCanceled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                ingredients={this.state.ingredients}
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
}

export default withErrorHandler(BurgerBuilder, axios);