import React from 'react';
import './styles/search.css';
import { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../images/america.jpg';
import { NavLink } from 'react-router-dom';
import useOnclickOutside from "react-cool-onclickoutside";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Search(props) {

    const [address, setAddress] = useState("");
    const [openMenu, setOpenMenu] = useState(false);

    const ref = useOnclickOutside(() => {
        setOpenMenu(false);
    });

    const handleClickButton = () => {
        setOpenMenu(!openMenu);
    };

    const navigate = useNavigate();

    let formattedAddress = address.split(" ").join("%20");


    const getRepInfoByAddress = () => {

        fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDatTrCAc_AsUpv-RrJ1uT-a9kvyF6SJS8&address=${formattedAddress}`)
            .then(response => {
                if (!response.ok) {
                    throw toast('Please enter a valid US address!', {
                        className: "customToast"
                    }
                    )
                } return response.json()
            })
            .then(result => {
                console.log(result)
                props.onFetchReps(result)
            }).then(() => toResults());
    };

    const toResults = () => {
        navigate('/results')
    };

    function handleKeyPress(e) {
        if (e.keyCode === 13) {
            getRepInfoByAddress();
        }
    };

    return (
        <div className='wholeComponentResults'>
            <h1 className='searchTitle'><NavLink to='/' className='searchTitle'>REPRESENT</NavLink></h1>
            <img src={logo} className='searchLogo' alt='American flag' />
            <div>
                <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={setAddress}
                    className='boxAndSuggestions'>

                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <div className='inputAndButton'>
                                <input type='text' className='inputText' {...getInputProps({ placeholder: "ENTER ADDRESS TO FIND YOUR REPRESENTATIVES" })} required onKeyUp={handleKeyPress} />
                                <button onClick={getRepInfoByAddress} className='searchButton'>SEARCH</button>
                            </div>
                            <div>
                                <div onClick={handleClickButton}></div>
                                {openMenu && <div ref={ref}></div>}
                            </div>
                            <div>
                                {loading ? <div className='loading'>...loading</div> : null}

                                {suggestions.map((suggestion) => {
                                    const style = {
                                        backgroundColor: suggestion.active ? "#0e448b" : "#fff",
                                        color: suggestion.active ? "#fff" : "#000000"
                                    }
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, { style })} className='dropdownItem' >
                                            {suggestion.description}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        reps: state.reps
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchReps: (reps) => dispatch({
            type: 'FETCH_REPS',
            payload: reps
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
