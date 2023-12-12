import React, {useEffect, useState} from 'react';
import axios from "axios";
import {FaArrowCircleRight} from "react-icons/fa";

const Table = () => {

    const [teamsData, setTeamsData] = useState([])
    const [isLoading, setIsLoading] = useState([true])

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://php74.appgo.pl/sport_api/api/public/api/table',
        }).then((response) => {
            const data = response.data;
            setTeamsData(data);
            setIsLoading(false);
        }).catch((error) => {
            alert('Error retrieving data!');
            console.log(error);
        });
    }, []);
    console.log(teamsData)

    return (
        <div id="mainPage">
            <div>
                <div id="leagueName">
                    <div id="league"><img id="flag"
                                          src="https://m.media-amazon.com/images/I/41G0-4KDjbL.jpg"/><p
                        id="leagueText"> Anglia: Premier League</p></div>
                    <div id="leagueTable" onClick={() => (window.location='/')}><p
                        id="detailsButtonText">Mecze</p><p
                        id="detailsArrow"><FaArrowCircleRight/>
                    </p></div>
                </div>
                <div id="teamsTable">
                    <div id="tableHeader"><p id="headerPosition">LP.</p><p id="headerName">DRUŻYNA </p><p
                        id="headerMatches">M </p><p id="headerGoals">B </p><p id="headerRatio">RB </p><p
                        id="headerPoints">P </p></div>
                    {!isLoading &&
                        teamsData.map((item, index) => {
                                if (index < 8)
                                    return (
                                        <div id="roundMatches">
                                            <div id="singleTeam">
                                                <div id={"teamTablePosition" + (index + 1)}>
                                                    {item.team.id}
                                                </div>
                                                <div id="singleTeamTable">
                                                    <div id="teamCredentials">
                                                        <img id="teamImage" src={item.team.image}/>
                                                        <p id="teamName">{item.team.name}</p>
                                                    </div>
                                                </div>
                                                <div id="scores">
                                                    <div id="matches">
                                                        {item.games}
                                                    </div>
                                                    <div id="goals">
                                                        {item.goals_scored}:{item.goals_conceded}
                                                    </div>
                                                    <div id="ratio">
                                                        {item.goals_ratio}
                                                    </div>
                                                    <div id="points">
                                                        {item.points}
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="line"></div>
                                        </div>
                                    )
                            }
                        )}
                    <div id="tableLegend">
                        <div id="legendSingle"><div id="legendPromotion"></div><p>Awans - Liga Mistrzów (Runda grupowa)</p></div>
                        <div id="legendSingle"><div id="legendPromotionEurope"></div><p>Awans - Liga Europy (Runda grupowa)</p></div>
                        <div id="legendSingle"><div id="legendDemotion"></div><p>Spadek - Championship</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table;