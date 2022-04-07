<template>
    <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">
        <div class="mb-4 w-50">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"> <router-link to="/"> <a href=""> Home </a> </router-link> </li>
              <li class="breadcrumb-item active" aria-current="page"> Member </li>
            </ol>
          </nav>
        </div>

    <div class="card-header align-center">
        <h3 class="card-title"> Data Member </h3>
    </div>

    <div class="row mt-2"> </div>

    <div class="update ml-auto mr-auto">
        <button v-b-tooltip.hover.bottom title="Tambah Member" class="btn bg-gradient-success w-auto me-2" v-b-modal.modal_member @click="Add()" > <i class="fa-solid fa-person-circle-plus fa-fw fa-lg"></i></button>
    </div>

  <div class="row mt-4"> </div>

        <div class="card">

  <div class="table-responsive">
    <table class="table align-items-center mb-0">
      <thead>
        <tr>
          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 d-flex justify-content-center">
            ID Member
          </th>
          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
            Nama
          </th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
            Jenis Kelamin
          </th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
            Telp
          </th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
            Alamat
          </th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
            Aksi
          </th>
        </tr>
      </thead>

      <!-- Table Content -->
      <tbody>
        <tr v-for="mem in member" :key="mem">
          <td>
            <div class="d-flex justify-content-center">
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-xs"> {{ mem.id_member }} </h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img src="src/assets/img/happy_member.png" class="avatar avatar-sm me-3">
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-xs"> {{ mem.nama }} </h6>
                <p class="text-xs text-secondary mb-0"> Member </p>
              </div>
            </div>
          </td>
          <td class="align-middle text-center text-sm">
            <h6> <b-badge> <span class="badge bg-gradient-info " v-if="mem.jenis_kelamin === 'Laki-laki'">Laki-Laki</span> </b-badge> </h6>
            <h6> <b-badge> <span class="badge bg-gradient-warning" v-if="mem.jenis_kelamin === 'Perempuan'">Perempuan</span> </b-badge> </h6>
            <!-- <span class="badge badge-success"> {{ mem.jenis_kelamin }} </span> -->
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold"> {{ mem.telp }} </span>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold"> {{ mem.alamat }} </span>
          </td>
          <td class="align-middle text-center">
            <a v-b-modal.modal_member class="btn bg-gradient-info w-auto me-1 mb-0" @click="Edit(mem)" v-b-tooltip.hover.bottom title="Ubah Member" > <i class="fa-solid fa-pen-to-square"></i></a>
            <a class="btn bg-gradient-danger w-auto me-1 mb-0" @click="Delete(mem.id_member)" v-b-tooltip.hover.bottom title="Delete Member" > <i class="fa-solid fa-user-minus"></i></a>
          </td>
          <div class="container">
</div>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<b-modal class="modal fade" id="modal_member" ref="modal" title="Form Member" aria-labelledby="exampleModalLabel" aria-hidden="true" size="md" hide-footer hide-header-close>
          <form>
           <div class="row">
             <div class="col-md-12">
                <div class="form-group">
                  <label>Nama</label>
                   <input v-model="nama" id="inputNama" type="text" class="form-control-soft" placeholder="Masukkan nama">
                  </div>
                </div>
             </div>

            <div class="row">
              <div class="col-md-5 pr-1">
                <div class="form-group">
                  <label>Jenis Kelamin</label>
                    <select v-model="jenis_kelamin" id="inputJk" type="enum" class="form-control-soft">
                      <option selected value="">Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                </div>
              </div>

              <div class="col-md-7 pl-1">
                <div class="form-group">
                  <label>Telepon</label>
                    <input v-model="telp" id="inputTlp" type="text" class="form-control-soft" placeholder="Masukkan nomor telepon">
                </div>
              </div>
           </div>

          <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                  <label>Alamat</label>
                  <input v-model="alamat" id="inputAlamat" type="text" class="form-control-soft" placeholder="Masukkan alamat">
                </div>
            </div>
          </div>

          <div class="row">
            <div class="update ml-auto mr-auto">
              <br>
              <button data-bs-dismiss="modal" @click="Save" class="btn bg-gradient-success w-auto me-2 pull-right"> <i class="fa-solid fa-check fa-fw"></i> Simpan </button>
              <button block @click="$bvModal.hide('modal_member')" class="btn bg-gradient-dark w-auto me-2 pull-left"> Cancel </button>
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
            id_member: "",
            nama: "",
            jenis_kelamin:"",
            telp:"",
            alamat:"",
            member: [],
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

          axios.get(base_url + 'member', config)
          .then( response => {
              console.log(response);
            if(response.data.success == true){
                this.member = response.data.data.member;
            }
          })

        },
        Add: function(){
            this.action = "insert";
            this.id_member = "";
            this.nama = "";
            this.jenis_kelamin = "";
            this.telp = "";
            this.alamat = "";
        },
        Edit: function(item){
            this.action = "update";
            this.id_member = item.id_member;
            this.nama = item.nama;
            this.jenis_kelamin = item.jenis_kelamin;
            this.telp = item.telp;
            this.alamat = item.alamat;
        },
        Save: function(){
            let config = {
                headers : {
                "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

            let form = {
                "nama": this.nama,
                "alamat": this.alamat,
                "jenis_kelamin": this.jenis_kelamin,
                "telp": this.telp,
            }

            //logika method post/get (insert /update)
            if(this.action == "insert"){
                axios.post(base_url + 'member', form, config)
                .then( response => {
                  swal.fire("Success!", "Data berhasil ditambahkan", "success");
                    this.$bvModal.hide('modal_member');
                })
            } else { //update
                axios.put(base_url + 'member/' + this.id_member, form, config)
                .then( response => {
                    swal.fire("Success!", "Data berhasil diubah", "success");
                    this.$bvModal.hide('modal_member');
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
                
                axios.delete(base_url + 'member/' + id, config)
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
