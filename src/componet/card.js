import React from 'react'
import './card.css'
class card extends React.Component{
    
render(){
    return(
    <div>
        <div className="card col-lg-6 col-sm-12 p-2" id="kotak">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={this.props.cover} className="card-img" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.nama_barang}</h5>
                        <p className="card-text">Harga : {this.props.harga}</p>

                        {/* button untuk mengedit */}
                        <button className="btn btn-sm btn-primary m-1"
                            onClick={this.props.onEdit}>
                                Edit
                        </button>
                            {/* button untuk menghapus */}
                        <button className="btn btn-sm btn-danger m-1"
                            onClick={this.props.onDrop}>
                                Hapus       
                        </button>
                        {/* button untuk menambah ke keranjang belanja */}
                        <button className="btn btn-sm btn-success m-1"
                            onClick={this.props.onCart}>
                                Tambahkan ke keranjang belanja
                            </button>
                                  
                    </div>
                </div>
            </div>
        </div>
    </div>
        )
    }
}
export default card;