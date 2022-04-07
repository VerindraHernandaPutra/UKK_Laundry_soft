<template>
  <div>
    
    <!-- Navbar Light -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
      <div class="container">

        <!-- Navbar Title -->
        <router-link to="/">
          <a class="navbar-brand text-monospace" href="#" v-b-tooltip.hover.bottom title="Designed and Coded by Verindra HP" data-placement="bottom" target="_blank">
            <i class="fa-solid fa-tornado fa-fw fa-lg"> </i> Laundry {{ nama_outlet }} 
          </a>
        </router-link>

        <!-- Drop Down if Page is Small -->
        <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse"
          data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon mt-2">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </span>
        </button>

        <!-- Home -->
        <div class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0 ms-lg-12 ps-lg-5" id="navigation">
          <ul class="navbar-nav navbar-nav-hover w-100">
            <li class="nav-item">

              <!-- Route to Home.vue -->
              <router-link tag="li" to="/">
                <a class="nav-link ps-2 justify-content-between cursor-pointer align-items-center"
                  aria-expanded="false"> Home </a>
              </router-link>
            </li>

            <!-- Menu Laundry Dropdown -->
            <li class="nav-item dropdown dropdown-hover mx-2">
              <a class="nav-link ps-2 justify-content-between cursor-pointer align-items-center" id="dropdownMenuPages5"
                data-bs-toggle="dropdown" aria-expanded="false"> Menu Laundry <img src="src/assets/img/down-arrow-dark.svg" alt="down-arrow" class="arrow ms-1">
              </a>

              <!-- Menu Content -->
              <div class="dropdown-menu dropdown-menu-animation dropdown-md p-3 border-radius-lg mt-0 mt-lg-3"
                aria-labelledby="dropdownMenuPages5">
                <div class="d-none d-lg-block">
                  <div
                    class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center px-0">
                    <div class="d-inline-block">
                      <div
                        class="icon icon-shape icon-xs border-radius-md bg-gradient-info text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="fa-solid fa-store fa-fw fa-md"> </i>
                      </div>
                    </div> Menu
                  </div>

                  <!-- Route to User.vue -->
                  <router-link tag="li" to="/user" v-if="role === 'admin'">
                    <a href="#" class="dropdown-item border-radius-md">
                      <span class="ps-3"> <i class="fa-solid fa-user-astronaut fa-fw"></i> User </span>
                    </a>
                  </router-link>

                  <!-- Route to Member.vue -->
                  <router-link tag="li" to="/member" v-if="role !== 'owner'">
                    <a href="#" class="dropdown-item border-radius-md">
                      <span class="ps-3"> <i class="fa-solid fa-users fa-fw"></i> Member </span>
                    </a>
                  </router-link>

                  <!-- Route to Outlet.vue -->
                  <router-link tag="li" to="/outlet" v-if="role === 'admin'">
                    <a href="#" class="dropdown-item border-radius-md">
                      <span class="ps-3"> <i class="fa-solid fa-shop fa-fw"></i> Outlet </span>
                    </a>
                  </router-link>

                  <!-- Route to Paket.vue -->
                  <router-link tag="li" to="/paket" v-if="role === 'admin'">
                    <a href="#" class="dropdown-item border-radius-md">
                      <span class="ps-3"> <i class="fa-solid fa-box fa-fw"></i> Paket </span>
                    </a>
                  </router-link>

                  <!-- Route to Transaksi.vue -->
                  <router-link tag="li" to="/transaksi">
                    <a href="#" class="dropdown-item border-radius-md">
                      <span class="ps-3"> <i class="fa-solid fa-money-bill-transfer fa-fw"></i> Transaksi </span>
                    </a>
                  </router-link>
                </div>
              </div>
            </li>

            <!-- Account Dropdown -->
            <li class="nav-item dropdown dropdown-hover mx-2">
              <a class="nav-link ps-2 justify-content-between cursor-pointer align-items-center" id="dropdownMenuPages5"
                data-bs-toggle="dropdown" aria-expanded="false"> Account <img src="src/assets/img/down-arrow-dark.svg"
                  alt="down-arrow" class="arrow ms-1">
              </a>

              <!-- Account Content -->
              <div class="dropdown-menu dropdown-menu-animation dropdown-md p-3 border-radius-lg mt-0 mt-lg-3"
                aria-labelledby="dropdownMenuPages5">
                <div class="d-none d-lg-block">
                  <div
                    class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center px-0">
                    <div class="d-inline-block">
                      <div
                        class="icon icon-shape icon-xs border-radius-md bg-gradient-info text-center me-2 d-flex align-items-center justify-content-center ps-0">
                        <i class="fa-solid fa-person"></i>
                      </div>
                    </div> {{username}}
                  </div>

                  <!-- Log out -->
                  <a href="#" @click="Logout" class="dropdown-item border-radius-md">
                    <span class="ps-3"> <i class="fa-solid fa-right-from-bracket fa-fw"></i> Log Out</span>
                  </a>
                </div>
              </div>
            </li>

            <!-- Role -->
            <li class="nav-item ms-lg-auto">
              <a class="btn btn-sm  bg-gradient-info  btn-round mb-0 me-1 mt-2 mt-md-0"> {{ role }} </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- MAIN CONTENT -->
    <router-view> </router-view>

    <!-- Footer -->
    <footer class="footer pt-5 mt-5">
      <hr class="horizontal dark mb-5">
      <div class="container">
        <div class=" row">
          <div class="col-12">
            <div class="text-center">
              <p class="my-4 text-sm"> All rights reserved. Copyright © <script>
                  document.write(new Date().getFullYear())
                </script> Laundry Project by <a> Verindra Hernanda Putra </a>. </p>
            </div>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
  module.exports = {
    data: function() {
      return {
        username: "",
        nama_outlet: "",
        id_outlet: "",
        role: "",
      }
    },
    methods: {
      getInfo: function() {
        let config = {
          headers: {
            "Authorization": "Bearer " + this.$cookies.get('Authorization')
          }
        }

        // Login Check
        axios.get(base_url + 'login/check', config).then(response => {
          if (response.data.success == true) {
            this.username = response.data.data.username;
            this.role = response.data.data.role;

            // Get Nama Outlet 
            axios.get(base_url + "outlet/" + response.data.data.id_outlet, config).then(response2 => {
              if (response2.data.success == true) {
                this.nama_outlet = response2.data.data.nama_outlet;
              }
            }).catch(error => {
              console.log(error);
            });
          }
        });
      },
      
      Logout: function() {
        swal.fire({
          title: "Are you sure you want to Log out?",
          text: "Once Logged out you can sign in again",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, I am sure!',
          cancelButtonText: "No, cancel it!",
          closeOnConfirm: false,
          closeOnCancel: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.$cookies.remove("Authorization");
            this.componentName = "login";
            location.reload();
          } else {
            swal.fire('Canceled!', '', 'info')
          }
        })
      },
    },

    mounted() {
      this.getInfo();
    },
  }
</script>