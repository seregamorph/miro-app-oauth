import * as React from 'react'
import * as ReactDOM from 'react-dom'
import axios, {AxiosResponse} from 'axios'

import './styles.css'

function App() {
    const [boardState, setBoardState] = React.useState({
        title: ''
    })

    const [authState, setAuthState] = React.useState({
        authorized: ''
    })

    function resetAuthState() {
        setAuthState({authorized: ""})
    }

    async function getBoardId() {
        const boardInfo = await miro.board.getInfo()
        setBoardState({title: boardInfo.id})
    }

    async function getIdToken() {
        const token = await miro.board.getIdToken()
        console.error(`Id token is "${token}"`)
    }

    async function getSelfUser() {
        const backendUrl = new URL(window.location.href)
        backendUrl.pathname = "/get-self-user"

        const token = await miro.board.getIdToken()
        resetAuthState()
        axios.get(backendUrl.href,
            {
                headers: {
                    "X-Miro-Token": token
                }
            })
            .then((response: AxiosResponse) => {
                console.error(`callBackend: "${response.data.name}"`)
            })
            .catch((error) => {
                let message = error.message
                if (error.response) {
                    message = JSON.stringify(error.response.data)
                } else if (error.request) {
                    message = "request: " + error.request
                }

                console.error(`callBackend error: "${message}"`)
                alert(`callBackend: error "${message}"`)
            });
    }

    return (
        <div className="container centered">
            <div>Board title is: {boardState.title}</div>
            <br/>
            <button onClick={() => getBoardId()}>Get board title</button>
            <br/>
            <br/>
            <div>Authorized: {authState.authorized}</div>
            <br/>
            <button onClick={() => getIdToken()}>getIdToken</button>
            <br/>
            <br/>
            <button onClick={() => getSelfUser()}>call backend: getSelfUser</button>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
