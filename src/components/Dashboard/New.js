import React from 'react'
import InfoCard from '../Cards/InfoCard'
import RoundIcon from '../RoundIcon'
import { CartIcon } from '../../icons'

class New extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pendingvalue: 376
        }
    }
    
    render() {
        return (
            <InfoCard title="New transactions" value={this.state.pendingvalue}>
                <RoundIcon
                    icon={CartIcon}
                    iconColorClass="text-blue-500 dark:text-blue-100"
                    bgColorClass="bg-blue-100 dark:bg-blue-500"
                    className="mr-4"
                />
                </InfoCard>
        )
    }
}

export default New