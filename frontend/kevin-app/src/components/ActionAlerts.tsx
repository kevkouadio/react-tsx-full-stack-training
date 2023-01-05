import React from 'react'
import Alert from 'react-popup-alert'

const ActionAlert = () => {
  const [alert, setAlert] = React.useState({
    type: 'success',
    text: 'New user added!',
    show: true
  })

  function onCloseAlert() {
    setAlert({
      type: '',
      text: '',
      show: false
    })
  }

  function onShowAlert(type:any) {
    setAlert({
      type: type,
      text: 'New user added!',
      show: true
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
      </div>
      <Alert
        header={'Success'}
        btnText={'Close'}
        text={alert.text}
        type={alert.type}
        show={alert.show}
        onClosePress={onCloseAlert}
        pressCloseOnOutsideClick={false}
        showBorderBottom={true}
        // alertStyles={{}}
        // headerStyles={{}}
        // textStyles={{}}
        // buttonStyles={{}}
      />
    </div>
  )
}

export default ActionAlert