import React from 'react'
import InfoCard from '../Cards/InfoCard'
import RoundIcon from '../RoundIcon'
import { MoneyIcon } from '../../icons'

class TotalBalance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: '615,000,000'
        }
    }
    
    render() {
        return (
            <InfoCard title="Account Balance" value={this.state.balance + " sats"}>
                <RoundIcon
                    icon={MoneyIcon}
                    iconColorClass="text-green-500 dark:text-green-100"
                    bgColorClass="bg-green-100 dark:bg-green-500"
                    className="mr-4"
                />
            </InfoCard>
        )
    }
}

export default TotalBalance