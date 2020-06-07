import React from 'react';
import './styles.css';

export interface IProps {
  /** Модалка открыта */
  items: string[];
  /** Модалка открыта */
  onMenuItemClick?: (data: string) => void;
}

export interface IState {
  /** Выбранное название */
  dropped: boolean;
}

/**
 * Выпадающее меню.
 */
class DropDownMenu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      dropped: false,
    };
  }

  /** Событие смены состояния (раскрыто меню или закрыто) */
  changeState = () => this.setState((state) => ({ dropped: !state.dropped }));

  /** Событие клика на пункт меню */
  onMenuItemClick = (item: string) => () => {
    const { onMenuItemClick } = this.props;
    onMenuItemClick && onMenuItemClick(item);
  }

  /**
   * Рендер
   */
  render() {
    const { items, children } = this.props;
    const { dropped } = this.state;
    const [containerClass, menuClass] = dropped ? ['container-active', 'menu-active'] : ['', ''];
    return (
      <div
        className={`drop-down-container ${containerClass}`}
        onMouseEnter={this.changeState}
        onMouseLeave={this.changeState}
      >
        <div className="title">
          {children}
        </div>

        <menu className={`menu ${menuClass}`}>
          {items.map((item: string, key) => (
            <li key={key} onClick={this.onMenuItemClick(item)}>{item}</li>
          ))}
        </menu>
      </div>
    );
  }
}

export default DropDownMenu;
