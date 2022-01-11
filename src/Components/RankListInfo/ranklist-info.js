import {Component} from 'react'

class RankListInfo extends Component {

    render() {
        const { element } = this.props;
        return (
            <tr>
                <td>{element.username}</td>
                <td>{element.score}</td>
            </tr>
        )
    }
}

export default RankListInfo