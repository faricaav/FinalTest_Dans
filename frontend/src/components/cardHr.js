import React from "react"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Card extends React.Component{
    render(){
    return (
        <div className="col-lg-3 col-sm-12 p-2">
            <div className="card">
                <div className="card-body row" style={{height: '150px'}}>
                    {/* menampilkan Gambar / cover */}
                    <div className="col-12" align="center">
                        <h1 className="text-blue text-sm" align="center">
                            { this.props.title }
                        </h1>
                    </div>

                    {/* menampilkan deskripsi */}
                    <br/>
                    <div className="col-12 mt-2" align="center">
                        <h5 className="text-dark text-sm" align="center">
                            { this.props.deskripsi }
                        </h5>
                    </div>

                    {/* button untuk detail */}
                    <div align="center" className="mt-2">
                    <button className="btn btn-sm btn-primary mx-2 col-2"
                        onClick={this.props.onEdit}>
                        <FontAwesomeIcon icon={faPenToSquare}/>
                    </button>
                    <button className="btn btn-sm btn-danger col-2"
                        onClick={this.props.onDrop}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}
export default Card;