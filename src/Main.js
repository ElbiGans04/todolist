import './Main.css';


function Main (props) {
    return (
        <div className="container-main">
            <ul>
                {props.result}
            </ul>
        </div>
    )

}

export default Main;