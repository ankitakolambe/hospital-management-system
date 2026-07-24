async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:8080/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })

    });


    if (response.ok) {

        const data = await response.json();

        localStorage.setItem("token", data.token);

        window.location.href = "dashboard.html";

    } else {

        document.getElementById("message").innerHTML =
            "Invalid Email or Password";

    }

}



function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}





// ================= PATIENT =================


async function loadPatients() {

    const token = localStorage.getItem("token");


    if (!token) {

        window.location.href = "login.html";
        return;

    }


    const response = await fetch(
        "http://localhost:8080/patients",
        {

            method:"GET",

            headers:{
                "Authorization":"Bearer " + token
            }

        });



    if(!response.ok){

        alert("Unauthorized!");

        localStorage.removeItem("token");

        window.location.href="login.html";

        return;

    }



    const patients = await response.json();


    const tableBody =
        document.querySelector("#patientTable tbody");


    tableBody.innerHTML="";


    patients.forEach(patient=>{


        tableBody.innerHTML += `

        <tr>

        <td>${patient.id}</td>
        <td>${patient.firstName}</td>
        <td>${patient.lastName}</td>
        <td>${patient.age}</td>
        <td>${patient.gender}</td>
        <td>${patient.phone}</td>
        <td>${patient.email}</td>
        <td>${patient.address}</td>


        <td>

        <button onclick="editPatient(${patient.id})">
        Edit
        </button>


        <button onclick="deletePatient(${patient.id})">
        Delete
        </button>


        </td>


        </tr>

        `;


    });


}




async function addPatient(){

    const token=localStorage.getItem("token");


    const patient={


        firstName:
        document.getElementById("firstName").value,


        lastName:
        document.getElementById("lastName").value,


        age:
            parseInt(document.getElementById("age").value),


        gender:
        document.getElementById("gender").value,


        phone:
        document.getElementById("phone").value,


        email:
        document.getElementById("email").value,


        address:
        document.getElementById("address").value


    };



    const response=await fetch(
        "http://localhost:8080/patients",
        {

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                "Authorization":"Bearer "+token

            },


            body:JSON.stringify(patient)

        });



    if(response.ok){

        alert("Patient Added Successfully!");

        window.location.href="patients.html";


    }

    else{

        document.getElementById("message").innerHTML=
            "Failed to add patient.";

    }


}





async function deletePatient(id){


    const token=localStorage.getItem("token");


    if(!confirm("Delete this patient?"))
        return;



    const response=await fetch(
        "http://localhost:8080/patients/"+id,
        {

            method:"DELETE",

            headers:{

                "Authorization":"Bearer "+token

            }

        });



    if(response.ok){

        alert("Patient deleted successfully!");

        loadPatients();

    }


}
// ================= EDIT PATIENT =================

function editPatient(id) {

    localStorage.setItem("editPatientId", id);

    window.location.href = "edit-patient.html";

}


async function loadPatientForEdit() {

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("editPatientId");

    if (!token || !id) {

        window.location.href = "patients.html";
        return;

    }

    const response = await fetch(
        `http://localhost:8080/patients/${id}`,
        {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

    if (!response.ok) {

        alert("Unable to load patient.");

        window.location.href = "patients.html";
        return;

    }

    const patient = await response.json();

    document.getElementById("firstName").value = patient.firstName;
    document.getElementById("lastName").value = patient.lastName;
    document.getElementById("age").value = patient.age;
    document.getElementById("gender").value = patient.gender;
    document.getElementById("phone").value = patient.phone;
    document.getElementById("email").value = patient.email;
    document.getElementById("address").value = patient.address;

}


async function updatePatient() {

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("editPatientId");

    const patient = {

        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: parseInt(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value

    };

    const response = await fetch(
        `http://localhost:8080/patients/${id}`,
        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",
                "Authorization": "Bearer " + token

            },

            body: JSON.stringify(patient)

        });

    if (response.ok) {

        alert("Patient Updated Successfully!");

        localStorage.removeItem("editPatientId");

        window.location.href = "patients.html";

    } else {

        document.getElementById("message").innerHTML =
            "Failed to update patient.";

    }

}






// ================= DOCTOR =================



async function addDoctor(){


    const token=localStorage.getItem("token");


    if(!token){

        window.location.href="login.html";

        return;

    }



    const doctor={


        firstName:
        document.getElementById("firstName").value,


        lastName:
        document.getElementById("lastName").value,


        specialization:
        document.getElementById("specialization").value,


        email:
        document.getElementById("email").value,


        phone:
        document.getElementById("phone").value,


        experience:
            parseInt(document.getElementById("experience").value)


    };



    const response=await fetch(
        "http://localhost:8080/doctors",
        {


            method:"POST",


            headers:{


                "Content-Type":"application/json",

                "Authorization":"Bearer "+token


            },


            body:JSON.stringify(doctor)


        });



    if(response.ok){


        alert("Doctor Added Successfully!");

        window.location.href="doctor.html";


    }

    else{


        const error=await response.text();

        console.log(error);


        document.getElementById("message").innerHTML=
            "Failed to add doctor.";


    }


}







async function loadDoctors(){


    const token=localStorage.getItem("token");



    const response=await fetch(
        "http://localhost:8080/doctors",
        {


            method:"GET",


            headers:{


                "Authorization":"Bearer "+token


            }


        });



    if(!response.ok){


        alert("Unauthorized!");

        localStorage.removeItem("token");

        window.location.href="login.html";

        return;


    }



    const doctors=await response.json();



    const tableBody=
        document.querySelector("#doctorTable tbody");



    tableBody.innerHTML="";



    doctors.forEach(doctor=>{


        tableBody.innerHTML += `


<tr>


<td>${doctor.id}</td>


<td>${doctor.firstName}</td>


<td>${doctor.lastName}</td>


<td>${doctor.specialization}</td>


<td>${doctor.email}</td>


<td>${doctor.phone}</td>


<td>${doctor.experience}</td>



<td>


<button onclick="editDoctor(${doctor.id})">

Edit

</button>


<button onclick="deleteDoctor(${doctor.id})">

Delete

</button>


</td>



</tr>



`;


    });
}

async function deleteDoctor(id) {

    const token = localStorage.getItem("token");

    if (!confirm("Delete this doctor?")) {
        return;
    }

    const response = await fetch(`http://localhost:8080/doctors/${id}`, {

        method: "DELETE",

        headers: {
            "Authorization": "Bearer " + token
        }

    });

    if (response.ok) {

        alert("Doctor deleted successfully!");

        loadDoctors();

    } else {

        alert("Failed to delete doctor.");

    }

}
function editDoctor(id) {

    localStorage.setItem("editDoctorId", id);

    window.location.href = "edit-doctor.html";

}
async function loadDoctorForEdit() {

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("editDoctorId");

    if (!token || !id) {
        window.location.href = "doctor.html";
        return;
    }

    const response = await fetch(`http://localhost:8080/doctors/${id}`, {

        method: "GET",

        headers: {
            "Authorization": "Bearer " + token
        }

    });

    if (!response.ok) {

        alert("Unable to load doctor.");

        window.location.href = "doctor.html";

        return;
    }

    const doctor = await response.json();

    document.getElementById("firstName").value = doctor.firstName;
    document.getElementById("lastName").value = doctor.lastName;
    document.getElementById("specialization").value = doctor.specialization;
    document.getElementById("email").value = doctor.email;
    document.getElementById("phone").value = doctor.phone;
    document.getElementById("experience").value = doctor.experience;

}
async function updateDoctor() {

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("editDoctorId");

    const doctor = {

        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        specialization: document.getElementById("specialization").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        experience: parseInt(document.getElementById("experience").value)

    };

    const response = await fetch(`http://localhost:8080/doctors/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },

        body: JSON.stringify(doctor)

    });

    if (response.ok) {

        alert("Doctor Updated Successfully!");

        localStorage.removeItem("editDoctorId");

        window.location.href = "doctor.html";

    } else {

        alert("Failed to update doctor.");

    }

}
async function loadAppointments() {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const response = await fetch("http://localhost:8080/appointments", {

        method: "GET",

        headers: {
            "Authorization": "Bearer " + token
        }

    });

    if (!response.ok) {

        alert("Unauthorized!");

        localStorage.removeItem("token");

        window.location.href = "login.html";

        return;
    }

    const appointments = await response.json();

    const tableBody = document.querySelector("#appointmentTable tbody");

    tableBody.innerHTML = "";

    appointments.forEach(appointment => {

        tableBody.innerHTML += `
        <tr>

            <td>${appointment.id}</td>
            <td>${appointment.appointmentDate}</td>
            <td>${appointment.appointmentTime}</td>
            <td>${appointment.status}</td>
            <td>${appointment.patient.id}</td>
            <td>${appointment.doctor.id}</td>

            <td>

                <button onclick="editAppointment(${appointment.id})">
                    Edit
                </button>

                <button onclick="deleteAppointment(${appointment.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;

    });

}
async function addAppointment() {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const appointment = {

        appointmentDate: document.getElementById("appointmentDate").value,
        appointmentTime: document.getElementById("appointmentTime").value,
        status: document.getElementById("status").value,

        patient: {
            id: parseInt(document.getElementById("patientId").value)
        },

        doctor: {
            id: parseInt(document.getElementById("doctorId").value)
        }

    };

    const response = await fetch("http://localhost:8080/appointments", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },

        body: JSON.stringify(appointment)

    });

    if (response.ok) {

        alert("Appointment Added Successfully!");

        window.location.href = "appointment.html";

    } else {

        document.getElementById("message").innerHTML =
            "Failed to add appointment.";

    }

}
async function deleteAppointment(id) {

    const token = localStorage.getItem("token");

    if (!confirm("Delete this appointment?")) {
        return;
    }

    const response = await fetch(`http://localhost:8080/appointments/${id}`, {

        method: "DELETE",

        headers: {
            "Authorization": "Bearer " + token
        }

    });

    if (response.ok) {

        alert("Appointment deleted successfully!");

        loadAppointments();

    } else {

        alert("Failed to delete appointment.");

    }

}
function editAppointment(id) {

    localStorage.setItem("editAppointmentId", id);

    window.location.href = "edit-appointment.html";

}
async function loadAppointmentForEdit() {

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("editAppointmentId");

    if (!token || !id) {
        window.location.href = "appointment.html";
        return;
    }

    const response = await fetch(`http://localhost:8080/appointments/${id}`, {

        method: "GET",

        headers: {
            "Authorization": "Bearer " + token
        }

    });

    if (!response.ok) {

        alert("Unable to load appointment.");

        window.location.href = "appointment.html";

        return;
    }

    const appointment = await response.json();

    document.getElementById("appointmentDate").value = appointment.appointmentDate;
    document.getElementById("appointmentTime").value = appointment.appointmentTime;
    document.getElementById("status").value = appointment.status;
    document.getElementById("patientId").value = appointment.patient.id;
    document.getElementById("doctorId").value = appointment.doctor.id;

}
async function updateAppointment() {

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("editAppointmentId");

    const appointment = {

        appointmentDate: document.getElementById("appointmentDate").value,
        appointmentTime: document.getElementById("appointmentTime").value,
        status: document.getElementById("status").value,

        patient: {
            id: parseInt(document.getElementById("patientId").value)
        },

        doctor: {
            id: parseInt(document.getElementById("doctorId").value)
        }

    };

    const response = await fetch(`http://localhost:8080/appointments/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },

        body: JSON.stringify(appointment)

    });

    if (response.ok) {

        alert("Appointment Updated Successfully!");

        localStorage.removeItem("editAppointmentId");

        window.location.href = "appointment.html";

    } else {

        alert("Failed to update appointment.");

    }

}