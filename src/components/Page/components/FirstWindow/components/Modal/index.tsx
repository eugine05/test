import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

export interface IProps {
  /** Модалка открыта */
  isOpen: boolean;
  /** Колбэк на закрытие модалки */
  setClose: () => void;
  /** Серидина экрана */
  middleScreen: boolean;
}

export interface IState {
}

/**
 * Компонент-класс Modal для отображения модального окна
 */
export default class Modal extends React.Component<IProps, IState> {
  /** Серидина экрана */
  root: HTMLDivElement;

  constructor(props: IProps) {
    super(props);

    this.state = {};

    this.root = document.createElement('div');
  }

  /**
   * componentDidUpdate метод
   */
  componentDidUpdate(prevProps: IProps) {
    const { isOpen } = this.props;
    isOpen ? this.openModal() : this.closeModal();
  }

  /**
   * Метод для закрытия модального окна.
   *
   * Удаляет узел к которому крепится модалка из DOM и разрешает работу скролов.
   */
  closeModal = () => {
    if (document.body.contains(this.root)) {
      document.body.removeChild(this.root);
      document.body.style.overflow = 'auto';
    }
  }

  /**
   * Метод открытия модального окна.
   *
   * Производит добавление модального окна в DOM (к которому прикрепляется модалка) и
   * производит скрытие скролов.
   */
  openModal = () => {
    if (!document.body.contains(this.root)) {
      document.body.appendChild(this.root);
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Функция обертка для колбека для закрытия модального окна.
   *
   * Перед закрытием модалки, проверяет что клик был
   * совершен по тому элементу, на которое был повешен евент
   * @param event {Event}
   */
  eventCloseModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      this.props.setClose();
    }
  }

  /**
   * Рендер
   */
  render() {
    const { children, middleScreen } = this.props;
    return ReactDOM.createPortal(
      <div
        className={`modal ${middleScreen ? 'modal-in-center' : ''}`}
        onClick={this.eventCloseModal}
      >
        {children}
      </div>,
      this.root,
    );
  }
}
