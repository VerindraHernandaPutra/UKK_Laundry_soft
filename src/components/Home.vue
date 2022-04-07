<template>
    <header>
        <div class="page-header min-vh-75" style="background-image: url('src/assets/img/laundry-white.jpg');">
            <span class="mask bg-gradient-info opacity-8"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center mx-auto my-auto">
                        <h1 class="text-white"><i class="fa-solid fa-tornado fa-fw fa-lg"> </i> Laundry {{ nama_outlet }}</h1>
                        <p class="lead mb-4 text-white opacity-8"> Welcome, {{ username }} </p>
                          <div class="row mt-7"> </div>
                    </div>
                </div>
            </div>
            <div class="position-absolute w-100 z-index-1 bottom-0">
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 40" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="moving-waves">
            <use xlink:href="#gentle-wave" x="48" y="-1" fill="rgba(255,255,255,0.40" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.35)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.25)" />
            <use xlink:href="#gentle-wave" x="48" y="8" fill="rgba(255,255,255,0.20)" />
            <use xlink:href="#gentle-wave" x="48" y="13" fill="rgba(255,255,255,0.15)" />
            <use xlink:href="#gentle-wave" x="48" y="16" fill="rgba(255,255,255,1" />
          </g>
        </svg>
            </div>
        </div>

        <section class="pt-3 pb-4">
            <div class="container">
                <div class="row">
                <div class="col-lg-10 z-index-2 border-radius-xl mt-n10 mx-auto py-3 blur shadow-blur">
                    <div class="row">
                    <div class="col-md-3 position-relative">
                        <div class="p-3 text-center">
                        <h1 class="text-gradient text-info"><span> {{ member.length }} </span></h1>
                        <h5 class="mt-3">Member</h5>
                        <p class="text-sm">Laundry Member</p>
                        </div>
                        <hr class="vertical dark">
                    </div>
                    <div class="col-md-3 position-relative">
                        <div class="p-3 text-center">
                        <h1 class="text-gradient text-info"> <span> {{ outlet.length }} </span></h1>
                        <h5 class="mt-3"> Outlet </h5>
                        <p class="text-sm"> Laundry Outlet </p>
                        </div>
                        <hr class="vertical dark">
                    </div>
                    <div class="col-md-3 position-relative">
                        <div class="p-3 text-center">
                        <h1 class="text-gradient text-info"> <span> {{ paket.length }} </span></h1>
                        <h5 class="mt-3"> Paket </h5>
                        <p class="text-sm"> Laundry Paket </p>
                        </div>
                        <hr class="vertical dark">
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 text-center">
                        <h1 class="text-gradient text-info"> <span> {{ transaksi.length }} </span> </h1>
                        <h5 class="mt-3"> Transaksi </h5>
                        <p class="text-sm"> Laundry Transaksi </p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

    <!-- <section class="pt-2 pb-6">
        <div class="container">
            <div class="row justify-content-center text-center">
                <div class="col-md-3">
                    <h1 class="text-gradient text-info"> {{ member.length }} </h1>
                    <h5> Member </h5>
                    <p> Laundry Member </p>
                </div>
                <div class="col-md-3">
                    <h1 class="text-gradient text-info"> {{ outlet.length }} </h1>
                    <h5>Outlet</h5>
                    <p> Laundry Outlet </p>
                </div>
                <div class="col-md-3">
                    <h1 class="text-gradient text-info"> {{ paket.length }} </h1>
                    <h5> Paket </h5>
                    <p> Paket Laundry </p>
                </div>
                <div class="col-md-3">
                    <h1 class="text-gradient text-info"> {{ transaksi.length }} </h1>
                    <h5> Transaksi </h5>
                    <p> Transaksi Laundry </p>
                </div>
            </div>
        </div>
    </section> -->

    <!-- <section class="pt-sm-8 pb-5 position-relative bg-gradient-dark">
        <div class="position-absolute w-100 z-inde-1 top-0 mt-n3">
            <svg width="100%" viewBox="0 -2 1920 157" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>wave-down</title>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g fill="#FFFFFF" fill-rule="nonzero">
            <g id="wave-down">
              <path d="M0,60.8320331 C299.333333,115.127115 618.333333,111.165365 959,47.8320321 C1299.66667,-15.5013009 1620.66667,-15.2062179 1920,47.8320331 L1920,156.389409 L0,156.389409 L0,60.8320331 Z" id="Path-Copy-2" transform="translate(960.000000, 78.416017) rotate(180.000000) translate(-960.000000, -78.416017) "></path>
            </g>
          </g>
        </g>
      </svg>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-8 text-start mb-5 mt-5">
                    <h3 class="text-white z-index-1 position-relative">The Founder</h3>
                    <p class="text-white opacity-8 mb-0">There’s nothing I really wanted to do in life that I wasn’t able to get good at. That’s my skill.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-12">
                    <div class="card card-profile overflow-hidden">
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-12 pe-lg-0">
                                <a href="javascript:;">
                                    <div class="p-3 pe-md-0">
                                        <img class="w-100 border-radius-md" src="src/assets/img/kal-visuals-square.jpg" alt="image">
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-8 col-md-6 col-12 ps-lg-0 my-auto">
                                <div class="card-body">
                                    <h5 class="mb-0"> Verindra Hernanda Putra </h5>
                                    <h6 class="text-info"> SMK TELKOM MALANG </h6>
                                    <p class="mb-0">Artist is a term applied to a person who engages in an activity deemed to be an art.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="position-absolute w-100 bottom-0 mn-n1">
            <svg width="100%" viewBox="0 -1 1920 166" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>wave-up</title>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(0.000000, 5.000000)" fill="#FFFFFF" fill-rule="nonzero">
            <g id="wave-up" transform="translate(0.000000, -5.000000)">
              <path d="M0,70 C298.666667,105.333333 618.666667,95 960,39 C1301.33333,-17 1621.33333,-11.3333333 1920,56 L1920,165 L0,165 L0,70 Z" fill="#f8f9fa"></path>
            </g>
          </g>
        </g>
      </svg>
        </div>
    </section> -->

    </header>
    

</template>

<script>
    module.exports = {
        data: function() {
            return {
                member: [],
                outlet: [],
                paket: [],
                transaksi: [],
                nama_outlet: "",
                id_outlet: "",
                username: "",

            }
        },
        methods: {

            getOutletNow: function(){
          let config = {
            headers : {
              "Authorization" : "Bearer " + this.$cookies.get('Authorization')
            }
          }

          axios.get(base_url + 'login/check', config)
          .then( response => {
            if(response.data.success == true){
              this.username = response.data.data.username;
              this.role = response.data.data.role;

        // Get Nama Outlet 
          axios.get(base_url + "outlet/" + response.data.data.id_outlet, config)
          .then(response2 => {
            if(response2.data.success == true){
              this.nama_outlet = response2.data.data.nama_outlet;
            }
          })
          .catch(error => {
            console.log(error);
          });
        }
      });
      
    },

            getDataMember: function() {
                let config = {
                    headers: {
                        "Authorization": "Bearer " + this.$cookies.get('Authorization')
                    }
                }
                axios.get(base_url + 'member', config)
                    .then(response => {
                        console.log(response);
                        if (response.data.success == true) {
                            this.member = response.data.data.member;
                        }
                    })
            },

            getDataOutlet: function() {
                let config = {
                    headers: {
                        "Authorization": "Bearer " + this.$cookies.get('Authorization')
                    }
                }
                axios.get(base_url + 'outlet', config)
                    .then(response => {
                        console.log(response);
                        if (response.data.success == true) {
                            this.outlet = response.data.data.outlet;
                        }
                    })
            },

            getDataPaket: function() {
                let config = {
                    headers: {
                        "Authorization": "Bearer " + this.$cookies.get('Authorization')
                    }
                }
                axios.get(base_url + 'paket', config)
                    .then(response => {
                        console.log(response);
                        if (response.data.success == true) {
                            this.paket = response.data.data.paket;
                        }
                    })
            },

            getDataTransaksi: function() {
                let conf = {
                    headers: {
                        "Authorization": 'Bearer ' + this.$cookies.get('Authorization')
                    }
                };
                let form = {
                    "tahun": this.tahun,
                    "bulan": this.bulan,
                    "tgl": this.tgl
                }
                axios.post(base_url + "transaksi/report", form, conf)
                    .then(response => {
                        this.transaksi = response.data.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

        },
        mounted() {
            this.getDataMember();
            this.getDataOutlet();
            this.getDataPaket();
            this.getDataTransaksi();
            this.getOutletNow();


        }
    }
</script>