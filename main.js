const clientId = "";
const clientSecret = "";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

class Adder {
  constructor(id, countButton = true) {
    this.id = id;
    let count;
    if (countButton) {
      count = `<button id="new${this.id}">Create New Counter</button>`;
    } else {
      count = "";
    }

    const elem = document.getElementById("repeat");
    elem.insertAdjacentHTML(
      "beforeend",
      `    <p id="num${this.id}"></p>
    <button id="incr${this.id}">Increment</button>
    <button id="decr${this.id}">Decrement</button>
    <button id="rand${this.id}">Random</button>
    <button id="count${this.id}">Add Counter</button>
    <input id="inp${this.id}" type="text" value="1">
    <br>
    ${count}
    <hr>
    `
    );
  }

  async number() {
    const urlToFetch = `${url}yerevan&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20211024`;
    const response = await fetch(urlToFetch, { method: "GET" });
    if (!response.ok) {
      throw new Error(response.status);
    }
    const result = await response.json();
    document.getElementById(`num${this.id}`).innerText =
      result.response.totalResults;
    return result.response.totalResults;
  }

  counter() {
    const inp = document.getElementById(`inp${this.id}`).value;
    return inp;
  }

  rand() {
    const randomNum = Math.floor(Math.random() * 100);
    document.getElementById(`num${this.id}`).innerText = randomNum;
  }

  oper(type) {
    const value = document.getElementById(`num${this.id}`).innerHTML;
    document.getElementById(`num${this.id}`).innerHTML = Number(value) + type;
  }

  async collector() {
    const res = await this.number();
    document
      .getElementById(`incr${this.id}`)
      .addEventListener("click", () => this.oper(Number(this.counter())));
    document
      .getElementById(`decr${this.id}`)
      .addEventListener("click", () => this.oper(Number(`-${this.counter()}`)));
    document
      .getElementById(`rand${this.id}`)
      .addEventListener("click", () => this.rand());
    document
      .getElementById(`count${this.id}`)
      .addEventListener("click", () => this.counter());
  }
}

let id = 1;

const first = new Adder(id);

first.collector();

console.log("before increment", id);
document.getElementById(`new${id}`).addEventListener("click", () => {
  const countButton = false;
  const repeat = new Adder(id + 1, countButton);
  repeat.collector();
  id = id + 1;
  console.log("after increment", id);
});
