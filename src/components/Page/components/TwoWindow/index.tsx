import React from 'react';
import api from '../../../../lib/api';
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
   * Рендер
   */
  render() {
    const { selectType, selectData } = this.state;

    return (
      <div className="select-wrapper">
        <select onChange={this.changeSelect} value={selectType}>
          <option disabled value="">Выберите пункт</option>
          <option value="file1">file1</option>
          <option value="file2">file2</option>
        </select>

        <select>
          {selectData.map((value, key) => <option value={value} key={key}>{value}</option>)}
        </select>
      </div>
    );
  }
}

export default TwoWindow;
