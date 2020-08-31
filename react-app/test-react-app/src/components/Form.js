import React from 'react';
import "../style.css";

class Form extends React.Component{

    constructor (props) {
        super(props)
        this.state = {
            weight: '0',
            growth: '0',
            age: '0',
            gender: 'men',
            active: '1.2',
            result: '0'
        }
        this.onWeight = this.onWeight.bind(this);
        this.onGrowth = this.onGrowth.bind(this);
        this.resultVal = this.resultVal.bind(this);
        this.onAge = this.onAge.bind(this);
        this.onGender = this.onGender.bind(this);
        this.onActive = this.onActive.bind(this);
    }

    onWeight (evt) {
        this.setState({ weight: Number(evt.target.value) });
    }
    onGrowth (evt) {
        this.setState({ growth: Number(evt.target.value) });
    }
    onAge (evt) {
        this.setState({ age: Number(evt.target.value) });
    }
    onGender (evt) {
        this.setState({ gender: evt.target.value });
    }
    onActive (env) {
        this.setState({ active: Number(env.target.value ) });
    }
    resultVal () {
        const m = (10 * this.state.weight + 6.25 * this.state.growth - 5 * this.state.age + 5) * this.state.active  //Калорийность для муж
        const w = (10 * this.state.weight + 6.25 * this.state.growth - 5 * this.state.age - 161) * this.state.active //Калорийность для жен
        
        //Какой выводить гендер
        if (this.state.gender == "men") {
            this.setState({ result: m });
        } else {
            this.setState({ result: w });
        }
    }

    render(){
        return(
            <div className="form">
                <p className="form__title">Калькулятор</p>
                <p className="form__desc">Расчет потребления питательных элементов для набора мышечной массы. Идеально подходит для любого типа людей.</p>
                <p className="form__result">{this.state.result}</p>
                <form className="form__calc">
                    <input name="weight" placeholder="Введите ваш вес" onChange={this.onWeight}/>
                    <input name="growth" placeholder="Введите ваш рост" onChange={this.onGrowth}/>
                    <input name="age" placeholder="Введите вашу возраст" onChange={this.onAge}/>
                    <div className="check-wrap">
                        <select onChange={this.onActive}>
                            <option value="1.2">Без активности</option>
                            <option value="1.375">Слабая активность</option>
                            <option value="1.55">Средняя активность</option>
                            <option value="1.7">Высокая активность</option>
                            <option value="1.9">Экстремальная активность</option>
                        </select>
                    </div>
                    <div className="radio-wrap">
                        <div className="radio">
                            <label>
                                <input type="radio" name="option" value="men" onChange={this.onGender} defaultChecked/>
                                <span>Мужской</span>
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" name="option" value="women" onChange={this.onGender} />
                                <span>Женский</span>
                            </label>
                        </div>
                    </div>
                    <input type="button" onClick={this.resultVal} value="Расчет" />
                </form>
            </div>
        );
    }
}

export default Form;