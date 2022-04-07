<template>

    <!-- Home Header -->
    <header>
        <div class="page-header min-vh-75" style="background-image: url('src/assets/img/laundry-white.jpg');">
            <span class="mask bg-gradient-info opacity-8"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center mx-auto my-auto">
                        <h1 class="text-white"><i class="fa-solid fa-tornado fa-fw fa-lg"> </i> Laundry
                            {{ nama_outlet }}</h1>
                        <p class="lead mb-4 text-white opacity-8"> Welcome, {{ username }} </p>
                        <div class="row mt-7"> </div>
                    </div>
                </div>
            </div>

            <!-- Wave Animation -->
            <div class="position-absolute w-100 z-index-1 bottom-0">
                <svg class="waves" viewBox="0 24 150 40" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave"
                            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
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

        <!-- Admin Dashboard Content -->
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
            getOutletNow: function() {
                let config = {
                    headers: {
                        "Authorization": "Bearer " + this.$cookies.get('Authorization')
                    }
                }

                // Get Username and Role
                axios.get(base_url + 'login/check', config).then(response => {
                    if (response.data.success == true) {
                        this.username = response.data.data.username;
                        this.role = response.data.data.role;

                        // Get Nama Outlet 
                        axios.get(base_url + "outlet/" + response.data.data.id_outlet, config).then(
                            response2 => {
                                if (response2.data.success == true) {
                                    this.nama_outlet = response2.data.data.nama_outlet;
                                }
                            }).catch(error => {
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
                axios.get(base_url + 'member', config).then(response => {
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
                axios.get(base_url + 'outlet', config).then(response => {
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
                axios.get(base_url + 'paket', config).then(response => {
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
                axios.post(base_url + "transaksi/report", form, conf).then(response => {
                    this.transaksi = response.data.data;
                }).catch(error => {
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