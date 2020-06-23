import React from 'react';
import Player from './Player'

function Templated(props) {
  return (
    <div className="col-md-2">
      <div className="wrap" onClick={() => Player(props.template.wawe)}>
        <div className="bg">
          <img src={props.template.img} alt="" />
        </div>
          <h3>{props.template.name}</h3>
        <p>{props.template.desc}</p>
      </div>
      
    </div>
  )
}
class TemplateClass extends React.Component{

  state = {
    arrTemp: [
      { key: '1',name: 'DFM', img: 'https://redlabels.ru/wp-content/uploads/2019/04/main-logo-2419c1.png', wawe: 'https://dfm.hostingradio.ru/dfm96.aacp', desc: 'Club' },
      { key: '2', name: 'Радио Record', img: 'https://redlabels.ru/wp-content/uploads/2019/04/record.jpg', wawe: 'http://air.radiorecord.ru:8102/club_320', desc: 'Club' }
    ]
  }


  render() {
    return (
      <div className="content">
        <div className="container">
          <div className="row">
            { this.state.arrTemp.map(Templatef => {
              return (
                <Templated template={Templatef} key={Templatef.key}/>
              )
            }) }
          </div>
        </div>
      </div>
    )
  }


}




export default TemplateClass;
