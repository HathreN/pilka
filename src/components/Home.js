import React, {useEffect, useState} from 'react';
import axios from "axios";
import {FaTv, FaArrowCircleRight} from "react-icons/fa";
import ReactPaginate from 'react-paginate';

const Home = () => {

    const [roundMatches, setRoundMatches] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [renderAll, setRenderAll] = useState(false);
    useEffect(() => {
        fetchData()
        sortMatches()
    }, [renderAll]);

    async function fetchData() {
        let response = await axios(
            `https://php74.appgo.pl/sport_api/api/public/api/games`
            , {
                params: {
                    page: 1,
                    onPage: 130,
                    orderDirection: "asc",
                    orderBy: 'round'
                }
            }
        );
        let data = response.data;
        return data;
    }

    async function sortMatches() {
        const data = await fetchData()
        if (data) {
            let tempRoundTable = [];
            for (let x = 1; x < data.data.length; x++) {
                let tempTable = [];
                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i].round == x) {
                        tempTable.push(data.data[i])
                    }
                }
                if (tempTable.length > 0) {
                    tempRoundTable.push(tempTable)
                }
            }
            setRoundMatches(tempRoundTable)
            setLoading(false);
        }
    }


    function Items({currentItems}) {
        return (
            <div id="teamsTable">
                {currentItems &&
                    currentItems.map((item) => (
                        <div id="round"><p id="roundText">Runda {item[0].round}</p>
                            {!isLoading && item.map((item, index,) => {
                                if (index < 4)
                                    return (
                                        <div id="roundMatches">
                                            <div id="matchData">
                                                <div id="matchDate">
                                                    {item.date}
                                                </div>
                                                <div id="teams">
                                                    <div id={"teamCredentials"}>
                                                        <img id="teamImage" src={item.home_team_object.image}/>
                                                        <p id="team">{item.home_team}</p>
                                                    </div>
                                                    <div id={"teamCredentials"}>
                                                        <img id="teamImage" src={item.away_team_object.image}/>
                                                        <p id="team">{item.away_team}</p>
                                                    </div>
                                                </div>
                                                <div id="matchScores">
                                                    <div>{item.home_score}</div>
                                                    <div>{item.away_score}</div>
                                                </div>
                                                <div id="matchDetails">
                                                    <div id="watchButton"><FaTv/></div>
                                                    <div id="detailsButton"><p id="detailsButtonText">Szczegóły</p>
                                                        <p
                                                            id="detailsArrow"><FaArrowCircleRight/></p></div>
                                                </div>
                                            </div>
                                            {index != 3 && <div id="line"></div>}
                                        </div>
                                    )
                            })}
                        </div>
                    ))}
            </div>
        );
    }

    function PaginatedItems({itemsPerPage}) {

        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = roundMatches.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(roundMatches.length / itemsPerPage);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % roundMatches.length;

            setItemOffset(newOffset);
        };

        return (
            <div id="controls=">
                <Items currentItems={currentItems}/>
                <ReactPaginate
                    nextLabel="Dalej >"
                    nextClassName={'arrows'}
                    marginPagesDisplayed={0}
                    onPageChange={handlePageClick}
                    pageClassName={'currentPage'}
                    pageRangeDisplayed={0}
                    pageCount={pageCount}
                    previousClassName={'arrows'}
                    previousLabel="< Wstecz"
                    containerClassName={'pagination'}
                />
            </div>
        );
    }

    function toggleRenderAll() {
        if (renderAll == false ? setRenderAll(true) : setRenderAll(false)) ;
    }

    return (
        <div id="mainPageHome">
            <div>
                <div id="allMatches">
                    <div id="allButton" onClick={() => {
                        toggleRenderAll()
                    }}>Wszystkie
                    </div>
                </div>
                <div id="leagueName">
                    <div id="league"><img id="flag"
                                          src="https://m.media-amazon.com/images/I/41G0-4KDjbL.jpg"/><p
                        id="leagueText"> Anglia: Premier League</p></div>
                    <div id="leagueTable" onClick={() => (window.location='/table')}><p
                        id="navigationButton">Tabela</p><p
                        id="navigationArrow"><FaArrowCircleRight/>
                    </p></div>
                </div>
                {!isLoading && !renderAll && <PaginatedItems itemsPerPage={3}/>}
                {!isLoading && renderAll &&
                    <div id="teamsTable">
                        {roundMatches.map((item, index) => (
                            <div id="round"><p id="roundText">Runda {item[0].round}</p>
                                {!isLoading && item.map((item, index,) => (
                                    <div id="roundMatches">
                                        <div id="matchData">
                                            <div id="matchDate">
                                                {item.date}
                                            </div>
                                            <div id="teams">
                                                <div id={"teamCredentials"}>
                                                    <img id="teamImage" src={item.home_team_object.image}/>
                                                    <p id="team">{item.home_team}</p>
                                                </div>
                                                <div id={"teamCredentials"}>
                                                    <img src={item.away_team_object.image}/>
                                                    <p id="team">{item.away_team}</p>
                                                </div>
                                            </div>
                                            <div id="matchScores">
                                                <div>{item.home_score}</div>
                                                <div>{item.away_score}</div>
                                            </div>
                                            <div id="matchDetails">
                                                <div id="watchButton"><FaTv/></div>
                                                <div id="detailsButton"><p id="detailsButtonText">Szczegóły</p><p
                                                    id="detailsArrow"><FaArrowCircleRight/></p></div>
                                            </div>
                                        </div>
                                        {index < 9 && <div id="line"></div>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>}
            </div>
        </div>
    );

}

export default Home;