<template>
  <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">

        <!-- Outlet Breadcrumb -->
        <div class="mb-4 w-50">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/"> <a href=""> Home </a> </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page"> Outlet </li>
            </ol>
          </nav>
        </div>

        <!-- Header Title -->
        <div class="card-header align-center">
          <h3 class="card-title"> Data Outlet </h3>
        </div>

        <!-- Outlet Content -->
        <div class="row mt-2"> </div>
        <div class="update ml-auto mr-auto">
          <button v-b-tooltip.hover.bottom title="Tambah Outlet" class="btn bg-gradient-success w-auto me-2"
            v-b-modal.modal_outlet @click="Add()"> <i class="fa-solid fa-shop fa-fw fa-lg"></i> + </button>
        </div>
        <div class="row mt-4"> </div>

        <!-- Table Content -->
        <div class="card">
          <div class="table-responsive">
            <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 d-flex justify-content-center">
                    ID Outlet 
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"> 
                    Nama Outlet
                  </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> 
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="out in outlet" :key="out">
                  <td>
                    <div class="d-flex justify-content-center">
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-xs"> {{ out.id_outlet }} </h6>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <img src="src/assets/img/outlet.jpg" class="avatar avatar-sm me-3">
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-xs"> {{ out.nama_outlet }} </h6>
                        <p class="text-xs text-secondary mb-0"> Outlet </p>
                      </div>
                    </div>
                  </td>

                  <td class="align-middle text-center">
                    <a v-b-modal.modal_outlet class="btn bg-gradient-info w-auto me-1 mb-0" @click="Edit(out)"
                      v-b-tooltip.hover.bottom title="Ubah Outlet"> <i class="fa-solid fa-pen-to-square"></i></a>
                    <a class="btn bg-gradient-danger w-auto me-1 mb-0" @click="Delete(out.id_outlet)"
                      v-b-tooltip.hover.bottom title="Delete Outlet"> <i class="fa-solid fa-shop-slash"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Form Modal -->
        <b-modal class="modal fade" id="modal_outlet" ref="modal" title="Form Outlet"
          aria-labelledby="exampleModalLabel" aria-hidden="true" size="md" hide-footer hide-header-close>
          <form>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Nama Outlet</label>
                  <input v-model="nama_outlet" id="inputOutlet" type="text" class="form-control-soft"
                    placeholder="Masukkan Outlet">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="update ml-auto mr-auto">
                <br>
                <button data-bs-dismiss="modal" @click="Save" class="btn bg-gradient-success w-auto me-2 pull-right"> <i
                    class="fa-solid fa-check fa-fw"></i> Simpan </button>
                <button block @click="$bvModal.hide('modal_outlet')" class="btn bg-gradient-dark w-auto me-2 pull-left">
                  Cancel </button>
              </div>
            </div>
          </form>
        </b-modal>
      </div>
    </div>
  </section>
</template>

<script>
  module.exports = {
    data: function() {
      return {
        id_outlet: "",
        nama_outlet: "",
        outlet: [],
        action: ""
      }
    },

    methods: {
      getData: function() {
        let config = {
          headers: {
            "Authorization": "Bearer " + this.$cookies.get('Authorization')
          }
        }
        axios.get(base_url + 'outlet', config).then(response => {
          console.log(response);
          if (response.data.success == true) {
            this.outlet = response.data.data.outlet;
          }
        })
      },

      Add: function() {
        this.action = "insert";
        this.id_outlet = "";
        this.nama_outlet = "";
      },

      Edit: function(item) {
        this.action = "update";
        this.id_outlet = item.id_outlet;
        this.nama_outlet = item.nama_outlet;
      },

      Save: function() {
        let config = {
          headers: {
            "Authorization": "Bearer " + this.$cookies.get('Authorization')
          }
        }
        let form = {
          "nama_outlet": this.nama_outlet,
        }

        // Post Method
        if (this.action == "insert") {
          axios.post(base_url + 'outlet', form, config).then(response => {
            swal.fire("Success!", "Data berhasil ditambahkan", "success");
            this.$bvModal.hide('modal_outlet');
          })
        } else { 
          
          // Update Method
          axios.put(base_url + 'outlet/' + this.id_outlet, form, config).then(response => {
            swal.fire("Success!", "Data berhasil diubah", "success");
            this.$bvModal.hide('modal_outlet');
          })
        }
        this.getData();
      },

      Delete: function(id) {
        swal.fire({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
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
              headers: {
                "Authorization": "Bearer " + this.$cookies.get('Authorization')
              }
            }
            axios.delete(base_url + 'outlet/' + id, config).then(response => {
              swal.fire({
                title: "Success!",
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
              title: "Cancelled!",
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