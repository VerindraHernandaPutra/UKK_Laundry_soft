<template>
  <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">

        <!-- User Breadcrumb -->
        <div class="mb-4 w-50">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/"> <a href=""> Home </a> </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page"> User </li>
            </ol>
          </nav>
        </div>

        <!-- Header Title -->
        <div class="card-header align-center">
          <h3 class="card-title"> Data User </h3>
        </div>

        <!-- Transaksi Content -->
        <div class="row mt-2"> </div>
        <div class="update ml-auto mr-auto">
          <button v-b-tooltip.hover.bottom title="Tambah User" class="btn bg-gradient-success w-auto me-2"
            v-b-modal.modal_user @click="Add()"> <i class="fa-solid fa-person-circle-plus fa-fw fa-lg"></i></button>
        </div>
        <div class="row mt-4"> </div>

        <!-- Table Content -->
        <div class="card">
          <div class="table-responsive">
            <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 d-flex justify-content-center">
                    ID User 
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"> 
                    Nama 
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"> 
                    Username 
                  </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> 
                    Role
                  </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> 
                    Nama Outlet 
                    </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> 
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="ser in user" :key="ser">
                  <td>
                    <div class="d-flex justify-content-center">
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-xs"> {{ ser.id_user }} </h6>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <img src="src/assets/img/blue-avatar.jpg" class="avatar avatar-sm me-3">
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-xs"> {{ ser.nama }} </h6>
                        <p class="text-xs text-secondary mb-0"> User </p>
                      </div>
                    </div>
                  </td>

                  <td class="align-middle">
                    <h6 class="mb-0 text-xs"> {{ ser.username }} </h6>
                  </td>

                  <td class="align-middle text-center text-sm">
                    <h6>
                      <b-badge> <span class="badge bg-gradient-primary " v-if="ser.role === 'admin'">Admin</span>
                      </b-badge>
                    </h6>
                    <h6>
                      <b-badge> <span class="badge bg-gradient-secondary" v-if="ser.role === 'kasir'">Kasir</span>
                      </b-badge>
                    </h6>
                    <h6>
                      <b-badge> <span class="badge bg-gradient-dark" v-if="ser.role === 'owner'">Owner</span> </b-badge>
                    </h6>
                  </td>

                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold"> {{ ser.outlet.nama_outlet }} </span>
                  </td>

                  <td class="align-middle text-center">
                    <a v-b-modal.modal_user class="btn bg-gradient-info w-auto me-1 mb-0" @click="Edit(ser)"
                      v-b-tooltip.hover.bottom title="Ubah User"> <i class="fa-solid fa-pen-to-square"></i></a>
                    <a class="btn bg-gradient-danger w-auto me-1 mb-0" @click="Delete(ser.id_user)"
                      v-b-tooltip.hover.bottom title="Delete User"> <i class="fa-solid fa-user-minus"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Form Modal -->
        <b-modal class="modal fade" id="modal_user" ref="modal" title="Form User" aria-labelledby="exampleModalLabel"
          aria-hidden="true" size="md" hide-footer hide-header-close>
          <form>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Nama</label>
                  <input v-model="nama" id="inputNama" type="text" class="form-control-soft"
                    placeholder="Masukkan Nama">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Username</label>
                  <input v-model="username" id="inputUsername" type="text" class="form-control-soft"
                    placeholder="Masukkan Username">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Password</label>
                  <input v-model="password" id="inputPassword" type="password" class="form-control-soft"
                    placeholder="Masukkan Password">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-5 pr-1">
                <div class="form-group">
                  <label>Role</label>
                  <select v-model="role" id="inputRole" type="enum" class="form-control-soft">
                    <option selected value="">Pilih role</option>
                    <option value="admin"> Admin </option>
                    <option value="kasir"> Kasir </option>
                    <option value="owner"> Owner </option>
                  </select>
                </div>
              </div>

              <div class="col-md-7 pl-1">
                <div class="form-group">
                  <label>Outlet</label>
                  <b-form-select class="form-control-soft" v-model="id_outlet" :options="data_outlet"></b-form-select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="update ml-auto mr-auto">
                <br>
                <button data-bs-dismiss="modal" @click="Save" class="btn bg-gradient-success w-auto me-2 pull-right"> <i
                    class="fa-solid fa-check fa-fw"></i> Simpan </button>
                <button block @click="$bvModal.hide('modal_user')" class="btn bg-gradient-dark w-auto me-2 pull-left">
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
        nama: "",
        username: "",
        password: "",
        nama_outlet: "",
        role: "",
        action: "",
        outlet: "",
        user: [],
        data_outlet: [],
      }
    },

    methods: {
      getData: function() {
        let config = {
          headers: {
            "Authorization": "Bearer " + this.$cookies.get('Authorization')
          }
        }
        axios.get(base_url + 'user', config).then(response => {
          console.log(response);
          if (response.data.success == true) {
            this.user = response.data.data.user;
          }
        })
      },

      getOutletDropdown: function() {

        // Get Outlet Data for Dropdown
        let config = {
          headers: {
            "Authorization": 'Bearer ' + this.$cookies.get('Authorization')
          }
        };
        axios.get(base_url + "outlet", config).then(response => {
          let json_outlet = response.data.data.outlet;
          let list_outlet = [{
            value: "",
            text: "-- Pilih Outlet --"
          }]
          json_outlet.forEach(element => {
            list_outlet.push({
              value: element.id_outlet,
              text: element.nama_outlet
            })
          });
          this.data_outlet = list_outlet
        });
      },

      Add: function() {
        this.action = "insert";
        this.id_outlet = "";
        this.id_user = "";
        this.nama = "";
        this.username = "";
        this.password = "";
        this.role = "";
      },

      Edit: function(item) {
        this.action = "update";
        this.id_outlet = item.id_outlet;
        this.id_user = item.id_user;
        this.nama = item.nama;
        this.username = item.username;
        this.password = item.password;
        this.role = item.role;
      },

      Save: function() {
        let config = {
          headers: {
            "Authorization": "Bearer " + this.$cookies.get('Authorization')
          }
        }
        let form = {
          "id_outlet": this.id_outlet,
          "nama": this.nama,
          "username": this.username,
          "password": this.password,
          "role": this.role,
        }

        // Post Method
        if (this.action == "insert") {
          axios.post(base_url + 'user', form, config).then(response => {
            swal.fire("Success!", "Data berhasil ditambahkan", "success");
            this.$bvModal.hide('modal_user');
          })
        } else { 
          
          // Update Method
          axios.put(base_url + 'user/' + this.id_user, form, config).then(response => {
            swal.fire("Success!", "Data berhasil diubah", "success");
            this.$bvModal.hide('modal_user');
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
            axios.delete(base_url + 'user/' + id, config).then(response => {
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
      this.getOutletDropdown();
    },
  }
</script>