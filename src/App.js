
import './App.css';
import {createContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import data from './data';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';
import About from './routes/About.js';
import axios from 'axios';
import Cart from './routes/Cart';

// context는 state보관함임 
export let Context1 = createContext();

// import html에서이미지넣을때 from './images/mountaineer-2080138_1920.jpg';
//이미지 많아지면 임포트하기 힘드니까 public 폴더에 정리

function App() {

  let [more, setMore] = useState(2);
  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10,11,12]);

  //페이지 이동을 도와주는 useNavigate
  let navigate = useNavigate();

  return (
    <div className='App'>

      <Navbar bg="light" variant='light'>
        <Container>
          <Navbar.Brand onClick={() => {navigate('/')}}>쇼핑몰</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#features">Shop</Nav.Link>

            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
          
          <Link to='/cart'>cart</Link>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <Container fluid="md">
              <Row xs="1" md="3">
                {
                  shoes.map((a, i) => {
                    return(
                      <Product shoes={shoes[i]} i={i}></Product>
                    );
                  })
                }
              </Row>
            </Container>
            {more > 3 ? null : 
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data'+ more +'.json')
              .then((result)=>{
                let copy = [...shoes, ...result.data];
                setShoes(copy);
              })
              .catch(()=>{
                alert('실패함 ㅅㄱ');
              });
              setMore(more + 1);
            }}>더보기</button>
            }
          </>
        }/>
        <Route path='/detail/:id' element={
        <Context1.Provider value={{재고}}>
          <Detail shoes={shoes}/>
        </Context1.Provider>
        }/>
        <Route path="*" element={<div> 404 없는 페이지요</div>}></Route>

        {/** nested route 로 접속하면 하위 경로에 접속했을 때 상위의  어바웃 페이지도 같이 보여줘서 element가 2개 보인다.*/}
        <Route path="/about" element={<About></About>}>
          <Route path='member' element={<div>멤버임</div>}></Route>
          <Route path='location' element={<div>위치임</div>}></Route>
        </Route>
        
        <Route path="/event" element={<div><h3>오늘의 이벤트</h3> <Outlet></Outlet></div>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path='two' element={<div>생일 기념 쿠폰받기</div>}></Route>
        </Route>
        <Route path='/cart' element={<Cart />}>

        </Route>
      </Routes> 
    </div>
  );
}

function Product(props){

  return(
        <Col style={{textAlign:"center"}}>
          <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) +'.jpg'} width="80%"></img>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.price}</p>
        </Col>
  );
}

export default App;
