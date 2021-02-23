import Card from '../componet/card' 
import Nav from '../componet/nav'
import React,{Component} from "react";
import $ from "jquery";
export default class beranda extends React.Component{
    constructor(){
        super()
        this.state={
            list:[{nama_barang:"Tang",harga:200000,cover:"https://drive.google.com/uc?id=1EDGjFWQSqPB777gpSYSTpWYaFVcuN1cb"}],
            nama_barang:"",
            beli:0,
            harga:0,
            total:0,
            cover:"",
            action: " ",
            filterList:[],
            selectedItem: null,
        }
        this.state.filterList = this.state.list
    }
    Add = () => {
        // menampilkan komponen modal
        $("#modal_list").modal("show")
        this.setState({
            nama_barang:"",
            harga:0,
            cover:"",
            action: "insert"
        })
    }
    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal_list").modal("show")
        this.setState({
            nama_barang: item.nama_barang,
            harga:item.harga,
            cover:item.cover,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        // menampung data state buku
        let tempList = this.state.list

        if (this.state.action === "insert") {
            // menambah data baru
            tempList.push({
                nama_barang: this.state.nama_barang,
                harga:this.state.harga,
                cover:this.state.cover
            })
        }else if(this.state.action === "update"){
            // menyimpan perubahan data
            let index = tempList.indexOf(this.state.selectedItem)
            tempList[index].nama_barang = this.state.nama_barang
            tempList[index].harga=this.state.harga
            tempList[index].cover=this.state.cover
        }

        this.setState({list : tempList})
        
        // menutup komponen modal_buku
        $("#modal_list").modal("hide")
 }
 //nambahNama
 setUser = () => {
    //cek eksistensi atau keberandaan dari local storage
    if(localStorage.getItem("user") === null){
        //kondisi jika local storage "user" belum dibuat
        let prompt = window.prompt("Masukan Nama Anda","")
        if(prompt === null || prompt === ""){
            //kia user tidak mengisi namanya
            this.setUser()
        } else {
            //jika user telah mengisikan namanya

            //simpan namauser ke local storage
            localStorage.setItem("user", prompt)

            //simpan nama user ke state.user
            this.setState({user: prompt})
        }
    } else {
        //kondisi saat local storage "user" telah dibuat

        //akses nilai local storage "user"
        let name = localStorage.getItem("user")
        this.setState({user: name})
    }
}

//fungsi digunakan setelah fungsi render dieksekusi
componentDidMount(){
    this.setUser()
}

//fungsi menambah ke keranjang dengan local storage
addToCart = (selectedItem) => {
    //membuat sebuah variabel utnuk menampung cart sementara
    let tempCart = []

    //cek eksistensi dari data cart ke local storage
    if(localStorage.getItem("cart") !== null){
        //JSON.parse() digunakan untuk mengkonversikan dari string ke array objek
        tempCart = JSON.parse(localStorage.getItem("cart"))
    }



    // cek data yang dipilih user ke keranjang belanja
    let existItem = tempCart.find(item => item.isbn === selectedItem.isbn)

    //cek hasil
    if(existItem){
        //jika item yang dipilih ada pada keranjang akan mucul sebuah peringatan user telah meimilih tersebut
        window.alert("Anda telah memilihi item ini")
    } else {
        //user diminta memasukan jummlah item yang akan dibeli
        let promptJumlah = window.prompt("Memasukan jumlah item yang dibeli", "")
        if(promptJumlah !== null & promptJumlah !== ""){
            //jiak user memasukan jumlah item yang dibeli

            //menambahkan properti "jumalh beli" pada item yang dipilih
            selectedItem.jumlahBeli = promptJumlah

            //memasukan item yang dipilih ke dalam cart
            tempCart.push(selectedItem)

            //simpan array tempCart ke localstorage
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
    }
}
 Drop = (item) => {
    // beri konfirmasi untuk menghapus data
    if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
        // menghapus data
        let tempList = this.state.list
        // posisi index data yg akan dihapus
        let index = tempList.indexOf(item)

        // hapus data
        tempList.splice(index, 1)

        this.setState({list: tempList})
    }
}
searching = event => {
    if(event.keyCode === 13){
        // 13 adalah kode untuk tombol enter

        let keyword = this.state.keyword.toLowerCase()
        let tempList = this.state.list
        let result = tempList.filter(item => {
            return item.nama_barang.toLowerCase().includes(keyword) ||
            item.harga.toLowerCase().includes(keyword) 
        })

        this.setState({filterList: result})
    }
}


    render(){
        return(
            <div>
                <input type="text" className="form-control my-2" placeholder="Pencarian"
                value={this.state.keyword}
                onChange={ev => this.setState({keyword: ev.target.value})}
                onKeyUp={ev => this.searching(ev)}
                 />
                <br/>
                <h4 className="text-info my-2">
                        Nama Pengguna : {this.state.user}
                </h4>
                <br/>
                <div>
                    {this.state.filterList.map((item,index) =>(
                        <Card
                            nama_barang={item.nama_barang}
                            harga={item.harga}
                            cover={item.cover}
                            onEdit={ () => this.Edit(item)}
                            onDrop={ () => this.Drop(item)}
                            onCart={ () => this.addToCart(item)}
                        />
                    ))}
                </div>
                <br/>
                <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah Data
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_buku">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-header">
                                Form Buku
                            </div>

                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Barang
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.nama_barang}
                                    onChange={ ev => this.setState({nama_barang: ev.target.value}) }
                                    required />
                                    
                                    Harga
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.harga}
                                    onChange={ ev => this.setState({harga: ev.target.value}) }
                                    required />
                                    
                                    Cover 
                                    <input type="url" className="form-control mb-2"
                                    value={this.state.cover}
                                    onChange={ ev => this.setState({cover: ev.target.value}) }
                                    required />

                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}