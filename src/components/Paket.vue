<template>
    <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">
        <div class="mb-4 w-50">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"> <router-link to="/"> <a href=""> Home </a> </router-link> </li>
              <li class="breadcrumb-item active" aria-current="page"> Paket </li>
            </ol>
          </nav>
        </div>

    <div class="card-header align-center">
        <h3 class="card-title"> Data Paket </h3>
    </div>

    <div class="row mt-2"> </div>

    <div class="update ml-auto mr-auto">
        <button v-b-tooltip.hover.bottom title="Tambah Paket" class="btn bg-gradient-success w-auto me-2" v-b-modal.modal_paket @click="Add()" > <i class="fa-solid fa-box fa-fw fa-lg"></i> + </button>
    </div>

  <div class="row mt-4"> </div>

        <div class="card">

  <div class="table-responsive">
    <table class="table align-items-center mb-0">
      <thead>
        <tr>
          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 d-flex justify-content-center">
            ID Paket
          </th>
          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
            Jenis
          </th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
            Harga
          </th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
            Aksi
          </th>
        </tr>
      </thead>

      <!-- Table Content -->
      <tbody>
        <tr v-for="pak in paket" :key="pak">
          <td>
            <div class="d-flex justify-content-center">
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-xs"> {{ pak.id_paket }} </h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img src="src/assets/img/laundry-basket.jpg" class="avatar avatar-sm me-3">
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-xs"> {{ pak.jenis }} </h6>
              </div>
            </div>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold"> {{ pak.harga }} </span>
          </td>
          <td class="align-middle text-center">
            <a v-b-modal.modal_paket class="btn bg-gradient-info w-auto me-1 mb-0" @click="Edit(pak)" v-b-tooltip.hover.bottom title="Ubah Paket" > <i class="fa-solid fa-pen-to-square"></i></a>
            <a class="btn bg-gradient-danger w-auto me-1 mb-0" @click="Delete(pak.id_paket)" v-b-tooltip.hover.bottom title="Delete Paket" > <i class="fa-solid fa-box fa-fw"></i> - </a>
          </td>
          <div class="container">
</div>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<b-modal class="modal fade" id="modal_paket" ref="modal" title="Form Paket" aria-labelledby="exampleModalLabel" aria-hidden="true" size="md" hide-footer hide-header-close>
          <form>
           <div class="row">
             <div class="col-md-12">
                <div class="form-group">
                  <label>Jenis Paket</label>
                  <select v-model="jenis" id="jenis" type="enum" class="form-control">
                    <option selected value="">Pilih jenis paket</option>
                    <option value="kiloan">Kiloan</option>
                    <option value="selimut">Selimut</option>
                    <option value="bed_cover">Bed Cover</option>
                    <option value="kaos">Kaos</option>
                  </select>
                </div>
                </div>
             </div>

            <div class="row">
              <div class="col-md-5 pr-1">
                <div class="form-group">
                  <label>Harga</label>
                  <input v-model="harga" id="harga" type="text" class="form-control" placeholder="Masukkan Harga">
                 </div>
              </div>

          <div class="row">
            <div class="update ml-auto mr-auto">
              <br>
              <button data-bs-dismiss="modal" @click="Save" class="btn bg-gradient-success w-auto me-2 pull-right"> <i class="fa-solid fa-check fa-fw"></i> Simpan </button>
              <button block @click="$bvModal.hide('modal_paket')" class="btn bg-gradient-dark w-auto me-2 pull-left"> Cancel </button>
            </div>                         
          </div>
        </form>
      </b-modal>

      </div>  
    </div>
  </section>

</template>

<script>
module.exports =  {
    data: function(){
        return {
            id_paket:"",
            jenis:"",
            harga:"",
            paket:[],
            action:""
        }
    },
    methods: {
        getData: function(){
            let config = {
                headers : {
                "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

          axios.get(base_url + 'paket', config)
          .then( response => {
              console.log(response);
            if(response.data.success == true){
                this.paket = response.data.data.paket;
            }
          })

        },
        Add: function(){
            this.action = "insert";
            this.id_paket = "";
            this.jenis = "";
            this.harga = "";
        },
        Edit: function(item){
            this.action = "update";
            this.id_paket = item.id_paket;
            this.jenis = item.jenis;
            this.harga = item.harga;
        },
        Save: function(){
            let config = {
                headers : {
                "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

            let form = {
                "jenis": this.jenis,
                "harga": this.harga,
            }

            //logika method post/get (insert /update)
            if(this.action == "insert"){
                axios.post(base_url + 'paket', form, config)
                .then( response => {
                  swal.fire("Success!", "Data berhasil ditambahkan", "success");
                    this.$bvModal.hide('modal_paket');
                })
            } else { //update
                axios.put(base_url + 'paket/' + this.id_paket, form, config)
                .then( response => {
                    swal.fire("Success!", "Data berhasil diubah", "success");
                    this.$bvModal.hide('modal_paket');
                })
            }
            
            this.getData();
            
        },

        Delete: function(id){
            swal.fire({
              title: "Are you sure?",
              text: "Once deleted, you will not be able to recover this imaginary file!",
              icon: "warning",
              showClass: {
              popup: 'animate__animated animate__fadeInDown'},
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'Yes, I am sure!',
              cancelButtonText: "No, cancel it!",
              closeOnConfirm: false,
              closeOnCancel: true
            })
            .then((result) => {
              if (result.isConfirmed) {
                let config = {
                    headers : {
                        "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                    }
                }
                
                axios.delete(base_url + 'paket/' + id, config)
                .then( response => {
                    swal.fire({
                      title:"Success!", 
                      text: "Data berhasil dihapus", 
                      icon: "success", 
                      confirmButtonColor: '#5edd55', 
                      hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                      }
                      });

                    this.getData();
                }) 
  
                } else {
                    swal.fire({
                      title:"Cancelled!",
                      text: "Data gagal dihapus", 
                      icon: "error", 
                      confirmButtonColor: '#5edd55', 
                      hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                      }
                      });
              }
});
        },
        
    },
    mounted() {
        this.getData();
    },
}
</script>