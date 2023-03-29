import {Outlet} from 'react-router-dom';
function About() {
    return (
    <div>
        <h4>about page</h4>
        <Outlet></Outlet>
        {/** outlet이라는 구멍으로 nested route의 위치를 결정 */}
    </div>
    
    );
}
export default About;