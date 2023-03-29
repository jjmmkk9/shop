import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase } from '../store/userSlice';
import {plus, removeItem} from '../store';

export default function Cart(){

    //redux store의 state 꺼내는법
    let states = useSelector((state) => {return state});
    let dispatch = useDispatch();

    return(
        <div>
            <h2>{states.user.name} {states.user.age}의 장바구니</h2>
            <Table >
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {states.cart.map(function(el,index){
                        return(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{el.name}</td>
                                <td>{el.count}</td>
                                <td><button onClick={()=>{dispatch(plus(el.id))}}>추가</button></td>
                                <td><button onClick={()=>{dispatch(removeItem(el.id))}}>삭제</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    )
}