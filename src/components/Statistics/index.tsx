import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { LinearProgress } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles'
import YellowBin from '../../images/trashcan yellow.svg'
import GreenBin from '../../images/trashcan green.svg'
import RedBin from '../../images/trashcan red.svg'
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

    const inProgress = currentData.filter((data: any) => data.progress == "in-progress").length;
    
    const completed = currentData.filter((data: any) => data.progress == "completed").length;


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
            backgroundColor: '#33261d',
        },
    }))(LinearProgress);


    return (
        <>
            <div className="statistics">
                <h1 className= "h1">
                     Reports - {totalReports}
                </h1>
                <h1 className="h1">
                     Volunteers - {volunteers}
                </h1>
                
                <div className="binned" >
                    <img className="bin" src={RedBin} />

                    <h1 className="h1">
                        New Reports - {totalReports - inProgress - completed}
                    </h1>

                </div>

                <div className="binned" >
                    <img className="bin" src={YellowBin} />
                    
                    <h1 className="h1">
                        In Progress - {inProgress}
                    </h1>

                </div>

                <div className="binned" >
                    <img className="bin" src={GreenBin} />

                    <h1 className="h1">
                        Completed  - {completed}
                    </h1>

                </div>

                <h1 className="text_right">By working together, we can all contribute to keep our cities clean and environmentally friendly. </h1>

            </div>
        </>

    );

}


/*
                <div className="progress">
                    <BorderLinearProgress
                        value={(100 * inProgress / totalReports)}
                        variant='determinate'
                    />
                </div>


                <div className="binned" >
                    <img className="bin" src={GreenBin} />

                    <h1 className="h1">
            Reports Completed
                    </h1>
                    

                </div>
                <div className="progress">
                    <BorderLinearProgress
                        value={(100 * completed / totalReports)}
                        variant='determinate'
                    />
                </div>

"*/