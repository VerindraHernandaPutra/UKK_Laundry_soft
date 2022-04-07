<template>
    <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">
        <div class="mb-4 w-50">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"> <router-link to="/"> <a href=""> Home </a> </router-link> </li>
              <li class="breadcrumb-item"> <router-link to="/transaksi"> <a href=""> Transaksi </a> </router-link> </li>
              <li class="breadcrumb-item active" aria-current="page"> Tambah Transaksi </li>
            </ol>
          </nav>
        </div>

    <div class="card-header align-center">
        <h3 class="card-title"> Tambah Transaksi </h3>
    </div>

  <div class="row mt-4"> </div>

  <div class="card">

  <div>
    <table class="table align-items-center mb-0">
      <div class="row">
        <div class="col-md-10">
          <div class="form-group">
            <label class="col-form-label">Member</label>
            <b-form-select class="form-control-soft" v-model="id_member" :options="data_member"></b-form-select>
          </div>
        </div>
      </div>

            <div class="row">
              <div class="col-md-4 pr-1">
                <div class="form-group">
                  <label for="tgl" class="col-form-label">Tanggal Transaksi</label>
                  <input type="date" class="form-control-soft" placeholder="Tanggal" v-model="tgl">
                </div>
              </div>

              <div class="col-md-4 pl-1">
                <div class="form-group">
                  <label for="lama_pengerjaan" class="col-form-label">Lama Pengerjaan</label>
                    <input type="number" class="form-control-soft" placeholder="Lama Pengerjaan" v-model="lama_pengerjaan">
                </div>
              </div>
           </div>


      <div class="form-group">
                <p class="col-form-label"> Item </p>
                <b-button @click="addItem" size="sm" variant="warning"><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah Item</b-button>
                        <br><br>
                        <div class="row" v-for="(detail, counter) in detailtransaksi"
                        v-bind:key="counter">
                        <br><br>
                          <div class="col-md-2">
                            <b-button variant="danger" size="sm" @click="deleteItem(counter)">Hapus</b-button>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <b-form-select class="form-control-soft" v-model="detail.id_paket" :options="data_paket"></b-form-select>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <input class="form-control-soft" placeholder="Berat" type="number" v-model="detail.weight"> 
                            </div>
                          </div>
                        </div>
                        <br><br>
                        <b-button @click="Save" block squared size="lg" variant="success">Submit</b-button>

                      <!-- toast untuk tampilan message box -->
                      <b-toast id="message" title="Message">
                        <strong class="text-success">{{ message }}</strong>
                      </b-toast>
      </div>
    </table>
  </div>
</div>

      </div>  
    </div>
  </section>

</template>

<script>
module.exports = {
  data : function(){
    return {
      id_user: "",
      id_member: "",
      tgl: "",
      lama_pengerjaan: "",
      detailtransaksi: [{
        id_paket: '',
        weight: '',
      }],
      action: "",
      message: "",
      key: "",
      data_paket: [],
      data_member: [],
    }
  },

  methods: {
    addItem(){
      this.detailtransaksi.push({
        id_paket: '',
        weight: '',
      })
    },
    deleteItem(counter){
      this.detailtransaksi.splice(counter,1);
    },

    getPaketDropdown: function(){
        //ambil data paket untuk dropdown
        let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
        axios.get(base_url + "paket", conf)
        .then(response => {
            let json_paket = response.data.data.paket;
            let list_paket = [{value: "", text: " > Pilih Paket "}]
            json_paket.forEach(element => {
                list_paket.push({value: element.id_paket, text: element.jenis+" - "+element.harga})
            });
            this.data_paket = list_paket
        })
    },

    getMemberDropdown: function(){
        //ambil data member untuk dropdown
        let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
        axios.get(base_url + "member", conf)
        .then(response => {
            let json_member = response.data.data.member;
            let list_member = [{value: "", text: " > Pilih Member "}]
            json_member.forEach(element => {
                list_member.push({value: element.id_member, text: element.nama})
            });
            this.data_member = list_member
        })
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      //get id user
      axios.get(base_url + "login/check", conf)
      .then(response => {
        if(response.data.success == false){
          this.componentName = 'login';

          window.location = front_url;
        } else {
          this.id_user = response.data.data.id_user;

          //insert data transaksi
          let form = {
            "id_member": this.id_member,
            "tgl": this.tgl,
            "lama_pengerjaan": this.lama_pengerjaan,
            "id_user": this.id_user,
            "detail": this.detailtransaksi,
          }

          axios.post(base_url + "transaksi", form, conf)
          .then(response2 => {
            if(response2.data.success == true){
                this.message = response2.data.message;
                this.$bvToast.show("message");

                this.id_user = "";
                this.id_member = "";
                this.tgl = "";
                this.lama_pengerjaan = "";
                this.detailtransaksi = [];

                this.$router.push('/transaksi'); 
            } else {
              this.message = "Pastikan data terisi lengkap!.";
              this.$bvToast.show("message");
            }
           

          })
          .catch(error => {
            console.log(error);
          });

        }
      })
    },

  },
  mounted(){
    this.key = this.$cookies.get("Authorization");
    this.getMemberDropdown();
    this.getPaketDropdown();
  }
}
</script>