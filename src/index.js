import React, { useState, useEffect, Fragment } from 'react';
import EventDispatcher from '@garney/event-dispatcher';

import './modal.scss';


class ModalDispatcher extends EventDispatcher {
  constructor() {
    super();
    this.state = false;
  }

  showModal(options) {
    this.state = {
      ...options,
      visible: true
    };
    this.dispatchEvent(ModalDispatcher.events.SET_MODAL, this.state);
  }

  hideModal() {
    this.state = {
      visible: false
    };
    this.dispatchEvent(ModalDispatcher.events.SET_MODAL, this.state);
  }
  get status() {
    return this.state;
  }
}

ModalDispatcher.instance = new ModalDispatcher();
ModalDispatcher.events = {
  SET_MODAL: "SET_MODAL"
};
function Modal({modalStyle, popUpStyle, popUpContentStyle}) {

  const [options, setOptions] = useState({
    visible: false,
    customContent: null
  });

  let defaultModalStyle =  {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  if(modalStyle) {
    modalStyle = {
      ...defaultModalStyle,
      ...modalStyle
    }
  }

  const defaultPopUpStyle = {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    padding: '5px 20px',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  };
  if(popUpStyle) {
    popUpStyle = {
      ...defaultPopUpStyle,
      ...popUpStyle
    }
  }
  const defaultPopUpContentStyle = {
    display: 'flex',
    minWidth: 200,
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center'
  };

  if(popUpContentStyle) {
    popUpContentStyle = {
      ...defaultPopUpContentStyle,
      ...popUpContentStyle
    }
  }
  const popUpTitleStyle = {
    marginTop: 5
  };

  useEffect(() => {
    ModalDispatcher.instance.addEventListener(ModalDispatcher.events.SET_MODAL, (options) => {
      setOptions(options);
    })
  }, []);

  const title = options.title ? (
      <h1 className="title" style={popUpTitleStyle}>
        {options.title}
      </h1>
  ) : '';

  const popUp = (
      <div className="pop-up" style={popUpStyle}>
        {title}
        <div className="content" style={popUpContentStyle}>
          {options.message}
        </div>

      </div>
  );

  const view = options.visible ? (
      <div style={modalStyle} onClick={() =>{
        ModalDispatcher.instance.hideModal();
      }}>
        {options.customContent ? options.customContent : popUp}
      </div>
  ): '';
  return view;
}

function showModal(options) {
  ModalDispatcher.instance.showModal(options)
}

function hideModal() {
  ModalDispatcher.instance.hideModal()
}


module.exports = {
  Modal,
  showModal,
  hideModal
};