/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

function ModalBetaInfo({message, showModal}) {
    
  return <div className="modal">
  <div className="modal__box">
    <p>This is a pre-release BETA version. This Beta version does not represent the final quality of the back office. Thank you for your understanding and support.</p>
  <p className="">{message}</p>
    <button onClick={showModal}>Ok</button>
  </div>
  </div>
}

export default ModalBetaInfo

