import React from 'react';
import FirstWindow from './components/FirstWindow';
import TwoWindow from './components/TwoWindow';
import './styles.css';

export interface IProps {
}

export interface IState {
  /** Шаг */
  step: string;
}

/**
 * Главная страница
 *
 * @returns {JSX.Element}
 */
class Page extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      step: 'first',
    };
  }

  /**
   * Функция переключения окна
   * @param {string} step название шага
   */
  changeStep = (step: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ step });
  }

  /**
   * Рендер
   */
  public render() {
    const { step } = this.state;
    return (
      <div className="wrapper">
        <div className="window">
          {step === 'first' ?
            <FirstWindow/>
            :
            <TwoWindow/>
          }
        </div>
        <div className="buttons">
          <button onClick={this.changeStep('first')}>Первая вкладка</button>
          <button onClick={this.changeStep('two')}>Вторая вкладка</button>
        </div>
      </div>
    );
  }
}

export default Page;
