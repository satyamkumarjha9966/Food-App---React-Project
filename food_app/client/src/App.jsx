import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Foodcard from './components/Foodcard'

export const BASE_URL = 'http://localhost:9000';

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filterData, setFilterData] = useState(null)
  const [selectedBtn, setSelectedBtn] = useState('all')

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true)
      try {
        const rseponse = await fetch(BASE_URL);
        const json = await rseponse.json();
        setData(json);
        setFilterData(json);
        setLoading(false)
      } catch (error) {
        setError("Unable to Fetch Data, Pls Try Again");
      }
    }  
    fetchFoodData();
  }, [])

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue == '') {
      setFilterData(null)
    }

    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));

    setFilterData(filter)
  }

  const filterFood = (type) => {
    if (type == 'All') {
      setFilterData(data)
      setSelectedBtn('All')
      return;
    }

    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));
    
    setFilterData(filter)
    setSelectedBtn(type)
  };

  const filterBtn = [
    {
      name: 'All',
      type: 'All'
    },
    {
      name: 'Breakfast',
      type: 'Breakfast'
    },
    {
      name: 'Lunch',
      type: 'Lunch'
    },
    {
      name: 'Dinner',
      type: 'Dinner'
    }
  ]

  if (error) {return <div>{error}</div>}
  if (loading) {return <div>Loading.....</div>}

  return (
    <>
    <Container>
      <TopContainer>
        <div className='logo'>
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className='search'>
          <input onChange={searchFood} type="text" placeholder='Search Food'/>
        </div>
      </TopContainer>

      <FilterComponent>
        {
          filterBtn.map(({name, type}) => <Button isSelected={selectedBtn == type} key={name} onClick={() => filterFood(type)}>{name}</Button>)
        }
      </FilterComponent>
    </Container>
      <Foodcard data={filterData} />
      </>
  );
}

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  min-height: 120px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-items: center;

  .search{
    input{
      background-color: transparent;
      border: 4px solid red;
      color: white;
      border-radius: 4px;
      font-size: 16px;
      padding: 5px 15px;
      outline: none;
      font-weight: bold;
    }
    ::placeholder{
      font-size: 16px;
      color: #f7f3f3;
    }
  }
`;

const FilterComponent = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background-color: ${({isSelected}) => (isSelected ? 'green' : "red")};
  outline: 2px solid ${({isSelected}) => (isSelected ? 'white' : "none")};
  border-radius: 4px;
  padding: 7px 14px;
  cursor: pointer;
  border: none;
  color: white;
  font-weight: bold;
  &:hover{
    background-color: white;
    color: red;
  }
`;

