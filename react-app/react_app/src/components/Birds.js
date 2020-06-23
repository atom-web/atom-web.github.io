import React from 'react';

function Templated(props) {
  return (
    <div className="col-md-3">
      <div className="wrap">
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
      { key: '1',name: 'Сова', img: 'https://avatars.mds.yandex.net/get-pdb/1706591/0b6ac15d-627c-4ded-ba7d-2df6e7dfe977/s1200?webp=false', desc: 'Ночная птица' },
      { key: '2', name: 'Синица', img: 'https://avatars.mds.yandex.net/get-pdb/202366/0e2c8aa3-ac09-4684-b7ce-ee0d9c2acae5/s1200?webp=false', desc: 'Весенняя птица' },
      { key: '3',name: 'Колибри', img: 'https://avatars.mds.yandex.net/get-pdb/2342895/7f4ff1d6-cbb8-44fb-9441-7cd608f05e94/s1200', desc: 'Маленькая птичка' }
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
