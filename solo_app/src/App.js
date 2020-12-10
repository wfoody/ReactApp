
import React from 'react'
import './App.css';
import { useEffect, useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';


function App() {


  // const [data, setData] = useState({elections:[]})

  // useEffect(() => {
  //   fetchData()
  // }, [])


  // const fetchData = () => {
  //   fetch("https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyDatTrCAc_AsUpv-RrJ1uT-a9kvyF6SJS8")
  //   // fetch('https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyDatTrCAc_AsUpv-RrJ1uT-a9kvyF6SJS8&address=320%20Atlanta%20Ave.SE%20Atlanta%20GA%2030315&electionId=7001')
  //     .then(response => response.json())
  //     .then(result => {
  //       setData(result)
  //     })
  // }

  // const dataItems = data.elections.map(dataItem => {

  //   return (

  //     <div>
  //       <li>{dataItem.name}</li>
  //     </div>
  //   )
  // })

  const [address, setAddress] = React.useState("")
  // const [coordinates, setCoordinates] = React.useState({
  //   lat: null,
  //   lng: null
  // })



  const handleSelect = async value => {
    const results = await geocodeByAddress(value)
    // const latLng = await getLatLng(results[0])
    setAddress(value) 
    // setCoordinates(latLng)
    getElectionDataByAddress(value)
    getVoterInfoByAddress(value)
    getRepInfoByAddress(value)
  }

  async function getVoterInfoByAddress(value) {
    let formattedAddress = value.split(" ").join("%20")
    let url = `https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyDatTrCAc_AsUpv-RrJ1uT-a9kvyF6SJS8&address=${formattedAddress}`
    let response = await fetch(url)
    let data = await response.json()

    console.log(data)
  }

  async function getRepInfoByAddress(value) {
    let formattedAddress = value.split(" ").join("%20")
    let url = `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDatTrCAc_AsUpv-RrJ1uT-a9kvyF6SJS8&address=${formattedAddress}`
    let response = await fetch(url)
    let data = await response.json()

    console.log(data)
  }



  async function getElectionDataByAddress (value) {
    let formattedAddress = value.split(" ").join("%20")

    let url = `https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyDatTrCAc_AsUpv-RrJ1uT-a9kvyF6SJS8&address=${formattedAddress}`

    let response = await fetch(url)
    let data = await response.json()

    console.log(data)
  }

  return (

    // <div>
    //   <h1>App</h1>
    //   {dataItems}
    // </div>
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
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
                <div {...getSuggestionItemProps(suggestion, {style})}>
                  {suggestion.description}</div>
              )
            })}
          </div>
        </div>
      )}
      </PlacesAutocomplete>
    </div>
  );
}

export default App;
