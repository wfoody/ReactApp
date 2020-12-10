import React from 'react'
import './App.css';
import { useEffect, useState } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import { connect } from 'react-redux'



function newApp(props) {


    const [address, setAddress] = useState("", )

    let formattedAddress = address.split(" ").join("%20")


    const getRepInfoByAddress = () => {
        fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDatTrCAc_AsUpv-RrJ1uT-a9kvyF6SJS8&address=${formattedAddress}`)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                props.onFetchReps(result) /* set action for search to button, onChange and onClick */
            })
    }




    useEffect(() => {
        // getRepInfoByAddress()
    }, [])


    const dataItems = props.reps.officials.map(rep => {
        return (
            <div key={rep.normalizedInput}>{rep.officials}</div>
        )
    })


    return (


        <div>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={getRepInfoByAddress}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input {...getInputProps({ placeholder: "Enter address here" })} />

                        <div>
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#65C6F7" : "#fff",
                                    color: suggestion.active ? "#fff" : "#000000"

                                }

                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

            <ul>{dataItems}</ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        reps: state.reps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchReps: (reps) => dispatch({
            type: 'FETCH_REPS',
            payload: reps
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(newApp);
