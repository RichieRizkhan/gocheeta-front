import React, { Component } from 'react'
import axios from 'axios'

export default class updateform extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            cname : "",
            version : "",
            year : ""
        }
      

    }

     componentDidMount(){
        
          axios.post('http://localhost:8080/crudapid/webapi/myresource/searchCar',{id:this.props.match.params.id}).then((res)=>{
                console.log(res.data)
                this.setState({cname:res.data.carname})
                this.setState({year:res.data.year})
                this.setState({version:res.data.version})  

                axios.post('http://localhost:8080/crudapid/webapi/myresource/update',this.state).then((res)=>{
                    if(res){
                        console.log()        
                    }

                }).catch((err)=>{

                })

          }).catch((err)=>{
              console.log(err)

          })
    
    }
   

    render() {
        return (
            <div>

                <h1>Update</h1>
                <form>
                    <input type="text" value={this.state.cname}></input>
                    <input type="text" value={this.state.version}></input>
                    <input type="text" value={this.state.year}></input>
                     <button>Update</button>
                </form>
                


            </div>
        )
    }
}
