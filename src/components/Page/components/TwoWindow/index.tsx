import React from 'react';
import api from '../../../../lib/api';
import DropDownMenu from './components/DropDownMenu';
import './styles.css';

export interface IProps {
}

export interface IState {
  /** Выбранное название */
  selectType: string;
  /** Массив данных для селекта */
  selectData: [];
}

export interface ITaskDetail {
}

/**
 * Второе окно
 *
 * @returns {JSX.Element}
 */
class TwoWindow extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectType: '',
      selectData: [],
    };
  }

  /**
   * Функция получения данных из айла на сервере
   * @param {string} value название файла
   */
  handleChange = (value: string) => {
    api.getJson(`http://localhost:3000/${value}.json`)
      .then((response: any) => {
        this.setState({ selectData: JSON.parse(response) });
      });
  }

  /**
   * Функция изменения значения селекта
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   */
  changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.handleChange(event.target.value);
    this.setState({ selectType: event.target.value });
  }

  /**
   * Функция изменения значения селекта
   * @param {string} data значение выбора
   */
  onMenuItemClick = (data: string) => {
    this.handleChange(data);
    this.setState({ selectType: data });
  }

  /**
   * Рендер
   */
  render() {
    const { selectData } = this.state;
    const name = ['file1', 'file2'];
    return (
      <div className="select-wrapper">

        <DropDownMenu
          items={name}
          onMenuItemClick={this.onMenuItemClick}
        >
          Выбрать файл
        </DropDownMenu>

        <DropDownMenu
          items={selectData}
        >
          Содержимое
        </DropDownMenu>
      </div>
    );
  }
}

export default TwoWindow;
