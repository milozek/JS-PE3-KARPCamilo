const users = JSON.parse(localStorage.getItem("usersList")) || []

const loginForm = document.querySelector("#loginForm")
const userTableBody = document.querySelector("#userTableBody")

class User {
    constructor(
        name,
        lastname,
        gender,
        dob,
        nationality,
        residence,
        intCode,
        phone,
        email,
        service,
        start,
        id
    ) {
        this.name = name.toUpperCase()
        this.lastname = lastname.toUpperCase()
        this.gender = gender
        this.dob = dob
        this.nationality = nationality
        this.residence = residence.toUpperCase()
        this.intCode = intCode
        this.phone = parseInt(phone)
        this.service = service
        this.start = start
        this.id = id
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.email = email
        } else {
            throw new Error("Invalid email format")
        }
    }
    setId(users) {
        this.id = users.length
    }
}
function newUser(elementsArray, htmlContainer) {
    htmlContainer.innerHTML = ""
    elementsArray.forEach((user) => {
        const newRow = document.createElement("tr")
        newRow.className = "listedUser"
        newRow.innerHTML = ` 
        <th scope="row">${user.id}</th>
        <td>${user.lastname}, ${user.name}</td>
        <td>${user.intCode} ${user.phone}</td>
        <td>${user.nationality}</td>
        <td>${user.service}</td>
        <td>${user.start}</td>   
    `
        htmlContainer.appendChild(newRow)
    })
}
function store(users) {
    localStorage.setItem("usersList", JSON.stringify(users))
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const [
        name,
        lastname,
        gender,
        dob,
        nationality,
        residence,
        intCode,
        phone,
        email,
        service,
        start,
    ] = e.target.elements

    const user = new User(
        name.value,
        lastname.value,
        gender.value,
        dob.value,
        nationality.value,
        residence.value,
        intCode.value,
        phone.value,
        email.value,
        service.value,
        start.value
    )

    users.push(user)
    user.setId(users)

    console.log(users)
    store(users)
    newUser(users, userTableBody)
})

function filterUser() {
    const serviceSelect = document.querySelector("#serviceSelect")
    const monthSelect = document.querySelector("#monthSelect")

    const service = serviceSelect.value
    const month = monthSelect.value

    const filteredUsers = users.filter((item) => {
        if (service === "Select a service" && month === "Select a starting month") {
            return true
        } else if (service === "Select a service") {
            return item.start === month
        } else if (month === "Select a starting month") {
            return item.service === service
        } else {
            return item.service === service && item.start === month
        }
    })

    console.log(filteredUsers)
}

// function displayData(filteredUsers) {
//     // const tableBody = document.querySelector("#tableBody");
//     userTableBody.innerHTML = ""
//     if (filteredUsers.length === 0) {
//         const noDataMessage = `<tr><td colspan="4">No data available</td></tr>`
//         userTableBody.insertAdjacentHTML("beforeend", noDataMessage)
//     } else {
//         //   const tableRows = filteredData.map((data) => {
//         //     return `
//         //       <tr>
//         //         <td>${data.name}</td>
//         //         <td>${data.service}</td>
//         //         <td>${data.startingMonth}</td>
//         //         <td>${data.price}</td>
//         //       </tr>
//         //     `
//         newRow = filteredData
//             .map((users) => {
//                 return
//             })
//             .join("")
//         userTableBody.insertAdjacentHTML("beforeend", tableRows)
//     }
// }
