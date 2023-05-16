// زر وظيفته ارسال البيانات الى السيرفر للتسجيل دخول  والدخول الى الصفحة الرئيسية
const but_send = document.getElementById("but_send");

// زر وظيفته الانتقال الى صفحة انشاء حساب
const register = document.getElementById("Register")

// قسم تسجيل دخول 
const Login_Page = document.getElementById("Login_Page");

// قسم  انشاء حساب
const Login_Register = document.getElementById("Login_Register");

// زر وظيفته الرجوع الى صفحة تسجيل الدخول
const Back = document.getElementById("Back");




// متغيرات قمت بكتابتها لكي افصلها من متفيرات صفحةانشاء حساب وأستعملها لانهاء اخزن قيم داخلها
const Input_username = document.getElementById("Input_username");
const Input_password = document.getElementById("Input_password");
const Input_gmail = document.getElementById("Input_gmail");
const Input_name = document.getElementById("Input_name");
const Input_Phone = document.getElementById("Input_Phone");


//  input  متغيرات قمت بكتابتها لكي افصلها من متفيرات صفحة تسجيل دخول وأستعملها لانهاء اخزن قيم داخلها
const input_username_Register = document.getElementById("input_username_Register");
const input_password_Register = document.getElementById("input_password_Register");
const input_gmail_Register = document.getElementById("input_gmail_Register");
const input_name_Register = document.getElementById("input_username_Register");
const input_Phone_Register = document.getElementById("input_Phone_Register");

const but_send_Register = document.getElementById("but_send_Register");
var token = "";
function login() {
    axios({
        method: 'post',
        url: 'https://tarmeezacademy.com/api/v1/login',
        data: {
            username: Input_username.value,
            password: Input_password.value,
            email: Input_gmail.value,
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((result) => {
        console.log(result.data);
        token = localStorage.setItem("token", result.data.token);
        username = localStorage.setItem("username", result.data.user.username);
        id_account = localStorage.setItem("id_account", result.data.user.id );
        window.location.href = "http://127.0.0.1:5500/HomePage/HomePage.html"


    }).catch((err) => {
        window.location.href = "http://127.0.0.1:5500/Page_Login/LoginPage.html"
    })

}

function RegisterGo() {
    axios({
        method: 'post',
        url: 'https://tarmeezacademy.com/api/v1/register',
        data: {
            username: input_username_Register.value,
            password: input_password_Register.value,
            email: input_gmail_Register.value,
            name: input_name_Register.value,
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((result) => {
            console.log(result.data);
            token = localStorage.setItem("token", result.data.token);
            username = localStorage.setItem("username", result.data.user.username);
            id_account = localStorage.setItem("id_account", result.data.user.id );
            window.location.href = "http://127.0.0.1:5500/HomePage/HomePage.html"

        })
        .catch((err) => {
            alert(err.response.data.message);
        }
        )


} 


// دالة وظيفتها تبديل صفحة تسجيل الدخول وصفحة انشاء حساب
function toggleView() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
  
    if (Login_Page.style.display === 'none') {
      Login_Page.style.display = 'flex';
      Login_Register.style.display = 'none';
    } else {
      // إذا كانت صفحة إنشاء حساب غير مرئية، اعرضها وأخفِ صفحة تسجيل الدخول
      Login_Page.style.display = 'none';
      Login_Register.style.display = 'flex';
    }
  }

//   حدث الضغط على الزر لتسجيل الدخول
but_send.addEventListener("click", () => {
    login();
})

// حدث الضغط على الزر لانشاء حساب
but_send_Register.addEventListener("click", () => {
    RegisterGo();
});


// حدث الضغط على الزر للانتقال الى صفحة انشاء حساب
register.addEventListener("click", () => {
    toggleView();

    });

// حدث الضغط على الزر للرجوع الى صفحة تسجيل الدخول
Back.addEventListener("click", () => {
    
        toggleView();

       
} )




