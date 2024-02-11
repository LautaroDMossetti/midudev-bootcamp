import { Sub } from '../types'

interface ListProps {
    subs: Array<Sub>
}

const List = ({subs}: ListProps) => {
    return (
        <ul>
            {subs.map(sub => {
                return (
                <li key={sub.nick}>
                    <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
                    <h4>{sub.nick} (<small>{sub.subMonths}</small>)</h4>
                    <p>{sub.description?.substring(0, 100)}</p>
                </li>
                )
            })}
        </ul>
    )
}

export default List