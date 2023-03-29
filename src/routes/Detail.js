
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import { addItem } from '../store';
import { useDispatch} from 'react-redux';

import {Context1} from '../App';



//props 뚫어서 사용가능 기본이용법이니 외워 ${props => props.bg}
// let YellowBtn = styled.button`
//     background : ${props => props.bg};
//     color: ${props => props.bg == 'blue' ? 'white' : 'black'};
//     padding: 10px;
// `

function Detail({shoes}){
    let dispatch = useDispatch();


    //detail컴포넌트가 mount되고 update될때 실행된다.
    //굳이 useEffect 쓰는 이유: useEffect는 html이 렌더링된 후 동작한다.
    // 어려운 연산 , 서버에서 데이터 가져오는 작업, 타이머에 적합

    const [show, setShow] = useState(true);
    const [tab, setTab] = useState(0);

    useEffect(()=>{
       let timer1 =setTimeout(()=>{setShow(false)},3000);
       console.log(1);
        return() => {
            clearTimeout(timer1);
        }
    },[]);

    //state 사용은 useContext(context)
    let {재고} = useContext(Context1);

    let {id} = useParams();
    let num = Number(id); //2r3 이런게 2로 인식됨 

    if(!(shoes.find(e => e.id === num))){
        return(<div>존재하지 않는 상품</div>);
    }
    let product = shoes.find(e => e.id === num);
    //상품들 데이터바인딩 받기!!!!!!!!!!!!!! useParams!!!!!
    return(

        <div className="container">
        {show && <><Timer></Timer><Left></Left></>}
        <div className="row">
            <div className="col-md-6">
                <img src={"https://codingapple1.github.io/shop/shoes" + (parseInt(id) + 1) +".jpg"} width="100%" />
            </div>
            <div className="col-md-6">
                <h4 className="pt-5">{product.title}</h4>
                <p>{product.content}</p>
                <p>{product.price}</p>
                <button 
                    className="btn btn-danger" 
                    onClick={()=>{
                    dispatch(addItem({id: product.id, name: product.title, count: 1}))
                    }}>
                    장바구니 담기
                </button> 
            </div>
        </div>

    <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
            <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link onClick={()=>{setTab(1)}}  eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link onClick={()=>{setTab(2)}}  eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
    </Nav>
    <TabContent tab={tab}></TabContent>
    </div> 
    )

}

function TabContent({tab}){

    let [fade, setFade] = useState('');
    useEffect(()=>{
    let timer = setTimeout(()=>{setFade('end')},10)
        return()=>{
            setFade('');
            clearTimeout(timer);
        }
    },[tab])


   return (<div className={`start ${fade}`}>
          {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}  
        </div>)
}

function Timer(){
    return (<>
    <button>3초 안에 누르면 세일</button>
    </>
    )

}
function Left(){
    let [time, setTime] = useState(3);
    useEffect(()=>{
        let timer2 = setTimeout(()=>{setTime(time - 1)},1000);
        return() => {clearTimeout(timer2);}
    },[time])
    return(
        <div>남은 시간 {time}</div>
    )
}

export default Detail;