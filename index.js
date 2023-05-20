window.onload = () => {
  createSeats();
};

function success() {
  document.querySelector(".submit-btn").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("triggered");
    Swal.fire({
      icon: "success",
      title: "Submitted",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location = "./showbus.html";
    }, 1501);
  });
}

const seatNames = [
  { key: 1, name: "如心廣場總站" },
  { key: 2, name: "大涌道福來邨" },
  { key: 3, name: "荃灣(愉景新城)" },
  { key: 4, name: "荃灣站" },
  { key: 5, name: "眾安街" },
  { key: 6, name: "綠楊新邨" },
  { key: 7, name: "悅來酒店" },
  { key: 8, name: "荃灣聯仁街" },
  { key: 9, name: "荃灣馬頭壩道" },
  { key: 10, name: "荃灣龍德街" },
  { key: 11, name: "長安總站" },
  { key: 12, name: "青嶼幹線巴士轉乘站" },
  { key: 13, name: "機場(1號客運大樓)" },
  { key: 14, name: "機場博覽館" },
  { key: 15, name: "香港天際萬豪酒店" },
];
const bookedSeats = new Set();
let firstSelectedKey = null;
let lastSelectedKey = null;

function createSeatElement(seatName, seatKey) {
  const seat = document.createElement("div");
  seat.className = "seat";
  seat.innerText = seatName;
  seat.setAttribute("data-seat-key", seatKey);
  seat.addEventListener("click", function () {
    if (bookedSeats.has(seatKey)) {
      alert("This seat is already booked. Please choose another one.");
      return;
    }

    if (firstSelectedKey && !lastSelectedKey) {
      lastSelectedKey = seatKey;
      markSeatsInRange();
    } else {
      resetSelection();
      firstSelectedKey = seatKey;
    }

    seat.classList.toggle("selected");
  });
  return seat;
}

function createSeats() {
  const seatsContainer = document.getElementById("seats-container");
  for (let i = 0; i < seatNames.length; i++) {
    const seatName = seatNames[i].name;
    const seatKey = seatNames[i].key;
    const seat = createSeatElement(seatName, seatKey);
    seatsContainer.appendChild(seat);
  }
}

function markSeatsInRange() {
  if (firstSelectedKey && lastSelectedKey) {
    const seats = document.getElementsByClassName("seat");
    const firstSeatKey = parseInt(firstSelectedKey);
    const lastSeatKey = parseInt(lastSelectedKey);

    for (let i = 0; i < seats.length; i++) {
      const seat = seats[i];
      const seatKey = parseInt(seat.getAttribute("data-seat-key"));
      if (seatKey >= firstSeatKey && seatKey <= lastSeatKey) {
        seat.classList.add("selected");
      } else {
        seat.classList.remove("selected");
      }
    }
  }
}

function bookSelectedSeats() {
  const selectedSeats = document.getElementsByClassName("selected");
  if (selectedSeats.length === 0) {
    alert("No seats selected. Please choose at least one seat.");
    return;
  }

  for (let i = 0; i < selectedSeats.length; i++) {
    const seat = selectedSeats[i];
    const seatKey = parseInt(seat.getAttribute("data-seat-key"));
    bookedSeats.add(seatKey);
    seat.className = "seat booked";
    seat.removeEventListener("click", function () {});
  }

  alert("Selected seats booked successfully.");
  // Change color of selected seats after booking
  changeSelectedSeatsColor();
  // Reset selected seats after booking
  resetSelection();
}

function changeSelectedSeatsColor() {
  const selectedSeats = document.getElementsByClassName("selected");
  for (let i = 0; i < selectedSeats.length; i++) {
    selectedSeats[i].style.backgroundColor = "red";
  }
}

function resetSelection() {
  firstSelectedKey = null;
  lastSelectedKey = null;
  const selectedSeats = document.getElementsByClassName("selected");
  while (selectedSeats.length > 0) {
    selectedSeats[0].classList.remove("selected");
  }
}

// Create seats when the page loads
// createSeats();

// Add event listener to the book button
const bookButton = document.getElementById("book-btn");
bookButton.addEventListener("click", bookSelectedSeats);
