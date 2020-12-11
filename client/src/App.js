
import React from 'react'
import './App.css';
import { useEffect, useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { connect } from 'react-redux'

function App(props) {

  // const [coordinates, setCoordinates] = React.useState({
  //   lat: null,
  //   lng: null
  // })

  // const [reps, setReps] = useState({})



  const [address, setAddress] = React.useState("")

  let formattedAddress = address.split(" ").join("%20")

  useEffect(() => {
    // getRepInfoByAddress()
  }, [])

  // const handleSelect = async value => {
  //   const results = await geocodeByAddress(value)
  //   const latLng = await getLatLng(results[0])
  //   setAddress(value)
  //   // setCoordinates(latLng)
  //   // getElectionDataByAddress(value)
  //   // getVoterInfoByAddress(value)
  //   getRepInfoByAddress(value)
  //     // .then(displayInfo())
  // }


  const getRepInfoByAddress = () => {
    // let formattedAddress = value.split(" ").join("%20")
    fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDatTrCAc_AsUpv-RrJ1uT-a9kvyF6SJS8&address=${formattedAddress}`)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        props.onFetchReps(result)
      })
  }

  // function displayInfo() {
    

  // }

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
