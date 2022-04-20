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

    // async function updateAuthState() {
    //     let authorized = await miro.isAuthorized()
    //     setAuthState({authorized: authorized ? "✅" : "❌"})
    //     return authorized
    // }

    async function getBoardId() {
        const boardInfo = await miro.board.getInfo()
        setBoardState({title: boardInfo.id})
    }

    // async function getScopes() {
    //     const scopes = await miro.currentUser.getScopes()
    //     console.error(`Scopes: ${scopes}`)
    //     await miro.showNotification(`Scopes: ${scopes}`)
    // }

    // async function getClientId() {
    //     const clientId = miro.board.getClientId()
    //     await miro.showNotification(`Client id : ${clientId}`)
    // }

    // async function getToken() {
    //     const token = await miro.getToken()
    //     await updateAuthState()
    //     console.error(`You should not use this method!!! Token is "${token}"`)
    //     alert(`You should not use this method!!! Token is "${token}"`)
    // }

    async function getIdToken() {
        const token = await miro.board.getIdToken()
        //await updateAuthState()
        console.error(`Id token is "${token}"`)
        //await miro.showNotification(`Id token is ${token}`)
    }

    // async function isAuthorized() {
    //     const isAuthorized = await updateAuthState()
    //     console.error(`Is authorized: "${isAuthorized}"`)
    //     await miro.showNotification(`Is authorized ${isAuthorized}`)
    // }

    // async function requestAuthorization() {
    //     const redirectUrl = new URL(window.location.href)
    //     redirectUrl.pathname = "/install"
    //
    //     await miro.board.requestAuthorization({
    //         state: "test-state",
    //         redirect_uri: redirectUrl.href
    //     })
    //     await updateAuthState()
    //     console.error(`Authorization requested`)
    // }

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
                //miro.showNotification(`callBackend: user name="${response.data.name}"`)
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
            {/*<br/>*/}
            {/*<button onClick={() => deleteAllContent()}>Delete all content</button>*/}
            {/*<br/>*/}
            {/*<button onClick={() => getScopes()}>getScopes</button>*/}
            <br/>
            <br/>
            <div>Authorized: {authState.authorized}</div>
            {/*<br/>*/}
            {/*<button onClick={() => getClientId()}>getClientId</button>*/}
            {/*<br/>*/}
            {/*<button onClick={() => getToken()}><del>getToken</del></button>*/}
            <br/>
            <button onClick={() => getIdToken()}>getIdToken</button>
            {/*<br/>*/}
            {/*<button onClick={() => isAuthorized()}>isAuthorized</button>*/}
            {/*<br/>*/}
            {/*<button onClick={() => authorize()}><del>authorize</del></button>*/}
            {/*<br/>*/}
            {/*<button onClick={() => requestAuthorization()}>requestAuthorization</button>*/}
            <br/>
            <br/>
            <button onClick={() => getSelfUser()}>call backend: getSelfUser</button>
            {/*<br/>*/}
            {/*<button onClick={() => createBoard()}>call backend: create new Board in account</button>*/}
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
