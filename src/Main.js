function Main (props) {
    return (
        <div className="container-main">
            <table>
                <thead>
                    <tr>
                        <th colSpan={1}>Name</th>
                        <th>Done</th>
                    </tr>
                </thead>
                <tbody>
                    {props.result}
                </tbody>
            </table>
        </div>
    )

}

export default Main;