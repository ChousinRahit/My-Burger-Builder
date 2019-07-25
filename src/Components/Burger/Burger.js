import React from "react";
import BurgerIngredient from "./BurgerIngrients/BurgerIngrients";
import Classes from "./Burger.css";
import {withRouter} from 'react-router-dom'

const burger = props => {
  // console.log(props);
  
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p style={{fontFamily:"Pacifico",marginTop:"10px",color:"#ce8e2e"}}>Please start adding Elements...!</p>;
  }
  return (
    <div className={Classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
