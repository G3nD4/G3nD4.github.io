/* import moment from "moment";


async function getID(): Promise<Comic> {
  fetch('https://fwd.innopolis.app/api/hw2?email=a.shagaliev@innopolis.university')
    .then((val) => val.json())
    .then((data) => getJoke(data));
  return data;
}

async function getJoke(id: string): Promise<void> {
  fetch('https://fwd.innopolis.university/api/comic?id=' + id)
    .then((val) => val.json())
    .then((val) => {
      const comic: Comic = await getID();
      // creating all elements received from the response
      const img_div: HTMLDivElement = document.createElement("div");
      const img: HTMLImageElement = document.createElement('img');
      img.src = val.img;
      img.alt = val.alt;
      img_div.append(img);

      const title_div: HTMLDivElement = document.createElement('div');
      title_div.textContent = 'Title: ' + val.safe_title;

      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date_div: HTMLDivElement = document.createElement('div');
      date_div.textContent = moment(`${comic.year}-${comic.month}-${comic.day}`).fromNow();//'Published: ' + document.createTextNode(new Date(Date.UTC(Number(val.year), Number(val.month), Number(val.day), 0, 0, 0)).toLocaleDateString(undefined, options)).textContent;

      // styling received elements
      title_div.style.fontSize = "30px";
      title_div.style.marginLeft = "16px";

      date_div.style.fontSize = "20px";
      date_div.style.fontStyle = "italic";

      // creating grid
      const scaffold: HTMLDivElement = document.createElement('div');
      scaffold.className = 'wrapper';

      // adding children to our grid
      scaffold.appendChild(title_div);
      scaffold.appendChild(img_div);
      scaffold.appendChild(date_div);
      scaffold.style.display = "grid";
      scaffold.style.gridTemplateColumns = "auto auto auto";
      scaffold.style.margin = "32px";

      // putting our grid element into our document body
      const body: HTMLElement | null = document.getElementById('body');
      body!.appendChild(scaffold);
    });
}
interface Comic {
  "safe_title": string;
  "img_div": string,
  "img": string;
  "alt": string;
  "year": number;
  "month": number;
  "day": number;
} */

import moment from 'moment';

const email: string = "a.shagaliev@innopolis.university";

async function geID(): Promise<number> {
  const params: URLSearchParams = new URLSearchParams();
  if (email) {
    params.append('email', email);
  }
  const response = await fetch('https://fwd.innopolis.university/api/hw2?email=' + params.toString());
  return response.json();
}

async function getJoke(id: number): Promise<Comic> {
  const url: string = 'https://fwd.innopolis.university/api/comic?id=' + id.toString();
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function displayVeryFunnyJoke(): Promise<void> {
  const id: number = await geID();
  const comic: Comic = await getJoke(id);

  const container: HTMLElement | null = document.getElementById('comic-container');

  if (container) {
    const title: HTMLTitleElement = document.createElement('title');
    title.textContent = comic.safe_title;
    container.appendChild(title);

    const image: HTMLImageElement = document.createElement('img');
    image.src = comic.img;
    image.alt = comic.alt;

    const date: HTMLParagraphElement = document.createElement('p');
    date.textContent = moment(`${comic.year}-${comic.month}-${comic.day}`).fromNow();
    container.appendChild(date);
  }
}

interface Comic {
    "safe_title": string;
    "img": string;
    "alt": string;
    "year": number;
    "month": number;
    "day": number;
}