var base_url = "http://localhost:8000/api/";

// Konfigurasi Router
var router = [{
        path: "/",
        name: "home",
        component: httpVueLoader("./src/components/Home.vue")
    },
    {
        path: "/login",
        name: "login",
        component: httpVueLoader("./src/components/Login.vue")
    },
    {
        path: "/user",
        name: "User",
        component: httpVueLoader("./src/components/User.vue")
    },
    {
        path: "/member",
        name: "Member",
        component: httpVueLoader("./src/components/Member.vue")
    },
    {
        path: "/outlet",
        name: "Outlet",
        component: httpVueLoader("./src/components/Outlet.vue")
    },
    {
        path: "/paket",
        name: "Paket",
        component: httpVueLoader("./src/components/Paket.vue")
    },
    {
        path: "/transaksi",
        name: "Transaksi",
        component: httpVueLoader("./src/components/Transaksi.vue")
    },
    {
        path: "/input-transaksi",
        name: "Input Transaksi",
        component: httpVueLoader("./src/components/input-transaksi.vue")
    },
    {
        path: "/test",
        name: "Test",
        component: httpVueLoader("./src/components/test.vue")
    },
];

var routers = new VueRouter({ routes: router, base: "/" });

// Instance Vue

var app = new Vue({
    el: "#app",
    components: {
        'login': httpVueLoader("./src/components/Login.vue"),
        'apps': httpVueLoader("./src/components/App.vue"),
        'home': httpVueLoader("./src/components/Home.vue"),
        'user': httpVueLoader("./src/components/User.vue"),
        'member': httpVueLoader("./src/components/Member.vue"),
        'outlet': httpVueLoader("./src/components/Outlet.vue"),
        'paket': httpVueLoader("./src/components/Paket.vue"),
        'transaksi': httpVueLoader("./src/components/Transaksi.vue"),
        'input-transaksi': httpVueLoader("./src/components/input-transaksi.vue"),
        'test': httpVueLoader("./src/components/test.vue"),
    },
    data: {
        user: {
            id_user: "",
            id_outlet: "",
            role: "",
            name: "",
            username: "",
        },
        componentName: ""
    },
    router: routers,
    methods: {
        CekToken: function() {
            //cek apakah sudah punya token
            if (this.$cookies.isKey('Authorization')) {

                //validasi token dulu
                let config = {
                    headers: {
                        "Authorization": "Bearer " + this.$cookies.get('Authorization')
                    }
                }

                axios.get(base_url + 'login/check', config)
                    .then(response => {
                        //console.log(response)
                        if (response.data.success == true) {
                            // load component home
                            this.componentName = "apps";
                            this.id_user = response.data.data.id;
                            this.id_outlet = response.data.data.id_outlet;
                            this.role = response.data.data.role;
                            this.name = response.data.data.name;
                            this.username = response.data.data.username;

                        } else {
                            this.componentName = "login";
                        }
                    })

                //header: "Bearer " + this.$cookies.get('Authorization')

            } else { //kalau tidak punya, langsung ke login
                this.componentName = "login";
            }
        }
    },
    mounted() {
        this.CekToken();
    }
});