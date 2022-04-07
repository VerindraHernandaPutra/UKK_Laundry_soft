<template>
  <section>
    <div class="page-header min-vh-100">
      <div class="container">
        <div class="row">
          <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">

            <div class="card card-plain">
              <div class="card-header pb-0 text-left">
                <h4 class="font-weight-bolder">Login</h4>
                <p class="mb-0">Enter your Username and Password to login</p>
              </div>

              <!-- Form Login -->
              <div class="card-body">
                <form role="form" v-on:submit.prevent="login" class="pt-3" method="post">
                  <div class="mb-3">
                    <input v-model="username" class="form-control form-control-lg" id="username" type="text"
                      placeholder="Username" aria-label="Username">
                  </div>
                  <div class="mb-3">
                    <input v-model="password" class="form-control form-control-lg" id="password" type="password"
                      placeholder="Password" aria-label="Password">
                  </div>
                  <div class="text-center">
                    <input type="submit" value="login" class="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0">
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Design Content -->
          <div
            class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
            <div
              class="position-relative bg-gradient-info h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center">
              <img src="src/assets/img/shapes/pattern-lines.svg" alt="pattern-lines"
                class="position-absolute opacity-4 start-0">
              <div class="position-relative">
                <img class="max-width-500 w-100 position-relative z-index-2" src="src/assets/img/machine-of-death.png">
              </div>
              <h4 class="mt-5 text-white font-weight-bolder">Laundry</h4>
              <p class="text-white">The more effortless the writing looks, the more effort the writer actually put into
                the process.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  module.exports = {
    data: function() {
      return {
        username: "",
        password: "",
        message: "",
      }
    },

    methods: {
      login: function() {
        swal.fire({
          title: 'Now loading',
          allowEscapeKey: false,
          allowOutsideClick: false,
          imageUrl: "src/assets/img/loading-washing-machine.gif",
          showImage: true,
          showConfirmButton: false,
          onOpen: () => {
            swal.showLoading();
            swal.showImage();
          }
        })

        // Mapping Data
        let form = {
          "username": this.username,
          "password": this.password
        }

        // Login Function
        axios.post(base_url + 'login', form).then(response => {
          if (response.data.success == true) {
            swal.fire({
              title: 'Berhasil Login !!!',
              showConfirmButton: false,
            })

            if (this.$cookies.isKey('Authorization')) {
              this.$cookies.remove('Authorization');
            }
            
            this.$cookies.set('Authorization', response.data.data.token);
            location.reload();
          } else {
            swal.fire({
              title: "Error!",
              text: "Username atau Password Salah!",
              icon: "error",
            });
          }
        })
      },
    }
  }
</script>