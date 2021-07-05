import React from 'react'
import InfoCard from '../Cards/InfoCard'
import RoundIcon from '../RoundIcon'
import { ChatIcon } from '../../icons'

class Unconfirmed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: '615,000,000'
        }
    }
    
    render() {
        return (
            <InfoCard title="Mempool" value="18 MB">
                <RoundIcon
                    icon={ChatIcon}
                    iconColorClass="text-teal-500 dark:text-teal-100"
                    bgColorClass="bg-teal-100 dark:bg-teal-500"
                    className="mr-4"
                />
                </InfoCard>
        )
    }
}

export default Unconfirmed