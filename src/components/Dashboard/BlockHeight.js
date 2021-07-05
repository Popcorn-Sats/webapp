import React from 'react'
import InfoCard from '../Cards/InfoCard'
import RoundIcon from '../RoundIcon'
import { HomeIcon } from '../../icons'

class BlockHeight extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blockheight: '653,695'
        }
    }
    /*componentDidMount() {
        fetch('http://192.168.0.2:3060/blocktip')
        .then(results => {
        return results.json();
        })
        data.map((txn) => {
            return(
                <div key={blocktip.hash}>
                </div>
            )
            
        },
        this.setState({transactions: transactions})
        )
    }*/
    
    render() {
        return (
            <InfoCard title="Block Height" value={this.state.blockheight}>
                <RoundIcon
                    icon={HomeIcon}
                    iconColorClass="text-orange-500 dark:text-orange-100"
                    bgColorClass="bg-orange-100 dark:bg-orange-500"
                    className="mr-4"
                />
            </InfoCard>
        )
    }
}

export default BlockHeight