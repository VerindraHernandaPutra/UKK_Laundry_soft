<template>
  <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">

        <!-- Transaksi Breadcrumb -->
        <div class="mb-4 w-50">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/"> <a href=""> Home </a> </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page"> Transaksi </li>
            </ol>
          </nav>
        </div>

        <!-- Header Title -->
        <div class="card-header align-center">
          <h3 class="card-title"> Data Transaksi </h3>
        </div>

        <!-- Transaksi Content -->
        <div class="row mt-2"> </div>
        <div class="update ml-auto mr-auto">
          <router-link class="btn bg-gradient-success w-auto me-2" to="/input-transaksi" v-b-modal.modal_transaksi
            @click="Add()" v-if="role !== 'owner'" v-b-tooltip.hover.bottom title="Tambah Transaksi"> <i
              class="fa-solid fa-money-bill-transfer fa-fw"> </i> + </router-link>
        </div>
        <div class="row mt-4"> </div>
        <br>

        <!-- Select Tahun dan Bulan -->
        <form>
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="form-group">
                <label for="tahun" class="col-form-label">Tahun</label>
                <b-form-select class="form-control" @change="getData($event)" v-model="tahun" :options="list_years">
                </b-form-select>
              </div>
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="form-group">
                <label for="tahun" class="col-form-label">Bulan</label>
                <b-form-select class="form-control" @change="getData($event)" v-model="bulan" :options="list_months">
                </b-form-select>
              </div>
            </div>
          </div>
        </form>

        <!-- Table Content -->
        <div class="card">
          <div class="table-responsive">
            <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 d-flex justify-content-center">
                    ID Transaksi 
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"> 
                    Nama Member
                  </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> 
                    Tgl 
                  </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> 
                    Status
                  </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> 
                    Status Pembayaran 
                  </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> 
                    Tgl Pembayaran 
                  </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> 
                    Kasir
                  </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> 
                    Total
                  </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> 
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="trs in transaksi" :key="trs">
                  <td>
                    <div class="d-flex justify-content-center">
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-xs"> {{ trs.id_transaksi }} </h6>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <img src="src/assets/img/green-avatar.jpg" class="avatar avatar-sm me-3">
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-xs"> {{ trs.nama_member }} </h6>
                      </div>
                    </div>
                  </td>

                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold"> {{ trs.tgl }} </span>
                  </td>

                  <td class="align-middle text-center text-sm">
                    <select :disabled="role === 'owner'" class="form-control"
                      @change="changeStatus(trs.id_transaksi, $event)">
                      <option value="baru" :selected="trs.status === 'baru'">Baru</option>
                      <option value="proses" :selected="trs.status === 'proses'">Proses</option>
                      <option value="selesai" :selected="trs.status === 'selesai'">Selesai</option>
                      <option value="diambil" :selected="trs.status === 'diambil'">Diambil</option>
                    </select>
                  </td>

                  <td class="align-middle text-center">
                    <select :disabled="role === 'owner'" class="form-control"
                      @change="changeBayar(trs.id_transaksi, $event)">
                      <option value="dibayar" :selected="trs.dibayar === 'dibayar'">Dibayar</option>
                      <option value="belum_dibayar" :selected="trs.dibayar === 'belum_dibayar'">Belum Dibayar</option>
                    </select>
                  </td>

                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold"> {{ trs.tgl_bayar }} </span>
                  </td>

                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold"> {{ trs.kasir }} </span>
                  </td>

                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold"> {{ trs.total }} </span>
                  </td>

                  <td class="align-middle text-center">
                    <a v-b-modal.modal_detail href="#" class="btn bg-warning w-auto me-1 mb-0"
                      @click="detail(trs.detail_transaksi, trs.total)" v-b-tooltip.hover.bottom
                      title="Detail Transaksi"> <i class="fa-solid fa-info"></i> </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Form Modal -->
        <b-modal id="modal_detail" ref="modal" title="Detail Transaksi" size="lg" hide-footer="true">
          <a href="#" class="btn btn-sm  bg-gradient-info" @click="cetak()"><i class="mdi mdi-printer"></i>Print</a>
        <div class="table-responsive" id="print">
          <table class=" align-center">
            <tr>
              <td>
                Kasir : {{ username }}
              </td>
            </tr>
            <tr>
              <td>
                Outlet : {{ nama_outlet }}
              </td>
            </tr>
            <tr rowspan="2"><img src="src/assets/img/machine-of-death.png" width="100"></tr>
          </table>

      <br>

       <table class="table">
        <tr>
          <th> No. </th>
          <th> Jenis Paket</th>
          <th> Berat</th>
          <th> Sub Total</th>
        </tr>

        <tr v-for="(det, index) in detail_transaksi" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ det.jenis }}</td>
          <td>{{ det.weight }}</td>
          <td> Rp {{ det.sub_total }}</td>
        </tr>

        <tr>
          <td colspan="3" class="h3 text-light-900">Total</td>
          <td class="h3 text-success font-weight-bold text-info">
            Rp {{ total }}
          </td>
        </tr>
        </table>
      </div>
        </b-modal>
      </div>
    </div>
  </section>
</template>

<script>
  module.exports = {
    data: function() {
      return {
        role: "",
        username: "",
        id_transaksi: "",
        nama_member: "",
        id_outlet: "",
        nama_outlet: "",
        tgl: "",
        status: "",
        dibayar: "",
        tgl_bayar: "",
        kasir: "",
        total: "",
        tahun: "",
        bulan: "",
        tgl: "",
        action: "",
        total: "",
        transaksi: [],
        detail_transaksi: [],
        list_years: [2020, 2021, 2022, 2023],
        list_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    },

    methods: {
      getData: function() {
        let config = {
          headers: {
            "Authorization": "Bearer " + this.$cookies.get('Authorization')
          }
        };
        let form = {
          "tahun": this.tahun,
          "bulan": this.bulan,
          "tgl": this.tgl
        }
        axios.post(base_url + 'transaksi/report', form, config).then(response => {
          this.transaksi = response.data.data;
          this.status = response.data.status;
        }).catch(error => {
          console.log(error);
        });
      },

      getRole: function() {
        let config = {
          headers: {
            "Authorization": "Bearer " + this.$cookies.get('Authorization')
          }
        }
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

      changeStatus: function(id_transaksi, event) {
        let conf = {
          headers: {
            "Authorization": 'Bearer ' + this.$cookies.get('Authorization')
          }
        }
        let form = {
          "id_transaksi": id_transaksi,
          "status": event.target.value
        }
        axios.put(base_url + "transaksi/status", form, conf).then(response => {
          this.getData();
          Swal.fire(response.data.message)
        }).catch(error => {
          console.log(error);
        });
      },

      changeBayar: function(id_transaksi, event) {
        let conf = {
          headers: {
            "Authorization": 'Bearer ' + this.$cookies.get('Authorization')
          }
        }
        let form = {
          "id_transaksi": id_transaksi,
          "dibayar": event.target.value
        }
        axios.put(base_url + "transaksi/bayar", form, conf).then(response => {
          this.getData();
          Swal.fire(response.data.message)
        }).catch(error => {
          console.log(error);
        });
      },

      detail: function(detail_transaksi, total) {
        this.total = total;
        this.detail_transaksi = detail_transaksi;
      },

      cetak: function() {
        const prtHtml = document.getElementById('print').innerHTML;
        let stylesHtml = '';
        for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
          stylesHtml += node.outerHTML;
        }
        const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        WinPrint.document.write(`<!DOCTYPE html>
      <html>
        <head>
        <link rel="stylesheet" href="src/assets/css/bootstrap.min.css">
          
        </head>
        <body>
          ${prtHtml}
        </body>
      </html>`);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
      }
    },

    mounted() {
      this.getData();
      this.getRole();
    }
  }
</script>