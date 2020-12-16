
import { connect } from 'react-redux'
import Search from './Search'
import './styles/results.css'
import Modal from 'react-modal'
import { useState } from 'react'
import Footer from './Footer'
import Note from './Note'

Modal.setAppElement('#root')


function Results(props) {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [official, setOfficial] = useState(null)

    const createModel = () => {

        if (official != null) {

            return (

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    shouldCloseOnOverlayClick={true}

                    style={
                        {
                            overlay: {
                                backgroundColor: null
                            },
                            content: {
                                backgroundColor: "#e0e7f0"
                            }
                        }
                    }
                    className='contactModal'>


                    <p className='contactTitle'><b>Contact {official.name}</b></p>
                    <a href='#' className='phoneNumber'>{official.phones[0]}</a>
                    <a href='#' className='contactEmail'>{official.emails ? official.emails[0] : null}</a>
                    <a href={official.urls ? official.urls[0] : null} target="_blank" rel="noopener noreferrer" className='contactUrl'>{official.urls ? official.urls[0] : null}</a>

                    <div>
                        <button onClick={() => setModalIsOpen(false)} className='modalButton'>Close</button>
                    </div>

                </Modal>

            )
        }

    }

    const showOfficialInfo = (official) => {
        setModalIsOpen(true)
        setOfficial(official)
        //setModalIsOpen(true)
    }

    const officeNames = props.offices.map(office => {

        let officialNames = office.officialIndices.map(index => {
            let official = props.officials[index]


            return (

                <div className='nameAndContact'>

                    <li>{official.name} <span className='partyName'>({official.party})</span></li>

                    <button onClick={() => showOfficialInfo(official)} className='contactButton'>Contact</button>

                </div>
            )


        }).reverse()

        return (
            <div>
                <h1 className='officeName'>{office.name}</h1>
                <ul className='officialName'>{officialNames}</ul>
                <hr></hr>

            </div>
        )
    }).reverse()

    return (
        <div className='resultsContainer'>
            <Search />
            {/* <div>{officialNames}</div><br></br> */}
            <div key={props.officials.normalizedInput} className='results'>{officeNames}</div>
            {createModel()}
            <div className='noteAndFooter'>
                <Note />

                <Footer />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return ({
        officials: state.reps.officials,
        offices: state.reps.offices
    })
}


export default connect(mapStateToProps)(Results)