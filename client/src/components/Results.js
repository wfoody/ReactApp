
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

    const officeNames = props.offices.map(office => {

        let officialNames = office.officialIndices.map(index => {
            let official = props.officials[index]



            return (
                
                <div className='nameAndContact'>
                    <li>{official.name} ({official.party})</li>

                    <button onClick={() => setModalIsOpen(true)}>Contact</button>

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
                                    backgroundColor: "white"
                                }
                            }
                        }
                        className='contactModal'>
                        <p key={official.name}><b>Contact {official.name}</b></p>
                        <a key={official.name} href='tel:{official.phones[0]}' className='phoneNumber'>{official.phones[0]}</a>
                        <div>
                            <button onClick={() => setModalIsOpen(false)}>Close</button>
                        </div>

                    </Modal>
                </div>
            )


        })

        return (
            <div>
                <h1 className='officeName'>{office.name}</h1>
                <ul className='officialName'>{officialNames}</ul>
            </div>
        )
    })

    return (
        <div className='container'>
            <Search />
            {/* <div>{officialNames}</div><br></br> */}
            <div key={props.officials.normalizedInput} className='results'>{officeNames}</div>
            <Note />

            <Footer />
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