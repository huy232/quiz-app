import {Component} from 'react'

class Questions extends Component {
    render (){
        const {element} = this.props
        console.log(element)
        return (
            <div className="game-question-container">
                <h1 id="display-question">
                    <p>{element.question}</p>
                </h1>
            </div>
        )
    }
}

export default Questions

