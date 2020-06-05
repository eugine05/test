import React from 'react';
import Modal from './components/Modal';
import './styles.css';

export interface IProps {
}

export interface IState {
 /** Модалка открыта */
  modalIsOpen: boolean;
}

/**
 * Первое окно
 *
 * @returns {JSX.Element}
 */
class FirstWindow extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };
  }

  /**
   * Функция открытия модального окна
   */
  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  /**
   * Функция закрытия модального окна
   */
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  /**
   * Рендер
   */
  render() {
    const { modalIsOpen } = this.state;
    return (
      <div>
        <Modal isOpen={modalIsOpen} setClose={this.closeModal} middleScreen={true}>
          <div className="modal-wrapper">
            <h1>Модальное окно</h1>
            <div>
              <button onClick={() => alert('OK')}>ОК</button>
              <button onClick={this.closeModal}>ОТМЕНА</button>
            </div>
          </div>
        </Modal>
        <button onClick={this.openModal} style={{ width: '200px' }}>Открыть окно</button>
      </div>
    );
  }
}

export default FirstWindow;
