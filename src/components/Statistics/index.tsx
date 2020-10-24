import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { LinearProgress } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles'
import { Data } from '../../interfaces/Data';
import './Statistics.css'

export const Statistics: React.FC = () => {
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        api.get("trashpoint").then((response) => {
            const data = response.data
            setCurrentData(data);
        })
    }, [])


    const totalReports = Object.keys(currentData).length;

    const volunteers = currentData.filter((data: any) => data.assignee != '').length;

    const BorderLinearProgress = withStyles((theme) => ({
        root: {
            height: 15,
            borderRadius: 6,
        },
        colorPrimary: {
            backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: {
            borderRadius: 5,
            backgroundColor: '#1a90ff',
        },
    }))(LinearProgress);


    return (
        <>
            <div className="statistics">
                <h1 className= "h1">
                    Reports  {totalReports}
                </h1>
                <h1 className="h1">
                    Volunteers  {volunteers}
                </h1>
                <h1 className="h1">
                    Reports Solutioned
                </h1>
                <div className="progress">
                    <BorderLinearProgress
                        value={(100 * volunteers / totalReports * 0.5)}
                        variant='determinate'
                    />
                </div>
            </div>
        </>

    );

}
