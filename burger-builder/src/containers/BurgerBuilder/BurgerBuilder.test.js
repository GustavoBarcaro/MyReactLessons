
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import { BurgerBuilder } from './BurgerBuilder';
configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
        });

        it('should render <buildControls/> when receiving ingredients', () => {
            wrapper.setProps({
                ingredients: {
                    salad:0,
                    cheese:0,
                    bacon:0,
                    meat:0
                }
            });

            expect(wrapper.find(BuildControls)).toHaveLength(1);
        });
})