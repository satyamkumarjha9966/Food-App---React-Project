import React from 'react';
import styled from 'styled-components';
import {BASE_URL, Container} from '../App';
import { Button } from '../App';

function Foodcard({data}) {
  return (
    <FoodCardsContainer>
        <Container>
        <FoodCards>
            {
                data?.map(({image, name, text, price}) => (
                    <Food key={name}>
                        <div className='food_image'>
                            <img src={BASE_URL + image} alt="" />
                        </div>
                        <div className='food_info'>
                            <div className='info'>
                                <h3>{name}</h3>
                                <p>{text}</p>
                            </div>
                            <Button>${price.toFixed(2)}</Button>
                        </div>
                    </Food>))
            }
        </FoodCards>
        </Container>
    </FoodCardsContainer>
  )
}

export default Foodcard;

const FoodCardsContainer = styled.section`
  background-image: url("/bg.png");
  background-size: cover;
  min-height: calc(100vh - 200px);
`;

const FoodCards = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding-top: 80px;
`;

const Food = styled.div`
    width: 340px;
    height: 164px;
    border: 1px solid;
    backdrop-filter: blur(15px); 
    border-radius: 20px;
    display: flex;
    padding: 8px;

    .food_info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: end;
    }

    h3{
        margin-top: 8px;
        font-size: 16px;
        font-weight: bold;
    }

    p{
        margin-top: 4px;
        font-size: 14px;
    }
`;