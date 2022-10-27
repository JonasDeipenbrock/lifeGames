import { Link, Outlet } from "react-router-dom";

const Root = () => {
    return (
        <>
            <div>Hello World</div>
            <nav>
                <ul>
                    <li>
                        <Link to={"lifesGame"}>Life's Game</Link>
                    </li>
                    <li>
                        <Link to={"gameOfLife"}>Game of Life</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
};
export default Root;
